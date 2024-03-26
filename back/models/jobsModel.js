import mongoose from "mongoose";

const jobModel = mongoose.Schema({
    company: {type: String},
    address: {type: String},
    city: {type: String}
});

const Job = mongoose.model("Job", jobModel);

export default Job;