/**
 * @license MIT
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 * @tutor & designer codewithsadee
 * @student newmanadesan <newmanadesan@gmail.com, https://github.com/NewmanAdesan>
 */


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
const toggleSearch = () => searchBox.classList.toggle("active");
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
 * 
 */
const searchField = document.querySelector("[data-search-field]");
 





/**
 * 
 * @param {*} lat 
 * @param {*} lng 
 */
export function updateWeather(lat, lng) {

    /**
     * CHANGE CURRENT LOCATION BUTTON STYLE
     * 1) get the hash url of the browser (window.location.)
     */

}