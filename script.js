
let selectedTime = parseInt(localStorage.getItem('selectedTime')) || 0;
let timerNextBtn;
let timerInterval; 
let nfcNumberSpan; 

document.addEventListener('DOMContentLoaded', function () {
  const timeSelect = document.getElementById('timeSelect');
  const nextBtn = document.getElementById('nextBtn');
  const departmentButtons = document.querySelectorAll('.department-btn');

  const timerLabel = document.getElementById('timerLabel');
  const timerElement = document.getElementById('timer');

  if (timeSelect) {
    timeSelect.value = selectedTime;
    timeSelect.addEventListener('change', () => {
      selectedTime = parseInt(timeSelect.value);
      localStorage.setItem('selectedTime', selectedTime);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      window.location.href = 'department.html';
    });
  }

  departmentButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Department button clicked!');
      const nfcNumber = btn.getAttribute('data-nfc');
      nfcNumberSpan = document.getElementById('nfcNumber'); 
      if (nfcNumberSpan) {
        nfcNumberSpan.textContent = nfcNumber;
      }
      if (selectedTime > 0) {
        if (timerInterval) {
          clearInterval(timerInterval);
        }
        setTimeout(() => {
          window.location.href = 'timer.html';
        }, 1000);
        startTimer();
      } else {
        alert('Please select a time before choosing a department.');
      }
    });
  });

  timerNextBtn = document.getElementById('timerNextBtn');
  if (timerNextBtn) {
    timerNextBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  function startTimer() {
    let timeRemaining = selectedTime * 60;

    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        if (timerElement) {
          timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        timeRemaining--;
      } else {
        clearInterval(timerInterval);
        if (timerLabel) {
          timerLabel.textContent = 'Time is up!';
        }
        if (timerElement) {
          timerElement.textContent = '';
        }
        if (timerNextBtn) {
          timerNextBtn.style.display = 'block';
        }
      }
    }, 1000);
  }
});
