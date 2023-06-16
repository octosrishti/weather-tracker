const express=require('express')
const cors=require('cors')
const app=express()

const PORT=process.env.PORT||5000

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Routes
const weatherRoutes=require('./routes/weatherRoute')

app.use(weatherRoutes)


app.get('/', (req, res)=>
{
    res.send("Server for omplify assignment")
})

app.listen(PORT, ()=>{
    console.log("listening on port",PORT)
})