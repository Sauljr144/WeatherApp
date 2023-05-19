

// // Function to fetch data from Open Weather API
// function fetchWeather(url){
//     fetch(url)
//         .then(response => response.json())
//             .then(data => {
//                 // console.log(data);
//                 // console.log(data.name);
//                 getWeather(data);
//             })
// }

// // Function to display fetched data
// function getWeather(weatherData){
//     weatherArr =[];
//     weatherArr.push(weatherData);
//     console.log(weatherData);
//     place.innerText = weatherData.city.name;
//     currentTemp.innerHTML= `${parseInt(weatherData.list[0].main.temp)}°F`;
//     maxTemp.innerText = `${parseInt(weatherData.list[0].main.temp_max)}°F`;
//     minTemp.innerText = `${parseInt(weatherData.list[0].main.temp_min)}°F`;
//     feelsLike.innerText = `${parseInt(weatherData.list[0].main.feels_like)}°F`;
//     windStatus.innerText = `${parseInt(weatherData.list[0].wind.speed)}`;
//     humidity.innerText = `${parseInt(weatherData.list[0].main.humidity)}%`;
//     rain.innerText = `${parseInt(weatherData.list[0].pop)}%`;

// }

// Date and time function
function myTime(){
    let now = new Date();
    let currentDay = now.getDay();
    let hours = now.getHours();
    let mins = now.getMinutes();
    let m;
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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


export{myTime};