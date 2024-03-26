import express from 'express';
import fetch from 'node-fetch';
import dbConnect from "./config/db.js";
import JobsController from "./JobsController.js";

const app = express();
const port = 3001;
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const job = new JobsController();
dbConnect();

let baseUrl = "https://labonnealternance-recette.apprentissage.beta.gouv.fr/api";

app.get("/jobs", (req, res) => {

    /*console.log(req.body);*/
    const endpoint = "/v1/jobs";

    const data = {
        romes: "D1101",
        caller: "mehdi.sabir@outlook.com",
        latitude : 48.111,
        longitude : -1.6742,
        insee: 35000,
        radius:50
    };

        fetch(`${baseUrl}${endpoint}?romes=${data.romes}&caller=${data.caller}&latitude=${data.latitude}&longitude=${data.longitude}&insee=${data.insee}&radius=${data.radius}`, {
        method: "GET",

    }).then(response => {
            // Check if response is successful (status code in the range 200-299)
            if (!response.ok) {
                console.log(response.status)
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response asynchronously
            return response.json();
        })
        .then(jobsData => {
            // Send the jobs data to the frontend as JSON
            res.json(jobsData);
            job.saveJobs(jobsData);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            console.log(error);
            res.status(500).json({ error: "Error fetching data from API" });
        });
});
