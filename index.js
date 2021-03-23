const searchForm = document.querySelector('.header__form');
const cityValue = document.querySelector('.header__form__input');
const cityName = document.querySelector('.header__output__container__top__left h2');
const cardBody = document.querySelector('.header__output__container');
const citiesListContainer = document.querySelector('.citiesContainer');
const errorListContainer = document.querySelector('.error');
const cardInfo = document.querySelector('.header__output');
const dayNightBg = document.querySelector('.header__container');
const dayNightSearchButton = document.querySelector('.header__form__submit');
// const dayNightListButton = document.querySelector('.citiesContainer__list__item:hover');
const footerYear = document.querySelector('.footer__year')
const today = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

//transform kelvin to celcium
const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}
const isDayTime = (icon) => {
    if (icon.includes('d')) { return true }
    else { return false }
}

//add date Now
yearFooter = () => {
  footerYear.innerHTML = `${today.getFullYear()}`
}

//add day or night background
const dayNightSwitch = () => {
  const hours = new Date().getHours()
  const isDayTime = hours > 7 && hours < 19
  if (isDayTime) {
    dayNightBg.style.backgroundImage = "url('img/day-bg.png')";
    dayNightSearchButton.style.backgroundImage = "url('img/search.png')";
    dayNightSearchButton.style.backgroundColor = "#90CAF9";
    // dayNightListButton.style.backgroundColor = "#90CAF9";
  }else{
    dayNightBg.style.backgroundImage = "url('img/night-bg.png')";
    dayNightSearchButton.style.backgroundImage = "url('img/search.png')";
    dayNightSearchButton.style.backgroundColor = "#2A344B";
    // dayNightListButton.style.backgroundColor = "#2A344B";
  }
}

//Add the city weather details to output
updateWeatherApp = (city) => {
    console.log(city);
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
    cityName.textContent = city.name;
    cardBody.innerHTML = `

    <div class="header__output__container">
      <div class="header__output__container__top">
        <div class="header__output__container__top__left">
          <div class="header__output__container__top__left__img">
            <img src="${iconSrc}" alt="" />
          </div>
          <div class="header__output__container__top__left__text">
            <h2>${spitOutCelcius(city.main.temp)}&deg;C</h2>
            <span>${city.weather[0].main}</span>
            <p>${city.weather[0].description}</p>
          </div>
        </div>
        <div class="header__output__container__top__right">
          <h2>${city.name}</h2>
          <div class="header__output__container__top__right__span">
                  <span>${today.getDate()}</span>
                  <span>${monthNames[today.getMonth()]}</span>
                  <span>${today.getFullYear()}</span>
                </div>
        </div>
      </div>

      <div class="header__output__container__bottom">
        <div class="header__output__container__bottom__left">
          <p>Min</p>
          <h2>${spitOutCelcius(city.main.temp_min)}&deg;C</h2>
        </div>
        <div class="header__output__container__bottom__right">
          <p>Max</p>
          <h2>${spitOutCelcius(city.main.temp_max)}&deg;C</h2>
        </div>
      </div>
  </div>
    `;
  
    cardInfo.classList.remove('d-none');
}

const myFunction = (city) => {
  console.log(city);
    requestCity(city)
        .then((data) => {
            updateWeatherApp(data);
            citiesListContainer.classList.add('d-none');
        })
        .catch((error) => { console.log(error) })  
}

//Get the list of cities
listCities = (data) => {
  const cities = data.list.map((el) => el.name )
  citiesListContainer.innerHTML = `
  <ul class="citiesContainer__list">
  ${cities.map(el => `<button class="citiesContainer__list__item" id="${el}" onclick="myFunction(this.id)">${el}</button>`).join("")}
  </ul>
  `
  errorListContainer.innerHTML = `
  <p>City not found, please try to change your search query</p>
  `
  if (cities.length) {
    citiesListContainer.classList.remove('d-none');
  }
  else {
    errorListContainer.classList.remove('d-none');
  }
}


//add an event listner to the form
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    searchForm.reset();

    requestCities(citySearched)
    .then((data) => {
      listCities(data);
    })
    .catch((error) => { 
      console.log("error", error)
      errorCities(error)
    })
})

cityValue.onfocus = inputFocus;
function inputFocus() {
  errorListContainer.classList.add('d-none');
}

//Questions
var acc = document.getElementsByClassName("main__accordion-block__item");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

dayNightSwitch();
yearFooter();