const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');

const API_KEY = "308403f59d5bc8dd6d1db88f04f281ac";

async function getWeather(city) {
    try {
        weatherCard.innerHTML = "<p>Loading...</p>";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherCard.innerHTML = `<p class = "placeholder">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const  { name } = data;
    const { temp, humidity} = data.main;
    const {description , icon} = data.weather[0];

    weatherCard.innerHTML = `
    <h2>${name}</h2>
    <p><strong>${temp}°C</strong></p>
    <p>${description}</p>
    <p>Humidity: ${humidity}%</p>
    `;
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();    
    if (city !== ""){
        getWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
           searchBtn.click();
        }
    });