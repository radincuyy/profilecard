const playPauseButton = document.querySelector('.play-pause');
const audioPlayer = document.getElementById('my-audio');
const progressBar = document.querySelector('.progress-bar');
const progressArea = document.querySelector('.progress-area');
const songDetails = document.querySelector('.song-details');
const repeatButton = document.getElementById('repeat-plist');
const moreMusicButton = document.getElementById('more-music');
const timestampLeft = document.querySelector('.timestamp.left'); // Timestamp element for left side
const timestampRight = document.querySelector('.timestamp.right'); // Timestamp element for right side

let isPlaying = false;
let currentSongIndex = 0;
const songs = [
    {
        name: 'To Feel Alive',
        artist: 'IAMEVE',
        source: 'https://cdn.discordapp.com/attachments/891573844765204536/1129807739338620978/y2mate.com_-_To_Feel_Alive.mp3'
    },
    {
        name: 'Hate Myself',
        artist: 'NF',
        source: 'https://cdn.discordapp.com/attachments/891573844765204536/1124373616335802509/y2mate.com_-_NF_Hate_Myself_Audio.mp3'
    },
    {
        name: 'Better',
        artist: 'Khalid',
        source: 'https://cdn.discordapp.com/attachments/891573844765204536/1124368896737165402/y2mate.com_-_Khalid_Better_Official_Video.mp3'
    },
    {
        name: 'Alone (prod. RipSquad)',
        artist: 'Chief Keef',
        source: 'https://cdn.discordapp.com/attachments/891573844765204536/1122545871083536434/y2mate.com_-_Chief_Keef_Alone_prod_RipSquad.mp3'
    },
    {
        name: 'Dont Believe Me',
        artist: 'SD',
        source: 'https://cdn.discordapp.com/attachments/891573844765204536/1122555647632875620/y2mate.com_-_SD_Dont_Believe_Me_Official_Video.mp3'
    },
    // Nambah lagu
];

function playSong() {
    const song = songs[currentSongIndex];
    audioPlayer.src = song.source;
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.innerHTML = '<i class="material-icons">pause</i>';
    songDetails.innerHTML = `<p class="name">${song.name}</p><p class="artist">${song.artist}</p>`;
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseButton.innerHTML = '<i class="material-icons">play_arrow</i>';
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong();
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong();
}

function playSongAt(index) {
    currentSongIndex = index;
    playSong();
}

playPauseButton.addEventListener('click', function () {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

audioPlayer.addEventListener('timeupdate', function() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = progressPercent + '%';

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    const currentTimeStamp = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    const durationTimeStamp = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;

    timestampLeft.textContent = currentTimeStamp;
    timestampRight.textContent = durationTimeStamp;
});

progressArea.addEventListener('click', function(event) {
    const progressAreaWidth = progressArea.clientWidth;
    const clickedOffsetX = event.offsetX;
    const duration = audioPlayer.duration;
    const clickedTime = (clickedOffsetX / progressAreaWidth) * duration;
    audioPlayer.currentTime = clickedTime;
});

let isDragging = false;
progressArea.addEventListener('mousedown', function(event) {
    if (event.target === progressArea) {
        isDragging = true;
    }
});

progressArea.addEventListener('mouseup', function() {
    isDragging = false;
});

progressArea.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const progressAreaWidth = progressArea.clientWidth;
        const clickedOffsetX = event.offsetX;
        const duration = audioPlayer.duration;
        const clickedTime = (clickedOffsetX / progressAreaWidth) * duration;
        audioPlayer.currentTime = clickedTime;
    }
});

// Tombol Next dan Previous
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('prev');

nextButton.addEventListener('click', playNextSong);
previousButton.addEventListener('click', playPreviousSong);

audioPlayer.addEventListener('ended', function() {
    playNextSong();
});
