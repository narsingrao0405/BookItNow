const Movie = require('../models/movieModel');

//GET 

const getAllMovies = async (req, res) => {
    try{
        const movies = await Movie.find();
        res.send({
            message: "All movies fetched successfully",
            status: true,
            data: movies,
            statusCode: 200

        })
    }
        catch(err){
            console.log(err);
            res.send({
                message: err.message,
                status: false,
                data: null,
                statusCode: 500
            })
        }
    
}

const getMovieById = async (req, res) => {
    const movieId = req.params.id;
    //console.log("Movie ID::::::::::", movieId);
    //console.log("Movie ID from Body::::::::::", req.params);
    try{
        const movie = await Movie.findById(movieId);
        if(!movie){
            res.send({
                message: "Movie not found",
                status: false,
                data: null,
                statusCode: 404
            })
        }
        res.send({
            message: "Movie fetched successfully",
            status: true,
            data: movie,
            statusCode: 200
        })
    }catch(err){
        console.log(err);
        res.send({
            message: err.message,
            status: false,
            data: null,
            statusCode: 500
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
            data: newMovie,
            statusCode: 201
        })
    }catch(err){
        console.log(err);
        res.send({
            message: err.message,
            status: false,
            data: null,
            statusCode: 500
        })
    }

}

const deleteMovie = async (req, res) => {
    try{
        const movieId = req.params._id;
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if(!deletedMovie){
            res.send(
                {
                    message: "Movie not found",
                    status: false,
                    data: null,
                    statusCode: 404
                }
            )
        }
        res.send ({
            message: "Movie deleted successfully",
            status: true,
            data: deletedMovie,
            statusCode: 200
        })
    

    }catch(err){
        console.log(err);
        res.send({
            message: err.message,
            status: false,
            data: null,
            statusCode: 500
        })
    }


}

//PUT

const updateMovie = async (req, res) => {
    try{
        const movieId = req.body._id;
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {new: true});
        if(!updatedMovie){
            res.send({
                message: "Movie not found",
                status: false,
                data: null,
                statusCode: 404
            })
        }
        res.send({
            message: "Movie updated successfully",
            status: true,
            data: updatedMovie,
            statusCode: 200
        })
    }catch(err){
        console.log(err);
        res.send({
            message: err.message,
            status: false,
            data: null,
            statusCode: 500
        })
    }

}







module.exports = {addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie};
