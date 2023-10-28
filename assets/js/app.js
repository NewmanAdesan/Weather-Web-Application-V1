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
 * 1) Activated the loading icon when the search field changes.
 * 2) Implemented fetching of search box data from an API when the search field has a value.
 *       - Created a `fetchDataFromServer(api_url, callback)` function.
 *       - Designed a function to generate the API URL for search box data.
 *       - Utilized both functions to fetch and process the data.
 *       - Deactivated the loading icon when data is received.
 * 3) Dynamically rendered the search box UI using the fetched data.
 *       - Created a search-item UI for each location and appended it to the `data-search-list` element.
 *       - Added an onclick event to each search-item UI link for toggling the search bar.
 * 4) Introduced a timeout feature to delay data fetching on input change.
 *       - Created two variables, `searchTimeout` and `searchTimeoutDuration`, initialized to "null" and "500" respectively.
 *       - Cleared the `searchTimeout` on input change.
 *       - Encapsulated the search box fetching logic inside a timeout, assigning its ID to the `searchTimeout` variable.
 * 5) Handled edge cases when there is no value in the input field.
 *       - Deactivated the loading icon.
 *       - Set the search list UI to an inactive state.
 *       - Made the search box inactive.
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
                        <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" data-search-togglers></a>
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
 * @param {*} lon 
 */
export function updateWeather(lat, lon) {

    // make the loading icon visible
    const loadingIcon = document.querySelector("[data-loading-icon]");
    loadingIcon.classList.add("active");

    // in the case the error modal is visble, make it invisible
    const errorModalSection = document.querySelector("[data-error-modal]"); 
    errorModalSection.classList.remove("active");

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
     *
     * 1) Cleared the inner HTML of relevant section elements to prepare for updates.
     * 2) Implemented data retrieval for the current weather UI using the current-weather API.
     *      - Created the `currentWeather(lat, lon)` function to generate the API URL.
     *      - Utilized the `fetchDataFromServer` and `currentWeather` functions to fetch and process the necessary data.
     *      - Destructured the data required for display.
     * 3) Created the `currentWeatherUI` DOM element and dynamically rendered its content.
     *      - Utilized the `getDate(unix, timezone)` function to format time data from "1605182400" to "Thursday 16, Feb."
     *      - Employed the `reverseGeo(lat, lon)` function to obtain the corresponding city name.
     * 4) Appended the `currentWeatherUI` DOM element to the target element with the "data-current-weather" attribute.
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
         * 1) Integrated into the callback of the Current Weather UI for data synergy.
         * 2) Fetched air pollution data from the OpenWeather air pollution API.
         *      - Created the `airPollution(lat, lon)` function to generate the API URL.
         *      - Established the `aqiText` data structure to associate air quality index with tags and messages.
         *      - Designed the `getTime` function for time format conversion ('1605182400' to '6:30 AM').
         *      - Utilized the `airPollution` function to fetch and destructure necessary data.
         * 3)  Constructed the `HighlightsUI` DOM element and dynamically rendered its inner HTML.      
         *      - Leveraged the `aqiText` data structure for the Air Quality Badge.
         *      - Utilized the `getTime` function for sunrise and sunset times.
         * 4) Added the `HighlightsUI` to the DOM.
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
     * 1) Fetched data from the OpenWeather forecast API.
     *      - Created the `forecast(lat, lon)` function to generate the forecast URL.
     *      - Utilized the `forecast` function to fetch the data.
     *
     * 2) Destructured the necessary data, including the number of data points (cnt) and the list of weather information for each data point.
     *
     * 3) Dynamically rendered the Hourly Forecast UI.
     *      - Created the `HourlyForecastUI` DOM element.
     *      - For each weather information in the list, created a `temp-card` and `wind card`, and added them to the `HourlyForecastUI`.
     *      - Designed the `getHour(unix, timezone)` function to format the hour time from "1605182400" to "6 AM."
     *      - Utilized documentation to determine and apply wind direction rotation based on wind direction values.
     *      - Created the `mps_kmh(mps)` function to convert meters per second to kilometers per hour for the wind card.
     *
     */
    fetchDataFromServer(url.forecast(lat, lon), function(data){
        const {cnt: dataPoints, list:forecastList, city: {timezone}} = data;
        const dataPointsPerDay = dataPoints / 5;
        hourlyForecastSection.innerHTML = `
        <h2 class="title-2">Today at</h2>
        <div class="slider-container">
            <div class="slider-list" data-temp-list>
            </div>
            <div class="slider-list" data-wind-list>
            </div>
        </div>
        
        `
        for (let i=0; i<8; i++) {
            const {dt, main:{temp}, weather:[{description, icon}], wind:{speed, deg}} = forecastList[i];

            const tempCardUI = document.createElement("div");
            tempCardUI.classList.add("card", "card-sm", "slider-card");
            tempCardUI.innerHTML = `
                <p class="body-3">${module.getHour(dt, timezone)}</p>
                <img src="./assets/images/weather_icons/${icon}.png" width="48" height="48" loading="lazy" alt="${description}" title="${description}">
                <p class="body-3">${parseInt(temp)}&deg;</p>
            `;
            hourlyForecastSection.querySelector("[data-temp-list]").appendChild(tempCardUI);
            const windCardUI = document.createElement("div");
            windCardUI.classList.add("card", "card-sm", "slider-card");
            windCardUI.innerHTML = `
                <p class="body-3">${module.getHour(dt, timezone)}</p>
                <img src="./assets/images/weather_icons/direction.png" width="48" height="48" loading="lazy" alt="wind direction at ${deg} degrees" title="wind direction at ${deg} degrees" style="transform: rotate(${deg}deg)">
                <p class="body-3">${parseInt(module.mps_kmh(speed))}km/h</p> 
            `;
            hourlyForecastSection.querySelector("[data-wind-list]").appendChild(windCardUI);
        }
    
        /**
         * 5 DAY FORECAST UI
         *
         * 1) Designed the `forecastUI` DOM element to display the 5-day forecast.
         * 2) Created `cardUI` for each day to present weather information.
         *       - Divided the number of data points into 5 sets, averaging the temperature for each day.
         *       - Utilized the `getDate(unix, timezone)` function to format the date as "Friday 17, Feb."
         * 3) Added the `cardUI` elements to the `forecastUI` DOM element.
         * 4) Appended the `forecastUI` to the document for display.
         *
         *
         */
        forecastSection.innerHTML = `
            <h2 class="title-2">5 Days Forecast</h2>
            <div class="card card-lg forecast-card">
                <ul data-forecast-card-list>
                </ul>
            </div>
        
        `
        for (let i=0; i<dataPoints; i+=dataPointsPerDay) {
            // calculate average temp
            let AverageTemp = 0;
            for (let j=i; j<i+dataPointsPerDay; j++ ){
                AverageTemp += forecastList[j]["main"]["temp"];
            }
            AverageTemp = AverageTemp / dataPointsPerDay;

            // obtain date
            let [_, weekday, monthday, month] = /^(.+) (.+), (.+)$/.exec(module.getDate(forecastList[i]["dt"], timezone))

            // obtain weather icon & description
            const [{description, icon}] = forecastList[i].weather;

            // render ui for daily temperature
            const cardUI = document.createElement("li");
            cardUI.classList.add("card-item");
            cardUI.innerHTML = `
            <div class="wrapper">
                <img src="./assets/images/weather_icons/${icon}.png" width="36" height="36" alt="${description}" class="weather-icon" title="${description}" />
                <span>${parseInt(AverageTemp)}&deg;</span>
            </div>
            <p class="label-1">${monthday} ${month}</p>
            <p class="label-1">${weekday}</p>
            `
            forecastSection.querySelector("[data-forecast-card-list]").appendChild(cardUI);
        }

        /**
         * DATA LOADING ICON
         * 1) at the start of the update weather function, the loading icon will become visible
         * 2) in the last fetching operation of the update weather function, the loading icon will become invisible
         * 3) if there was an error fetching a data information (in the fetchDataFromServer function) the Error404(type) function is called with type = "fetchingError"
         * 3a) the Error Modal displays 404, "Error Occured When Fetching Data", reload button
         * 3b) on click of the reload button reloads the browser & make the error modal invisible.
         */
         loadingIcon.classList.remove("active");
    })

    /**
     * THE ERROR404 FUNCTION
     * 1) this function makes the Error Modal to be visible. it accept a parameter called `type`
     * 2) if type is "fetchingError" the Error Modal displays 404, "Error Occured When Fetching Data", reload button
     * 3) on click of the reload button reloads the browser & make the error modal invisible.
     * 
     * 
[FEATURE] Enhanced Data Loading Icon and Error404 Function

**Data Loading Icon:**

1. The loading icon becomes visible at the start of the "update weather" function.
2. The loading icon becomes invisible after the last fetching operation in the "update weather" function.
3. If there is an error when fetching data (in the `fetchDataFromServer` function), the `Error404(type)` function is invoked with `type` set to "fetchingError."
   - The Error Modal displays `404`, `Error Occurred When Fetching Data`, and a `Reload` button.
   - On clicking the reload button, the browser is reloaded, and the error modal is hidden.

**Error404 Function:**

1. The `Error404` function controls the visibility of the Error Modal and accepts an optional parameter called `type`.
2. When `type` is `fetchingError`, the Error Modal displays `404`, `Error Occurred When Fetching Data` and a reload button.
3. Clicking the reload button reloads the browser and hides the error modal.
4. When the `type` is `geolocationError` the Error Modal displays `404`, `Error Occurred when Fetching User Location` and a `Go Home` button
5. When the `type` is not specified, the Error Modal displays `404`, `Page not Found!` and a `Go Home` button. this is its default value.

This commit enhances the handling of the data loading icon and the error modal, providing a better user experience when data fetching errors occur.


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

    /**
     * FADE-IN FUNCTIONALITY
     */
}


export function Error404(type, payload) {
    
    const errorModalSection = document.querySelector("[data-error-modal]");    
    const errorModalMessage = errorModalSection.querySelector("[data-error-message]");
    const errorModalButton = errorModalSection.querySelector("[data-error-button]");
    const loadingIcon = document.querySelector("[data-loading-icon]");

    if (type == "fetchingError") {
        errorModalMessage.innerHTML = "Error Occured When Fetching Data";
        errorModalButton.innerHTML = "Reload";
        errorModalButton.addEventListener("click", () => location.reload());
    }

    if (type == "geolocationError") {
        errorModalMessage.innerHTML = "Error Occured When Fetching User's Location";
    }

    loadingIcon.classList.remove("active");
    errorModalSection.classList.add("active");

}