const toggleFilter = document.querySelector(".filter__region");
const filterContent = document.querySelector(".filter__content");
const countriesWrapper = document.querySelector(".countries_wrapper");
const container = document.querySelector(".container");
const filterList = document.querySelectorAll(".filter-content__list");
const searchInput = document.getElementById("serachInput");
const headerTitle = document.querySelector(".header-title__title");
const darkModeBtn = document.querySelector(".dark-mode");
let darkModeTxt = document.getElementById("darkModeTxt");
let idsFacebook = document.querySelector(".lds-facebook");

const modePic = document.getElementById("modePic");
let html = document.getElementById("html");

toggleFilter.addEventListener("click", function () {
  filterContent.classList.toggle("toggleFilterContent");
});

if (localStorage.getItem("dark-mode")) {
  darkMode();
} else if (localStorage.getItem("light-mode")) {
  lightMode();
}

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
      idsFacebook.style.display = "none";
    });
}

function getShowCountries(data) {
  return ` <a class="cntr-box-link" href="details.html?name=${
    data.name.common
  }">
    <div class="country-box">
        <div class="country-box__flag">
            <img src="${data.flags.png}" alt="">
        </div>
        <div class="country-box__items">
            <div class="country-box__name">
            <h2 class="country-box__name_title names">${
              data.name.common.length > 20
                ? data.name.common.slice(0, 20)
                : data.name.common
            }</h2>
            </div>
            <p class="items">Population:<span>${data.population}</span></p>
            <p class="items">Regions:<span class='regionName'>${
              data.region
            }</span></p>
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

let theme = false;

// darkModeBtn.addEventListener("click", function () {
//   if (!theme) {
//     lightMode();
//     theme = true;
//     localStorage.removeItem('dark-mode')

//   } else {
//     darkMode();
//     theme = false;
//     localStorage.removeItem('light-mode')

//   }
// });

darkModeBtn.addEventListener("click", function () {
  if (!theme) {
    darkMode();
    theme = true;
    localStorage.removeItem("light-mode");
  } else {
    lightMode();
    theme = false;
    localStorage.removeItem("dark-mode");
  }
});

function lightMode() {
  modePic.src = "assets/img/sun light mode.svg";
  html.setAttribute("data-theme", "light");
  darkModeTxt.textContent = "Light Mode ";
  localStorage.setItem("light-mode", "light");
}

function darkMode() {
  modePic.src = "assets/img/icon-moon.svg";
  html.setAttribute("data-theme", "dark");
  darkModeTxt.textContent = "Dark Mode";
  localStorage.setItem("dark-mode", "dark");
}
