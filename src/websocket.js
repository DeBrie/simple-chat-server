const success = { ok: 1 };
const failure = { ok: 0 };

const redisPubSub = require("./util/redis/redis_streams");

module.exports = (socket, user) => {
    const { pub, sub } = redisPubSub();

    socket.sendJson = (message) => {
        typeof message == "object"
            ? socket.send(JSON.stringify(message))
            : socket.send(message);
    }
    socket.on("connect", (connect) => {
        sub()//subscribe to this users messages
    })
    socket.on("message", (message) => {
        try {
            JSON.parse(message);

        } catch (ex) {
            socket.sendJson({ message: "Error parsing message", error: ex.message })
        }
    })
}