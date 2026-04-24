const weatherApi = (() => {
    const getForecast = async (place) => {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=d9aa8c2a34bc420e8c1200502262304&q=${place}&days=5&aqi=no&alerts=yes`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            getIcons(data.forecast.forecastday);
        } catch (error) {
            console.error(error);
        }
    }

    const getIcons = (forecast) => {
        let weatherNames = [];
        
        for(let a of forecast) {
            weatherNames.push(a.day.condition.icon);
        }

        console.log(weatherNames);
    }

    return {
        getForecast,
    }
})()

export { weatherApi }