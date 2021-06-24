const ageGateContainer = document.querySelector('.age-gate-container');
const confirmButton = document.querySelector('.confirm-age-button');
const rememberMeCheckbox = document.querySelector('#remember');
const userBirthday = document.querySelector('#DOB');

confirmButton.addEventListener('click', checkAge);

checkLocalStorage();

if (localStorage.checkbox && localStorage.checkbox !== '') {
  rememberMeCheckbox.setAttribute('checked', 'checked');
  userBirthday.value = localStorage.userBirthday;
} else {
  rememberMeCheckbox.removeAttribute('checked');
  userBirthday.value = '';
}

function onConfirmButtonClick() {
  ageGateContainer.style.display = 'none';
}

function checkAge() {
  const userBirthdayValue = document.querySelector('#DOB').value;
  const DOB = new Date(userBirthdayValue);
  const today = new Date();
  // Let user know if date is empty or invalid
  if (!userBirthdayValue) {
    document.querySelector('#age-error-message').innerHTML =
      'Please choose a date.';
    return false;
  } else {
    let age = today.getFullYear() - DOB.getFullYear();
    console.log(age);
    const month = today.getMonth() - DOB.getMonth();
    // ensure the month and day have passed otherwise subtract 1 from age
    if (month < 0 || (month === 0 && today.getDate() < DOB.getDate())) {
      age--;
    }

    if (age >= 21) {
      onConfirmButtonClick();
      isRememberMe();
    } else {
      window.location.href =
        '/Users/alanbielik/ProjectsJS/age-gate/underage.html';
    }
  }
}

function isRememberMe() {
  if (rememberMeCheckbox.checked && userBirthday.value !== '') {
    localStorage.checkbox = rememberMeCheckbox.value;
    localStorage.userBirthday = userBirthday.value;
  } else {
    localStorage.checkbox = '';
    localStorage.userBirthday = '';
  }
}

function checkLocalStorage() {
  if (localStorage.checkbox === 'Remember Me') {
    onConfirmButtonClick();
  }
}
