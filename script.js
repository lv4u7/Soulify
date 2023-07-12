console.log("Welocme to spostify");
//variables
let songIndex = 0;
let audioElement = new Audio("tracks/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressbar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let duration = document.getElementById("duration");
let songs = [
  {
    songName: "Mehman e Karbala",
    filePath: "tracks/1.mp3",
    coverPath: "covers/cover1.jpg",
  },
  {
    songName: "Abbas Abbas",
    filePath: "tracks/2.mp3",
    coverPath: "covers/cover2.jpg",
  },
  {
    songName: "Ya Zahra Ya Zahra",
    filePath: "tracks/3.mp3",
    coverPath: "covers/cover3.jpg",
  },
  {
    songName: "Yad Ao gy Bhaiya",
    filePath: "tracks/4.mp3",
    coverPath: "covers/cover4.jpg",
  },
  {
    songName: "Bhai ka Lasha",
    filePath: "tracks/5.mp3",
    coverPath: "covers/cover5.jpg",
  },
  {
    songName: "Mawan Karbala Dia Mawan",
    filePath: "tracks/6.mp3",
    coverPath: "covers/cover6.jpg",
  },
  {
    songName: "Mazloom Ali",
    filePath: "tracks/7.mp3",
    coverPath: "covers/cover7.jpg",
  },
  {
    songName: "Hay Zainab Ver Di Mout Dia",
    filePath: "tracks/8.mp3",
    coverPath: "covers/cover8.jpg",
  },
  {
    songName: "Karyal Jawan Ki Lash",
    filePath: "tracks/9.mp3",
    coverPath: "covers/cover9.jpg",
  },
  {
    songName: "Tu Na Aya Ghazi",
    filePath: "tracks/10.mp3",
    coverPath: "covers/cover10.jpg",
  },
  {
    songName: "Ya Abal Fazl",
    filePath: "tracks/11.mp3",
    coverPath: "covers/cover11.jpg",
  },
  {
    songName: "Ya Imam Al Ajal",
    filePath: "tracks/12.mp3",
    coverPath: "covers/cover12.jpg",
  },
];

songItems.forEach((element, i) => {
  // console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//handle play pauese
function toggleMasterPlay() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    //convert the play icon to pause
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    //convert the pause icon to play
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
}

masterPlay.addEventListener("click", () => {
  toggleMasterPlay();
});

function formatTime(seconds) {
  const format = (val) => `0${Math.floor(val)}`.slice(-2);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${format(minutes)}:${format(remainingSeconds)}`;
}

//Listen to events
audioElement.addEventListener("timeupdate", () => {
  const currentTime = audioElement.currentTime;
  duration.innerText = formatTime(currentTime);

  //seekbar update the seek bar takes percentage so we find pecentage from duration
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  // console.log(progress);
  myProgressbar.value = progress;
});

//when we change th progress bar the audio chnages the time also
myProgressbar.addEventListener("change", () => {
  //now I have to change the percentage of the progress bar to duration
  // 100 * (currentTime / duration) = percentage
  // currentTime =  (percentage * duration) / 100
  audioElement.currentTime =
    (myProgressbar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((e) => {
    e.classList.remove("fa-pause");
    e.classList.add("fa-play");
  });
};
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    let prevIndex = parseInt(element.id);
    element.addEventListener("click", (e) => {
      // console.log(e.target);
      makeAllPlays();
      if (prevIndex != songIndex) {
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.src = `tracks/${songIndex}.mp3`;
      }
      if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        // start the track
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
      } else {
        audioElement.pause();
        e.target.classList.remove("fa-pause");
        e.target.classList.add("fa-play");
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 12) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }
  audioElement.src = `tracks/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});

document.getElementById("prevoius").addEventListener("click", () => {
  if (songIndex <= 1) {
    songIndex = 12;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `tracks/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});
