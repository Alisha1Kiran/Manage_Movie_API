const expres = require('express');
const router = expres.Router();
const moviesList = require('./../moviesList');
const movieList = require('./../moviesList');

// Show all movies
router.get('/', (req, res) => {
    try {
        if (moviesList.length !== 0 || moviesList !== null) {
            res.status(200).json(moviesList)
        } else {
            res.status(200).json({ message: "No any movies in list" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Show movies by id
router.get('/:id', (req, res) => {
    try {
        const movieID = parseInt(req.params.id)
        const movie = moviesList.find(item => item.id === movieID)
        if (!movie) res.status(404).json({ error: "Movie not found" })
        res.status(200).json(movie)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// POST data
router.post('/', (req, res) => {
    try {
        console.log("req.body: ", req.body);
        if (!req.body) res.status(404).json({ message: "Movie details are required" });

        const { title, genre, releaseYear, rating } = req.body;
        const postData = {
            id: movieList.length ? movieList[movieList.length - 1].id + 1 : 1,
            title: title,
            genre: genre,
            releaseYear: releaseYear,
            rating: rating,
        }
        movieList.push(postData)
        res.status(201).json({
            message: "Movie added",
            movie: postData
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


// PATCH - update data
router.patch('/:id', (req, res) => {
    try {
        const movieID = parseInt(req.params.id)
        const movie = moviesList.find(item => item.id === movieID)
        console.log("MOVIE: ", movie);
        if (!movie) res.status(404).json({ error: "Movie not found" })

        const { title, genre, releaseYear, rating } = req.body;
        if (title) movie.title = title;
        if (genre) movie.genre = genre;
        if (releaseYear) movie.releaseYear = releaseYear;
        if (rating) movie.rating = rating;
        res.status(200).json(movie)
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({ error: error.message })
    }

})

// PATCH - update data
router.delete('/:id', (req, res) => {
    try {
        const movieID = parseInt(req.params.id)
        const movieIndex = moviesList.findIndex(item => item.id === movieID)
        if (movieIndex == -1) res.status(404).json({ error: "Movie not found" })
            const deletedMovie =  moviesList.splice(movieIndex,1)
        res.status(200).json({
            message: "Product deleted",
            product:deletedMovie
        })
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({ error: error.message })
    }

})




module.exports = router;