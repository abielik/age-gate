const confirmButton = document.querySelector('.confirm-age-button');
const rememberMeCheckbox = document.querySelector('#remember');
const userBirthday = document.querySelector('#DOB');
const ageErrorMessage = document.querySelector('#age-error-message');
const menuList = document.querySelector('.menu-icon');
const nav = document.querySelector('#navigation');

let isMenuOpen = false;
menuList.addEventListener('click', toggleMenuOnClick);
confirmButton.addEventListener('click', onConfirmButtonClick);

// as soon as page loads, check localStorage
if (!isAlreadyAllowedAccess()) {
  showAgeGate();
}

function onConfirmButtonClick() {
  const age = getAge(new Date(userBirthday.value));
  checkAge(age);
}
/**
 *  getAge() will first check number of years.
 *  If years equals 21, then need to compare the integer value of the birth month vs the current month.
 *  If the birth month is the same as the current month, then need to compare the birth day to see if that day has occured or not
 */
function getAge(birthday) {
  const today = new Date();

  const diffInYears = today.getFullYear() - birthday.getFullYear();
  if (diffInYears !== 21) {
    return diffInYears;
  }
  const diffInMonths = today.getMonth() - birthday.getMonth();
  if (diffInMonths > 0) {
    return diffInYears;
  }
  if (diffInMonths < 0) {
    return diffInYears - 1;
  }

  /**
   * if none of the above IF statements are truthy, this means the user is born in the current month, and the current year is the year they turn 21.
   * Now it will determine if their birthday DAY has come or not
   * the getDate() is slightly off which is why the If statement compares against the number 1 and not 0
   */
  const diffInDays = today.getDate() - birthday.getDate();
  if (diffInDays >= 1) {
    return diffInYears;
  } else {
    return diffInYears - 1;
  }
}

function checkAge(age) {
  // must check age !== 0 for edge case: if birthday year equals the current year but the birthday month hasn't occured yet
  if (!age) {
    ageErrorMessage.innerText = 'Please choose a valid date.';
    return;
  }

  if (age < 21) {
    return (window.location.href = './underage.html');
  }

  // user is 21+
  hideAgeGate();
  if (rememberMeCheckbox.checked) {
    setRememberMeLocalStorage();
  }
}

function showAgeGate() {
  document.body.classList.add('show-age-gate');
}

function hideAgeGate() {
  document.body.classList.remove('show-age-gate');
}

function setRememberMeLocalStorage() {
  localStorage.setItem('is21', 'true');
}

/**
 * Returns true when user is in localStorage as 21+
 */
function isAlreadyAllowedAccess() {
  if (localStorage.getItem('is21')) {
    return true;
  }
  return false;
}

function toggleMenuOnClick() {
  if (isMenuOpen) {
    nav.style.maxHeight = '0px';
  } else {
    nav.style.maxHeight = '100%';
  }
  isMenuOpen = !isMenuOpen;
}
