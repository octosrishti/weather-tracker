const {getWeather}=require('../controllers/weatherController');
const express=require('express')
const router=express.Router()



router.post('/weather', getWeather)

module.exports=router
