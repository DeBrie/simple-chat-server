const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = Schema({
    _id: Schema.ObjectId,
    src: Schema.ObjectId,
    dest: [Schema.ObjectId],
    timestamp: Number,
    content: String
})

