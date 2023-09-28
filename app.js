const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){
    console.log("srver started at port 3000");
})



app.get("/",function(req,res){

    res.sendFile(__dirname +"/index.html");
 
});

app.post("/",function(req,res){
    console.log(req.body.cityName);


    const query=req.body.cityName;
    const unit="metric";
    const apiKey="1ab5b9e6061e041f76f7f6f4eba2985d";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+ apiKey;

    https.get(url,function(response){
        console.log(response.statusCode);


        response.on("data",function(data){
            console.log(data);
            const weatherData=JSON.parse(data);
            const weatherTemp=weatherData.main.temp
            console.log(weatherTemp);
            const description=weatherData.weather[0].description
            const weathericon=weatherData.weather[0].icon
            const imageURL="https://openweathermap.org/img/wn/"+ weathericon+"@2x.png"
            res.write("<p><h2>The weather discription of today is: "+ description+"</p></h2>");
            res.write("<h1>The Temperature in "+ query + " is "+ weatherTemp+"degree celsius</h2>");
            res.write("<img src="+imageURL+">");
            res.send();



        })


    });
})
