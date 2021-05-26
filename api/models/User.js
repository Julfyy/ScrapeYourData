const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    selectors: [
        {
            tag: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = model('User', userSchema);
