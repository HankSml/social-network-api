const {User, Thought} = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
            })
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({path: 'thoughts', select: '-__v'})
            .populate({path: 'friends', select: '-__v'})
            .select('-__v')
            .then((user) =>
                !user
                ? res.status(404).json({message: 'No user found with that ID!'})
                : res.json(user)    
            )
        .catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id})
            .then((user) => 
            !user
                ? res.status(404).json({message: 'No user found with that ID!'})
                : Thought.deleteMany({ _id: { $in: user.thoughts } }) 
        )
        .then(() => res.json({ message: 'User and associated thoughts deleted!'} ))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID!'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: {friends: req.params.fId } },
            { new: true}
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID!'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID!'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
};