const search = document.getElementById("search")
const playlists = document.getElementById("playlists")

let files = ["sample1.json", "sample2.json", "sample3.json"]

let datas = []
search.onkeyup = () => {
  playlists.innerHTML = ""
  const inputText = search.value
  for (let i of files) {
    let myRequest = new XMLHttpRequest()
    
    myRequest.open("GET", i)
    myRequest.send()
    myRequest.onload = function () {
      let myData = JSON.parse(myRequest.responseText)
      editPage(myData, inputText)
    }
  }
}



function editPage(data, text) {
  if (text == "") return

  let matchList = data.playlists.filter((state) => {
    const regex = new RegExp(`^${text}`, "gi")
    return state.name.match(regex)
  })

  for (let i = 0; i < matchList.length; i++) {
    const playlistRow = document.createElement("div")
    const playlist = document.createElement("div")
    const playlistTable = document.createElement("table")
    const tableRow = document.createElement("tr")
    const playlistName = document.createElement("th")
    const trackNumber = document.createElement("th")
    const albumNumber = document.createElement("th")
    const followerNumber = document.createElement("th")
    const dataTableRow = document.createElement("tr")
    const dataPlaylistName = document.createElement("td")
    const dataTrackNumber = document.createElement("td")
    const dataAlbumNumber = document.createElement("td")
    const dataFollowerNumber = document.createElement("td")
    
    playlistRow.classList.add("row")
    playlist.classList.add("playlist")
    
    playlists.appendChild(playlistRow)
    playlistRow.appendChild(playlist)
    playlist.appendChild(playlistTable)
    playlistTable.appendChild(tableRow)
    tableRow.appendChild(playlistName)
    tableRow.appendChild(trackNumber)
    tableRow.appendChild(albumNumber)
    tableRow.appendChild(followerNumber)
    playlistTable.appendChild(dataTableRow)
    dataTableRow.appendChild(dataPlaylistName)
    dataTableRow.appendChild(dataTrackNumber)
    dataTableRow.appendChild(dataAlbumNumber)
    dataTableRow.appendChild(dataFollowerNumber)

    playlistName.innerText = "Playlist Name"
    trackNumber.innerText = "Track Number"
    albumNumber.innerText = "Album Number"
    followerNumber.innerText = "Follower Number"
    dataPlaylistName.innerText = matchList[i].name
    dataTrackNumber.innerText = matchList[i].num_tracks
    dataAlbumNumber.innerText = matchList[i].num_albums
    dataFollowerNumber.innerText = matchList[i].num_followers

    const songs = document.createElement("div")
    songs.style.display = "none"
    songs.classList.add("tracks")
    playlistRow.appendChild(songs)

    playlist.addEventListener("click", () => {
      if (songs.style.display === "none") {
        songs.style.display = "block"
        playlist.style.backgroundColor = "rgba(22, 67, 190, 0.849)"
      }
      else {
        songs.style.display = "none"
        playlist.style.backgroundColor = "blue"
      }
    })
    
    for (let song of matchList[i].tracks) {
      const songTable = document.createElement("table")
      const songHeaderRow = document.createElement("tr")
      const songOrder = document.createElement("th")
      const songArtistName = document.createElement("th")
      const songTrackName = document.createElement("th")
      const songAlbumName = document.createElement("th")
      const dataSongRow = document.createElement("tr")
      const dataSongOrder = document.createElement("td")
      const dataSongArtistName = document.createElement("td")
      const dataSongTrackName = document.createElement("td")
      const dataSongAlbumName = document.createElement("td")

      songs.appendChild(songTable)
      songTable.appendChild(songHeaderRow)
      songHeaderRow.appendChild(songOrder)
      songHeaderRow.appendChild(songArtistName)
      songHeaderRow.appendChild(songTrackName)
      songHeaderRow.appendChild(songAlbumName)
      songTable.appendChild(dataSongRow)
      dataSongRow.appendChild(dataSongOrder)
      dataSongRow.appendChild(dataSongArtistName)
      dataSongRow.appendChild(dataSongTrackName)
      dataSongRow.appendChild(dataSongAlbumName)

      songOrder.innerText = "Order"
      songArtistName.innerText = "Artist Name"
      songTrackName.innerText = "Track Name"
      songAlbumName.innerText = "Album name"
      dataSongOrder.innerText = parseInt(song.pos) + 1
      dataSongArtistName.innerText = song.artist_name
      dataSongTrackName.innerText = song.track_name
      dataSongAlbumName.innerText = song.album_name
    }
  }
}
