const apikey = '36447299ddacde090baa52fb7cc8c1d8';

const getWeather = async (city)=>{
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
    .then((res)=> res.json())
    .then((json) =>{
        return json;
    })
}

export default getWeather;