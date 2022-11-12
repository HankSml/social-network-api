const mongoose = require('mongoose');

const options = { 
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
 };

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please enter a valid email address']
    },
    thoughts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, options);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = mongoose.model('User', userSchema);

module.exports = User;
