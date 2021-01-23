const success = { ok: 1 };
const failure = { ok: 0 };

const redisPubSub = require("./util/redis/redis_streams");

const {
    SEND_MESSAGE
} = require("./util/constants/websocket");

module.exports = ({ socket, user }) => {
    const { pub, sub } = redisPubSub();
    console.log(user);
    socket.sendJson = (message) => {
        typeof message == "object"
            ? socket.send(JSON.stringify(message))
            : socket.send(message);
    }
    socket.on("connect", (connect) => {
        console.log("Connecting websocket to user: " + user);
        sub(user._id);
    })
    socket.on("message", (message) => {
        let msg;
        try {
            msg = JSON.parse(message);
        } catch (ex) {
            return socket.sendJson({ message: "Error parsing message", error: ex.message })
        }
        switch (msg.cmd) {
            case SEND_MESSAGE:
                msg.src && msg.data.trim()
                    ? pub(msg.src, msg.data)
                    : "";
                break;
            default: return;
        }
        return;
    })
}