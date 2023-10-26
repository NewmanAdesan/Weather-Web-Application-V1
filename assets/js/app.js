/**
 * @license MIT
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 * @tutor & designer codewithsadee
 * @student newmanadesan <newmanadesan@gmail.com, https://github.com/NewmanAdesan>
 */


import {url, fetchDataFromServer} from "./api.js";


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
                if (locations===[]){
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
export function updateWeather(lat, lng) {



    /**
     * CHANGE CURRENT LOCATION BUTTON STYLE
     * 1) get the hash url of the browser (window.location.hash)
     * 2) if there is "current-location" add the disabled attribute to the current location button else remove the disabled attribute
     */
    const currentLocBtn = document.querySelector("[data-current-location]")
    if (window.location.hash.includes("current-location")) {
        currentLocBtn.setAttribute("data-current-location", "");
    } else {
        currentLocBtn.removeAttribute("data-current-location");
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
    


    /**
     * HIGHLIGHTS UI
     * 1) this would be in the callback of the current weather UI because we are going to use some data from the current weather api
     */
}