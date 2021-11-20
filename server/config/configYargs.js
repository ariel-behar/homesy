const yargs = require('yargs');

const argv = yargs.options({
    db: { type: 'string', alias: 'dbName', demandOption: true },
}).argv;

const dbName = argv.db;

module.exports = dbName;