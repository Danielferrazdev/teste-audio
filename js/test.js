// Lista para armazenar respostas do usuário
let answers = [];

// Captura dos elementos HTML
const playButton = document.getElementById("play-sound");
const heardButton = document.getElementById("heard");
const notHeardButton = document.getElementById("not-heard");
const resultSection = document.getElementById("result-section");
const resultText = document.getElementById("result-text");

let testStep = 0; // Passo atual do teste
const totalSteps = 5; // Quantidade de sons a tocar

// Função para tocar som
function playSound() {
  // Criar um contexto de áudio
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  // Frequência aleatória entre 200Hz e 8000Hz
  const freq = Math.floor(Math.random() * (8000 - 200 + 1)) + 200;
  oscillator.frequency.value = freq;

  // Volume aleatório entre 0.1 e 1
  gainNode.gain.value = Math.random() * 0.9 + 0.1;

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 1); // Som dura 1 segundo

  console.log(`Tocando frequência: ${freq} Hz`);
}

// Função para registrar resposta
function registerAnswer(heard) {
  answers.push(heard);
  testStep++;

  if (testStep >= totalSteps) {
    finishTest();
  } else {
    alert(`Som ${testStep + 1} de ${totalSteps}. Clique em "Tocar som" para continuar.`);
  }
}

// Função para finalizar teste
function finishTest() {
  document.getElementById("test-area").style.display = "none";
  resultSection.style.display = "block";

  const heardCount = answers.filter(a => a).length;
  resultText.textContent = `Você ouviu ${heardCount} de ${totalSteps} sons. 
  ${heardCount < totalSteps ? "Recomendamos procurar um especialista." : "Sua audição está ótima!"}`;
}

// Eventos
playButton.addEventListener("click", playSound);
heardButton.addEventListener("click", () => registerAnswer(true));
notHeardButton.addEventListener("click", () => registerAnswer(false));
