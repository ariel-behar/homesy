const mongoose = require('mongoose');

function initDatabase (dbName){
    return mongoose.connect(`mongodb://localhost:27017/${dbName}`);
}

module.exports =  initDatabase;