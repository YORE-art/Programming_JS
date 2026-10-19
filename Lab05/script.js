const musicLibrary = {
    pop: {
        "Ariana Grande": ["7 rings", "thank u, next", "no tears left to cry"],
        "Taylor Swift": ["Shake It Off", "Blank Space", "Bad Blood"]
    },
    rock: {
        "Queen": ["Bohemian Rhapsody", "Don't Stop Me Now", "We Will Rock You"],
       "Coldplay": ["Yellow", "Viva La Vida", "Fix You"]
    },
    jazz: {
        "Miles Davis": ["So What", "Freddie Freeloader", "Blue in Green"],
        "John Coltrane": ["Giant Steps", "Naima", "My Favorite Things"]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.querySelector("#generate-btn");

    if (generateBtn) {
        generateBtn.addEventListener("click", generatePlaylist);
    }
});

function getAllSongs(selectedGenre) {
    let allSongs = [];

    for (let genreKey in musicLibrary) {
        if (selectedGenre !== "all" && genreKey !== selectedGenre) {
            continue;
        }

        let artists = musicLibrary[genreKey];
        for (let artistName in artists) {
            let songList = artists[artistName];
            songList.forEach(song => {
                allSongs.push(`${song} - ${artistName} (${genreKey.toUpperCase()})`);
            });
        }
    }

    return allSongs;
}

function generatePlaylist() {
    const selectedGenre = document.querySelector("#genre-select").value;
    const countInput = parseInt(document.querySelector("#track-count").value, 10);
    const playlistUI = document.querySelector("#playlist");

    let availableSongs = getAllSongs(selectedGenre);
    playlistUI.innerHTML = "";

    if (availableSongs.length === 0) {
        let li = document.createElement("li");
        li.textContent = "No songs available for this genre.";
        playlistUI.appendChild(li);
        return;
    }

    let safeCount = Number.isNaN(countInput) || countInput < 1 ? 1 : countInput;
    let targetCount = Math.min(safeCount, availableSongs.length);

    let selectedPlaylist = [];
    let pool = [...availableSongs];

    for (let i = 0; i < targetCount; i++) {
        let randomIndex = Math.floor(Math.random() * pool.length);
        let pickedSong = pool.splice(randomIndex, 1)[0];
        selectedPlaylist.push(pickedSong);
    }

    selectedPlaylist.forEach(trackInfo => {
        let li = document.createElement("li");
        li.textContent = trackInfo;
        playlistUI.appendChild(li);
    });
}
