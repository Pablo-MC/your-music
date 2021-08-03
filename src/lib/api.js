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
        artist: i.artists[0].strArtist, // nombre artista
        imgURL: i.artists[0].strArtistThumb,
        subscribers: new Intl.NumberFormat('es-AR').format(+i.artists[0].idArtist) + ' suscriptores', // Número de subscriptores ficticio.  
      }]);

  } catch (error) {
    console.error(error.message);
  }
}

// Obtener de 15 artistas Top aleatorios, 1 de sus 3 mejores albumes aleatoriamente. 
export const getTopAlbums = async function () {
  try {
    const artists = await getRandomTopArtist(); // ["David Bowie", "Tyler, the Creator", "Eminem", ...]

    const albumsPromise = artists
      .map(artist => fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=4`).then(res => res.json())); // [Promise, Promise, ...]

    const albumsData = await Promise.all(albumsPromise); // [{topalbums}, {topalbums}, ...]

    const randomAlbum = Math.floor((Math.random() * (3 - 0 + 1)) + 0);

    return albumsData
      .flatMap(album => [{
        artist: album.topalbums.album[randomAlbum].artist.name,
        album: album.topalbums.album[randomAlbum].name,
        imgURL: album.topalbums.album[randomAlbum].image[3]['#text'],
      }]);

  } catch (error) {
    console.error(error.message);
  }
}

export const getArtistData = async function (artist) {
  try {
    // Imágen de Fondo. OBS: Sino existe la foto entonces retornar un mensaje de que el artista no fue encontrado.
    const imgBackground = await axios(`https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`);
    // if (!imgBackground.ok) throw new Error(`El artista no fue encontrado. Error ${imgBackground.status}`)

    // Nombre, Biografía, Cantidad de oyentes.
    const info = await axios(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`);
    if (!info.data.artist.bio.summary) return;

    const albumsData = await getTopTenAlbums(artist);

    const tracksData = await getTopTenTracks(artist);

    const artistData = {
      imgBackURL: imgBackground.data.artists[0].strArtistFanart,
      artist: info.data.artist.name,
      biography: info.data.artist.bio?.summary,
      listeners: info.data.artist.stats.listeners,
      albums: albumsData, // []
      tracks: tracksData, // []
    };

    return artistData;

  } catch (error) {
    console.error('No se encontró informacion sobre el artista', error.message);
  }
}

///////////////////////////////////////////////////////

// Retorna un array con el nombre (string) de 15 artistas Top aleatorios.
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

// Retorna un array de objetos con la informacion de las 10 mejores canciones de un artista:
const getTopTenTracks = async function (artist) {
  try {
    const topTenTracksList = await axios(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=10`); // ['trackName', 'trackName', ...]

    const tracksPromise = topTenTracksList.data.toptracks.track
      .map(track => fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&artist=${artist}&track=${track.name}&format=json`).then(res => res.json())); // [Promise, Promise, ...]

    const tracks = await (await Promise.all(tracksPromise))
      .filter(track => track.track.album !== undefined)
      .flatMap(track => [
        {
          artist: track.track.artist?.name,
          track: track.track.name,
          duration: track.track.duration,
          album: track.track.album?.title,
          imgURL: track.track.album?.image[3]['#text'],
        }
      ]);

    return tracks; // [{track}, {track}, ...]

  } catch (error) {
    console.log(error.message);
  }
}

// Retorna un array de objetos con la informacion de los 10 mejores albumes de un artista:
const getTopTenAlbums = async function (artist) {
  try {
    const topTenAlbumsList = await axios(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=10`);

    const albumsData = topTenAlbumsList.data.topalbums.album
      .flatMap(album => [{ album: album.name, imgURL: album.image[3]['#text'] }])
      .filter(album => album.imgURL !== '');

    return albumsData;

  } catch (error) {
    console.log(error.message);
  }
}