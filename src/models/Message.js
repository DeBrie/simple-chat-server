const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = Schema({
    _id: Schema.ObjectId,
    src: Schema.ObjectId,
    dest: [Schema.ObjectId],
    timestamp: Number,
    content: String
})

module.exports = mongoose.model('Message', Message, 'messages')
