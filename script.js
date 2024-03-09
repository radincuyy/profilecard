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
        name: 'wokeuplikethis',
        artist: 'Playboi Carti',
        source: 'https://cdn.discordapp.com/attachments/891573844765204536/1210471791911510086/y2mate.com_-_Playboi_Carti_wokeuplikethis_ft_Lil_Uzi_Vert_Official_Video.mp3?ex=65fd23b4&is=65eaaeb4&hm=0313a48f32bcf52593dc52fdfc2f3b0f3c79614065893afc2ebc3c668967823e&'
    },
    {
        name: 'No Role Modelz',
        artist: 'J. Cole',
        source: 'https://cdn.discordapp.com/attachments/891573844765204536/1210476843631779871/y2mate.com_-_No_Role_Modelz.mp3?ex=65fd2869&is=65eab369&hm=a02224884258e9a6b0d18ff004524b04d48a1fbbe2e82726661677c121aae092&'
    },
    {
        name: 'SICKO MODE',
        artist: 'Travis Scott',
        source: 'https://cdn.discordapp.com/attachments/891573844765204536/1210477802294476881/y2mate.com_-_Travis_Scott_SICKO_MODE_Audio.mp3?ex=65fd294d&is=65eab44d&hm=506e148dcb60a5ed24d732f0d3ccd934738accaea00d2418aa7c965334cfaec9&'
    },
    {
        name: 'Up Next',
        artist: 'Robin Banks',
        source: 'https://cdn.discordapp.com/attachments/891573844765204536/1210477801988169798/y2mate.com_-_Up_Next.mp3?ex=65fd294d&is=65eab44d&hm=064fa33268a6fef77d91cf4d9e199125dbf1071042f261f16b0ea408f273074f&'
    },
    {
        name: 'The Race',
        artist: 'Tay K',
        source: 'https://cdn.discordapp.com/attachments/891573844765204536/1210478568270856253/y2mate.com_-_Tay_K_The_Race_Official_Audio.mp3?ex=65fd2a04&is=65eab504&hm=2ef66deee30b00bb134e8257953e08deb87c0ddc95bc9a1b9ef395c21b5600b6&'
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
