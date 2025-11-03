console.log("Welcome to Spotify");

// Define songs array first
const songs = [
    {songname: "Let me Love you", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songname: "On My Way", filepath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songname: "Faded", filepath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songname: "Cartoon - On & On", filepath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songname: "Warriyo - Mortals", filepath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songname: "Ertugrul Gazi", filepath: "songs/6.mp3", coverpath: "covers/6.jpg"},
    {songname: "Imagine Dragons - Believer", filepath: "songs/7.mp3", coverpath: "covers/7.jpg"},
    {songname: "Alan Walker - Spectre", filepath: "songs/8.mp3", coverpath: "covers/8.jpg"},
    {songname: "Tobu - Hope", filepath: "songs/9.mp3", coverpath: "covers/9.jpg"},
    {songname: "Janji-Heroes Tonight", filepath: "songs/10.mp3", coverpath: "covers/10.jpg"},
];

// Initialize the Variables
let songIndex = 0;  // Tracks currently playing song
let audioElement = new Audio(songs[0].filepath);  // Main audio player
let masterPlay = document.getElementById('masterPlay');  // Main play/pause button
let myProgressBar = document.getElementById('myProgressBar');  // Seek bar
let gif = document.getElementById('gif');  // Playing animation
let songInfoText = document.getElementById('songInfoText');  // Song info text display

// Set initial GIF state
gif.style.opacity = 0;

// Set initial song info
songInfoText.innerText = songs[0].songname;

let songItems = Array.from(document.getElementsByClassName('songItem'));

// Helper function to update song item UI state
const updateSongItemUI = (index, isPlaying) => {
    makeAllPlays(); // Reset all buttons first
    if (isPlaying) {
        const playButton = document.getElementById(String(index));
        if (playButton) {
            playButton.classList.remove('fa-play-circle');
            playButton.classList.add('fa-pause-circle');
        }
        // Show GIF when playing
        gif.style.opacity = 1;
        // Update song info text
        songInfoText.innerText = songs[index].songname;
    } else {
        // Hide GIF when paused
        gif.style.opacity = 0;
    }
};

// Songs array is now defined at the top of the file

// Populate song item images and names from `songs` array
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
});

// audioElement.play();

// Handle play/pause click          
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();    
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        // sync currently selected song item UI
        updateSongItemUI(songIndex, true);
    }   
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        updateSongItemUI(songIndex, false);
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar
    if (audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        console.log(progress);
        myProgressBar.value = progress;
    }
});

// Seek when user changes progress bar
myProgressBar.addEventListener('change', ()=>{
    if (audioElement.duration) {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    }
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Attach click handlers to each song item play button
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        const clickedIndex = parseInt(e.target.id);
        // If clicking the currently selected song, toggle play/pause
        if (clickedIndex === songIndex) {
            if (!audioElement.paused && audioElement.currentTime > 0) {
                // currently playing -> pause
                audioElement.pause();
                updateSongItemUI(clickedIndex, false);
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            } else {
                // currently paused -> play
                audioElement.play();
                updateSongItemUI(clickedIndex, true);
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            }
        } else {
            // different song -> play new selection
            songIndex = clickedIndex;
            audioElement.src = songs[songIndex].filepath;
            audioElement.currentTime = 0;
            audioElement.play();
            updateSongItemUI(songIndex, true);
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
    });
});

// Next button
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length-1){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
    const nextSongPlay = document.getElementById(String(songIndex));
    nextSongPlay.classList.remove('fa-play-circle');
    nextSongPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    songInfoText.innerText = songs[songIndex].songname;
});

// Previous button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = songs.length - 1;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
    const prevSongPlay = document.getElementById(String(songIndex));
    prevSongPlay.classList.remove('fa-play-circle');
    prevSongPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    songInfoText.innerText = songs[songIndex].songname;
});

// When current track ends, play the next track automatically
audioElement.addEventListener('ended', ()=>{
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongItemUI(songIndex, true);
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    // ensure progress bar resets/starts updating
    myProgressBar.value = 0;
    gif.style.opacity = 1;
});


