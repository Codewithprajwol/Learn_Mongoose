import mongoose from "mongoose";
const mongo_url='mongodb://localhost:27017/mongooseTest'
export const connectDb=async()=>{
    try {
        const conn = await mongoose.connect(mongo_url);
        console.log('Database connected successfully', conn.connection.host);
      } catch (err) {
        console.error('Database connection error:', err.message);
      }
}
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
  });


