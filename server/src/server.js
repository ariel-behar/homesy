const express = require('express');
const chalk = require('chalk')

const dbName = 'home-services';
const PORT = process.env.PORT || '3030';
const initDatabase = require('../config/initDatabase.js');

const routes = require('./routes/routes.js')

const app = express();

app.use(routes);

initDatabase(dbName)
    .then(() => {
        console.log(chalk.green(`${chalk.white('Succesfully connected to database:')} ${chalk.green(dbName)}`))
        
        app.listen(PORT, () => {
            console.log(`${chalk.white('App is running on:')} ${chalk.green('http://localhost:')}${chalk.green(PORT)}`);
        })
    })
    .catch(error => {
        console.log(`An error occurred while connecting to database: ${error}`)
    })







