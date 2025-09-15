function oneAudio(){
    const audios = Array.from(document.getElementsByTagName('audio'))
    audios.forEach(audio => {
        audio.addEventListener('play', () => {
            audios.forEach(otherAudio => {
                if (otherAudio != audio){
                    otherAudio.pause()
                }
            })
        })
    })
}


async function get_songs(url, song_category) {
    let res = await fetch(url);
    let display_songs = await res.json();
    songs_container.innerHTML = '';

    // if value of song_category is equal to all
    if (song_category == "all") {
        let all_categories = Object.keys(display_songs);
        let all_songs = {};
        for(const category of all_categories){
            Object.assign(all_songs, display_songs[category])
        }
        display_songs = all_songs
    }

    // if value of song_category is not equal to all
    for (const song in display_songs) {
        const complete_song_data = display_songs[song]
        const song_name = song;
        const song_artist = complete_song_data['artist'];
        const song_url = complete_song_data['url']
        html = `
            <div class="song">
                <div class="song-name">${song_name}</div>
                <div class="song-artist">${song_artist}</div>
                <audio src="${song_url}" class="audio-player" controls preload="metadata"></audio>
            </div>
        `
        songs_container.insertAdjacentHTML('beforeend', html)
    }
    
    oneAudio()
}

const songs_container = document.getElementById('songs-container')
const all_songs_button = Array.from(document.querySelectorAll('button.get-song-btn'))


all_songs_button.forEach(song_btn => {
    song_btn.addEventListener('click', () => {
        let song_category = song_btn.dataset.songcategory
        let song_api = `/songs?category=` + encodeURIComponent(song_category)
        get_songs(song_api, song_category)
    })
})

// get_songs("/songs?category=all","all")