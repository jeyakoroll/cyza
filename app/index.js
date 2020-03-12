// Load application styles
import 'styles/index.scss';

function CyzaInit () {
  // this.regExpPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  // GET CONTROLS
  this.editMobilePen = document.querySelectorAll('.head_control-edit')[0];
  this.editDesktopPen = document.querySelectorAll('.option_data-saved')[0];
  this.saveDataButton = document.querySelectorAll('.controls_choice-save')[0];
  this.cancelSavingData = document.querySelectorAll('.controls_choice-cancel')[0];
  this.followersButton = document.querySelectorAll('.follow_button')[0];
  this.optionsHolder = document.querySelectorAll('.options_holder')[0];
  // GET INPUT VALUES
  this.inputFirstName = document.querySelectorAll('.name_input-first');
  this.inputLastName = document.querySelectorAll('.name_input-last');
  this.inputWebsite = document.querySelectorAll('.name_input-site');
  this.inputPhoneNumber = document.querySelectorAll('.name_input-phone');
  this.inputCityAndState = document.querySelectorAll('.name_input-city');
  // GET DATA VALUES
  this.firstNameNodes = document.querySelectorAll('.name-first'); 
  this.lastNameNodes = document.querySelectorAll('.name-last');
  this.websiteNode = document.querySelectorAll('.text-website');
  this.phonesNodes = document.querySelectorAll('.text-phone');
  this.addressNodes = document.querySelectorAll('.text-address');
  this.followersCount = document.querySelectorAll('.follow_count');
  this.addActiveNavBorder = document.querySelectorAll('.options_item-border');
  this.getActualOptionsData = document.querySelectorAll('.option_data-head');
  this.hideAllTooltips = document.querySelectorAll('.tooltip-elem');

  this.hideTooltips.bind(this);
  this.attachListeners.call(this);
}

// SWITCHING FUNCTIONS HERE
CyzaInit.prototype.turnOnEditMode = function () {
  document.querySelectorAll('.option_data-saved')[0].style.display = 'none';
  this.editMobilePen.style.display = 'none';

  this.inputFirstName[1].value = this.firstNameNodes[0].textContent;
  // [0] => Because we takes last name only ones... on mobile devices
  this.inputLastName[0].value = this.lastNameNodes[0].textContent;
  this.inputWebsite[1].value = this.websiteNode[0].textContent.trim();
  this.inputPhoneNumber[1].value = this.phonesNodes[0].textContent;
  this.inputCityAndState[1].value = this.addressNodes[0].textContent.trim();

  document.querySelectorAll('.option_data-changeable')[0].style.display = 'block';
  document.querySelectorAll('.head-controls_choice')[0].style.display = 'flex';
}

CyzaInit.prototype.cancelEditMode = function () {
  document.querySelectorAll('.option_data-changeable')[0].style.display = 'none';
  document.querySelectorAll('.head-controls_choice')[0].style.display = 'none';
  document.querySelectorAll('.option_data-saved')[0].style.display = 'block';
  this.editMobilePen.style.display = 'block';
}

CyzaInit.prototype.saveNewData = function () {
  for (let i = 0; i < 2; ++i) {
    this.firstNameNodes[i].textContent = this.inputFirstName[1].value !== '' ? this.inputFirstName[1].value : this.firstNameNodes[0].textContent;
    this.lastNameNodes[i].textContent = this.inputLastName[0].value !== '' ? this.inputLastName[0].value : this.lastNameNodes[0].textContent;
    this.phonesNodes[i].textContent = this.inputPhoneNumber[1].value !== '' ? this.inputPhoneNumber[1].value : this.phonesNodes[0].textContent;
    this.addressNodes[i].textContent = this.inputCityAndState[1].value !== '' ? this.inputCityAndState[1].value : this.addressNodes[0].textContent;
  }
  this.websiteNode[0].textContent = this.inputWebsite[1].value !== '' ? this.inputWebsite[1].value : this.websiteNode[0].textContent;
  this.cancelEditMode();
}

CyzaInit.prototype.upCountOfFollowers = function () {
  const numOfFullowers = parseInt(this.followersCount[0].textContent) + 1;
  this.followersCount[0].textContent = numOfFullowers;
}

CyzaInit.prototype.checkWhereActiveBorder = function (elem) {
  for (const node of this.addActiveNavBorder) {
    if (node.classList.contains('active-now')) {
      node.classList.remove('active-now');
      elem.classList.add('active-now');
    }
  }
}

CyzaInit.prototype.changeContentOfNavArea = function (title) {
  for (const node of this.getActualOptionsData) {
    if (node.children[0].textContent.toLowerCase() !== title) {
      node.parentElement.parentElement.classList.add('not-displayed');
    } else {
      node.parentElement.parentElement.classList.remove('not-displayed');
    }
  }
}

CyzaInit.prototype.checkOptionAndPutContent = function ({ target }) {
  switch (target.textContent.trim()) {
    case 'about':
      this.checkWhereActiveBorder(target.childNodes[1]);
      this.changeContentOfNavArea('about');
    break;
    case 'settings':
      this.checkWhereActiveBorder(target.childNodes[1]);
      this.changeContentOfNavArea('settings');
    break;
    case 'option1':
      this.checkWhereActiveBorder(target.childNodes[1]);
      this.changeContentOfNavArea('option1');
    break;
    case 'option2':
      this.checkWhereActiveBorder(target.childNodes[1]);
      this.changeContentOfNavArea('option2');
    break;
    case 'option3':
      this.checkWhereActiveBorder(target.childNodes[1]);
      this.changeContentOfNavArea('option3');
    break;
    default: return null;
  } 
}

CyzaInit.prototype.hideTooltips = function () { 
  for (const node of this.hideAllTooltips) {
    node.classList.remove('tooltip');
    node.classList.add('tooltip-hide');
  }
}

CyzaInit.prototype.removeTooltipsByCanceled = function ({ target }) {
  if (target.classList.contains('edit_buttons-item_cancel')) {
    this.hideTooltips();
  }
}

CyzaInit.prototype.saveDataFromTooltip = function ({ target }) {
  if (target.classList.contains('edit_buttons-item_save')) {
    for (let i = 0; i < 2; ++i) {
      this.firstNameNodes[i].textContent = 
        ( this.inputFirstName[0].value.split(' ')[0] !== '') ? 
        this.inputFirstName[0].value.split(' ')[0] : this.firstNameNodes[0].textContent;

      this.lastNameNodes[i].textContent = 
        ( this.inputFirstName[0].value.split(' ')[1] !== '') ? 
        this.inputFirstName[0].value.split(' ')[1] : this.lastNameNodes[0].textContent;

      this.phonesNodes[i].textContent = this.inputPhoneNumber[0].value !== '' ? this.inputPhoneNumber[0].value : this.phonesNodes[0].textContent;
      this.addressNodes[i].textContent = this.inputCityAndState[0].value !== '' ? this.inputCityAndState[0].value : this.addressNodes[0].textContent;
    }
    this.websiteNode[0].textContent = this.inputWebsite[0].value !== '' ? this.inputWebsite[0].value : this.websiteNode[0].textContent;

    this.hideTooltips();
  }
}

CyzaInit.prototype.openEditTooltip = function (ev) {
  const { target } = ev;

  if (target.classList.contains('edit-mode_button')) { 
    this.inputFirstName[0].value = `${this.firstNameNodes[0].textContent} ${this.lastNameNodes[0].textContent}`  ;
    this.inputWebsite[0].value = this.websiteNode[0].textContent.trim();
    this.inputPhoneNumber[0].value = this.phonesNodes[0].textContent;
    this.inputCityAndState[0].value = this.addressNodes[0].textContent.trim();

    this.hideTooltips();
    if (target.parentElement.tagName === 'H5') {
      target.parentElement.children[2].classList.remove('tooltip-hide');
      target.parentElement.children[2].classList.add('tooltip');
    }
    if (target.parentElement.tagName === 'DIV') {
      target.parentElement.children[3].classList.remove('tooltip-hide');
      target.parentElement.children[3].classList.add('tooltip');
    }
  } else if (target.classList.contains('edit-mode')) { 
    this.hideTooltips();
    if (target.parentElement.parentElement.tagName === 'H5') {
      target.parentElement.parentElement.children[2].classList.remove('tooltip-hide');
      target.parentElement.parentElement.children[2].classList.add('tooltip');
    }
    if (target.parentElement.parentElement.tagName === 'DIV') {
      target.parentElement.parentElement.children[3].classList.remove('tooltip-hide');
      target.parentElement.parentElement.children[3].classList.add('tooltip');
    }
  }
}

CyzaInit.prototype.attachListeners = function () {
  this.editDesktopPen.addEventListener('click', ev => this.openEditTooltip(ev) );
  this.editDesktopPen.addEventListener('click', this.saveDataFromTooltip.bind(this));
  this.editDesktopPen.addEventListener('click', this.removeTooltipsByCanceled.bind(this));
  this.editMobilePen.addEventListener('click', this.turnOnEditMode.bind(this));
  this.cancelSavingData.addEventListener('click', this.cancelEditMode.bind(this));
  this.saveDataButton.addEventListener('click', this.saveNewData.bind(this));
  this.followersButton.addEventListener('click', this.upCountOfFollowers.bind(this));
  this.optionsHolder.addEventListener('click', this.checkOptionAndPutContent.bind(this));
}

// SWITCHING LISTENERS HERE
document.addEventListener(
  'DOMContentLoaded', 
  function () { new CyzaInit() }
);
  
  

// Load application styles
import 'styles/index.scss';

function CyzaInit () {
  // this.regExpPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  // GET CONTROLS
  this.editMobilePen = document.querySelectorAll('.head_control-edit')[0];
  this.editDesktopPen = document.querySelectorAll('.option_data-saved')[0];
  this.saveDataButton = document.querySelectorAll('.controls_choice-save')[0];
  this.cancelSavingData = document.querySelectorAll('.controls_choice-cancel')[0];
  this.followersButton = document.querySelectorAll('.follow_button')[0];
  this.optionsHolder = document.querySelectorAll('.options_holder')[0];
  // GET INPUT VALUES
  this.inputFirstName = document.querySelectorAll('.name_input-first');
  this.inputLastName = document.querySelectorAll('.name_input-last');
  this.inputWebsite = document.querySelectorAll('.name_input-site');
  this.inputPhoneNumber = document.querySelectorAll('.name_input-phone');
  this.inputCityAndState = document.querySelectorAll('.name_input-city');
  // GET DATA VALUES
  this.firstNameNodes = document.querySelectorAll('.name-first'); 
  this.lastNameNodes = document.querySelectorAll('.name-last');
  this.websiteNode = document.querySelectorAll('.text-website');
  this.phonesNodes = document.querySelectorAll('.text-phone');
  this.addressNodes = document.querySelectorAll('.text-address');
  this.followersCount = document.querySelectorAll('.follow_count');
  this.addActiveNavBorder = document.querySelectorAll('.options_item-border');
  this.getActualOptionsData = document.querySelectorAll('.option_data-head');
  this.hideAllTooltips = document.querySelectorAll('.tooltip-elem');

  this.hideTooltips.bind(this);
  this.attachListeners.call(this);
}

// SWITCHING FUNCTIONS HERE
CyzaInit.prototype.turnOnEditMode = function () {
  document.querySelectorAll('.option_data-saved')[0].style.display = 'none';
  this.editMobilePen.style.display = 'none';

  this.inputFirstName[1].value = this.firstNameNodes[0].textContent;
  // [0] => Because we takes last name only ones... on mobile devices
  this.inputLastName[0].value = this.lastNameNodes[0].textContent;
  this.inputWebsite[1].value = this.websiteNode[0].textContent.trim();
  this.inputPhoneNumber[1].value = this.phonesNodes[0].textContent;
  this.inputCityAndState[1].value = this.addressNodes[0].textContent.trim();

  document.querySelectorAll('.option_data-changeable')[0].style.display = 'block';
  document.querySelectorAll('.head-controls_choice')[0].style.display = 'flex';
}

CyzaInit.prototype.cancelEditMode = function () {
  document.querySelectorAll('.option_data-changeable')[0].style.display = 'none';
  document.querySelectorAll('.head-controls_choice')[0].style.display = 'none';
  document.querySelectorAll('.option_data-saved')[0].style.display = 'block';
  this.editMobilePen.style.display = 'block';
}

CyzaInit.prototype.saveNewData = function () {
  for (let i = 0; i < 2; ++i) {
    this.firstNameNodes[i].textContent = this.inputFirstName[1].value !== '' ? this.inputFirstName[1].value : this.firstNameNodes[0].textContent;
    this.lastNameNodes[i].textContent = this.inputLastName[0].value !== '' ? this.inputLastName[0].value : this.lastNameNodes[0].textContent;
    this.phonesNodes[i].textContent = this.inputPhoneNumber[1].value !== '' ? this.inputPhoneNumber[1].value : this.phonesNodes[0].textContent;
    this.addressNodes[i].textContent = this.inputCityAndState[1].value !== '' ? this.inputCityAndState[1].value : this.addressNodes[0].textContent;
  }
  this.websiteNode[0].textContent = this.inputWebsite[1].value !== '' ? this.inputWebsite[1].value : this.websiteNode[0].textContent;
  this.cancelEditMode();
}

CyzaInit.prototype.upCountOfFollowers = function () {
  const numOfFullowers = parseInt(this.followersCount[0].textContent) + 1;
  this.followersCount[0].textContent = numOfFullowers;
}

CyzaInit.prototype.checkWhereActiveBorder = function (elem) {
  for (const node of this.addActiveNavBorder) {
    if (node.classList.contains('active-now')) {
      node.classList.remove('active-now');
      elem.classList.add('active-now');
    }
  }
}

CyzaInit.prototype.changeContentOfNavArea = function (title) {
  for (const node of this.getActualOptionsData) {
    if (node.children[0].textContent.toLowerCase() !== title) {
      node.parentElement.parentElement.classList.add('not-displayed');
    } else {
      node.parentElement.parentElement.classList.remove('not-displayed');
    }
  }
}

CyzaInit.prototype.checkOptionAndPutContent = function ({ target }) {
  switch (target.textContent.trim()) {
    case 'about':
      this.checkWhereActiveBorder(target.childNodes[1]);
      this.changeContentOfNavArea('about');
    break;
    case 'settings':
      this.checkWhereActiveBorder(target.childNodes[1]);
      this.changeContentOfNavArea('settings');
    break;
    case 'option1':
      this.checkWhereActiveBorder(target.childNodes[1]);
      this.changeContentOfNavArea('option1');
    break;
    case 'option2':
      this.checkWhereActiveBorder(target.childNodes[1]);
      this.changeContentOfNavArea('option2');
    break;
    case 'option3':
      this.checkWhereActiveBorder(target.childNodes[1]);
      this.changeContentOfNavArea('option3');
    break;
    default: return null;
  } 
}

CyzaInit.prototype.hideTooltips = function () { 
  for (const node of this.hideAllTooltips) {
    node.classList.remove('tooltip');
    node.classList.add('tooltip-hide');
  }
}

CyzaInit.prototype.removeTooltipsByCanceled = function ({ target }) {
  if (target.classList.contains('edit_buttons-item_cancel')) {
    this.hideTooltips();
  }
}

CyzaInit.prototype.saveDataFromTooltip = function ({ target }) {
  if (target.classList.contains('edit_buttons-item_save')) {
    for (let i = 0; i < 2; ++i) {
      this.firstNameNodes[i].textContent = 
        ( this.inputFirstName[0].value.split(' ')[0] !== '') ? 
        this.inputFirstName[0].value.split(' ')[0] : this.firstNameNodes[0].textContent;

      this.lastNameNodes[i].textContent = 
        ( this.inputFirstName[0].value.split(' ')[1] !== '') ? 
        this.inputFirstName[0].value.split(' ')[1] : this.lastNameNodes[0].textContent;

      this.phonesNodes[i].textContent = this.inputPhoneNumber[0].value !== '' ? this.inputPhoneNumber[0].value : this.phonesNodes[0].textContent;
      this.addressNodes[i].textContent = this.inputCityAndState[0].value !== '' ? this.inputCityAndState[0].value : this.addressNodes[0].textContent;
    }
    this.websiteNode[0].textContent = this.inputWebsite[0].value !== '' ? this.inputWebsite[0].value : this.websiteNode[0].textContent;

    this.hideTooltips();
  }
}

CyzaInit.prototype.openEditTooltip = function (ev) {
  const { target } = ev;

  if (target.classList.contains('edit-mode_button')) { 
    this.inputFirstName[0].value = `${this.firstNameNodes[0].textContent} ${this.lastNameNodes[0].textContent}`  ;
    this.inputWebsite[0].value = this.websiteNode[0].textContent.trim();
    this.inputPhoneNumber[0].value = this.phonesNodes[0].textContent;
    this.inputCityAndState[0].value = this.addressNodes[0].textContent.trim();

    this.hideTooltips();
    if (target.parentElement.tagName === 'H5') {
      target.parentElement.children[2].classList.remove('tooltip-hide');
      target.parentElement.children[2].classList.add('tooltip');
    }
    if (target.parentElement.tagName === 'DIV') {
      target.parentElement.children[3].classList.remove('tooltip-hide');
      target.parentElement.children[3].classList.add('tooltip');
    }
  } else if (target.classList.contains('edit-mode')) { 
    this.hideTooltips();
    if (target.parentElement.parentElement.tagName === 'H5') {
      target.parentElement.parentElement.children[2].classList.remove('tooltip-hide');
      target.parentElement.parentElement.children[2].classList.add('tooltip');
    }
    if (target.parentElement.parentElement.tagName === 'DIV') {
      target.parentElement.parentElement.children[3].classList.remove('tooltip-hide');
      target.parentElement.parentElement.children[3].classList.add('tooltip');
    }
  }
}

CyzaInit.prototype.attachListeners = function () {
  this.editDesktopPen.addEventListener('click', ev => this.openEditTooltip(ev) );
  this.editDesktopPen.addEventListener('click', this.saveDataFromTooltip.bind(this));
  this.editDesktopPen.addEventListener('click', this.removeTooltipsByCanceled.bind(this));
  this.editMobilePen.addEventListener('click', this.turnOnEditMode.bind(this));
  this.cancelSavingData.addEventListener('click', this.cancelEditMode.bind(this));
  this.saveDataButton.addEventListener('click', this.saveNewData.bind(this));
  this.followersButton.addEventListener('click', this.upCountOfFollowers.bind(this));
  this.optionsHolder.addEventListener('click', this.checkOptionAndPutContent.bind(this));
}

// SWITCHING LISTENERS HERE
document.addEventListener(
  'DOMContentLoaded', 
  function () { new CyzaInit() }
);
  
  

