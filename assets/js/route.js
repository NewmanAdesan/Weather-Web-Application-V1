/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright codewithsadee 2023 All rights reserved
 * @tutor & designer codewithsadee
 * @re-built & re-written by newmanadesan
 * @coauthor newmanadesan <newmanadesan@gmail.com, https://github.com/NewmanAdesan>
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

import {Error404, updateWeather} from "./app.js"


window.addEventListener("load", ()=>{
    if (window.location.hash=="" || window.location.hash=="#") window.location.hash = "#/weather?lat=51.5073219&lon=-0.1276474";
    checkHash();
})

function checkHash(){
    const windowHash = window.location.hash;
    const regex1 = new RegExp("^#\/weather\\?lat=(.+)&lon=(.+)$")
    const regex2 = new RegExp("^#\/current-location$")

    if (regex1.test(windowHash)){
        const [_, lat, lon] = regex1.exec(windowHash);
        updateWeather(lat, lon);
    }

    else if (regex2.test(windowHash)){
        window.navigator.geolocation.getCurrentPosition(
            (res) => {
                const {latitude, longitude} = res.coords;
                updateWeather(latitude, longitude);
            },
            (err) => {
                Error404("geolocationError");
            }
        )
    }

    else Error404();
}