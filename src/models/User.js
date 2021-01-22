const mongoose = require('mongoose')
const Schema = mongoose.Schema
let User = new Schema({
    _id: Schema.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true
    },
    contacts: [Schema.ObjectId],
    authenticated: Boolean,
    transfer: Schema.ObjectId,
    firstname: String,
    lastname: String,
    profilePicture: String
});

module.exports = mongoose.model('Users', User, "users");
