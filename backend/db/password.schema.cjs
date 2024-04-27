const Schema = require('mongoose').Schema;

module.exports = new Schema({
    account: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
}, { collection: 'passwordStorage' });