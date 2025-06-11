import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const DB_KEY = process.env.DB_KEY || "";
if(!DB_KEY) {
    console.log("Please provide the db key");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_KEY);
        console.log('MongoDB Connected Successfully!');
    } catch (error) {
        console.log("an error occured", error);
        process.exit(1);
    }
}

export default connectDB;