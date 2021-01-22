const cluster = require('cluster');
const runner = require('./runner');
const www = require('./www');

if (cluster.isMaster) console.log("Running in clustered Mode...")
cluster.isMaster ? runner() : www();