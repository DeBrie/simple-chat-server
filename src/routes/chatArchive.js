const router = require("express").Router();
const auth = require("../util/middleware/auth");
const Message = require("../models/Message");
const { BadRequest } = require("../util/errors");

router.use(auth)

router.get("/chat/:chatId/messages", (req, res, next) => {
    const chat = req.params.chatId;
    const { fromTime = 0, toTime = Date.now() } = req.query;
    if (chat && fromTime != null && toTime) {
        Message
            .find({ _id: chat, timestamp: { $gt: fromTime, $lt: toTime } })
            .limit(100)
            .exec((err, docs) => {
                if (err) next(err)
                else res.send(docs)
            })
    } else {
        next(new BadRequest("No chat id present"))
    }
})

router.get("/participants/:chatId", (req, res, next) => {
    const chat = req.params.chatId;
    if (chat) {
        Message
            .findById(chat)
            .sort({ timestamp: -1 })
            .limit(1)
            .exec((err, docs) => {
                if (err) next(err)
                else res.send(docs)
            })
    } else {
        next(new BadRequest("No chat id present"))
    }
})