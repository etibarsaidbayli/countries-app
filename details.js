const backWrapEnd = document.querySelector(".back");
let idsFacebook = document.querySelector(".lds-facebook");
detailsFetch();

function detailsFetch() {
  const url = new URL(location.href);

  if (url.searchParams.has("name")) {
    let name = url.searchParams.get("name");
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => response.json())
      .then((data) => {
        backWrapEnd.insertAdjacentHTML("afterend", detailsHtml(data[0]));
        idsFacebook.style.display = "none";
      });
  } else {
    location.href = "index.html";
  }
}

function detailsHtml(data) {
  if (!data.borders) {
    data.borders = `<span>No border</span>`;
  }
  if (!data.currencies) {
    data.currencies = `<span>no curruencies</span>`;
  }

  if (!data.languages) {
    data.languages = `<span>no languages</span>`;
  }

  let borders = data.borders.map((a) => `<span>${a}</span>`);

  let currencies = Object.keys(data.currencies).join(", ");
  let languages = Object.keys(data.languages).join(", ");
  return ` <div class="main-content">
    <div class="main-content__img">
        <img src="${data.flags.png}" alt="">
    </div>
    <div class="main-content__items">

        <div class="main-content__items_left">
            <h2 class="country-box__name_title details__name_title">${
              data.name.common
            }</h2>

            <p class="items">Native Name:<span>${data.name.official}</span></p>
            <p class="items">Population:<span>${data.population}</span></p>
            <p class="items">Region:<span>${data.region}</span></p>
            <p class="items">Sub Region :<span>${data.subregion}</span></p>
            <p class="items">Capital:<span>${data.capital}</span></p>
            <p class="items border-countries">Border Countries:${borders.join(
              ""
            )}</p>
        </div>
        <div class="main-content__items_right">
            <p class="items">Top Level Domain:</p>
            <p class="items">Curriencies:<span>${currencies}</span></p>
            <p class="items">Languages:<span>${languages}</span></p>
        </div>
    </div>
</div>`;
}

const darkModeBtn = document.querySelector(".dark-mode");
let darkModeTxt = document.getElementById("darkModeTxt");

const modePic = document.getElementById("modePic");

let html = document.getElementById("html");
let theme = false;

if (localStorage.getItem("dark-mode")) {
  darkMode();
} else if (localStorage.getItem("light-mode")) {
  lightMode();
}
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
