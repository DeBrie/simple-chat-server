const cluster = require('cluster');
const numWorkers = require("os").cpus().length * 2;
let tWorkers = numWorkers;
module.exports = () => {
	console.log(`Starting ${numWorkers} services`)
	for (let i = 0; i < numWorkers; i++) {
		const worker = cluster.fork();
	}
	cluster
		.on("fork", (worker) => {
			console.log(`Service ${worker.id} started`);
			tWorkers --;
			if(tWorkers == 0) console.log(`All services started`)
		})
		.on("exit", (worker, code, signal) => {
			console.log(`Service ID: ${worker.id} PID:${worker.process.pid} died, starting another service to replace`);
			cluster.fork();
		})
		.on("disconnect", (worker) => {
			console.log(`Service: ${worker.id} disconnected, going to kill its process.`);
			worker.kill();
		})
		.on("error", (worker) => {
			worker.kill();
		});

}