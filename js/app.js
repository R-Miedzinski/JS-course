const form = document.querySelector(".change-location");

const card = document.querySelector(".card");
const details = document.querySelector(".details");

const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const forecast = new Forecast();

const updateUI = (data) => {
  // const cityDetails = data.cityDetails;
  // const weather = data.weather;
  // destructuring
  const { cityDetails, weather } = data; // variable names must be the same as object property name

  // details template

  details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
      <h5 class="my-3">${cityDetails.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weather.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
      </div>
    </div>
  `;

  // night/day img
  console.log(weather);
  let timeSrc = null;
  /*if (!weather.IsDayTime) {
    timeSrc = "icons/night.svg";
  } else {
    timeSrc = "icons/day.svg";
  }// its fine but teranry operator is prettier*/
  // const result = condition ? 'value 1' : 'value 2' -> ternary operator
  timeSrc = weather.IsDayTime ? "icons/day.svg" : "icons/night.svg";

  time.src = timeSrc;

  //weather icon
  icon.src = `icons/${weather.WeatherIcon}.svg`;

  // remove none display class
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

// const updateCity = async (city) => {
//   const cityDetails = await getCity(city);
//   const weather = await getWeather(cityDetails.Key);

//   return {
//     cityDetails,
//     weather,
//   }; // object shorthand notation
// };

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //getting city value

  const city = form.city.value.trim();
  console.log(city);
  form.reset();

  // send city to locale storage

  localStorage.setItem("city", city);

  //update ui with new city information

  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});

// setting weather after load

if (localStorage.getItem("city")) {
  const city = localStorage.getItem("city");
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
