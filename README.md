
# Project Title

A brief description of what this project does and who it's for

## Tech Stack

**Client:** HTML, CSS, JavaScript, API

## Demo

Insert gif or link to demo

## Features

- Feature 1
- Feature 2
- Feature 3

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Project API
5 DAY FORECAST REQUEST
```
api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={{open-weather-api-key}}
```
5 day forecast is available at any location on the globe. It includes weather forecast data with 3-hour step.
| Field                    | Description                                                                                         | Data Type        | Sample Data                                               |
|--------------------------|-----------------------------------------------------------------------------------------------------|------------------|-----------------------------------------------------------|
| cod                      | Internal parameter                                                                                 | String           | "200"                                                     |
| message                  | Internal parameter                                                                                 | Number           | 0                                                         |
| cnt                      | A number of timestamps returned in the API response                                                  | Number           | 40                                                        |
| list (Array)                    | - `dt`: Time of data forecasted, unix, UTC                                                          | Number           | 1661871600                                                |
|                          | - `main`:                                                                                            | Object           | {"temp": 296.76, "feels_like": 296.98, ...}               |
|                          |   - `temp`: Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit             | Number           | 296.76                                                    |
|                          |   - `feels_like`: This temperature parameter accounts for the human perception of weather.        | Number           | 296.98                                                    |
|                          |                  Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit                         |                  |                                                           |
|                          |   - `temp_min`: Minimum temperature at the moment of calculation.                                     | Number           | 296.76                                                    |
|                          |                  This is minimal forecasted temperature (within large megalopolises and urban areas),|                  |                                                           |
|                          |                  use this parameter optionally.                                                    |                  |                                                           |
|                          |                  Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit                         |                  |                                                           |
|                          |   - `temp_max`: Maximum temperature at the moment of calculation.                                     | Number           | 297.87                                                    |
|                          |                  This is maximal forecasted temperature (within large megalopolises and urban areas),|                  |                                                           |
|                          |                  use this parameter optionally.                                                    |                  |                                                           |
|                          |                  Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit                         |                  |                                                           |
|                          |   - `pressure`: Atmospheric pressure on the sea level by default, hPa                                | Number           | 1015                                                      |
|                          |   - `sea_level`: Atmospheric pressure on the sea level, hPa                                          | Number           | 1015                                                      |
|                          |   - `grnd_level`: Atmospheric pressure on the ground level, hPa                                      | Number           | 933                                                       |
|                          |   - `humidity`: Humidity, %                                                                         | Number           | 69                                                        |
|                          |   - `temp_kf`: Internal parameter                                                                  | Number           | -1.11                                                     |
|                          | - `weather`:                                                                                         | Array of Objects | [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}] |
|                          |   - `id`: Weather condition id                                                                     | Number           | 500                                                       |
|                          |   - `main`: Group of weather parameters (Rain, Snow, Clouds etc.)                                    | String           | "Rain"                                                    |
|                          |   - `description`: Weather condition within the group.                                               | String           | "light rain"                                              |
|                          |                    Please find more [here](link). You can get the output in your language.            |                  |                                                           |
|                          |   - `icon`: Weather icon id                                                                        | String           | "10d"                                                     |
|                          | - `clouds`:                                                                                         | Object           | {"all": 100}                                              |
|                          |   - `all`: Cloudiness, %                                                                           | Number           | 100                                                       |
|                          | - `wind`:                                                                                           | Object           | {"speed": 0.62, "deg": 349, "gust": 1.18}                |
|                          |   - `speed`: Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour           | Number           | 0.62                                                      |
|                          |   - `deg`: Wind direction, degrees (meteorological)                                                 | Number           | 349                                                       |
|                          |   - `gust`: Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour              | Number           | 1.18                                                      |
|                          | - `visibility`: Average visibility, meters. The maximum value of the visibility is 10km             | Number           | 10000                                                     |
|                          | - `pop`: Probability of precipitation. The values of the parameter vary between 0 and 1,             | Number           | 0.32                                                      |
|                          |          where 0 is equal to 0%, 1 is equal to 100%                                                    |                                                           |
|                          | - `rain`:                                                                                           | Object           | {"3h": 0.26}                                              |
|                          |   - `3h`: Rain volume for the last 3 hours, mm. Please note that only mm as units of measurement are| Number           | 0.26                                                      |
|                          |          available for this parameter                                                               |                                                           |
|                          | - `snow`:                                                                                           | Object           | {"3h": 0.0}                                               |
|                          |   - `3h`: Snow volume for the last 3 hours. Please note that only mm as units of measurement are    | Number           | 0.0                                                       |
|                          |          available for this parameter                                                               |                                                           |
|                          | - `sys`:                                                                                            | Object           | {"pod": "d"}                                              |
|                          |   - `pod`: Part of the day (n - night, d - day)                                                     | String           | "d"                                                       |
|                          | - `dt_txt`: Time of data forecasted, ISO, UTC                                                       | String           | "2022-08-30 15:00:00"                                     |
| city                     | - `id`: City ID. Please note that built-in geocoder functionality has been deprecated. [Learn more](link)| Number           | 3163858                                                   |
|                          | - `name`: City name. Please note that built-in geocoder functionality has been deprecated. [Learn more](link)| String           | "Zocca"                                                   |
|                          | - `coord`:                                                                                          | Object           | {"lat": 44.34, "lon": 10.99}                               |
|                          |   - `lat`: Geo location, latitude                                                                   | Number           | 44.34                                                     |
|                          |   - `lon`: Geo location, longitude                                                                  | Number           | 10.99                                                     |
|                          | - `country`: Country code (GB, JP etc.). Please note that built-in geocoder functionality has been | String           | "IT"                                                      |
|                          |              deprecated. [Learn more](link)                                                         |                  |                                                           |
|                          | - `population`: City population                                                                     | Number           | 4593                                                      |
|                          | - `timezone`: Shift in seconds from UTC                                                             | Number           | 7200                                                      |
|                          | - `sunrise`: Sunrise time, Unix, UTC                                                                | Number           | 1661834187                                                |
|                          | - `sunset`: Sunset time, Unix, UTC                                                                  | Number           | 1661882248                                                |



## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Open with VSCode

```bash
  code .
```

Open with live server

```bash
  npm run start
```


## Authors
- [@codewithsadee](https://www.github.com/codewithsadee)
- [@NewmanAdesan](https://www.github.com/NewmanAdesan)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

For support, Join my [Patreon Comunity](https://www.patreon.com/codewithsadee/membership) or Subscribe My [YouTube Channel](https://youtube.com/@codewithsadee).