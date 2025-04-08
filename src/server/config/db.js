const mongoose = require('mongoose');
const dbURL = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
const connectDB = async () => {
    try{
        await mongoose.connect(dbURL);
        console.log('MongoDB connected');

    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;