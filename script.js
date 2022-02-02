var ApiKey: "3cb947b3b8681f172b7e94554dd32b3a";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


var searchBtn = document.querySelector(".Search");


searchBtn.addEventListener("click",function() {
// alert("test");

fetch('https://api.github.com/repos/nodejs/node/issues?per_page=5', {
  // The browser fetches the resource from the remote server without first looking in the cache.
  // The browser will then update the cache with the downloaded resource.
  cache: 'reload',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });



});

