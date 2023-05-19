import {myTime} from "./myFunctions.js";

// variables for API Url and Key
let url_pt1 = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let apikey = '&appid=2933f271f50addb4d8f02fd9ee1448c6';
let myCity = 'pleasanton';
let units = '&units=imperial';


// getting all the elements from our ids

// start of ids from side bar and arrays
let search = document.getElementById('search');
let currentImg = document.getElementById('currentImg');
let place = document.getElementById('place');
let currentTemp = document.getElementById('currentTemp');
let day = document.getElementById('day');
let time = document.getElementById('time');
let addBtn = document.getElementById('addBtn');
let clearBtn = document.getElementById('clearBtn');
let injectArea = document.getElementById('injectArea');
let weatherArr = [];
let favorites = [];
let searchedCity = '';

// start of ids from week and today's highlights
let day1Img = document.getElementById('day1Img');
let day1Temp = document.getElementById('day1Temp');
let day2Img = document.getElementById('day2Img');
let day2Temp = document.getElementById('day2Temp');
let day3Img = document.getElementById('day3Img');
let day3Temp = document.getElementById('day3Temp');
let day4Img = document.getElementById('day4Img');
let day4Temp = document.getElementById('day4Temp');
let day5Img = document.getElementById('day5Img');
let day5Temp = document.getElementById('day5Temp');
let maxTemp = document.getElementById('maxTemp');
let minTemp = document.getElementById('minTemp');
let feelsLike = document.getElementById('feelsLike');
let windStatus = document.getElementById('windStatus');
let humidity = document.getElementById('humidity');
let rain = document.getElementById('rain');


// Local Storage
let favoritesData = JSON.parse(localStorage.getItem('favorites'));
console.log(favoritesData)


// Event Listeners

// Search Bar
search.addEventListener('keypress', e =>{
    if(e.key == 'Enter'){
        fetchWeather(`${url_pt1}${search.value}${apikey}${units}`);
        place.innerText = search.value;
        searchedCity = search.value;
    }
})

// Add To Favorites
addBtn.addEventListener('click', e => {
    let object = {
        name: weatherArr[weatherArr.length-1].city.name,
        url: `${url_pt1}${searchedCity}${apikey}${units}`
    }

    favorites.push(object);

    let pTag = document.createElement('p');
        pTag.classList = 'text-center'
        pTag.innerText = search.value;
    pTag.addEventListener('click', e => {
        fetchWeather(object.url);
    })

    injectArea.appendChild(pTag);

    localStorage.setItem('favorites',JSON.stringify(favorites))
})

// Function to fetch data from Open Weather API
function fetchWeather(url){
    fetch(url)
        .then(response => response.json())
            .then(data => {
                // console.log(data);
                // console.log(data.name);
                getWeather(data);
            })
}

// Function to display fetched data
function getWeather(weatherData){
    weatherArr =[];
    weatherArr.push(weatherData);
    console.log(weatherData.city.name);
    place.innerText = weatherData.city.name;
    currentTemp.innerHTML= `${parseInt(weatherData.list[0].main.temp)}°F`;
    maxTemp.innerText = `${parseInt(weatherData.list[0].main.temp_max)}°F`;
    minTemp.innerText = `${parseInt(weatherData.list[0].main.temp_min)}°F`;
    feelsLike.innerText = `${parseInt(weatherData.list[0].main.feels_like)}°F`;
    windStatus.innerText = `${parseInt(weatherData.list[0].wind.speed)}`;
    humidity.innerText = `${parseInt(weatherData.list[0].main.humidity)}%`;
    rain.innerText = `${parseInt(weatherData.list[0].pop)}%`;

}


// Calling functions
// fetching the data using the api parameters
fetchWeather(`${url_pt1}${myCity}${apikey}${units}`); 
myTime();





