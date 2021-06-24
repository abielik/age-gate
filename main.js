const ageGateContainer = document.querySelector('.age-gate-container');
const submitYes = document.querySelector('.submit-yes');

submitYes.addEventListener('click', onSubmitYes);

function onSubmitYes() {
  ageGateContainer.style.display = 'none';
}
