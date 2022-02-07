var state = "";

var searchBtn = document.querySelector(".Search");
var h1Text = document.querySelector(".h1Txt");
var cities = [5];
var cityNameIdx = 0;

//reads the cookie to reload the cityName array

// var formSubmitHandler = function (event) {
// event.preventdefault();

// console.log("formSubmitHandler");
// // var cityName = h1Text.value.trim();

// // if(cityName) {
// // getCityApi(cityName);

// // temp.textContent = '';


// // }

// };



//Displays today's date
// var today = moment();
// $(".h1Txt").text(today.format("L"));

//Making the names appear in the HTML
function renderCityNames() {
    // Clear todoList element and update todoCountSpan
    // cityList.innerHTML = "";
  
    // Render a new li for each todo
    // for (var i = 0; i < cities.length; i++) {
    //   var city = cities[i];
  
      // // var li = document.createElement("li");
      // // li.textContent = todo;
      // // li.setAttribute("data-index", i);
  
      // var button = document.createElement("button");
      // button.textContent = "Complete ✔️";
  
      // li.appendChild(button);
      // todoList.appendChild(li);

      if (cities.length > 0) {

        

      document.querySelector(".buttonA").innerHTML = cities[0];
      document.querySelector(".buttonB").innerHTML = cities[1];
      document.querySelector(".buttonC").innerHTML = cities[2];
      document.querySelector(".buttonD").innerHTML = cities[3];
      document.querySelector(".buttonE").innerHTML = cities[4];
      
      

    }
    
  };
  
  // cities[cityNameIdx++] = cityName;  

  // if (cityNameIdx > 4) {
  //   cityNameIdx = 0;
    
  // }
  
  // storedCities();

//retrieving the array from localStorage
  function init() {
    // Get stored cities from localStorage
    var storedCities = JSON.parse(localStorage.getItem("cities"));
  
    // If cities were retrieved from localStorage, update the cities array to it
    if (storedCities !== null) {
      cities = storedCities;
      console.log(cities);
    }
    console.log("init");
    // This is a helper function that will render cities to the DOM
    renderCityNames();
    
  }

  function storedCities() {
    // Stringify and set key in localStorage to cities array
    localStorage.setItem("cities", JSON.stringify(cities));
  }



searchBtn.addEventListener("click",function() {
  //We want to fetch the city name and tie it to the weather.

var cityName = document.getElementById("inputId").value;
var ApiKey = "3cb947b3b8681f172b7e94554dd32b3a";
console.log("addEventListener");
// var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+",state,country&limit=5&appid="+ApiKey;

//fetching the weather API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey}`)
    .then(response => response.json())
    .then (data => {
console.log(data);
console.log("fetch");


//Querying web data to grab time in UTC and then converting it to mm/dd/yyyy format
var dateMain = data.dt;
var dateMainCity = moment(dateMain * 1000).format("L");

//querying the text that is in the search field
document.querySelector(".h1Txt").innerHTML = cityName + " " + dateMainCity;
cityNameIdx = cities.length;

if (cityNameIdx >= 0 && cityNameIdx >= 5) {
  cities.splice(0, 5);
  cityNameIdx = 0;

  
}

//Read cityName to submit it with the form
cities[cityNameIdx++] = cityName;  

console.log(cities);

//stores to localStorage
storedCities();


// document.querySelector(".buttonA").innerHTML = cityName;

//putting cityName into local storage

 

// localStorage.setItem("cityName", JSON.stringify(cities));




// renderCityNames();

// localStorage.setItem('cityName', JSON.stringify(cityName));
// //retrieve the item from localStorage
// var retrievedCity = localStorage.getItem('cityName');

// //at this point just console logging it and will later try to add it to buttonA
// console.log('retrievedCity:', JSON.parse(retrievedCity));

//adding retrievedCity to the buttonA
// document.querySelector(".buttonA").innerHTML = retrievedCity.trim();
//not sure how to get rid of quotes from the button here******




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

var date1 = data.daily[1].dt;
document.querySelector(".DateOne").innerHTML= moment(date1 * 1000).format("L");

// var iconcode = weather[0].icon;
// var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
// $('#wicon').attr('src', iconurl);

// var iconOnee = data.daily[0].weather[0].icon;
// document.querySelector(".icon").innerHTML= iconOnee;





var tempA = data.daily[1].temp.day;
document.querySelector(".tempA").innerHTML= "Temp: " + Math.round(((tempA-273.15)*1.8)+32) + " F";

var windA = data.daily[1].wind_speed;
document.querySelector(".windA").innerHTML= "Wind: " + windA + "MPH";

var humid = data.daily[1].humidity;
document.querySelector(".humidA").innerHTML= "Humidity: " + humid + " %";


//2nd forecast panel
var dateB = data.daily[2].dt;
document.querySelector(".dateB").innerHTML= moment(dateB * 1000).format("L");

var tempB = data.daily[2].temp.day;
document.querySelector(".tempB").innerHTML= "Temp: " + Math.round(((tempB-273.15)*1.8)+32) + " F";

var windB = data.daily[2].wind_speed;
document.querySelector(".windB").innerHTML= "Wind: " + windB + "MPH";

var humidB = data.daily[2].humidity;
document.querySelector(".humidB").innerHTML= "Humidity: " + humidB + " %";

//3rd forecast panel

var dateC = data.daily[3].dt;
document.querySelector(".dateC").innerHTML= moment(dateC * 1000).format("L");

var tempC = data.daily[3].temp.day;
document.querySelector(".tempC").innerHTML= "Temp: " + Math.round(((tempC-273.15)*1.8)+32) + " F";

var windC = data.daily[3].wind_speed;
document.querySelector(".windC").innerHTML= "Wind: " + windC + "MPH";

var humidC = data.daily[3].humidity;
document.querySelector(".humidC").innerHTML= "Humidity: " + humidC + " %";

//4the forecast panel

var dateD = data.daily[4].dt;
document.querySelector(".dateD").innerHTML= moment(dateD * 1000).format("L");

var tempD = data.daily[4].temp.day;
document.querySelector(".tempD").innerHTML= "Temp: " + Math.round(((tempD-273.15)*1.8)+32) + " F";

var windD = data.daily[4].wind_speed;
document.querySelector(".windD").innerHTML= "Wind: " + windD + "MPH";

var humidD = data.daily[4].humidity;
document.querySelector(".humidD").innerHTML= "Humidity: " + humidD + " %";

//5th forecast panel

var dateE = data.daily[5].dt;
document.querySelector(".dateE").innerHTML= moment(dateE * 1000).format("L");

var tempE = data.daily[5].temp.day;
document.querySelector(".tempE").innerHTML= "Temp: " + Math.round(((tempE-273.15)*1.8)+32) + " F";

var windE = data.daily[5].wind_speed;
document.querySelector(".windE").innerHTML= "Wind: " + windE + "MPH";

var humidE = data.daily[5].humidity;
document.querySelector(".humidE").innerHTML= "Humidity: " + humidE + " %";


    });


});
    




});

init();
