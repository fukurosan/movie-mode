const env = require("../config/env")
const { Pool } = require('pg');

const pgClientPool = new Pool({
    user: env.MOVIE_DB_USERNAME,
    host: env.MOVIE_DB_HOST,
    database: env.MOVIE_DB_NAME,
    password: env.MOVIE_DB_PASSWORD,
    port: env.MOVIE_DB_PORT
});

pgClientPool.on('error', () => console.log('Lost Connection to Movie Database'));

module.exports = function () {
    const db = {}

    db.search = async function (type, genre, fromYear, toYear, minRating) {

        //Base Query
        let query = `select 
            title.title_id as id, 
            title.title as title, 
            ratings.average_rating as rating, 
            title_basics.start_year as year, 
            title_basics.runtime_minutes as runtime
            from title 
            inner join ratings on ratings.title_id = title.title_id 
            inner join title_basics on title_basics.title_id = title.title_id 
            where title.region = 'US'
            and title_basics.runtime_minutes > 15
            `

        //Content Type
        if (type === "Movies") {
            query += `and title_basics.title_type = 'movie'
            `
        }
        else if (type === "Series") {
            query += `and title_basics.title_type = 'tvSeries'
            `
        }
        else {
            query += `and (title_basics.title_type = 'movie' or title_basics.title_type = 'tvSeries')
            `
        }

        //Genre
        genre.forEach(item => {
            query += `and genre like '%${item}%'
            `
        })

        //Time box
        query += `and title_basics.start_year > ${fromYear}
        `
        query += `and title_basics.start_year < ${toYear}
        `

        //Lowest Rating
        query += `and average_rating > ${minRating}
        `

        //Other Static Query Parameters
        query += `order by random() ASC
            limit ${env.DB_QUERY_RESULT_LIMIT}`

        let { rows } = await pgClientPool.query(query)


        /*        
        for debugging and testing without the database...
        const testResult = [
            {
                title: "Iron Man",
                year: "2008",
                rating: "7.4",
                id: "12345678910",
                runtime: "120",
                type: "movie"
            },
            {
                title: "Avatar",
                year: "2008",
                rating: "7.4",
                id: "12345678910",
                runtime: "120",
                type: "movie"
            },
            {
                title: "Spirited Away",
                year: "2008",
                rating: "7.4",
                id: "12345678910",
                runtime: "120",
                type: "movie"
            },
            {
                title: "Kung Fu Panda",
                year: "2008",
                rating: "7.4",
                id: "12345678910",
                runtime: "120",
                type: "movie"
            },
            {
                title: "Rocketman",
                year: "2008",
                rating: "7.4",
                id: "12345678910",
                runtime: "120",
                type: "movie"
            },
            {
                title: "Star Wars: Episode V - The Empire Strikes Back",
                year: "2008",
                rating: "7.4",
                id: "12345678910",
                runtime: "120",
                type: "movie"
            }
        ]

        return testResult */

        return rows
    }

    return db
}