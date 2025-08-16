// Perguntas
const questions = [
  "Eu sempre acho que as pessoas ao meu redor estão sussurrando ou são difíceis de entender.",
  "Quando assisto TV, preciso aumentar o volume para ouvir corretamente.",
  "Eu evito situações sociais porque é difícil acompanhar as conversas.",
  "Acho difícil ouvir o que me dizem em restaurantes e outros lugares com muitas pessoas."
];

let currentQuestion = 0;
const answers = [];

const questionnaireEl = document.getElementById('questionnaire');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');

// Criar perguntas dinamicamente
questions.forEach((q, index) => {
  const div = document.createElement('div');
  div.classList.add('question');
  if(index === 0) div.classList.add('active');

  div.innerHTML = `
    <p>${q}</p>
    <button class="answer-btn yes">Sim</button>
    <button class="answer-btn no">Não</button>
  `;
  questionnaireEl.appendChild(div);
});

const questionElements = document.querySelectorAll('.question');

// Atualizar contador "1 de X"
function updateNextBtn() {
  nextBtn.textContent = `${currentQuestion + 1} de ${questions.length} →`;
}
updateNextBtn();

// Eventos dos botões Sim/Não
questionElements.forEach((qEl, idx) => {
  const yesBtn = qEl.querySelector('.yes');
  const noBtn = qEl.querySelector('.no');

  yesBtn.addEventListener('click', () => answerQuestion(true, idx));
  noBtn.addEventListener('click', () => answerQuestion(false, idx));
});

function answerQuestion(value, idx) {
  answers[idx] = value;

  // Avança para próxima pergunta
  questionElements[idx].classList.remove('active');
  currentQuestion++;
  if(currentQuestion < questions.length) {
    questionElements[currentQuestion].classList.add('active');
    updateNextBtn();
  } else {
    nextBtn.style.display = 'none';
    finishBtn.style.display = 'inline-block';
  }
}

// Botão finalizar → vai para o teste
finishBtn.addEventListener('click', () => {
  console.log('Respostas:', answers);
  window.location.href = 'hearing-test.html';
});
