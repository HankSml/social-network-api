const mongoose = require('mongoose');
const reactionSchema = require('./Reaction')
const moment = require('moment')

const options = { 
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
 };

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {type: String, required: true},
    reactions: [reactionSchema],
}, options)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const handleError = (err) => console.error(err);

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;