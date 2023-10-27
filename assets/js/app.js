/**
 * @license MIT
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 * @tutor & designer codewithsadee
 * @student newmanadesan <newmanadesan@gmail.com, https://github.com/NewmanAdesan>
 */


import {url, fetchDataFromServer} from "./api.js";
import * as module from "./module.js"


/**
 * Add Event Listeners to each DOM element in the List
 * @param {NodeList} elements a list of DOM elements
 * @param {String} eventType Browser Event Type e.g "click", "mouse-over"
 * @param {Function} callback Callback function
 */
function addEventOnElements (elements, eventType, callback) {
    for (let element of elements) element.addEventListener(eventType, callback);
}


/**
 * SEARCH REVEAL
 */
const searchBox = document.querySelector("[data-search-box]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchField = document.querySelector("[data-search-field]");
const searchInputBox = document.querySelector("[data-search-input]");
const searchResultList = document.querySelector("[data-search-list]");
const toggleSearch = () => {

    // make search box visible
    if (searchBox.classList.contains("active")) searchBox.classList.remove("active");
    else searchBox.classList.add("active");

    // make search field have no value
    searchField.value = "";

    // turn off searching icon
    searchInputBox.classList.remove("searching");

    // turn off visibility of search result list (this feature only affects desktop view)
    searchResultList.classList.remove("active");

    // make search result list have no item (this feature only affects desktop view)
    searchResultList.innerHTML = "";
}
addEventOnElements(searchTogglers, "click", toggleSearch);


/**
 * SEARCH INTEGRATION
 * 
 * 1) on search field change, loading icon becomes active
 * 2) search box data is fetch from an api if search field has a value
 * 2a) create a function fetchDataFromServer(api_url, callback)
 * 2b) create a function that returns the api url for search box data
 * 2c) use the two functions to fetch search box data
 * 2d) when data is received, set the loading icon inactive 
 * 3) render the seach box UI dynamically using the data fetched
 * 3a) create search-item UI for each location and append to the data-search-list element
 * 3b) on each search-item UI link place on click event which toggles the seach bar
 * 4) implement a timeout feature (when there is an input change, fetching does not happen until some miliseconds later)
 * 4a) create two variables searchTimeout & searchTimeoutDuration set to "null" & "500"
 * 4b) on input change, clear the searchTimeout
 * 4c) encapsulate the seach box fetching logic inside a timeout giving its ID to the searchTimeout variable
 * 5) deal with edge case when input change, there is no value in the input field.
 * 5a) the loading icon is set to inactive
 * 5b) the search list UI is set to inactive
 * 5c) the search box becomes inactive
 * 
 */
let searchTimeout = null;
let searchTimeoutDuration = 500;
searchField.addEventListener("input", function(e) {

    // clear search timeout
    clearTimeout(searchTimeout);

    // no value in search field
    if (!e.target.value){
        // set the searching icon to be invisible
        searchInputBox.classList.remove("searching");
        // clear the search result list
        searchResultList.innerHTML="";
        // set the search result list to be visible (for large screen)
        searchResultList.classList.remove("active");
    }

    if (e.target.value){
        // turn on the searching icon
        searchInputBox.classList.add("searching");
    
        // clear all items in the search result list
        searchResultList.innerHTML = "";

        // fetch data based on the search result
        searchTimeout = setTimeout(()=>{
            fetchDataFromServer(url.geo(searchField.value), function(locations){
                // turn off the searching icon
                searchInputBox.classList.remove("searching");

                // set search result list to be visible (large screen)
                searchResultList.classList.add("active");
    
                // dealing with the case of no result
                if (locations.length==0){
                    searchResultList.innerHTML = `
                        <li class="search-item">
                            <span class="m-icon">cancel</span>
                            <div>
                                <span class="title">No Results</span>
                            </div>
                        </li>
                    `
                    return;
                }
    
                // render search result item for each location
                for (const {name, state, country, lat, lon} of locations){
                    const searchResultItemUI = document.createElement("li")
                    searchResultItemUI.classList.add("search-item");
                    searchResultItemUI.innerHTML = `
                        <span class="m-icon">location_on</span>
                        <div>
                            <span class="title">${name}</span>
                            <span class="label-2 subtitle">${state}, ${country}</span>
                        </div>
                        <a href="#/weather?lat=${lat}&lng=${lon}" class="item-link has-state" data-search-togglers></a>
                    `
                    addEventOnElements(searchResultItemUI.querySelectorAll("[data-search-togglers]"), "click", toggleSearch);
                    searchResultList.appendChild(searchResultItemUI);
                }
            });
        }, searchTimeoutDuration)
    }
})
 





/**
 * 
 * @param {*} lat 
 * @param {*} lng 
 */
export function updateWeather(lat, lon) {



    /**
     * CHANGE CURRENT LOCATION BUTTON STYLE
     * 1) get the hash url of the browser (window.location.hash)
     * 2) if there is "current-location" add the disabled attribute to the current location button else remove the disabled attribute
     */
    const currentLocBtn = document.querySelector("[data-current-location]")
    if (window.location.hash.includes("current-location")) {
        currentLocBtn.setAttribute("disabled", "");
    } else {
        currentLocBtn.removeAttribute("disabled");
    };
    


    /**
     * CURRENT WEATHER UI
     * 1) get the section element of all the UI and set their inner html to nothing ("")
     * 2) fetch data using the current-weather api for the current weather UI 
     * 2a) create the function currentWeather(lat, lon) this returns the current-weather api url
     * 2b) fetch data using the fetchDataFromServer & currentWeather function 
     * 2c) destucture the data needed
     * 2d) create the currentWeatherUI dom element & dynamically render its inner html
     * 2e) during dynamic rendering utilize the function getDate(unix, timezome) to transform the time format "1605182400" to "Thursday 16, Feb"
     * 2f) during dynamic rendering utilize the function reverseGeo(lat, lon) to get the cityname corresponding to the position
     * 2g) append the currentWeatherUI dom element to the element with the attribute "data-current-weather"
     */
    let currentWeatherSection = document.querySelector("[data-current-weather]");
    let highlightSection = document.querySelector("[data-highlights]");
    let forecastSection = document.querySelector("[data-forecast]");
    let hourlyForecastSection = document.querySelector("[data-hourly-forecast]");

    currentWeatherSection.innerHTML = "";
    highlightSection.innerHTML = "";
    forecastSection.innerHTML = "";
    hourlyForecastSection.innerHTML = "";

    fetchDataFromServer(url.currentWeather(lat, lon), function(data){
        console.log(data);
        const {main, weather, dt, timezone, name:state, sys, visibility} = data;
        const {temp, feels_like, humidity, pressure} = main;
        const [{description, icon}] = weather;
        const {country, sunrise:sunriseUnix, sunset:sunsetUnix} = sys;


        const currentWeatherUI = document.createElement("div");
        currentWeatherUI.classList.add("card", "card-lg", "current-weather-card");
        currentWeatherUI.innerHTML = `
            <h2 class="title-2">Now</h2>
            <div class="wrapper">
                <p class="heading">${parseInt(temp)}&deg;<sup>c</sup></p>
                <img src="./assets/images/weather_icons/${icon}.png" width="64" height="64" alt="${description}" class="weather-icon">
            </div>
            <span class="body-3">${description}</span>
            <ul class="meta-list">
                <li class="meta-item">
                    <span class="m-icon">calendar_today</span>
                    <span class="title-3 meta-text">${module.getDate(dt, timezone)}</span>
                </li>
                <li class="meta-item">
                    <span class="m-icon">location_on</span>
                    <span class="title-3 meta-text">${state}, ${country}</span>
                </li>
            </ul>
        `
        currentWeatherSection.appendChild(currentWeatherUI);
    

        /**
         * HIGHLIGHTS UI
         * 1) this would be in the callback of the current weather UI because we are going to use some data from the current weather api
         * 2) fetch data using the openweather air pollution URL
         * 2a) create a function airPollution(lat, lon) that returns the URL
         * 2b) create a data structure "aqiText" that associates the air quality index (1-5) with a particular tag & message
         * 2c) create a funtion getTime that transforms time format from "1605182400" --> "6:30 AM"
         * 2d) utilize the airPollution funtion and destructure the needed data.
         * 3) create the HighlightsUI dom element & dynamically render its inner html
         * 3a) during render, utilize the aqiText data structure for the Air Quality Badge
         * 3b) during render, utilize the getTime function for the sunrise & sunset times
         * 3c) add the HighlightsUI to the dom.
         */
        fetchDataFromServer(url.airPollution(lat, lon), function(data){
            const {list: [{main:{aqi}, components}]} = data;
            const {pm2_5, so2, no2, o3} = components;

            const HighlightsUI = document.createElement("div");
            HighlightsUI.classList.add("card", "card-lg");
            HighlightsUI.innerHTML = `
                <h2 class="title-2">Todays Highlights</h2>
                <div class="highlights-list">
                    <div class="card card-sm highlights-card one">
                        <h3 class="title-3">Air Quality Index</h3>
                        <div class="wrapper">
                            <span class="m-icon">air</span>
                            <ul class="card-list" >
                                <li class="card-item">
                                    <p class="title-1">${pm2_5.toPrecision(3)}</p> 
                                    <p class="label-1">PM<sub>2.5</sub></p>
                                </li>
                                <li class="card-item">
                                    <p class="title-1">${so2.toPrecision(3)}</p> 
                                    <p class="label-1">SO<sub>2</sub></p>
                                </li>
                                <li class="card-item">
                                    <p class="title-1">${no2.toPrecision(3)}</p> 
                                    <p class="label-1">NO<sub>2</sub></p>
                                </li>
                                <li class="card-item">
                                    <p class="title-1">${o3.toPrecision(3)}</p> 
                                    <p class="label-1">O<sub>3</sub></p>
                            </li>
                            </ul>
                        </div>
                        <span class="badge aqi-${aqi} label-1" title="${module.aqiText[aqi].message}">${module.aqiText[aqi].tag}</span>
                    </div>
                    <div class="card card-sm highlights-card two">
                        <h3 class="title-3">Sunrise & Sunset</h3>
                        <div class="card-list">
                            <div class="card-item">
                                <span class="m-icon">clear_day</span>
                                <div>
                                    <p class="label-1">Sunrise</p>
                                    <p class="title-1">${module.getTime(sunriseUnix, timezone)}</p>
                                </div>
                            </div>
                            <div class="card-item">
                                <span class="m-icon">clear_night</span>
                                <div>
                                    <p class="label-1">Sunset</p>
                                    <p class="title-1">${module.getTime(sunsetUnix, timezone)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card card-sm highlights-card">
                        <h3 class="title-3">Humidity</h3>
                        <div class="wrapper">
                            <span class="m-icon">humidity_percentage</span>
                            <span class="title-1">${humidity}%</span>
                        </div>
                    </div>
                    <div class="card card-sm highlights-card">
                        <h3 class="title-3">Pressure</h3>
                        <div class="wrapper">
                            <span class="m-icon">airwave</span>
                            <span class="title-1">${pressure}hPa</span>
                        </div>
                    </div>
                    <div class="card card-sm highlights-card">
                        <h3 class="title-3">Visibility</h3>
                        <div class="wrapper">
                            <span class="m-icon">visibility</span>
                            <span class="title-1">${visibility/1000}km</span>
                        </div>
                    </div>
                    <div class="card card-sm highlights-card">
                        <h3 class="title-3">Feels Like</h3>
                        <div class="wrapper">
                            <span class="m-icon">thermostat</span>
                            <span class="title-1">${parseInt(feels_like)}&deg;c</span>
                        </div>
                    </div>
                </div>
            `
            highlightSection.appendChild(HighlightsUI);
        })

    })


    /**
     * HOURLY FORECAST UI
     * research in the documentation how this forecast UI works
     * 1) fetch data using the openweather forecast URL 
     * 1a) create a function forecast(lat, lon) that returns the forecast URL
     * 2) destructure the data needed; the number of data points(cnt) & the list of weather infor for each data point
     * 3) dynamically render the HoulyForecastUI
     * 3a) create the HoulyForecastUI dom element 
     * 3b) for each weather information in the list create a temp-card & wind card and add to the HoulyForecastUI
     * 3c) create a getHour(unix, timezone) that would transform the time format of the hour time from "1605182400" --> "6 AM"
     * 3d) for the wind-card research in the docu
     * 3d) for the wind-card research & use the value of the wind direction to rotate the direction.png in the right direction
     * 3e) for the wind-card create a mps_kmh(mps) that would convert metre per second to kilometer per hour
     */


    /**
     * 5 DAY FORECAST UI
     * this functionality will be placed after the forecst UI because we are using the same data
     * because this URL releases weather information for 5 days, in a 3 hour step which means 40 datapoints, which means 8 datapoints for each day
     * 1) Create the forecastUI dom element
     * 2) Create the cardUI for each day
     * 2a) divide the number of datapoints given into 5, for each set, the average temp will be the temperature for a day
     * 2b) utilize the getDate(unix, timezone) to obtain the data format "Friday 17, Feb"
     * 3) add the cardUI to the forecastUI dom element, add the forecastUI dom element to the dom
     */


    /**
     * DATA LOADING ICON
     * 1) at the start of the update weather function, the loading icon will become visible
     * 2) at the end of the update weather function, the loading icon will become invisible
     * 3) if there was an error fetching a data information (in the fetchDataFromServer function) the Error404(type, payload) function is called
     * 3a) the Error404 function is called with the type "fetchingError" and the payload {lat, lon}
     * 3b) in the fetchDataFromServer(apiURL, callback) function the lat & lon will be obtained from the apiURL for the purpose of serving it to the error function
     * 3b) the Error Modal shows 404, "Data Fetching Error", reload button
     * 3c) on click of the reload button calls the updateWeather(lat, lon) function once again with the lat & lon gotten from the apiURL
     * 3d) the loading icon will become invisible
     * 3e) the Error Modal will become visible
     */

    /**
     * THE ERROR404 FUNCTION
     * 1) this function has two parameters "type" and payload
     * 1a) for now it support three types "fetchingError", "pageNotFound" and "geolocationError". we would use a switch case to deal with each type
     * 1b) type "fetchingError" would have the payload {apiURL}, type "pageNotFound" & type "geolocationError" would have the payload {lat, lon}
     * 2) for type "fetchingError", 
     * 2a) the Error Modal element shows 404, "Data Fetching Error", "Reload" button
     * 2b) on click of the reload button; the Error Modal will become invisible & the updateWeather(lat, lon) function once again will be called with the lat & lon gotten from the apiURL
     * 2c) the loading icon will become invisible
     * 2d) the Error Modal will become invisible
     * 3) for type "pageNotFound",
     * 3a) the Error Modal element shows 404, "Page not found!", "Go Home" button
     * 3b) the loading icon will become invisible
     * 3c) the Error Modal will become invisible
     * 3d) on click of the "Go Home" button; the Error Modal will become invisible & the updatWeather(lat, lon) function will be called with the lat & lon gotten from the pay load
     * 4) for type "geolocationError",
     * 4a) the Error Modal element shows 404, "User Location Fetching Error", "Go Home" button
     * 4b) the loading icon will become invisible
     * 4c) the Error Modal will become invisible
     * 4d) on click of the "Go Home" button; the Error Modal will become invisible & the updatWeather(lat, lon) function will be called with the lat & lon gotten from the pay load
     * 
     */

    /**
     * SINGLE PAGE APPLICATION FUNCTIONALITY
     * 1) on window load event or on window hash change event, we are going to check the location hash of the browser & process it. this processing will be encapsulate in a function called "checkhash"
     * 2) on window load event, if there is not window location hash, we would set the hash to a default location "#/weather?lat=10.99&lon=44.34" (we will use london location sha)
     * 3) the chechHash function implementation
     * 3a) our application only support two type of hash "#/weather?lat={latitude}&lon={longitude}" & "#/current-location"
     * 3b) obtain the window hash location, and utilize the regular expression technique to deal with each type, 
     * 3bi) if the hash conform to "#/weather?lat={latitude}&lon={longitude}", extract out the latitude & longitude & call the updateWeather function
     * 3bii) if the hash conform to "#/current-location", get the geo-location of the user & call the updateWeather function with users location
     * 3biia) if user browser does not support geolocation call the Error404 function -- Error404("geolocationError", lat, lon)
     * 3biib) if there was an error fetching user geolocation call the Error404 function -- Error404("geolocationError", lat, lon)
     * 3biii) if the hash does not conform to any of the two, call the Error404 function -- Error404("pageNotFound", lat, lon)
     * 
     * 
     */
}