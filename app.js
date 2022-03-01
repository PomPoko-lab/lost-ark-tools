const crystalRate = document.querySelector(".exchange-rate");
const mariPerPack = document.querySelector(".mari--unit-pack");
const mariPackPrice = document.querySelector(".mari--pack-price");

const mariResults = document.querySelector(".mari--result");

const marketPerPack = document.querySelector(".market--unit-pack");
const marketPackPrice = document.querySelector(".market--pack-price");

const marketResults = document.querySelector(".market--result");

let mariUnit = 0;
let mariPrice = 0;
let mariResult = 0;
let crystalsRate = crystalRate.value;

let marketUnit = 0;
let marketPrice = 0;
let marketResult = 0;

const updateResults = (element, result) => {
  element.textContent = result;
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
  updateResults(marketResults, marketResult);
});

marketPackPrice.addEventListener("input", (e) => {
  marketPrice = e.target.value;
  marketResult = calculateBundle(marketPrice, marketUnit);
  updateResults(marketResults, marketResult);
});
