console.log("Welcome to Spotify");

// =======================
// INITIALIZE VARIABLES
// =======================
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

// =======================
// SONG DATA
// =======================
let songs = [
    { songName: "Ae Dil Hai Mushkil", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Akh Lad Jaave", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Sajna Tere Liye Sajna", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "DIL KO KARAAR AAYA (English)", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Mission Mangal", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Kaka WRLD - Bholenath", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Pal Pal", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Samjhawan", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tere Sang Yaara", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Apna Bana Le", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// =======================
// LOAD SONG LIST UI
// =======================
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// =======================
// HELPER FUNCTIONS
// =======================
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
};

const playSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
};

// =======================
// MASTER PLAY / PAUSE
// =======================
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
});

// =======================
// PROGRESS BAR UPDATE
// =======================
audioElement.addEventListener("timeupdate", () => {
    if (!isNaN(audioElement.duration)) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// =======================
// SONG ITEM PLAY CLICK
// =======================
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        let index = parseInt(e.target.id);

        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");

        playSong(index);
    });
});

// =======================
// NEXT BUTTON
// =======================
document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// =======================
// PREVIOUS BUTTON
// =======================
document.getElementById("previous").addEventListener("click", () => {
    songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
    playSong(songIndex);
});
