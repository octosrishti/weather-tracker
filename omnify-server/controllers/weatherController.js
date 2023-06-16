const axios = require('axios')

const get_current_time = (allTime) =>{
    const currentTime = new Date().getTime()
    for(let i=0;i<allTime.length;i++){
        if(currentTime>=allTime[i])return i;
    }
}

const get_humidity = ( humidity, indx) =>{
    const current_humidity = humidity[indx];
    let max_humidity = -9999;
    let min_humidity = 9999;
    for(let i=0;i<humidity.length;i++){
        if(max_humidity<=humidity[i])max_humidity = humidity[i];
        if(min_humidity>=humidity[i])min_humidity = humidity[i];
    }

    return {current_humidity, max_humidity, min_humidity}
}


const get_temprature = ( temprature, indx) =>{
    const current_temprature= temprature[indx];
    let max_temprature = -9999;
    let min_temprature = 9999;
    for(let i=0;i<temprature.length;i++){
        if(max_temprature<=temprature[i])max_temprature = temprature[i];
        if(min_temprature>=temprature[i])min_temprature = temprature[i];
    }

    return {current_temprature, max_temprature, min_temprature}
}

const get_windspeed = ( windspeed, indx) =>{
    const current_windspeed = windspeed[indx];
    let max_windspeed = -9999;
    let min_windspeed = 9999;
    for(let i=0;i<windspeed.length;i++){
        if(max_windspeed<=windspeed[i])max_windspeed = windspeed[i];
        if(min_windspeed>=windspeed[i])min_windspeed = windspeed[i];
    }

    return {current_windspeed, max_windspeed,min_windspeed}
}
const getWeather=async (req, res)=>
{
    try{
        
        const {latitude, longitude} = req.body
        let forecast = {}
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,windspeed_10m&timeformat=unixtime&forecast_days=1`
        axios.get(url)
        .then(resp => {
            data = resp.data
            forecast.latitude = data.latitude
            forecast.longitude = data.longitude

            const indx = get_current_time(data.hourly.time)

            console.log(indx, data.hourly.relativehumidity_2m[indx])

            const {current_temprature, max_temprature, min_temprature} = get_temprature(data.hourly.temperature_2m, indx)
            console.log("working")
            forecast.current_temprature = current_temprature
            forecast.max_temprature = max_temprature
            forecast.min_temprature = min_temprature

            const {current_humidity, max_humidity, min_humidity} = get_humidity(data.hourly.relativehumidity_2m, indx)
            forecast.current_humidity = current_humidity
            forecast.max_humidity = max_humidity
            forecast.min_humidity = min_humidity

            const {current_windspeed, max_windspeed, min_windspeed} = get_windspeed(data.hourly.windspeed_10m, indx)
            forecast.current_windspeed = current_windspeed
            forecast.max_windspeed = max_windspeed
            forecast.min_windspeed = min_windspeed

            forecast.rain = data.hourly.rain[indx]

            console.log(forecast)

            return res.json(forecast)
        })
        .catch(err => {
            console.log(err)
            return res.json(forecast)
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}


module.exports={getWeather}

/*

{
    "latitude": 12.875,
    "longitude": 77.625,
    "generationtime_ms": 0.1800060272216797,
    "utc_offset_seconds": 0,
    "timezone": "GMT",
    "timezone_abbreviation": "GMT",
    "elevation": 885.0,
    "hourly_units": {
        "time": "unixtime",
        "temperature_2m": "°C",
        "relativehumidity_2m": "%",
        "apparent_temperature": "°C",
        "rain": "mm",
        "windspeed_10m": "km/h"
    },
    "hourly": {
        "time": [
            1686700800,
            1686704400,
            1686708000,
            1686711600,
            1686715200,
            1686718800,
            1686722400,
            1686726000,
            1686729600,
            1686733200,
            1686736800,
            1686740400,
            1686744000,
            1686747600,
            1686751200,
            1686754800,
            1686758400,
            1686762000,
            1686765600,
            1686769200,
            1686772800,
            1686776400,
            1686780000,
            1686783600
        ],
        "temperature_2m": [
            21.2,
            21.3,
            22.1,
            23.4,
            24.9,
            26.7,
            28.3,
            29.8,
            30.6,
            31.1,
            31.1,
            31.0,
            29.8,
            28.1,
            26.6,
            25.7,
            25.0,
            24.2,
            23.3,
            22.6,
            22.0,
            21.6,
            21.3,
            21.1
        ],
        "relativehumidity_2m": [
            94,
            94,
            91,
            83,
            74,
            65,
            58,
            52,
            47,
            44,
            43,
            43,
            47,
            54,
            59,
            66,
            69,
            75,
            82,
            85,
            88,
            91,
            93,
            94
        ],
        "apparent_temperature": [
            23.6,
            23.6,
            24.0,
            24.8,
            26.0,
            28.5,
            31.0,
            32.4,
            32.7,
            32.5,
            31.8,
            31.4,
            30.5,
            29.3,
            28.0,
            27.9,
            27.0,
            26.1,
            25.5,
            24.9,
            24.3,
            24.0,
            23.9,
            23.7
        ],
        "rain": [
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00
        ],
        "windspeed_10m": [
            10.6,
            11.2,
            15.0,
            17.7,
            18.4,
            18.8,
            17.0,
            17.6,
            16.9,
            16.4,
            15.4,
            13.9,
            12.8,
            11.2,
            10.1,
            7.2,
            9.4,
            11.3,
            11.3,
            10.9,
            10.5,
            9.8,
            8.8,
            8.8
        ]
    }
}

*/