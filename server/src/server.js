const express = require('express');
const chalk = require('chalk')

const dbName = require('../config/configYargs.js')
const initDatabase = require('../config/initDatabase.js');

const routes = require('./routes/routes.js')

const PORT = process.env.PORT || '3050';

const app = express();

app.use(routes);

if(dbName && isNaN(Number(dbName))){
    initDatabase(dbName)
        .then(() => {
            console.log(chalk.green(`${chalk.green('Succesfully connected to database:')} ${chalk.white(dbName)}`))
            
            app.listen(PORT, () => {
                console.log(`${chalk.green('App is running on:')} http://localhost:${PORT}`);
            })
        })
        .catch(error => {
            console.log(`An error occurred while connecting to database: ${error}`)
        })
}







