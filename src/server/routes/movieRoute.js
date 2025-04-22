const movieRouter = require ('express').Router();
const { 
        addMovie, 
        getAllMovies, 
        getMovieById, 
        updateMovie, 
        deleteMovie
    } = require('../controllers/movieController');

//POST
movieRouter.post('/addMovie', addMovie);
movieRouter.post('/deleteMovie', deleteMovie);
//GET
movieRouter.get('/getAllMovies', getAllMovies);
movieRouter.get('/getMovie/:id', getMovieById);

//PUT
movieRouter.put('/updateMovie', updateMovie);

module.exports = movieRouter;
