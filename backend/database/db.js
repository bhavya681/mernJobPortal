import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({});

const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('Successfully Connected To Database');
    } catch (error) {
        console.log('Error while connecting in database:',error);
    }
};

export default connectDB;