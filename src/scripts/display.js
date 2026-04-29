import { weatherApi } from "./weatherApi.js"
import { Chart } from 'chart.js/auto'

const display = (() => {
    const content = document.querySelector(".content");
    const cardDiv = document.createElement("div");
    let chart = null
    
    cardDiv.setAttribute("class", "cardsDiv");
    
    const renderCards = async (place) => {
        let forecast = await weatherApi.getForecast(place);
        
        for(let i of forecast) {
            const card = document.createElement("card");
            card.setAttribute("class", "cardDiv");

            card.innerHTML = `
                <img src="${i.icon}">
                <p class="date">${new Date(i.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <h3 class="weather">${i.condition}</h3>
                <p class="minTemp">Min: ${i.mintemp}</p>
                <p class="maxTemp">Max: ${i.maxtemp}</p>
            `
            cardDiv.appendChild(card);
        }

        content.appendChild(cardDiv);
    }

    const renderInputs = () => {
        const inputsDiv = document.createElement("div");
        inputsDiv.setAttribute("class", "inputsDiv");
        inputsDiv.innerHTML = `
            <input class="input" placeholder="Your city">
            <button class="send">Submit</button>
        `
        content.appendChild(inputsDiv);
        document.querySelector(".send").addEventListener("click", () => {
            cardDiv.innerHTML = "";
            renderCards(document.querySelector(".input").value);
            renderChart(document.querySelector(".input").value);
        })
    }

    const renderChart = async (place) => {
        let forecast = await weatherApi.getForecast(place);
        let canvasDiv = document.querySelector(".canvasDiv");

        if(!canvasDiv) {
            canvasDiv = document.createElement("div");
            canvasDiv.setAttribute("class", "canvasDiv");
            canvasDiv.setAttribute("style", "position: relative; height: 40vh; width: 100%; max-width: 800px; min-width: 0; margin: 0 auto;");
            canvasDiv.innerHTML = `<canvas id="temperature"></canvas>`;
            content.appendChild(canvasDiv);
        }
    
        if(chart) {
            chart.destroy();
            chart = null;
        }
    
        chart = new Chart(document.querySelector("#temperature"), {
            type: "line",
            data: {
                labels: forecast[0].hour.map(hour => hour.time.slice(11, 16)),
                datasets: [{
                    label: "Temperature in Celsius",
                    data: forecast[0].hour.map(hour => hour.temp),
                    fill: true,
                    backgroundColor: 'rgba(72, 132, 163, 0.3)',
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.05
                }],
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            }
        })
    }

    return {
        renderInputs
    }
})()

export { display }