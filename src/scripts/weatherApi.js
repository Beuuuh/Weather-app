const weatherApi = (() => {
    const getForecast = async (place) => {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=d9aa8c2a34bc420e8c1200502262304&q=${place}&days=5&aqi=no&alerts=yes`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.forecast.forecastday[1].day.maxtemp_c)
            return data.forecast.forecastday.map(day => ({
                date: day.date + "T00:00:00",
                condition: day.day.condition.text,
                icon: day.day.condition.icon,
                maxtemp: day.day.maxtemp_c,
                mintemp: day.day.mintemp_c,
            }))
        } catch (error) {
            console.error(error);
        }
    }

    return {
        getForecast,
    }
})()

export { weatherApi }