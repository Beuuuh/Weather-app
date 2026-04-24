import { weatherApi } from "./weatherApi.js"

const display = (() => {
    const content = document.querySelector(".content");
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "cardDiv");
    
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
        })
    }

    return {
        renderInputs
    }
})()

export { display }