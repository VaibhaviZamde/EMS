import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectToDatabase = async () => {
    const mongoURI = process.env.MONGODB_URL;

    if (!mongoURI) {
        console.error("❌ MONGODB_URL not found in environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); // Exit the app if DB connection fails
    }
};

export default connectToDatabase;
