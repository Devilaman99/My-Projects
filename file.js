console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');

let songs  = [
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

// Populate song item images and names from `songs` array
let songItems = Array.from(document.getElementsByClassName('songItem'));
songItems.forEach((element, i)=>{
    if (songs[i]) {
        element.getElementsByTagName("img")[0].src = songs[i].coverpath;
        element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
    }
})

// Helper: update a song item's play icon and highlight state
function updateSongItemUI(index, isPlaying) {
    const playIcon = document.getElementById(String(index));
    const container = document.getElementsByClassName('songItem')[index];
    if (playIcon) {
        if (isPlaying) {
            playIcon.classList.remove('fa-play-circle');
            playIcon.classList.add('fa-pause-circle');
        } else {
            playIcon.classList.remove('fa-pause-circle');
            playIcon.classList.add('fa-play-circle');
        }
    }
    // highlight container
    Array.from(document.getElementsByClassName('songItem')).forEach((el, idx)=>{
        if (idx === index && isPlaying) el.classList.add('playing'); else el.classList.remove('playing');
    });
}

// Utility to reset play icons in the list
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// Attach click handlers to each song item play button
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays(); 
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();    
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        updateSongItemUI(songIndex, true);
    })
})

// Next button
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=songs.length-1){
        songIndex = 0       
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongItemUI(songIndex, true);
})

// Previous button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0       
    }
    else{
        songIndex -= 1; 
    }
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongItemUI(songIndex, true);
})  

// When a track ends, advance to next and update UI
audioElement.addEventListener('ended', ()=>{
    if (songIndex >= songs.length - 1) songIndex = 0; else songIndex += 1;
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongItemUI(songIndex, true);
});



