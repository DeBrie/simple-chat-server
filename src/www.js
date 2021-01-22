require("dotenv").config()
const apiName = process.env.API_NAME || "Chat-API";
const baseRef = process.env.LOG_LOCATION || "access_logs";
const serverPort = process.env.AUTH_PORT || 13000;

const stdRoutes = require("./routes/std_routes")
const morgan = require("morgan");
const rfs = require('rotating-file-stream');
const app = require("express")();
const http = require('http');

const cors = require("cors")({});
const helmet = require("helmet")();
const text = require('body-parser').text()
const json = require('body-parser').json()

module.exports = () => {
	const passport = require('passport');
	require("../util/passport");

	const wsServer = new ws.Server({ noServer: true });

	wsServer.on('connection', socket => {
		socket.on('message', message => console.log(message));
	});

	const generator = (time, index) => {
		if (!time) return `${apiName}_access.log`;

		var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
		var day = pad(time.getDate());

		return `${month}/${month}${day}-${index}-${apiName}_access.log`;
	};
	const accessLogStream = rfs.createStream(generator, {
		interval: "1d",
		path: baseRef
	})

	app.use(cors)
		.use(json)
		.use(text)
		.use(helmet)
		.use(passport.initialize())
		.use(morgan("short"))
		.use(morgan("common", { stream: accessLogStream }))
		.use("/register", stdRoutes)
		.use(errorHandler)

	const server = http.createServer(app);

	server.listen(serverPort)
	server.on('upgrade', (request, socket, head) => {
		wsServer.handleUpgrade(request, socket, head, socket => {
			wsServer.emit('connection', socket, request);
		});
	});
	console.log(`Server Worker started listening on port ${serverPort}`)
};