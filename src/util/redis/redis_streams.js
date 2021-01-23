const redis = require("redis");

module.exports = function () {
	const agent = redis.createClient();
	return {
		sub: agent.subscribe,
		pub: agent.publish
	}
}
