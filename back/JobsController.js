import Job from "./models/jobsModel.js";

class JobsController {

    async saveJobs(jobs) {

        await Job.deleteMany();

        for (let i = 0; i < jobs.lbaCompanies.results.length ;i++) {
            const newJob = new Job({
                company: jobs.lbaCompanies.results[i].company.name,
                address: jobs.lbaCompanies.results[i].place.address,
                city: jobs.lbaCompanies.results[i].place.city
            });

            try {
                await newJob.save();
            } catch (error) {
                console.log("Error: " + error.message);
            }
        }
    }

    async getJobs(){
        try {
            const allJobs = await Job.find();
            return allJobs;
        } catch (error) {
            return "Error fetching jobs : " + error.message;
        }
    }

}

export default JobsController;