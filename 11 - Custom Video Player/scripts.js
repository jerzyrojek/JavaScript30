const player = document.querySelector(".player");
const video = player.querySelector(".viewer");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");

function toggleplay() {
    if(video.paused){
        video.play();
    }else {
        video.pause();
    }
}

function updateButton(){
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip () {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
    console.log(this.value);
}

function handleProgress(){
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

function makeFullscreen(e){
    video.requestFullscreen();
}

video.addEventListener("click", toggleplay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", toggleplay);

skipButtons.forEach(function (button) {
    button.addEventListener("click", skip);
})

ranges.forEach(function (range) {
    range.addEventListener("change", handleRangeUpdate);
})
ranges.forEach(function (range) {
    range.addEventListener("mousemove", handleRangeUpdate);
})

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progressBar.addEventListener("mousedown", () => mousedown = true);
progressBar.addEventListener("mouseup", () => mousedown = false);

fullscreen.addEventListener("click",makeFullscreen);