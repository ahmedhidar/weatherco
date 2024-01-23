// today variables 
let todayName = document.getElementById("dayName");
let todayNumber = document.getElementById("todayDayNumber");
let todayMonth = document.getElementById("todayMonth");
let todayLocation = document.getElementById("city");
let todayTemp = document.getElementById("todayTemp");
let todayConditionImg = document.getElementById("todayTempPic");
let todayConditionText = document.getElementById("todayWeather");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");
let weatherData 

// next data

let nextDay = document.getElementsByClassName("nextDay");
let nextMaxTemp = document.getElementsByClassName("maxTemp");
let nextMinTemp = document.getElementsByClassName("minTemp");
let nextConditionImg = document.getElementsByClassName("next-condition-img");
let nextConditionText = document.getElementsByClassName("next-condition-text");

// search input 
let searchInput = document.getElementById("search");

// get data
async function getWeatherData(cityname) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cf743e22d4524a5a91e03502242001&q=${cityname}&days=7`);
    let weatherData = await weatherResponse.json();
    return weatherData
}


// display data

function displayTodayData (data) {
let todayDate = new Date()
todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
todayNumber.innerHTML = todayDate.getDate()
todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
todayLocation.innerHTML = data.location.name
todayTemp.innerHTML = data.current.temp_c
todayConditionImg.setAttribute("src",data.current.condition.icon)
todayConditionText.innerHTML = data.current.condition.text
humidity.innerHTML = data.current.humidity + "%"
wind.innerHTML = data.current.wind_kph + "km/h"
windDirection.innerHTML = data.current.wind_dir
}

function getNextData (data){
let forecastData = data.forecast.forecastday;
for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i+1].date)
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
    nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
    nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
    nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
    nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
}
console.log (forecastData)
}

async function startup(city="cairo") {
    let weatherData = await getWeatherData(city);
    if(!weatherData.error){
    displayTodayData(weatherData);
    getNextData(weatherData)}

}
startup()

searchInput.addEventListener("input",function(){
    startup(searchInput.value);
})