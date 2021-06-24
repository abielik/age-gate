const ageGateContainer = document.querySelector('.age-gate-container');
const confirmButton = document.querySelector('.confirm-age-button');
const rememberMeCheckbox = document.querySelector('#remember');

confirmButton.addEventListener('click', checkAge);

function onConfirmButtonClick() {
  ageGateContainer.style.display = 'none';
}

function checkAge() {
  const userInput = document.querySelector('#DOB').value;
  const DOB = new Date(userInput);
  const today = new Date();
  // Let user know if date is empty or invalid
  if (!userInput) {
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
    } else {
      window.location.href =
        '/Users/alanbielik/ProjectsJS/age-gate/underage.html';
    }
  }
}

// function isRememberMe() {
//   if (rememberMeCheckbox.checked &&)
// }
