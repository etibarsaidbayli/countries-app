const toggleFilter = document.querySelector(".filter__region");
const filterContent = document.querySelector(".filter__content");
const countriesWrapper = document.querySelector(".countries_wrapper");
const container = document.querySelector(".container");
const filterList = document.querySelectorAll(".filter-content__list");
const searchInput = document.getElementById("serachInput");
const headerTitle = document.querySelector(".header-title__title");
const darkModeBtn= document.querySelector('.dark-mode')
let darkModeTxt=document.getElementById('darkModeTxt')

toggleFilter.addEventListener("click", function () {
  filterContent.classList.toggle("toggleFilterContent");
});

fetchCountries();

function fetchCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      for (let i = 0; i < data.length; i++) {
        html += getShowCountries(data[i]);
      }
      countriesWrapper.insertAdjacentHTML("afterbegin", html);
      
    });
}

function getShowCountries(data) {
  return ` <a class="cntr-box-link" href="details.html?name=${data.name.common}">
    <div class="country-box">
        <div class="country-box__flag">
            <img src="${data.flags.png}" alt="">
        </div>
        <div class="country-box__items">
            <div class="country-box__name">
            <h2 class="country-box__name_title names">${data.name.common}</h2>
            </div>
            <p class="items">Population:<span>${data.population}</span></p>
            <p class="items">Regions:<span class='regionName'>${data.region}</span></p>
            <p class="items">Capital:<span>${data.capital}</span></p>

        </div>
    </div>
</a>`;
}

const regionName = document.getElementsByClassName("regionName");
filterList.forEach((element) => {
  element.addEventListener("click", function () {
    Array.from(regionName).forEach((elem) => {
      if (elem.innerText.includes(element.innerText)) {
        elem.parentElement.parentElement.parentElement.style.display = "block";
      } else {
        elem.parentElement.parentElement.parentElement.style.display = "none";
      }
    });
    searchInput.value = "";
  });
});

const names = document.getElementsByClassName("names");

searchInput.addEventListener("input", function () {
  Array.from(names).forEach((elem) => {
    if (
      elem.innerText.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      elem.parentElement.parentElement.parentElement.style.display = "block";
    } else {
      elem.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
});



darkModeBtn.addEventListener('click',getTransformMode)
let mode='light'
const modePic=document.getElementById('modePic')

function lightModeOn () {
  modePic.src='assets/img/icon-sun.svg'
  darkModeTxt.textContent='Light Mode'
}

function darkModeOn () {
  modePic.src='assets/img/sun light mode.svg'
  darkModeTxt.textContent='Dark Mode'
}


function getTransformMode () {
  document.body.classList.toggle('dark')
  document.querySelector('.search').classList.toggle('dark')
  document.querySelector('.filter').classList.toggle('dark')
  if(mode==="light") {
  
    lightModeOn  ()
    mode='dark'
  }
  else {
   
    darkModeOn   ()
    mode='light'
  }
}