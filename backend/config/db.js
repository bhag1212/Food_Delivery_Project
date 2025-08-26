import mongoose from 'mongoose'
export const connectDB=async()=>{
    try{
    await mongoose.connect('mongodb+srv://Bhagya:M43MyOc5dmNDBYpx@cluster0.r3nxpxx.mongodb.net/food-del');
    console.log('db connected');
    }
    catch(err){
        console.log(err);
    }
}

