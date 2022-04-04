const crystalRate = document.querySelector(".exchange-rate");
const mariPerPack = document.querySelector(".mari--unit-pack");
const mariPackPrice = document.querySelector(".mari--pack-price");

const mariResults = document.querySelector(".mari--result");

const marketPerPack = document.querySelector(".market--unit-pack");
const marketPackPrice = document.querySelector(".market--pack-price");

const marketResults = document.querySelector(".market--result");

const appMari = document.getElementById("mari-calc-app");
const appToDo = document.getElementById("todo-app");

const btnNavMari = document.getElementById("nav--mari");
const btnNavToDo = document.getElementById("nav--todo");

let mariUnit = 0;
let mariPrice = 0;
let mariResult = 0;
let crystalsRate = crystalRate.value;

let marketUnit = 0;
let marketPrice = 0;
let marketResult = 0;

const switchNav = function () {
  resetNav();
  this.id === "nav--mari" && appMari.classList.add("app--active");
  this.id === "nav--todo" && appToDo.classList.add("app--active");
  this.classList.add("btn--active");
};

const resetNav = function () {
  if (appMari.classList.contains("app--active")) {
    appMari.classList.remove("app--active");
    btnNavMari.classList.remove("btn--active");
  }
  if (appToDo.classList.contains("app--active")) {
    appToDo.classList.remove("app--active");
    btnNavToDo.classList.remove("btn--active");
  }
};

const updateResults = (element, result) => {
  element.textContent = +result + " g";
};

const calculateBundle = (price, quantity) => {
  return price / quantity;
};

const calculateCrystalsRate = () => {
  return crystalsRate / 95;
};

const calculateCrystalsBundle = () => {
  return calculateCrystalsRate() * mariResult;
};

mariPerPack.addEventListener("input", (e) => {
  mariUnit = e.target.value;
  mariResult = calculateBundle(mariPrice, mariUnit);
  mariResult = calculateCrystalsBundle();
  updateResults(mariResults, mariResult.toFixed(1));
});

mariPackPrice.addEventListener("input", (e) => {
  mariPrice = e.target.value;
  mariResult = calculateBundle(mariPrice, mariUnit);
  mariResult = calculateCrystalsBundle();
  updateResults(mariResults, mariResult.toFixed(1));
});

crystalRate.addEventListener("input", (e) => {
  crystalsRate = e.target.value;
  mariResult = calculateBundle(mariPrice, mariUnit);
  mariResult = calculateCrystalsBundle();
  updateResults(mariResults, mariResult.toFixed(1));
});

marketPerPack.addEventListener("input", (e) => {
  marketUnit = e.target.value;
  marketResult = calculateBundle(marketPrice, marketUnit);
  updateResults(marketResults, marketResult.toFixed(1));
});

marketPackPrice.addEventListener("input", (e) => {
  marketPrice = e.target.value;
  marketResult = calculateBundle(marketPrice, marketUnit);
  updateResults(marketResults, marketResult.toFixed(1));
});

btnNavToDo.addEventListener("click", switchNav);
btnNavMari.addEventListener("click", switchNav);
