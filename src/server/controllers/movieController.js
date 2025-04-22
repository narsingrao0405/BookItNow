const Movie = require('../models/movieModel');

//GET 

const getAllMovies = async (req, res) => {
    try{
        const movies = await Movie.find();
        res.send({
            message: "All movies fetched successfully",
            status: true,
            data: movies
        })
    }
        catch(err){
            console.log(err);
            res.send({
                message: err.message,
                status: false,
                data: null
            })
        }
    
}

const getMovieById = async (req, res) => {
    const movieId = req.body.movieId;
    try{
        const movie = await Movie.findById(movieId);
        if(!movie){
            res.send({
                message: "Movie not found",
                status: false,
                data: null
            })
        }
        res.send({
            message: "Movie fetched successfully",
            status: true,
            data: movie
        })
    }catch(err){
        console.log(err);
        res.send({
            message: err.message,
            status: false,
            data: null
        })
    }

}
//POST
const addMovie = async (req, res)  => {
    try{
        const {name, language, duration, description, releaseDate, genre, rating, poster} = req.body;
        const newMovie = new Movie({
            name,
            language,
            duration,
            description,
            releaseDate,
            genre,
            rating,
            poster
        });
        await newMovie.save();
        res.send({
            message: "Movie added successfully",
            status: true,
            data: newMovie
        })
    }catch(err){
        console.log(err);
        res.send({
            message: err.message,
            status: false,
            data: null
        })
    }

}

const deleteMovie = async (req, res) => {
    try{
        const movieId = req.body.movieId;
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if(!deletedMovie){
            res.send(
                {
                    message: "Movie not found",
                    status: false,
                    data: null
                }
            )
        }
        res.send ({
            message: "Movie deleted successfully",
            status: true,
            data: deletedMovie
        })
    

    }catch(err){
        console.log(err);
        res.send({
            message: err.message,
            status: false,
            data: null
        })
    }


}

//PUT

const updateMovie = async (req, res) => {
    try{
        const movieId = req.body.movieId;
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {new: true});
        if(!updatedMovie){
            res.send({
                message: "Movie not found",
                status: false,
                data: null
            })
        }
        res.send({
            message: "Movie updated successfully",
            status: true,
            data: updatedMovie
        })
    }catch(err){
        console.log(err);
        res.send({
            message: err.message,
            status: false,
            data: null
        })
    }

}







module.exports = {addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie};
