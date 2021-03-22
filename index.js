// const { listenerCount } = require("process");
const searchForm = document.querySelector('.header__form');
const cityValue = document.querySelector('.header__form__input');
const cityName = document.querySelector('.header__output__container__top__left h2');
const cardBody = document.querySelector('.header__output__container');
const sitiesListContainer = document.querySelector('.sitiesListContainer');
const errorListContainer = document.querySelector('.error');
//const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.header__output');

const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}
const isDayTime = (icon) => {
    if (icon.includes('d')) { return true }
    else { return false }
}
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
          <p></p>
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
    /*
    if (isDayTime(imageName)) {
        console.log('day');
        timeImage.setAttribute('src', 'img/day_image.svg');
        if (cityName.classList.contains('text-white')) {
            cityName.classList.remove('text-white');
        } else {
            cityName.classList.add('text-black');
        }

    } else {
        console.log('night');
        timeImage.setAttribute('src', 'img/night_image.svg');
        if (cityName.classList.contains('text-black')) {
            cityName.classList.remove('text-black');
        } else {
            cityName.classList.add('text-white');
        }

    }
*/
    cardInfo.classList.remove('d-none');
}
const myFunction = (city) => {
  console.log(city);
    requestCity(city)
        .then((data) => {
            updateWeatherApp(data);
            sitiesListContainer.classList.add('d-none');
        })
        .catch((error) => { console.log(error) })  
}

listCities = (data) => {
  const cities = data.list.map((el) => el.name )
  sitiesListContainer.innerHTML = `
  <ul class="sities-list">
  ${cities.map(el => `<button class="sities-item" id="${el}" onclick="myFunction(this.id)">${el}</button>`).join("")}
  </ul>
  `
  errorListContainer.innerHTML = `
  <p>City not found, please try to change your search query</p>
  `
  if (cities.length) {
    sitiesListContainer.classList.remove('d-none');
  }
  else {
    errorListContainer.classList.remove('d-none');
  }
}


//add an event listner to the form
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
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

//accordion
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