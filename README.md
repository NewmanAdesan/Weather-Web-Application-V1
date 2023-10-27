
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

## Project API Endpoints

<br><br>

CURRENT WEATHER REQUEST
```
https://api.openweathermap.org/data/2.5/weather?lat={LATITUDE}&lon={LONGITUDE}&units=metric&appid={API_KEY}
```
| Field                    | Description                                             | Data Type  | Sample Data                                  |
|--------------------------|---------------------------------------------------------|------------|----------------------------------------------|
| coord (object)           | - `lon`: Longitude of the location                      | Number     | 10.99                                        |
|                          | - `lat`: Latitude of the location                       | Number     | 44.34                                        |
| weather (array)          | - `id`: Weather condition ID                            | Number     | 501                                          |
|                          | - `main`: Main weather group                            | String     | "Rain"                                       |
|                          | - `description`: Weather condition description         | String     | "moderate rain"                             |
|                          | - `icon`: Weather icon identifier                       | String     | "10d"                                        |
| base                     | - `base`: Data source for weather information           | String     | "stations"                                  |
| main (object)            | - `temp`: Temperature in Kelvin                         | Number     | 298.48                                       |
|                          | - `feels_like`: "Feels like" temperature in Kelvin    | Number     | 298.74                                       |
|                          | - `temp_min`: Minimum temperature in Kelvin            | Number     | 297.56                                       |
|                          | - `temp_max`: Maximum temperature in Kelvin            | Number     | 300.05                                       |
|                          | - `pressure`: Atmospheric pressure at sea level in hPa| Number     | 1015                                         |
|                          | - `humidity`: Humidity percentage                      | Number     | 64                                           |
|                          | - `sea_level`: Atmospheric pressure at sea level in hPa| Number     | 1015                                         |
|                          | - `grnd_level`: Atmospheric pressure at ground level in| Number     | 933                                          |
|                          |   hPa                                                   |            |                                              |
| visibility               | - `visibility`: Visibility in meters                    | Number     | 10000                                        |
| wind (object)            | - `speed`: Wind speed in meters per second             | Number     | 0.62                                         |
|                          | - `deg`: Wind direction in degrees                      | Number     | 349                                          |
|                          | - `gust`: Wind gust speed in meters per second          | Number     | 1.18                                         |
| rain (object)            | - `1h`: Rainfall amount for the last 1 hour in mm      | Number     | 3.16                                         |
| clouds (object)          | - `all`: Cloud cover percentage                         | Number     | 100                                          |
| dt                       | - `dt`: Timestamp of the data point in Unix format      | Number     | 1661870592                                   |
| sys (object)             | - `type`: System type                                    | Number     | 2                                            |
|                          | - `id`: System identifier                               | Number     | 2075663                                      |
|                          | - `country`: Country code                               | String     | "IT"                                         |
|                          | - `sunrise`: Timestamp of sunrise in Unix format        | Number     | 1661834187                                   |
|                          | - `sunset`: Timestamp of sunset in Unix format          | Number     | 1661882248                                   |
| timezone                 | - `timezone`: Timezone offset in seconds from UTC       | Number     | 7200                                         |
| id                       | - `id`: Unique identifier for the location              | Number     | 3163858                                      |
| name                     | - `name`: Name of the location                          | String     | "Zocca"                                     |
| cod                      | - `cod`: HTTP response code                             | Number     | 200                                          |

<br><br>

5 DAY/ 3 Hour FORECAST REQUEST
```
https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={{open-weather-api-key}}
```
5 day forecast is available at any location on the globe. It includes weather forecast data with 3-hour step.

| Field           | Description                                             | Data Type  | Sample Data                                       |
|-----------------|---------------------------------------------------------|------------|---------------------------------------------------|
| cod             | The response code indicating the request's status      | String     | "200"                                             |
| message         | A message associated with the response code             | Number     | 0                                                 |
| cnt             | The total number of data points in the "list" array    | Number     | 40                                                |
| list            | An array of weather information in a 3-hour step for each day           | Array      | - (see below for daily weather data structure)     |
| city            | Information about the city where weather data is from  | Object     | - (see below for city data structure)              |

Each weather data entry in the "list" array has the following structure:

| Field                       | Description                                             | Data Type  | Sample Data                                  |
|-----------------------------|---------------------------------------------------------|------------|----------------------------------------------|
| dt                          | Timestamp of the data point in Unix format              | Number     | 1661871600                                   |
| main (object)               | - `temp`: Temperature in Kelvin                         | Number     | 296.76                                       |
|                             | - `feels_like`: "Feels like" temperature in Kelvin    | Number     | 296.98                                       |
|                             | - `temp_min`: Minimum temperature in Kelvin            | Number     | 296.76                                       |
|                             | - `temp_max`: Maximum temperature in Kelvin            | Number     | 297.87                                       |
|                             | - `pressure`: Atmospheric pressure at sea level in hPa| Number     | 1015                                         |
|                             | - `sea_level`: Atmospheric pressure at sea level in hPa| Number     | 1015                                         |
|                             | - `grnd_level`: Atmospheric pressure at ground level in| Number     | 933                                          |
|                             |   hPa                                                   |            |                                              |
|                             | - `humidity`: Humidity percentage                      | Number     | 69                                           |
|                             | - `temp_kf`: Temperature change within the last 3 hours| Number     | -1.11                                        |
| weather (array)             | - `weather_id`: Weather condition ID                    | Number     | 500                                          |
|                             | - `weather_main`: Main weather group                   | String     | "Rain"                                       |
|                             | - `weather_desc`: Weather condition description        | String     | "light rain"                                |
|                             | - `weather_icon`: Weather icon identifier              | String     | "10d"                                        |
| clouds (object)             | - `clouds_all`: Cloud cover percentage                  | Number     | 100                                          |
| wind (object)               | - `wind_speed`: Wind speed in meters per second         | Number     | 0.62                                         |
|                             | - `wind_deg`: Wind direction in degrees                 | Number     | 349                                          |
|                             | - `wind_gust`: Wind gust speed in meters per second      | Number     | 1.18                                         |
| rain (object)               | - `3h`: Rainfall amount for the last 3 hours in mm | Number     | 0.26                                         |
| sys (object)                | - `pod`: Part of the day ("d" for day, "n" for night)| String     | "d"                                          |



The City Object data structure has the following properties

| Field                       | Description                                             | Data Type  | Sample Data                                  |
|-----------------------------|---------------------------------------------------------|------------|----------------------------------------------|
| city (object)               | - `city_id`: Unique identifier for the city              | Number     | 3163858                                      |
|                             | - `city_name`: Name of the city                           | String     | "Zocca"                                     |
|                             | - `city_coord_lat`: Latitude of the city                  | Number     | 44.34                                        |
|                             | - `city_coord_lon`: Longitude of the city                 | Number     | 10.99                                        |
|                             | - `city_country`: Country code of the city                | String     | "IT"                                         |
|                             | - `city_population`: Population of the city                | Number     | 4593                                         |
|                             | - `city_timezone`: Timezone offset in seconds from UTC    | Number     | 7200                                         |
|                             | - `city_sunrise`: Timestamp of sunrise in Unix format      | Number     | 1661834187                                   |
|                             | - `city_sunset`: Timestamp of sunset in Unix format        | Number     | 1661882248                                   |

<br><br>

AIR POLLUTION REQUEST
```
http://api.openweathermap.org/data/2.5/air_pollution?lat={{LATITUDE}}&lon={{LONGITUDE}}&appid={{open-weather-api-key}}
```
Air Pollution API provides current, forecast and historical air pollution data for any coordinates on the globe.

Besides basic Air Quality Index, the API returns data about polluting gases, such as Carbon monoxide (CO), Nitrogen monoxide (NO), Nitrogen dioxide (NO2), Ozone (O3), Sulphur dioxide (SO2), Ammonia (NH3), and particulates (PM2.5 and PM10).

| Field                    | Description                                             | Data Type  | Sample Data                                  |
|--------------------------|---------------------------------------------------------|------------|----------------------------------------------|
| coord (array)            | - [0]: Latitude of the specified location               | Number     | 50                                           |
|                          | - [1]: Longitude of the specified location              | Number     | 50                                           |
| list (array)             | List of weather data for a specific date and time       | Array      |                                              |
|                          | - dt (Date and Time, Unix, UTC)                         | Number     | 1605182400                                   |
|                          | main (object)                                          |            |                                              |
|                          | - aqi (Air Quality Index)                               | Number     | 1 (Possible values: 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor) |
|                          | components (object)                                    |            |                                              |
|                          | - co (Concentration of CO)                             | Number     | 201.94053649902344                           |
|                          | - no (Concentration of NO)                             | Number     | 0.01877197064459324                          |
|                          | - no2 (Concentration of NO2)                           | Number     | 0.7711350917816162                           |
|                          | - o3 (Concentration of O3)                             | Number     | 68.66455078125                              |
|                          | - so2 (Concentration of SO2)                           | Number     | 0.6407499313354492                           |
|                          | - pm2_5 (Concentration of PM2.5)                       | Number     | 0.5                                          |
|                          | - pm10 (Concentration of PM10)                         | Number     | 0.540438711643219                           |
|                          | - nh3 (Concentration of NH3)                           | Number     | 0.12369127571582794                          |


<br></br>

DIRECT GEOCODING REQUEST
```
DIRECT GEOCODING
http://api.openweathermap.org/geo/1.0/direct?q={CITY_NAME}&limit={LIMIT}&appid={API_KEY}


REVERSE GEOCODING
http://api.openweathermap.org/geo/1.0/reverse?lat={LATITUDE}&lon={LONGITUDE}&limit=5&appid={API key}
```

Geocoding is the process of transformation of any location name into geographical coordinates, and the other way around (reverse geocoding).

If you use the limit parameter in the API call, you can cap how many locations with the same name will be seen in the API response.

The Direct Geocoding API and the Reverse Geocoding API returns a list of locations correponding to the seach query. each object in the list have the properties below

| Field                 | Description                                                             | Data Type  | Sample Data                                       |
|-----------------------|-------------------------------------------------------------------------|------------|---------------------------------------------------|
| name                  | Name of the found location                                              | String     | London                                            |
| local_names           | Localized names of the location in different languages                  | Object     | { "ms": "London", "gu": "લંડન", ... }           |
|                       | - [language code]: Name of the found location in a specific language    | String     | "ms": "London", "gu": "લંડન", ...              |
| lat                   | Latitude of the found location                                          | Number     | 51.5073219                                        |
| lon                   | Longitude of the found location                                         | Number     | -0.1276474                                       |
| country               | Country of the found location                                           | String     | GB (United Kingdom)                              |
| state (where available)| State or region of the found location (if available)                   | String     | England                                           |









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


## Authors (design, tutorial, code)
- [@codewithsadee](https://www.github.com/codewithsadee)

## Author (documentation)
- 



## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

For support, Join my [Patreon Comunity](https://www.patreon.com/codewithsadee/membership) or Subscribe My [YouTube Channel](https://youtube.com/@codewithsadee).