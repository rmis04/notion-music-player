const music = document.querySelector("#myMusic");
const poster = document.querySelector("#poster");
const name = document.querySelector(".name");
const singer = document.querySelector(".singer");
const date = document.querySelector(".date");

const back = document.querySelector(".fa-fast-backward");
const next = document.querySelector(".fa-fast-forward");
const ppBtn = document.querySelector(".play-pause-btn");

const progress = document.querySelector(".progress");
const currentTiming = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");

const playIcon = ppBtn.querySelector(".fa-play");
const pauseIcon = ppBtn.querySelector(".fa-pause");

const songs = [
  {
    name: "Butterflies",
    singer: "Dear Alice",
    year: "2022",
    poster: "https://rmis04.github.io/notion-music-player/cover.jpg",
    audio: "https://rmis04.github.io/notion-music-player/Butterflies.mp3"
  }
];

let songIndex = 0;
let isPlaying = false;

// Load song information
function loadSong(song) {
  name.textContent = song.name;
  singer.textContent = song.singer;
  date.textContent = song.year;
  poster.src = song.poster;
  music.src = song.audio;

  progress.style.width = "0%";
  currentTiming.textContent = "0:00";
  durationTime.textContent = "0:00";
}

// Update play/pause button icons
function updatePlayButton() {
  playIcon.style.display = isPlaying ? "none" : "inline";
  pauseIcon.style.display = isPlaying ? "inline" : "none";
}

// Play audio
async function playAudio() {
  try {
    await music.play();
    isPlaying = true;
    updatePlayButton();
  } catch (error) {
    console.error("Unable to play audio:", error);
  }
}

// Pause audio
function pauseAudio() {
  music.pause();
  isPlaying = false;
  updatePlayButton();
}

// Play/Pause button
ppBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playAudio();
}

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playAudio();
}

next.addEventListener("click", nextSong);
back.addEventListener("click", prevSong);

// Update progress bar
music.addEventListener("timeupdate", () => {
  if (!music.duration) return;

  const progressPercent = (music.currentTime / music.duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const currentMinutes = Math.floor(music.currentTime / 60);
  const currentSeconds = Math.floor(music.currentTime % 60)
    .toString()
    .padStart(2, "0");

  currentTiming.textContent = `${currentMinutes}:${currentSeconds}`;
});

// Display song duration
music.addEventListener("loadedmetadata", () => {
  const durationMinutes = Math.floor(music.duration / 60);
  const durationSeconds = Math.floor(music.duration % 60)
    .toString()
    .padStart(2, "0");

  durationTime.textContent = `${durationMinutes}:${durationSeconds}`;
});

// When song ends
music.addEventListener("ended", () => {
  if (songs.length > 1) {
    nextSong();
  } else {
    isPlaying = false;
    music.currentTime = 0;
    updatePlayButton();
  }
});

// Initialize player
window.addEventListener("DOMContentLoaded", () => {
  loadSong(songs[songIndex]);
  updatePlayButton();
});
