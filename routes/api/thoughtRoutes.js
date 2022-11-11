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
    .post(createThought);

router.route('/:thoughtID')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtID/reactions')
    .post(createReaction)
    .delete(deleteReaction);

module.exports = router;