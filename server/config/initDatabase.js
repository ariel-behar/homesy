const mongoose = require('mongoose');
require('dotenv').config();

function initDatabase (dbName){
    return mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wkrc6.mongodb.net/${dbName}`);
}

module.exports =  initDatabase;