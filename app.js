'use strict';

// To Do

// Modal

const modalOverlay = document.querySelector('.new-char-overlay');
const modalOptionCharName = document.querySelector('.modal--char-name');
const modalOptionDonate = document.querySelector('.modal--guild-donate');
const modalOptionUnas = document.querySelector('.modal--unas');
const modalOptionChaosdg = document.querySelector('.modal--chaosdg');
const modalOptionGR = document.querySelector('.modal--gr');
const modalOptionAdv = document.querySelector('.modal--adv');
const modalOptionChaosG = document.querySelector('.modal--chaos-g');
const modalOptionBoss = document.querySelector('.modal--boss');
const modalOptionRapport = document.querySelector('.modal--rapport');
const modalOptionAnguish = document.querySelector('.modal--anguish');
const modalContainer = document.querySelector('.new-char-modal');
const btnModalNewCustom = document.querySelector('#btn--create-new');
let modalCustomNode = document.querySelectorAll('.modal--custom input');

const modalActive = document
  .querySelector('.new-char-modal')
  .getElementsByClassName('btn--active');

const modalBtnSubmit = document.querySelector('.btn--finish-modal');
const charContainers = document.querySelector('.container--todo-chars');
const btnListCharName = document.querySelectorAll('.char-name-custom');
const btnCharDel = document.querySelectorAll('.btn-char-delete');
const body = document.querySelector('body');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnAddNewChar = document.querySelector('.btn--add-new');
const btnReset = document.querySelector('.btn--reset');

let charList = [];

// Rewrite with OOP

class DailiesApp {
  customCounter = 0;
  creator = {};
  constructor() {
    this._getLocalStorage();
    btnModalNewCustom.addEventListener('click', this._addNewCustom.bind(this));
    btnCloseModal.addEventListener('click', this._closeModal.bind(this));
    btnAddNewChar.addEventListener('click', this._openModal);
    modalBtnSubmit.addEventListener('click', this._submitModal.bind(this));
    modalContainer.addEventListener(
      'click',
      this._toggleActiveModal.bind(this)
    );

    charList.forEach((char) => this._renderCharLists(char));

    charContainers.addEventListener('click', (e) => {
      this._toggleActiveDaily(e);
      this._deleteChar(e);
    });
    charContainers.addEventListener('click', function (e) {
      const btnChar = e.target.closest('.char-name-custom');
      const btnDel = e.target.closest('.btn-char-delete');
      if (!btnChar || btnDel) return;
      btnChar.firstElementChild.classList.toggle('btn-char-delete-active');
    });
    btnReset.addEventListener('click', this._resetAll.bind(this));
  }

  _deleteChar(e) {
    const btnDel = e.target.closest('.btn-char-delete');
    if (!btnDel) return;
    const getCharName = function (parentEl) {
      return parentEl.nextElementSibling.textContent;
    };
    const newList = charList.filter((char) => {
      return char.character !== getCharName(btnDel);
    });
    charList = newList;
    this._setLocalStorage();
    location.reload();
  }

  _formatValue(str) {
    if (!str) return '';
    if (str === 'guild-donate') str = `Guild Donation`;
    if (str === 'unas') str = `Una's Task`;
    if (str === 'chaosdg') str = `Chaos Dungeon`;
    if (str === 'gr') str = `Guardian Raid`;
    if (str === 'adv') str = `Adventure Island`;
    if (str === 'chaos-g') str = `Chaos Gate`;
    if (str === 'boss') str = `World Boss`;
    if (str === 'rapport') str = `Rapport`;
    if (str === 'anguish') str = `Anguish Isles`;

    str = str.trim();
    return str[0].toUpperCase() + str.slice(1);
  }

  _toggleActiveDaily(e) {
    if (!e.target.dataset.char) return;

    const charObj = charList.find((char) => {
      return char.character === e.target.dataset.char;
    });

    const daily = e.target.textContent;

    if (charObj[daily] === 'true') {
      e.target.classList.remove('daily-complete');
      charObj[daily] = 'false';
    } else {
      e.target.classList.add('daily-complete');
      charObj[daily] = 'true';
    }
    this._setLocalStorage();
  }

  _resetAll() {
    charList.forEach((char) => {
      Object.keys(char).forEach((key) => {
        if (char[key] === 'true') {
          char[key] = 'false';
        }
      });
    });
    this._setLocalStorage();
    location.reload();
  }

  _toggleActiveModal(e) {
    if (
      !e.target.closest('button') ||
      e.target
        .closest('.modal-item')
        .firstElementChild.classList.contains('btn--new') ||
      e.target.tagName.toLowerCase() === 'input' ||
      e.target.tagName.toLowerCase() === 'svg'
    )
      return;
    e.target.classList.toggle('btn--active');
    const obj = {};
    const value = e.target.value || e.target.lastElementChild.value;
    if (e.target.classList.contains('btn--active')) {
      this.creator[this._formatValue(value)] = 'false';
    } else {
      delete this.creator[value];
    }
  }

  _openModal() {
    modalOverlay.classList.remove('hide');
    body.classList.add('hide-scroll');
  }

  _closeModal() {
    this._resetModal();
    modalOverlay.classList.add('hide');
    body.classList.remove('hide-scroll');
  }

  _resetModal() {
    [...modalActive].forEach((node) => {
      node.classList.remove('btn--active');
      modalOptionCharName.value = '';
      modalCustomNode.forEach((customNode) => {
        customNode.value = '';
      });
    });
    this.customCounter = 0;
    this.creator = {};
    console.log(this.creator);
  }

  _addNewCustom() {
    if (this.customCounter > 4) return;
    const html = `
      <div class="modal-item">
      <button class="modal--custom"><input type="text" /></button>
      </div>
      `;
    btnModalNewCustom
      .closest('.modal-item')
      .insertAdjacentHTML('beforebegin', html);
    this.customCounter++;
  }

  _resetCustomNodes() {
    modalCustomNode = document.querySelectorAll('.modal--custom');
    modalCustomNode.forEach((node) => {
      node.remove();
    });
  }

  _getModalValues() {
    let charName = this._formatValue(modalOptionCharName.value);
    if (charName === '') charName = `NoName${charList.length + 1}`;
    this.creator.character = charName;
    charList.push(new List(this.creator));
  }

  _submitModal() {
    this._getModalValues();
    this._renderCharLists(this.creator);
    this._closeModal();
    this._setLocalStorage();
  }

  _renderCharLists(listObj) {
    let html = `
    <div class="character-daily-list">
    <div class="char-name-custom">
      <button class="btn-char-delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon-remove-daily"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <p>${listObj.character}</p>
    </div>
  `;

    // If object value is false, no highlight. If it's true, highlight value in DOM
    const checkActiveDaily = (val) => {
      if (val === 'false') return ' ';
      return ' daily-complete';
    };

    const getChar = (obj) => {
      return obj.character;
    };

    Object.entries(listObj).forEach(([key, value]) => {
      if (key === 'character') return;

      html += `<p data-char='${getChar(
        listObj
      )}' class="daily-item${checkActiveDaily(value)}">${key}</p>`;
    });

    //   const htmlLoop = `<p class="daily-item">2222</p>
    // <p class="daily-item">Guild Donation</p>
    // <p class="daily-item">Guild Donation</p>
    // <p class="daily-item">Guild Donation</p>
    // <p class="daily-item">Guild Donation</p>
    // <p class="daily-item">Guild Donation</p>
    // <p class="daily-item">Guild Donation</p>
    // <p class="daily-item">Guild Donation</p>
    // <p class="daily-item">Guild Donation</p>`;

    html += `
</div>`;

    charContainers.insertAdjacentHTML('afterbegin', html);
  }

  _getObjbyCharName(obj, charName) {}

  _setLocalStorage() {
    localStorage.setItem('chars', JSON.stringify(charList));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('chars'));
    if (!data) return;
    charList = data;
  }
}

class List {
  constructor(creatorObj) {
    Object.assign(this, creatorObj);
  }
}

const dailiesList = new DailiesApp();

// New List Creation Modal

// const btnCloseModal = document.querySelector(".btn--close-modal");
// const btnAddNewChar = document.querySelector(".btn--add-new");

// const resetCustomNodes = function () {
//   modalCustomNode = document.querySelectorAll(".modal--custom");
//   modalCustomNode.forEach((node) => {
//     node.remove();
//   });
// };

// const getModalValues = function () {
//   const formatValue = function (str) {
//     return str.replace(str.at(0), str.at(0)).toUpperCase().trim();
//   };
//   const charName = [
//     formatValue(modalOptionCharName.value) ||
//       formatValue(`NoName${charList.length + 1}`),
//   ];

//   modalNode.forEach((node, i) => {
//     if (node.classList.contains("btn--active")) {
//       if (node.textContent !== "") {
//         charName.push(formatValue(node.textContent));
//       } else {
//         charName.push(formatValue(modalCustomNode[i - 9].value));
//       }
//     }
//   });
//   charList.push(charName);
// };

// const resetModalValues = function () {
//   [...modalActive].forEach((node) => {
//     node.classList.remove("btn--active");
//     modalOptionCharName.value = "";
//     modalCustomNode.forEach((customNode) => {
//       customNode.value = "";
//     });
//   });
//   resetCustomNodes();
// };

// const closeModal = function () {
//   resetModalValues();
//   modalOverlay.classList.add("hide");
//   body.classList.remove("hide-scroll");
// };

// const openModal = function () {
//   modalOverlay.classList.remove("hide");
//   body.classList.add("hide-scroll");
// };

// const createNewList = function () {
//   getModalValues();
//   closeModal();
// };

// const createNewCustomNode = function () {
//   let counter = 0;
//   if (counter >= 4) return;
//   const html = `
//   <div class="modal-item">
//   <button class="modal--custom"><input type="text" /></button>
//   </div>
//   `;
//   btnModalNewCustom
//     .closest(".modal-item")
//     .insertAdjacentHTML("beforebegin", html);
//   counter++;
// };

// Open and Close modal

// btnModalNewCustom.addEventListener("click", createNewCustomNode);

// btnCloseModal.addEventListener("click", closeModal);

// btnAddNewChar.addEventListener("click", openModal);

// // List creation from Modal

// modalContainer.addEventListener("click", (e) => {
//   if (
//     !e.target.closest("button") ||
//     e.target.tagName.toLowerCase() === "input" ||
//     e.target.tagName.toLowerCase() === "svg"
//   )
//     return;
//   e.target.classList.toggle("btn--active");
// });

// modalBtnSubmit.addEventListener("click", createNewList);

// // Daily List

// const charContainers = document.querySelector(".container--todo-chars");
// const btnListCharName = document.querySelectorAll(".char-name-custom");
// const btnCharDel = document.querySelectorAll(".btn-char-delete");
// const body = document.querySelector("body");

// charContainers.addEventListener("click", (e) => {
//   e.target.classList.contains("char-name-custom") &&
//     e.target.firstElementChild.classList.toggle("btn-char-delete-active");
// });

// Mari Shop

const crystalRate = document.querySelector('.exchange-rate');
const mariPerPack = document.querySelector('.mari--unit-pack');
const mariPackPrice = document.querySelector('.mari--pack-price');

const mariResults = document.querySelector('.mari--result');

const marketPerPack = document.querySelector('.market--unit-pack');
const marketPackPrice = document.querySelector('.market--pack-price');

const marketResults = document.querySelector('.market--result');

const appMari = document.getElementById('mari-calc-app');
const appToDo = document.getElementById('todo-app');

const btnNavMari = document.getElementById('nav--mari');
const btnNavToDo = document.getElementById('nav--todo');

let mariUnit = 0;
let mariPrice = 0;
let mariResult = 0;
let crystalsRate = crystalRate.value;

let marketUnit = 0;
let marketPrice = 0;
let marketResult = 0;

const switchNav = function () {
  resetNav();
  this.id === 'nav--mari' && appMari.classList.add('app--active');
  this.id === 'nav--todo' && appToDo.classList.add('app--active');
  this.classList.add('nav-btn--active');
};

const resetNav = function () {
  if (appMari.classList.contains('app--active')) {
    appMari.classList.remove('app--active');
    btnNavMari.classList.remove('nav-btn--active');
  }
  if (appToDo.classList.contains('app--active')) {
    appToDo.classList.remove('app--active');
    btnNavToDo.classList.remove('nav-btn--active');
  }
};

const updateResults = (element, result) => {
  element.textContent = +result + ' g';
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

mariPerPack.addEventListener('input', (e) => {
  mariUnit = e.target.value;
  mariResult = calculateBundle(mariPrice, mariUnit);
  mariResult = calculateCrystalsBundle();
  updateResults(mariResults, mariResult.toFixed(1));
});

mariPackPrice.addEventListener('input', (e) => {
  mariPrice = e.target.value;
  mariResult = calculateBundle(mariPrice, mariUnit);
  mariResult = calculateCrystalsBundle();
  updateResults(mariResults, mariResult.toFixed(1));
});

crystalRate.addEventListener('input', (e) => {
  crystalsRate = e.target.value;
  mariResult = calculateBundle(mariPrice, mariUnit);
  mariResult = calculateCrystalsBundle();
  updateResults(mariResults, mariResult.toFixed(1));
});

marketPerPack.addEventListener('input', (e) => {
  marketUnit = e.target.value;
  marketResult = calculateBundle(marketPrice, marketUnit);
  updateResults(marketResults, marketResult.toFixed(1));
});

marketPackPrice.addEventListener('input', (e) => {
  marketPrice = e.target.value;
  marketResult = calculateBundle(marketPrice, marketUnit);
  updateResults(marketResults, marketResult.toFixed(1));
});

btnNavToDo.addEventListener('click', switchNav);
btnNavMari.addEventListener('click', switchNav);
