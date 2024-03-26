import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const uri = "mongodb+srv://mehdi:testbeetween@test.p4bz7ma.mongodb.net/?retryWrites=true&w=majority&appName=Test"

        await mongoose.connect(uri, );
        console.log("Connected to MongoDB");
    }
    catch (error){
        console.log(`error : ${error.message}`);
        process.exit();
    }
}

export default dbConnect;