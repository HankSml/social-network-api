const connection = require('../config/connection');
const { User, Thought } = require('../models');

const data = {
    {
        username: '123',
        email: '123@4.com',
        thoughts: '',
        friends: ''
    }
};

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});


});