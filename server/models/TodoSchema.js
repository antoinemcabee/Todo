const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    title: { type: String },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        default: Date.now()
    }
}, {strict: false});

const Todo = mongoose.model('todos', userSchema);

module.exports = Todo;