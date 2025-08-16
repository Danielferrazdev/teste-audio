const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.getElementById('progress-text');

let currentStep = 0;
let totalSteps = questions.length;
let answers = [];

// Atualiza barra de progresso
function updateProgress() {
  let percent = Math.round(((currentStep + 1) / totalSteps) * 100);
  progressBar.style.width = percent + '%';
  progressText.textContent = percent + '%';
  if (nextBtn) {
    nextBtn.textContent = `${currentStep + 1} de ${totalSteps} →`;
  }
}

// Mostra pergunta atual
function showStep(index) {
  questions.forEach(q => q.classList.remove('active'));
  questions[index].classList.add('active');
  updateProgress();

  // Esconde botão na última tela (calibração)
  if (index === totalSteps - 1 && nextBtn) {
    nextBtn.style.display = 'none';
  }
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
}

// Captura respostas
document.querySelectorAll('.answer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    answers.push(btn.dataset.answer);
    if (nextBtn && nextBtn.style.display !== 'none') {
      nextBtn.click();
    }
  });
});

// Controle do teste
const playSoundBtn = document.getElementById('play-sound');
if (playSoundBtn) {
  playSoundBtn.addEventListener('click', () => {
    let audio = new Audio('sounds/test-tone.mp3');
    audio.play();
  });
}

showStep(currentStep);
