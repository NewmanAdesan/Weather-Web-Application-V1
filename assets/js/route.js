/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright codewithsadee 2023 All rights reserved
 * @tutor & designer codewithsadee
 * @re-built & re-written by newmanadesan
 * @coauthor newmanadesan <newmanadesan@gmail.com, https://github.com/NewmanAdesan>
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

import {updateWeather} from "./app.js"


window.addEventListener("load", ()=>{
    window.location.hash = "#/weather?lat=51.5073219&lng=-0.1276474"

    const [param, query] = window.location.hash.slice(1).split("?")
    const [latQuery, lngQuery] = query.split("&");
    updateWeather(latQuery.slice(4), lngQuery.slice(4))
})