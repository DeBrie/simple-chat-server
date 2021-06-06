const router = require("express").Router();
const auth = require('../util/middleware/auth');
const User = require("../models/User");
const { Unauthorised } = require("../util/errors");

router.use(auth)

router.get("/", (req, res, next) => {
    const currentUser = req.user;
    if (currentUser) {
        User
            .findOne(
                { _id: currentUser },
                "contacts",
                (err, docs) => {
                    if (err) next(err)
                    else res.send(docs)
                })
    } else {
        next(new Unauthorised("You are not logged in"))
    }
});

router.post("/:newContact", (req, res, next) => {
    const { user, params: { newContact } } = req;
    if (user) {
        User
            .updateOne(
                { _id: currentUser },
                { $push: { contacts: newContact } },
                (err, docs) => {
                    if (err) next(err)
                    else res.send(docs)
                })
    } else {
        next(new Unauthorised("You are not logged in"))
    }
})

module.exports = router;