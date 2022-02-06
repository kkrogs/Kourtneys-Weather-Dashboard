var state = "";




var searchBtn = document.querySelector(".Search");
var h1Text = document.querySelector(".h1Txt");


var formSubmitHandler = function (event) {
event.preventdefault();

var cityName = h1Text.value.trim();

if(cityName) {
getCityApi(cityName);

temp.textContent = '';



}



}











//Displays today's date
var today = moment();
$(".h1Txt").text(today.format("L"));


searchBtn.addEventListener("click",function() {
  //We want to fetch the city name and tie it to the weather.

var cityName = document.getElementById("inputId").value;
var ApiKey = "3cb947b3b8681f172b7e94554dd32b3a";
var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+",state,country&limit=5&appid="+ApiKey;


  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey}`)
    .then(response => response.json())
    .then (data => {
console.log(data);
//get the data object and display it on the screen
var temperature =  data.main.temp;
document.querySelector(".temp").innerHTML="Temperature: " + Math.round(((temperature-273.15)*1.8)+32) + " Degrees Fahrenheit";

//creating wind speed
var windSpd = data.wind.speed;
document.querySelector(".wind").innerHTML="Wind: " + windSpd +" per hour";

//creating humidity index
var humidityIndx = data.main.humidity;
document.querySelector(".humidity").innerHTML="Humidity: " + humidityIndx + " %";




//We need to get the lat and long from the return of data. With lat and long, we need to make another API column
//Create variables for lat and long

var Lat = data.coord.lat;
var Long = data.coord.lon;



fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${Lat}&lon=${Long}&exclude=current,minutely,hourly,alerts&appid=${ApiKey}`)
.then(response => response.json())
    .then (data => {
console.log(data);

var uvIndx = data.daily[0].uvi;
document.querySelector(".uvIndx").innerHTML="Current UV Index: " + uvIndx;

var date1 = data.daily[0].dt;
document.querySelector(".DateOne").innerHTML= moment(date1 * 1000).format("L");

// var iconcode = weather[0].icon;
// var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
// $('#wicon').attr('src', iconurl);

// var iconOnee = data.daily[0].weather[0].icon;
// document.querySelector(".icon").innerHTML= iconOnee;

var tempA = data.daily[0].temp.day;
document.querySelector(".tempA").innerHTML= "Temp:" + Math.round(((tempA-273.15)*1.8)+32) + " F";

var windA = data.daily[0].wind_speed;
document.querySelector(".windA").innerHTML= windA + "MPH";

var humid = data.daily[0].humidity;
document.querySelector(".humidA").innerHTML= humid + " %";



    });
});
    




});

