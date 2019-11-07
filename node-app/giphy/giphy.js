const env = require("../config/env")
const axios = require("axios")

module.exports = function () {
    const giphy = {}

    giphy.search = async function (keyword) {

        const baseUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + env.GIPHY_API_KEY + "&limit=1&offset=0&rating=G&lang=en"
        const queryUrl = baseUrl + "&q=" + keyword

        const queryResult = await axios.get(queryUrl)
        const gifUrl = queryResult.data.data[0].images.original.url

        return gifUrl
    }

    return giphy
}