"use strict"

// DOM Elements

const media = document.querySelector('video');
const controls = document.querySelector('.controls');

const playVideo = document.querySelector('.play');
const stopVideo = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

media.removeAttribute('controls');
controls.style.visibility = 'visible';

//---------------------------------------//

let intervalFwd = null;
let intervalRwd = null;

// EventListener

playVideo.addEventListener('click', playPauseMedia);
stopVideo.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);
media.addEventListener('timeupdate', setTime);

// Event Handling

function playPauseMedia() {
  removeDoubleActiv(rwd, fwd)
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
  if (media.paused) {
    playVideo.className = "play fas fa-pause";
    media.play();
  } else {
    playVideo.className = "play fas fa-play";
    media.pause();
  }
}

function stopMedia() {
  media.pause();
  media.currentTime = 0;
  playVideo.className = "play fas fa-play";
  removeDoubleActiv(rwd, fwd)
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
}


function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove('active');
  if (rwd.classList.contains('active')) {
    removeActiv(rwd)
    clearInterval(intervalRwd);
    media.play();
  } else {
    addActiv(rwd)
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  removeActiv(rwd)
  if (fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    media.play();
  } else {
    addActiv(fwd)
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward() {
  if (media.currentTime <= 3) {
    removeActiv(rwd)
    clearInterval(intervalRwd);
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function windForward() {
  if (media.currentTime >= media.duration - 3) {
    removeActiv(fwd)
    clearInterval(intervalFwd);
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}

function setTime() {
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = '0' + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = '0' + seconds;
  } else {
    secondValue = seconds;
  }

  let mediaTime = minuteValue + ':' + secondValue;
  timer.textContent = mediaTime;

  let barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = barLength + 'px';
}

// Utils 

function removeDoubleActiv(rwd, fwd) {
  rwd.classList.remove('active');
  fwd.classList.remove('active');
}

function removeActiv(item) {
  item.classList.remove('active');
}

function addActiv(item) {
  item.classList.add('active');
}