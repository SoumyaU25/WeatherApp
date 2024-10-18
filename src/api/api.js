const apikey = '36447299ddacde090baa52fb7cc8c1d8';

const getWeather = async (city)=>{
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
    .then((res)=> res.json())
    .then((json) =>{
        return json;
    })
    .catch((error) => {
        console.error("Error fetching weather by city:", error);
    });
}

// Function to fetch weather by latitude and longitude (location-based)
const getWeatherByLocation = async (lat, lon) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
        .then((res) => res.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error("Error fetching weather by location:", error);
        });
}

export { getWeather, getWeatherByLocation };