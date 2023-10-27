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


export function getDate(unix, timezone) {
    const date = new Date((unix + timezone) * 1000);
    const monthDay = date.getDate();
    const weekDay = WeekDays[date.getDay()];
    const year = date.getFullYear();

    return `${weekDay} ${monthDay}, ${year}`

}