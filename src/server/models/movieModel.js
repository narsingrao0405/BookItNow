const mangoose = require('mongoose');

const movieSchema = new mangoose.Schema({
    name: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    duration : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },

    poster: {
        type: String,
        required: true,
    },
});
const MovieModel = mangoose.model('movies', movieSchema);
module.exports = MovieModel;