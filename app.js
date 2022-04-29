// To Do

// Modal

const modalOverlay = document.querySelector(".new-char-overlay");
const modalOptionCharName = document.querySelector(".modal--char-name");
const modalOptionDonate = document.querySelector(".modal--guild-donate");
const modalOptionUnas = document.querySelector(".modal--unas");
const modalOptionChaosdg = document.querySelector(".modal--chaosdg");
const modalOptionGR = document.querySelector(".modal--gr");
const modalOptionAdv = document.querySelector(".modal--adv");
const modalOptionChaosG = document.querySelector(".modal--chaos-g");
const modalOptionBoss = document.querySelector(".modal--boss");
const modalOptionRapport = document.querySelector(".modal--rapport");
const modalOptionAnguish = document.querySelector(".modal--anguish");
const modalContainer = document.querySelector(".new-char-modal");
const btnModalNewCustom = document.querySelector("#btn--create-new");
let modalCustomNode = document.querySelectorAll(".modal--custom input");
const modalNode = document.querySelectorAll(".modal-item button");
const modalActive = document
  .querySelector(".new-char-modal")
  .getElementsByClassName("btn--active");

const modalBtnSubmit = document.querySelector(".btn--finish-modal");

const charList = [];
const currList = [];

// New List Creation Modal

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnAddNewChar = document.querySelector(".btn--add-new");

const resetCustomNode = function () {
  modalCustomNode = document.querySelectorAll(".modal--custom input");
};

const getModalValues = function () {
  const formatValue = function (str) {
    return str.replace(str.at(0), str.at(0)).toUpperCase().trim();
  };
  const charName = [
    formatValue(modalOptionCharName.value) ||
      formatValue(`NoName${charList.length + 1}`),
  ];

  modalNode.forEach((node, i) => {
    if (node.classList.contains("btn--active")) {
      if (node.textContent !== "") {
        charName.push(formatValue(node.textContent));
      } else {
        charName.push(formatValue(modalCustomNode[i - 9].value));
      }
    }
  });
  charList.push(charName);
};

// const resetModalValues = function () {
//   modalNode.forEach((node) => {
//     node.classList.remove("btn--active");
//     modalOptionCharName.value = "";
//     modalCustomNode.forEach((customNode) => {
//       customNode.value = "";
//     });
//   });
// };

const resetModalValues = function () {
  [...modalActive].forEach((node) => {
    node.classList.remove("btn--active");
    modalOptionCharName.value = "";
    modalCustomNode.forEach((customNode) => {
      customNode.value = "";
    });
  });
};

const closeModal = function () {
  resetModalValues();
  modalOverlay.classList.add("hide");
  body.classList.remove("hide-scroll");
};

const openModal = function () {
  modalOverlay.classList.remove("hide");
  body.classList.add("hide-scroll");
};

const createNewList = function () {
  getModalValues();
  closeModal();
};

const createNewCustomNode = function () {
  const newEl = document.createElement("div");
  newEl.classList.add("modal-item");
  newEl.innerHTML = `<button class="modal--custom"><input type="text" /></button>
`;
  btnModalNewCustom.before(newEl);

  resetCustomNode();
};

// Open and Close modal

btnModalNewCustom.addEventListener("click", createNewCustomNode);

btnCloseModal.addEventListener("click", closeModal);

btnAddNewChar.addEventListener("click", openModal);

// List creation from Modal

modalContainer.addEventListener("click", (e) => {
  if (!e.target.closest("button") || e.target.tagName.toLowerCase() === "input")
    return;
  e.target.classList.toggle("btn--active");
});

modalBtnSubmit.addEventListener("click", createNewList);

// Daily List

const charContainers = document.querySelector(".container--todo-chars");
const btnListCharName = document.querySelectorAll(".char-name-custom");
const btnCharDel = document.querySelectorAll(".btn-char-delete");
const body = document.querySelector("body");

charContainers.addEventListener("click", (e) => {
  e.target.classList.contains("char-name-custom") &&
    e.target.firstElementChild.classList.toggle("btn-char-delete-active");
});

// Mari Shop

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
  this.classList.add("nav-btn--active");
};

const resetNav = function () {
  if (appMari.classList.contains("app--active")) {
    appMari.classList.remove("app--active");
    btnNavMari.classList.remove("nav-btn--active");
  }
  if (appToDo.classList.contains("app--active")) {
    appToDo.classList.remove("app--active");
    btnNavToDo.classList.remove("nav-btn--active");
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
