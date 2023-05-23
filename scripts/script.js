

// variables for API Url and Key
let url_pt1 = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let apikey = '&appid=2933f271f50addb4d8f02fd9ee1448c6';
let myCity = 'pleasanton';
let units = '&units=imperial';
let forecast = '&cnt=5';





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

let maxTemp = document.getElementById('maxTemp');
let minTemp = document.getElementById('minTemp');
let feelsLike = document.getElementById('feelsLike');
let windStatus = document.getElementById('windStatus');
let humidity = document.getElementById('humidity');
let rain = document.getElementById('rain');
let z = new Date()
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let shortdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


// Local Storage and displaying favorites on screen
let favoritesData = JSON.parse(localStorage.getItem('favorites'));
console.log(favoritesData)
if(favoritesData && favoritesData != null){

    favorites = favoritesData;

    for(let i = 0; i < favoritesData.length; i++){

        if(i === 0){
            
            let pTag = document.createElement('p');
            pTag.classList = 'text-center'
            pTag.innerText = favoritesData[i].name;
            pTag.addEventListener('click', e => {
            fetchWeather(favoritesData[i].url);
            })

            injectArea.appendChild(pTag);
        }
        else{
            let pTag = document.createElement('p');
            pTag.classList = 'text-center'
            pTag.innerText = favoritesData[i].name;
            pTag.addEventListener('click', e => {
            fetchWeather(favoritesData[i].url);
            })

            injectArea.appendChild(pTag);
        }       
    }
}


// Event Listeners

// Search Bar
search.addEventListener('keypress', e =>{
    if(e.key == 'Enter'){
        fetchWeather(`${url_pt1}${search.value}${apikey}${units}${forecast}`);
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

// Clear Btn
clearBtn.addEventListener('click', e => {
    for(let i = 0; i < favorites.length; i++){
        if(place.innerText.toLowerCase() === favorites[i].name.toLowerCase()){
            favorites.splice(i, 1);
            let item = injectArea.getElementsByClassName('text-center')[i];
            injectArea.removeChild(item);
        }
    }
    localStorage.setItem('favorites',JSON.stringify(favorites));
})


// Function to fetch data from Open Weather API
function fetchWeather(url){
    fetch(url)
        .then(response => response.json())
            .then(data => {
                console.log(data);
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
    let currentIconCode = weatherData.list[0].weather[0].icon;
    currentImg.src = `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
    rain.innerText = `${parseInt(weatherData.list[0].pop)}%`;
    fiveDayForcast(weatherData)
}

// Date and time function
function myTime(){
    let now = new Date();
    let currentDay = now.getDay();
    let hours = now.getHours();
    let mins = now.getMinutes();
    let m;
    let amPm = 'AM'
    day.innerText = days[currentDay];

    setInterval(() => {

        if(mins < 10){
            m = '0' + mins;
        }
        else{
            m = mins;
        }

        if(hours === 0){
            hours = 12;
        }
        
        if(hours > 12){
            hours = hours -12;
            amPm = 'PM'
        
        }
        time.innerText = `${hours}:${m} ${amPm}`;


    
    },1000);
}


// Gettin the day
function myDay(day){
    if(day + z.getDay() > 6){
        return day + z.getDay() - 7;
    }
    else{
        return day + z.getDay();
    }
}

// Forcast getting the Temperature, day and icon.
function fiveDayForcast(array){
    
    

    for(let i = 0; i < 5; i++){
        
       
        //Temps
        document.getElementById('dayTemp' + (i+1)).innerText= Number(array.list[i].main.temp).toFixed() + "F°";

        //Days
        document.getElementById("day" + (i+1)).innerHTML = shortdays[myDay(i)];

        //Url for the icons
        let iconCode = array.list[i].weather[0].icon;
        let iconsUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById("icon" + (i+1)).src = `${iconsUrl}`;
       
    }



}








// Calling functions
// fetching the data using the api parameters
fetchWeather(`${url_pt1}${myCity}${apikey}${units}${forecast}`); 
myTime();





