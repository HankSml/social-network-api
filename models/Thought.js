const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {type: String, required: true, minLength: 1, maxLength: 280},
    createdAt: { type: Date, default: Date.now},
    username: {type: String, required: true},
    reactions: {},
    virtuals: {
        reactionCount: {
            get() {return this.reactions.length}
        }
    }
})

const handleError = (err) => console.error(err);

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;