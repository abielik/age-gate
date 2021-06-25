const ageGateContainer = document.querySelector('.age-gate-container');
const confirmButton = document.querySelector('.confirm-age-button');
const rememberMeCheckbox = document.querySelector('#remember');
const userBirthday = document.querySelector('#DOB');
const ageErrorMessage = document.querySelector('#age-error-message');
const ab = document.querySelector('#ab');

confirmButton.addEventListener('click', onConfirmButtonClick);

// event listeners to transform "AB" on main page
ab.addEventListener('mouseover', transformInitialsOnHover);
ab.addEventListener('mouseout', resetInitialsAfterHover);

// as soon as page loads, check localStorage
checkLocalStorage();

// 2 functions for transforming "AB" during mouse hover and off
function transformInitialsOnHover() {
  ab.innerText = "Alan's Brewery";
}
function resetInitialsAfterHover() {
  ab.innerText = 'AB';
}

function onConfirmButtonClick() {
  const age = getAge();
  checkAge(age);
}
/*
  getAge() will first check number of years. If years equals 21, then need to compare the integer value of birth month vs currunt month. If birth month is same as the current month, then need to compare the birth day to see if that day has occured or not
*/
function getAge() {
  const userBirthdayValue = userBirthday.value;
  const DOB = new Date(userBirthdayValue);
  const today = new Date();

  const diffInYears = today.getFullYear() - DOB.getFullYear();
  if (diffInYears !== 21) {
    return diffInYears;
  }
  const diffInMonths = today.getMonth() - DOB.getMonth();
  if (diffInMonths !== 0) {
    return diffInYears;
  }
  const diffInDays = today.getDate() - DOB.getDate();
  if (diffInDays >= 1) {
    return diffInYears;
  } else {
    return diffInYears - 1;
  }
}

function checkAge(age) {
  if (!age) {
    ageErrorMessage.innerHTML = 'Please choose a date.';
    return false;
  }
  if (age >= 21) {
    ageGateContainer.style.display = 'none';
    if (rememberMeCheckbox.checked) {
      setRememberMeStorage();
    }
  } else {
    window.location.href = './underage.html';
  }
}

// checks if remember me box is checked upon age confirmation click
function setRememberMeStorage() {
  localStorage.is21 = true;
}

// first thing to run once page loads
function checkLocalStorage() {
  if (localStorage.is21) {
    ageGateContainer.style.display = 'none';
  }
}
