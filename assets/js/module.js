/**
 * @license MIT
 * @fileoverview All module functions
 * @copyright codewithsadee 2023 All rights reserved
 * @tutor & designer codewithsadee
 * @re-built & re-written by newmanadesan
 * @coauthor newmanadesan <newmanadesan@gmail.com, https://github.com/NewmanAdesan>
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

const WeekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satursday"
]

const MonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]


/**
 * Converts DateTime format from Unix e.g "1661870592" to "Thur 17, Mar"
 * 
 * @param {number} dateunix Unix Date in seconds
 * @param {number} timezone Timezone offset in seconds from UTC 
 */
export function getDate(unix, timezone) {
    const date = new Date((unix + timezone) * 1000);
    const monthDay = date.getUTCDate();
    const weekDay = WeekDays[date.getUTCDay()];
    const year = MonthNames[date.getUTCMonth()];

    return `${weekDay} ${monthDay}, ${year}`
}

/**
 * Converts DateTime format from Unix e.g "1661870592" to "7:30 AM"
 * 
 * @param {number} dateunix Unix Date in seconds
 * @param {number} timezone Timezone offset in seconds from UTC 
 */
export function getTime(unix, timezone) {
    /**
     * obtain date object of argument
     * get the hour (0-12-23) convert to (12-12-12) (y = x%12==0? 12 : a%12)
     * get the minutes (0-59)
     * get the meridiem (0-12-23) convert to (AM or PM) (y = x/12<1 ? "AM" : "PM")
     * return formatted time `{hour}:{minutes} {meridiem}`
     */
    const date = new Date((unix + timezone) * 1000);
    const hour24 = date.getUTCHours();
    const hour12 = (hour24%12)==0 ? 12 : hour24%12;
    const minutes = date.getUTCMinutes();
    const minutesNew = (minutes/10)<1 ? '0'+minutes : minutes;
    const meridiem = (hour24/12)<1 ? "AM" : "PM";

    return `${hour12}:${minutesNew} ${meridiem}`;
}


/**
 * Converts DateTime format from Unix e.g "1661870592" to "7 AM"
 * 
 * @param {number} dateunix Unix Date in seconds
 * @param {number} timezone Timezone offset in seconds from UTC 
 */
export function getHour(unix, timezone){
    const date = new Date((unix + timezone) * 1000);
    const hour24 = date.getUTCHours();
    const hour12 = (hour24%12)==0 ? 12 : hour24%12;
    const meridiem = (hour24/12)<1 ? "AM" : "PM";
    return `${hour12} ${meridiem}`
}


export function mps_kmh(mps) {
    return (mps * 3600) / 1000;
}


export const aqiText = [
    {
        tag: "Good",
        message: "Air quality is considered satisfactory, and air pollution poses little or no risk."
    },
    {
        tag: "Fair",
        message: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusally sensitive to air pollution."
    },
    {
        tag: "Moderate",
        message: "Members of sensitive groups may experience health effects. The general public is not likely to be affected. "
    },
    {
        tag: "Poor",
        message: "Everyone may begin to experience health effects: members of sensitive groups may experience more serious health effects"
    },
    {
        tag: "Very Poor",
        message: "Health warnings of emergency conditions. The entire population is more likely to be affected."
    }
]