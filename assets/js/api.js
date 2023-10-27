/**
 * @license MIT
 * @fileoverview All api related stuff like api_key, api request etc.
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 * @tutor & designer codewithsadee
 * @student newmanadesan <newmanadesan@gmail.com, https://github.com/NewmanAdesan>
 */

/**
 * Fetches data from a specified URL and calls the specified callback function with the data received as its argument.
 * @param {string} apiURL api url to fetch data from
 * @param {Function} callback Callback Function to process fetched data
 */
function fetchDataFromServer(apiURL, callback){
    fetch(apiURL)
        .then(res => res.json())
        .then(data => callback(data))
}


const API_KEY = "6a9fbc7552e30ab38a9f548a29db1601";
const LIMIT = 5;
const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    },

    geo(querry) {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${querry}&limit=${LIMIT}&appid=${API_KEY}`
    }
}


export {fetchDataFromServer, url};