// Elementos principais
const temporizador = document.getElementById('temporizador');
const selectEstudo = document.getElementById('tempo-estudo');
const selectPausa = document.getElementById('tempo-pausa');
const btnIniciar = document.getElementById('iniciar');
const btnPausar = document.getElementById('pausar');
const btnResetar = document.getElementById('resetar');
const modoAtivoTexto = document.getElementById('modo-ativo');

let modoAtual = 'estudo'; // ou 'pausa'
let tempoAtual = parseInt(selectEstudo.value) * 60;
let intervalo = null;
let ativo = false;

// Som
const beep = new Audio('beep.mp3'); // ficheiro de som curto

function atualizarDisplay() {
  const minutos = Math.floor(tempoAtual / 60);
  const segundos = tempoAtual % 60;
  temporizador.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function atualizarModoVisual() {
  modoAtivoTexto.textContent = `Modo: ${modoAtual === 'estudo' ? 'Estudo' : 'Pausa'}`;
}

function iniciarTemporizador() {
  if (ativo) return;
  ativo = true;
  intervalo = setInterval(() => {
    tempoAtual--;
    atualizarDisplay();

    if (tempoAtual <= 0) {
      beep.play();
      alternarModo();
    }
  }, 1000);
}

function pausarTemporizador() {
  ativo = false;
  clearInterval(intervalo);
}

function resetarTemporizador() {
  pausarTemporizador();
  tempoAtual = modoAtual === 'estudo'
    ? parseInt(selectEstudo.value) * 60
    : parseInt(selectPausa.value) * 60;
  atualizarDisplay();
  atualizarModoVisual();
}

function alternarModo() {
  modoAtual = modoAtual === 'estudo' ? 'pausa' : 'estudo';
  tempoAtual = modoAtual === 'estudo'
    ? parseInt(selectEstudo.value) * 60
    : parseInt(selectPausa.value) * 60;
  atualizarModoVisual();
  atualizarDisplay();
  iniciarTemporizador();
}

// Atualiza se selects forem mudados enquanto parado
selectEstudo.addEventListener('change', () => {
  if (modoAtual === 'estudo' && !ativo) {
    tempoAtual = parseInt(selectEstudo.value) * 60;
    atualizarDisplay();
  }
});

selectPausa.addEventListener('change', () => {
  if (modoAtual === 'pausa' && !ativo) {
    tempoAtual = parseInt(selectPausa.value) * 60;
    atualizarDisplay();
  }
});

// Eventos dos botões
btnIniciar.addEventListener('click', iniciarTemporizador);
btnPausar.addEventListener('click', pausarTemporizador);
btnResetar.addEventListener('click', resetarTemporizador);

// Inicializa display e modo visual
atualizarDisplay();
atualizarModoVisual();
