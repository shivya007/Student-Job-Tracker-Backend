const mongoose = require('mongoose');
const DB_NAME = require('../constants.js');
const AppError = require('../utils/AppError.js');

const connectDB = async() =>{
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
        console.log("mongoDB Connected Successfully:");
    } catch (error) {
        console.log("DataBase Connection is Failed:", error);
        process.exit(1);
    }
}

module.exports = connectDB;