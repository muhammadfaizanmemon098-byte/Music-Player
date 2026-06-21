const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const prevButton = document.getElementById("prev");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");

let songs = [{
        title: "Love me like you do",
        artist: "Ellie Goulding",
        file: "audio.mp3",
        cover: "cover1.webp"
    },
    {
        title: "Tu Hi Haqeqat",
        artist: "Imran Hashmi & Soha Ali Khan",
        file: "song2.aac",
        cover: "cover2.webp"
    },
    {
        title: "Let Me Down Slowly",
        artist: "Alec Benjamin",
        file: "song3.aac",
        cover: "cover3.webp"
    }
];

let currentSong = 0;

function loadSong(index) {
    currentSong = index;

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
    audio.src = songs[index].file;

    updateActiveSong();
}

function playSong() {
    audio.play();
    playButton.textContent = "⏸";
}

function pauseSong() {
    audio.pause();
    playButton.textContent = "▶";
}

function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();
}

function prevSong() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();
}

function selectsong(index) {
    loadSong(index);
    playSong();
}

function updateActiveSong() {
    document.querySelectorAll("#playlist li").forEach((li, i) => {
        li.classList.toggle("active", i === currentSong);
    });
}

playButton.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);

audio.addEventListener("ended", nextSong);

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;

        const currentMins = Math.floor(audio.currentTime / 60);
        const currentSecs = Math.floor(audio.currentTime % 60);

        const durationMins = Math.floor(audio.duration / 60);
        const durationSecs = Math.floor(audio.duration % 60);

        document.getElementById("time").textContent =
            `${currentMins}:${currentSecs.toString().padStart(2, "0")} / ${durationMins}:${durationSecs.toString().padStart(2, "0")}`;
    }
});

progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

loadSong(currentSong);