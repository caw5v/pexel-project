// API key 563492ad6f91700001000001454c20d88af2459abf5037ee55de9795
const columnOne = document.querySelector(".column-one");
const columnTwo = document.querySelector(".column-two");
const columnThree = document.querySelector(".column-three");
const columnFour = document.querySelector(".column-four");
const colSelector = document.querySelectorAll(".col-selector");
const columnContainer = document.querySelector("#column-container");
const toggle = document.querySelector(".switch").firstElementChild;
const columns = document.querySelectorAll(".columns");

const searchFieldNav = document.querySelector(".nav-search");
const searchFieldHeading = document.querySelector(".heading-search");
const inputs = document.querySelectorAll("input");
const magnifyingGlass = document.querySelectorAll(".search-icon");

const authorContainer = document.querySelector(".author-container");
const plusIcon = document.querySelector(".plus");
const heartIcon = document.querySelector(".heart");
const checkmarkIcon = document.querySelector(".checkmark");
const closeWindowContainer = document.querySelector(".close-window-container");
const imageContainer = document.querySelector(".image-container");
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

let i = 1;
let j = 50;
let search = `landscape`;
let scrollTop = null;
let supportsPassive = false;
let photoArray = [];

window.onload = () => {
  loadDoc(i, search);
};

document.addEventListener("wheel", (e) => {
  if (Math.sign(e.deltaY) === 1) {
    ++j;
  }

  if (Math.sign(e.deltaY) === -1 && document.documentElement.scrollTop !== 0) {
    --j;
  }

  if (Math.sign(e.deltaY) === -1 && document.documentElement.scrollTop === 0) {
    j = 0;
  }
});

document.addEventListener("scroll", (e) => {
  const scrollPositionPercentage = (document.documentElement.offsetHeight - (document.documentElement.scrollTop + 1005)) / document.documentElement.offsetHeight;

  if (j === 260 || j === 261 || j === 262 || j === 263 || j === 264 || j === 265 || scrollPositionPercentage === 0) {
    j = 50;

    ++i;

    loadDoc(i, search);
  }
});

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    if (input.value && e.key === "Enter") {
      search = input.value.trim();

      i = 1;

      columnReload();

      loadDoc(i, search);
    }
  });
});

magnifyingGlass.forEach((glass) => {
  glass.addEventListener("click", (e) => {
    const magnifyingGlass = glass.parentElement.childNodes[1].value.trim();
    if (magnifyingGlass) {
      i = 1;

      search = magnifyingGlass;

      columnReload();

      loadDoc(i, search);
    }
  });
});

toggle.addEventListener("click", (e) => {
  toggleConditional();
});

closeWindowContainer.addEventListener("click", () => {
  document.querySelector("#image-preview-outside-container").style = "visibility: hidden";
  enableScroll();
  photoArray = [];
  console.log(photoArray);
});
