const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.getElementById('progress-text');
const startTestBtn = document.getElementById('start-test-btn');

let currentStep = 0;
const totalSteps = questions.length;
let answers = [];

// Atualiza barra de progresso
function updateProgress() {
  let percent = Math.round(((currentStep + 1) / totalSteps) * 100);
  progressBar.style.width = percent + '%';
  progressText.textContent = percent + '%';
  nextBtn.textContent = `${currentStep + 1} de ${totalSteps} →`;
}

// Mostra pergunta atual
function showStep(index) {
  questions.forEach(q => q.classList.remove('active'));
  questions[index].classList.add('active');
  updateProgress();
  // Oculta botão global na calibração
  if (index === totalSteps - 1) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'inline-block';
  }
}

nextBtn.addEventListener('click', () => {
  if (currentStep < totalSteps - 1) {
    currentStep++;
    showStep(currentStep);
  }
});

// Captura respostas dos botões Sim/Não
document.querySelectorAll('.answer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    answers.push(btn.dataset.answer);
    nextBtn.click();
  });
});

// Botão "Iniciar teste"
if (startTestBtn) {
  startTestBtn.addEventListener('click', () => {
    console.log("Respostas do usuário:", answers);
    window.location.href = 'hearing-test.html';
  });
}

showStep(currentStep);
