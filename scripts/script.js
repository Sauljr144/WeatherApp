// variables for API Url and Key
let url_pt1 = 'https://api.openweathermap.org/data/2.5/weather?q=';
let apikey = '&appid=2933f271f50addb4d8f02fd9ee1448c6';
let city = 'pleasanton';
let units = '&units=imperial';

// Function to fetch data from Open Weather API
function fetchWeather(url){
    fetch(url)
        .then(response => response.json())
            .then(data => {
                // console.log(data);
                // console.log(data.name);
                // getWeather(data);
            })
}

fetchWeather(`${url_pt1}${city}${apikey}${units}`);


