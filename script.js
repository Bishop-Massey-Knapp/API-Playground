// DOG API
function getDog() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(data => {
      document.getElementById("dogOutput").innerHTML =
        `<img src="${data.message}" alt="Random Dog">`;
    })
    .catch(err => console.error(err));
}

// CAT API
function getCat() {
  fetch("https://api.thecatapi.com/v1/images/search")
    .then(res => res.json())
    .then(data => {
      document.getElementById("catOutput").innerHTML =
        `<img src="${data[0].url}" alt="Random Cat">`;
    })
    .catch(err => console.error(err));
}

// WEATHER API
function getWeather() {
  const city = document.getElementById("weatherCity").value || "New York";
  // Geocoding to get latitude/longitude for the city
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`)
    .then(res => res.json())
    .then(geoData => {
      if (!geoData.results || geoData.results.length === 0) {
        document.getElementById("weatherOutput").innerHTML = "City not found.";
        return;
      }
      const { latitude, longitude, name, country } = geoData.results[0];
      // Get current weather
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .then(res => res.json())
        .then(weatherData => {
          const weather = weatherData.current_weather;
          document.getElementById("weatherOutput").innerHTML =
            `<p>Location: ${name}, ${country}</p>
             <p>Temperature: ${weather.temperature}°C</p>
             <p>Weather: ${weather.weathercode}</p>
             <p>Powered by <a href="https://open-meteo.com/">Open-Meteo</a></p>`;
        });
    })
    .catch(err => {
      document.getElementById("weatherOutput").innerHTML = "Error fetching weather.";
      console.error(err);
    });
}

// CURRENCY API
function getCurrency() {
  const amount = document.getElementById("amount").value || 1;
  const from = document.getElementById("fromCurrency").value || "USD";
  const to = document.getElementById("toCurrency").value || "EUR";
  fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
    .then(res => res.json())
    .then(data => {
      if (!data.rates || !data.rates[to]) {
        document.getElementById("currencyOutput").innerHTML = "Conversion error.";
      } else {
        document.getElementById("currencyOutput").innerHTML =
          `<p>${amount} ${from} = ${data.rates[to]} ${to}</p>
           <p>Powered by <a href="https://www.frankfurter.app/">Frankfurter</a></p>`;
      }
    })
    .catch(err => {
      document.getElementById("currencyOutput").innerHTML = "Error fetching currency.";
      console.error(err);
    });
}

// GITHUB API
function getGitHub() {
  const username = document.getElementById("githubUser").value || "octocat";
  fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("githubOutput").innerHTML =
        `<p>Name: ${data.login}</p>
         <img src="${data.avatar_url}" alt="GitHub User" style="width:80%;">`;
    })
    .catch(err => console.error(err));
}

// CHUCK NORRIS JOKES
function getJoke() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then(res => res.json())
    .then(data => {
      document.getElementById("jokeOutput").innerHTML = `<p>${data.value}</p>`;
    })
    .catch(err => console.error(err));
}