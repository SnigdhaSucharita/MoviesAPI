const cors = require("cors");
const express = require('express');
const app = express();
const { getAllMovies, getMovieById } = require("./controllers/index.js");

app.use(cors());
app.use(express.json());

app.get("/movies", async (req, res) => {
  const movies = getAllMovies();
  res.json({movies});
});

app.get("/movies/details/:id", async(req, res) => {
  const movie = getMovieById(parseInt(req.params.id));
  res.json({movie});
});

module.exports = { app };


