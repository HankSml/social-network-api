const connection = require('../config/connection');
const { User, Thought } = require('../models');

const userData = [
    {
        'username': '123',
        'email': '123@four.com',
    },
    {
        'username': 'example2',
        'email': 'example2@test.com',
    }
];

const thoughtData = [
    {
        'thoughtText': 'This is my very first thought!',
        'username': '123'
    },
    {
        'thoughtText': 'I am writing a thought to post right now!',
        'username': 'example2'
    }
]

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    try {
        await User.deleteMany({});
        await Thought.deleteMany({});
    
        console.log('database cleared')

        await User.create(userData);
        await Thought.create(thoughtData);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('seeded')
    process.exit(0);
});