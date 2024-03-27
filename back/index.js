import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'
import dbConnect from "./config/db.js";
import JobsController from "./JobsController.js";
import Job from "./models/jobsModel.js";

const app = express();
const port = 3001;

app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const job = new JobsController();
dbConnect();

let baseUrl = "https://labonnealternance-recette.apprentissage.beta.gouv.fr/api";

app.get("/updateJobs", (req, res) => {

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
            job.saveJobs(jobsData);
            res.json(jobsData);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            console.log(error);
            res.status(500).json({ error: "Error fetching data from API" });
        });
});

app.get("/getJobs", async (req, res) => {
    try {
        const data = await job.getJobs();
        res.send(data);
        console.log("Jobs sent successfully.");
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Error fetching jobs from database" });
    }
});
