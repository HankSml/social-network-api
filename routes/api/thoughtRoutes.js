const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    deleteReaction,
    createReaction
} = require('../../controllers/thoughtController');

router.route('/')
    .get(getThoughts)

router.route('/:userId')
    .post(createThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions/')
    .post(createReaction)

router.route('/:thoughtId/reactions/reactionId')
    .delete(deleteReaction);

module.exports = router;