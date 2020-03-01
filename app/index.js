// Load application styles
import 'styles/index.scss';

window.onload = function() {
  const regExpPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  // GET CONTROLS
  const editMobilePen = document.querySelectorAll('.head_control-edit')[0];
  const editDesktopPen = document.querySelectorAll('.option_data-saved')[0];
  const saveDataButton = document.querySelectorAll('.controls_choice-save')[0];
  const cancelSavingData = document.querySelectorAll('.controls_choice-cancel')[0];
  const followersButton = document.querySelectorAll('.follow_button')[0];
  const optionsHolder = document.querySelectorAll('.options_holder')[0];
  // GET INPUT VALUES
  const inputFirstName = document.querySelectorAll('.name_input-first');
  const inputLastName = document.querySelectorAll('.name_input-last');
  const inputWebsite = document.querySelectorAll('.name_input-site');
  const inputPhoneNumber = document.querySelectorAll('.name_input-phone');
  const inputCityAndState = document.querySelectorAll('.name_input-city');
  // GET DATA VALUES
  const firstNameNodes = document.querySelectorAll('.name-first'); 
  const lastNameNodes = document.querySelectorAll('.name-last');
  const websiteNode = document.querySelectorAll('.text-website');
  const phonesNodes = document.querySelectorAll('.text-phone');
  const addressNodes = document.querySelectorAll('.text-address');
  const followersCount = document.querySelectorAll('.follow_count');
  const addActiveNavBorder = document.querySelectorAll('.options_item-border');
  const getActualOptionsData = document.querySelectorAll('.option_data-head');
  const hideAllTooltips = document.querySelectorAll('.tooltip-elem');

  // SWITCHING FUNCTIONS HERE
  const turnOnEditMode = () => {
    document.querySelectorAll('.option_data-saved')[0].style.display = 'none';
    editMobilePen.style.display = 'none';

    inputFirstName[1].value = firstNameNodes[0].textContent;
    // [0] => Because we takes last name only ones... on mobile devices
    inputLastName[0].value = lastNameNodes[0].textContent;
    inputWebsite[1].value = websiteNode[0].textContent.trim();
    inputPhoneNumber[1].value = phonesNodes[0].textContent;
    inputCityAndState[1].value = addressNodes[0].textContent.trim();

    document.querySelectorAll('.option_data-changeable')[0].style.display = 'block';
    document.querySelectorAll('.head-controls_choice')[0].style.display = 'flex';
  }

  const cancelEditMode = () => {
    document.querySelectorAll('.option_data-changeable')[0].style.display = 'none';
    document.querySelectorAll('.head-controls_choice')[0].style.display = 'none';
    document.querySelectorAll('.option_data-saved')[0].style.display = 'block';
    editMobilePen.style.display = 'block';
  }

  const saveNewData = () => {
    for (let i = 0; i < 2; ++i) {
      firstNameNodes[i].textContent = inputFirstName[1].value !== '' ? inputFirstName[1].value : firstNameNodes[0].textContent;
      lastNameNodes[i].textContent = inputLastName[0].value !== '' ? inputLastName[0].value : lastNameNodes[0].textContent;
      phonesNodes[i].textContent = inputPhoneNumber[1].value !== '' ? inputPhoneNumber[1].value : phonesNodes[0].textContent;
      addressNodes[i].textContent = inputCityAndState[1].value !== '' ? inputCityAndState[1].value : addressNodes[0].textContent;
    }
    websiteNode[0].textContent = inputWebsite[1].value !== '' ? inputWebsite[1].value : websiteNode[0].textContent;
    cancelEditMode();
  }

  const upCountOfFollowers = () => {
    const numOfFullowers = parseInt(followersCount[0].textContent) + 1;
    followersCount[0].textContent = numOfFullowers;
  }

  const checkWhereActiveBorder = elem => {
    const len = addActiveNavBorder.length;
    for (let i = 0; i < len; ++i) {
      if (addActiveNavBorder[i].classList.contains('active-now')) {
        addActiveNavBorder[i].classList.remove('active-now');
        elem.classList.add('active-now');
      }
    }
  }

  const changeContentOfNavArea = title => {
    const len = getActualOptionsData.length;
    
    for (let i = 0; i < len; ++i) {
      if (getActualOptionsData[i].children[0].textContent.toLowerCase() !== title) {
        getActualOptionsData[i].parentElement.parentElement.classList.add('not-displayed');
      } else {
        getActualOptionsData[i].parentElement.parentElement.classList.remove('not-displayed');
      }
    }
  }

  const checkOptionAndPutContent = ({ target }) => {
    switch (target.textContent.trim()) {
      case 'about':
        checkWhereActiveBorder(target.childNodes[1]);
        changeContentOfNavArea('about');
      break;
      case 'settings':
        checkWhereActiveBorder(target.childNodes[1]);
        changeContentOfNavArea('settings');
      break;
      case 'option1':
        checkWhereActiveBorder(target.childNodes[1]);
        changeContentOfNavArea('option1');
      break;
      case 'option2':
        checkWhereActiveBorder(target.childNodes[1]);
        changeContentOfNavArea('option2');
      break;
      case 'option3':
        checkWhereActiveBorder(target.childNodes[1]);
        changeContentOfNavArea('option3');
      break;
      default: null
    } 
  }

  const hideTooltips = () => {
    const len = hideAllTooltips.length;
    for (let i = 0; i < len; ++i) {
      hideAllTooltips[i].classList.remove('tooltip');
      hideAllTooltips[i].classList.add('tooltip-hide');
    }
  }

  const removeTooltipsByCanceled = ({ target }) => {
    if (target.classList.contains('edit_buttons-item_cancel')) {
      hideTooltips();
    }
  }

  const saveDataFromTooltip = ({ target }) => {
    if (target.classList.contains('edit_buttons-item_save')) {
      for (let i = 0; i < 2; ++i) {
        firstNameNodes[i].textContent = 
          ( inputFirstName[0].value.split(' ')[0] !== '') ? 
          inputFirstName[0].value.split(' ')[0] : firstNameNodes[0].textContent;

        lastNameNodes[i].textContent = 
          ( inputFirstName[0].value.split(' ')[1] !== '') ? 
          inputFirstName[0].value.split(' ')[1] : lastNameNodes[0].textContent;

        phonesNodes[i].textContent = inputPhoneNumber[0].value !== '' ? inputPhoneNumber[0].value : phonesNodes[0].textContent;
        addressNodes[i].textContent = inputCityAndState[0].value !== '' ? inputCityAndState[0].value : addressNodes[0].textContent;
      }
      websiteNode[0].textContent = inputWebsite[0].value !== '' ? inputWebsite[0].value : websiteNode[0].textContent;

      hideTooltips();
    }
  }

  const openEditTooltip = ({ target }) => {
    if (target.classList.contains('edit-mode_button')) {
      inputFirstName[0].value = `${firstNameNodes[0].textContent} ${lastNameNodes[0].textContent}`  ;
      inputWebsite[0].value = websiteNode[0].textContent.trim();
      inputPhoneNumber[0].value = phonesNodes[0].textContent;
      inputCityAndState[0].value = addressNodes[0].textContent.trim();

      hideTooltips();
      if (target.parentElement.tagName === 'H5') {
        target.parentElement.children[2].classList.remove('tooltip-hide');
        target.parentElement.children[2].classList.add('tooltip');
      }
      if (target.parentElement.tagName === 'DIV') {
        target.parentElement.children[3].classList.remove('tooltip-hide');
        target.parentElement.children[3].classList.add('tooltip');
      }
    } else if (target.classList.contains('edit-mode')) {
      hideTooltips();
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

  // SWITCHING LISTENERS HERE
  editDesktopPen.addEventListener('click', openEditTooltip);
  editDesktopPen.addEventListener('click', saveDataFromTooltip);
  editDesktopPen.addEventListener('click', removeTooltipsByCanceled);
  editMobilePen.addEventListener('click', turnOnEditMode);
  cancelSavingData.addEventListener('click', cancelEditMode);
  saveDataButton.addEventListener('click', saveNewData);
  followersButton.addEventListener('click', upCountOfFollowers);
  optionsHolder.addEventListener('click', checkOptionAndPutContent);
}

