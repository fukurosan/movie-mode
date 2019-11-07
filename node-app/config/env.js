'use strict'

const env = {

  //Express
  EXPRESS_PORT: process.env.PORT || 8080,

  //Movie stuff
  MOVIE_GENRES: [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Superhero",
    "Thriller",
    "War",
    "Western"
  ],
  DB_QUERY_RESULT_LIMIT: 6,

  //Database
  MOVIE_DB_HOST: process.env.MOVIE_DB_HOST,
  MOVIE_DB_PORT: process.env.MOVIE_DB_PORT,
  MOVIE_DB_NAME: process.env.MOVIE_DB_NAME,
  MOVIE_DB_USERNAME: process.env.MOVIE_DB_USERNAME,
  MOVIE_DB_PASSWORD: process.env.MOVIE_DB_PASSWORD,

  //Giphy
  GIPHY_API_KEY: process.env.GIPHY_API_KEY

}

module.exports = env