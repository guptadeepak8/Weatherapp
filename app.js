const express = require("express")
const app = express();
const https =require("https");
const bodyParser =require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
})

// api id & url
app.post("/",function(req,res){
const cityName =req.body.cityName;
const query = cityName;
  const appID = "8ccb5b57e5959a1c0ec407951ceb3313"
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+appID+"&units=metric"

  https.get(url,function(response){
    
     //Using statusCode for getting type of error
     console.log(response.statusCode);
    
     // for rendering data to html file
     response.on("data",function(data){
      var weatherdata =JSON.parse(data)
      var temp =weatherdata.main.temp
      var icon =weatherdata.weather[0].icon
      var imageURL ="https://openweathermap.org/img/wn/"+ icon+"@2x.png"
      res.write("<h1>The temperature in "+query+" is "+ temp +" Celcius</h1>")
      res.write("<image src=" + imageURL+">")
      res.send();

    })
  })
  
})



app.listen(3000,function(){
  console.log("server is running ")
})


