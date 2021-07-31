import axios from 'axios';

export const getTopArtists = async function () {
  try {
    const artists = await getRandomTopArtist(); // ["David Bowie", "Tyler, the Creator", "Eminem", ...]

    const artistsPromise = artists
      .map(artist => fetch(`https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`).then(res => res.json())); // [Promise, Promise, ...]

    const artistsData = await Promise.all(artistsPromise); // [{artist}, {artist}, ...]

    return artistsData
      .filter(item => item.artists !== null)
      .flatMap(i => [{
        id: i.artists[0].idArtist,
        name: i.artists[0].strArtist,
        imgURL: i.artists[0].strArtistThumb,
        subscribers: new Intl.NumberFormat('es-AR').format(+i.artists[0].idArtist) + ' suscriptores',
      }]);

  } catch (error) {
    console.error(error.message);
  }
}

export const getTopAlbums = async function () {
  try {
    const artists = await getRandomTopArtist(); // ["David Bowie", "Tyler, the Creator", "Eminem", ...]

    const albumsPromise = artists
      .map(artist => fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=4`).then(res => res.json())); // [Promise, Promise, ...]

    const albumsData = await Promise.all(albumsPromise); // [{topalbums}, {topalbums}, ...]

    const randomAlbum = Math.floor((Math.random() * (3 - 0 + 1)) + 0);

    return albumsData
      .flatMap(album => [{
        id: album.topalbums.album[randomAlbum].artist.name,
        artist: album.topalbums.album[randomAlbum].artist.name,
        album: album.topalbums.album[randomAlbum].name,
        imgURL: album.topalbums.album[randomAlbum].image[3]['#text']
      }]);

  } catch (error) {
    console.error(error.message);
  }
}

export const getArtistData = async function (artist) {
  try {
    // Imágen de Fondo. OBS: Sino existe la foto entonces retornar un mensaje de que el artista no fue encontrado.
    const imgBackground = await axios(`https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`)
    // if (!imgBackground.ok) throw new Error(`El artista no fue encontrado. Error ${imgBackground.status}`)

    // Nombre, Biografía, Cantidad de oyentes.
    const info = await axios(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)

    // Lista de las 10 mejores canciones:
    const topTenTracksList = await axios(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=10`); // ['trackName', 'trackName', ...]

    const tracksPromise = topTenTracksList.data.toptracks.track
      .map(song => fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&artist=${artist}&track=${song.name}&format=json`).then(res => res.json())); // [Promise, Promise, ...]

    const tracksData = await Promise.all(tracksPromise); // [{track}, {track}, ...]

    const artistData = {
      imgBackURL: imgBackground.data.artists[0].strArtistFanart,
      name: info.data.artist.name,
      biography: info.data.artist.bio.summary,
      listeners: info.data.artist.stats.listeners,
      tracks: tracksData
    };

    return artistData;

  } catch (error) {
    console.error(error.message);
  }
}

//////////////////////////////////////////////
const getRandomTopArtist = async function () {
  try {
    const page = Math.floor((Math.random() * (4 - 1 + 1)) + 1);

    const res = await axios(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${process.env.REACT_APP_API_KEY}&format=json&page=${page}`);

    const artists = res.data.artists.artist
      .sort(() => Math.random() - 0.5) // Ordenar aleatoriamente los elementos de un array.
      .slice(0, 15)
      .map(artist => artist.name);

    return artists; // ["David Bowie", "Tyler, the Creator", "Eminem", ...]

  } catch (error) {
    console.error(error.message);
  }
}