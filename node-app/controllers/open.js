const env = require("../config/env")
const db = require("../database/db")()
const giphy = require("../giphy/giphy")()

exports.homePage = async (req, res, next) => {
  res.render('home', {
    page: "home",
    genres: env.MOVIE_GENRES
  })
}

exports.aboutPage = async (req, res, next) => {
  res.render('about', {
    page: "about"
  })
}

exports.search = async (req, res, next) => {

  const searchResult = await db.search(
    req.body.contentType,
    req.body.genre,
    req.body.fromYear,
    req.body.toYear,
    req.body.minimumRating
  )

  for(let i = 0; i < searchResult.length; i++) {
    const url = await giphy.search(searchResult[i].title)
    searchResult[i].giphyUrl = url
  }

  res.render('searchResult', {
    page: "searchResult",
    searchResult: searchResult
  })
}