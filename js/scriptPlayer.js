// === YouTube Player API Integration para Cassette ===

let player;
let currentPlaylist = "";
let musicStarted = false;
let pauseMusicId = "gJj1Hxm4T9E"; // Música de pausa (vídeo simples do YouTube)

const playlists = {
  manha: [
    "PLyr0btqywehLFLQf5FOHfEWr_l6Ajhffa",
    "PLyr0btqywehKXatXxSz7LxYi6oxri5Clx",
    "PLyr0btqywehL4MgWN2vU7dZI829GovSQt"
  ],
  tarde: [
    "PLyr0btqywehJjaTwI02L5Bdbioo7yXcyX",
    "PLyr0btqywehIKpGwnTKcaLfOUpB3StJlA",
    "PLyr0btqywehK-9Tm_LAVZg5oukE2DfIrk"
  ],
  noite: [
    "PLyr0btqywehKKLBjo8jYWT6g1GdzePTNJ",
    "PLyr0btqywehJ9L7kaEBAuvmeye45xbL2V",
    "PLyr0btqywehK80zzclrMCAQorykHHFuLT"
  ]
};

const fundosPorTema = {
  manha: "assets/manha.mp4",
  tarde: "assets/tarde.mp4",
  noite: "assets/noite.mp4"
};

// Carregar YouTube IFrame API
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player("yt-player", {
    height: "0",
    width: "0",
    playerVars: {
      listType: "playlist",
      list: playlists.manha[0],
      autoplay: 0,
      controls: 0,
      modestbranding: 1
    },
    events: {
      onReady: () => console.log("YouTube player pronto"),
    }
  });
};

function tocarMusica() {
  if (!musicStarted) {
    musicStarted = true;
    player.playVideo();
  }
}

function pausarMusica() {
  player.pauseVideo();
}

function trocarPlaylist(novoId) {
  currentPlaylist = novoId;
  player.loadPlaylist({ list: novoId });
}

function proximaMusica() {
  player.nextVideo();
}

function musicaAnterior() {
  player.previousVideo();
}

function definirVolume(valor) {
  player.setVolume(valor);
}

function tocarMusicaDePausa() {
  player.cueVideoById(pauseMusicId);
  player.playVideo();
}

const seletorTema = document.getElementById("escolher-tema");
const seletorPlaylist = document.getElementById("escolher-playlist");
const volumeSlider = document.getElementById("volume-musica");

seletorTema.addEventListener("change", () => {
  const tema = seletorTema.value;
  atualizarVideoFundo(tema);
  atualizarPlaylists(tema);
});

seletorPlaylist.addEventListener("change", () => {
  const playlistId = seletorPlaylist.value;
  trocarPlaylist(playlistId);
});

volumeSlider.addEventListener("input", () => {
  definirVolume(volumeSlider.value);
});

function atualizarPlaylists(tema) {
  seletorPlaylist.innerHTML = "";
  playlists[tema].forEach((id, i) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `Playlist ${i + 1}`;
    seletorPlaylist.appendChild(option);
  });
  trocarPlaylist(playlists[tema][0]);
}

function atualizarVideoFundo(tema) {
  const fonteVideo = document.getElementById("fonte-video");
  const videoFundo = document.getElementById("video-fundo");
  fonteVideo.src = fundosPorTema[tema];
  videoFundo.load();
}

const botaoIniciar = document.getElementById("iniciar");
botaoIniciar.addEventListener("click", () => {
  tocarMusica();
});

const botaoPausar = document.getElementById("pausar");
botaoPausar.addEventListener("click", () => {
  pausarMusica();
});

document.addEventListener("DOMContentLoaded", () => {
  atualizarPlaylists("manha");
});
