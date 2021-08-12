import axios from 'axios';

// Parámetros rqueridos para cada solicitud GET a la API de Spotify. 
const parameters = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
  }
}

// Obtener el token de acceso para hacer las solicitudes a la API de Spotify. OBS: expira en 1hr
// Client Credentials Flow: https://developer.spotify.com/documentation/general/guides/authorization-guide/
export const getAccessToken = async function () {
  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`).toString('base64')),
      },
      body: 'grant_type=client_credentials',
    });

    const data = await res.json();

    return data.access_token;

  } catch (error) {
    console.log(error.message);
  }
}

export const getTopArtists = async function () {
  try {
    const artists = await getRandomTopArtist(); // ["David Bowie", "Tyler, the Creator", "Eminem", ...]

    const artistsPromise = artists
      .map(artist => fetch(`https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`).then(res => res.json())); // [Promise, Promise, ...]

    const artistsData = await Promise.all(artistsPromise); // [{artist}, {artist}, ...]

    return artistsData
      .filter(item => item.artists !== null)
      .flatMap(item => [{
        artist: item.artists[0].strArtist, // nombre artista
        imgURL: item.artists[0].strArtistThumb,
        subscribers: new Intl.NumberFormat('es-AR').format(+item.artists[0].idArtist) + ' suscriptores', // Número de subscriptores ficticio.  
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

export const getAlbumData = async function (artist, albumTitle) {
  try {
    const albumData = await fetch(`https://api.spotify.com/v1/search?q=${artist} ${albumTitle}&type=track&limit=1`, parameters).then(res => res.json());

    const id_album = albumData.tracks.items[0].album.id;

    const albumTracks = await fetch(`https://api.spotify.com/v1/albums/${id_album}/tracks?limit=50`, parameters).then(res => res.json());

    // const tracks = albumTracks.items
    //   .map(track => {
    //     return {
    //       type: 'album',
    //       trackTitle: track.name,
    //       trackNumber: track.track_number,
    //       duration: track.duration_ms,
    //       trackURI: track.uri,
    //     }
    //   });

    const tracks = albumTracks.items
      .flatMap(track => [
        {
          type: 'album',
          trackTitle: track.name,
          trackNumber: track.track_number,
          duration: track.duration_ms,
          trackURI: track.uri,
        }
      ]);

    const album = {
      artist: albumData.tracks.items[0].artists[0].name,
      title: albumData.tracks.items[0].album.name,
      imgURL: albumData.tracks.items[0].album.images[0].url,
      releaseDate: albumData.tracks.items[0].album.release_date.slice(0, 4), // Solamente el año.
      totalTracks: albumData.tracks.items[0].album.total_tracks,
      albumURI: albumData.tracks.items[0].album.uri,
      tracks: tracks,
    }

    return album;

  } catch (error) {
    console.log(error.message);
  }
}

/////////////////////////////////////////////////////////////////////////

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


// Retorna el id del Artista. OBS: Tambien posee: CANTIDAD DE SEGUIDORES, tipos de genero musicales, imagenes (NO muy buenas), etc.
const getArtistId = async function (artist) {
  try {
    const artistId = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`, parameters).then(res => res.json());

    return artistId.artists.items[0].id;

  } catch (error) {
    console.log(error.message);
  }
}

// Retorna las 10 mejores canciones de un Artista.
const getTopTenTracks = async function (artist) {
  try {
    const idArtist = await getArtistId(artist);

    const topTracks = await fetch(`https://api.spotify.com/v1/artists/${idArtist}/top-tracks?market=US`, parameters).then(res => res.json());

    return topTracks.tracks.flatMap(track => [
      {
        type: 'track',
        artist: track.artists[0].name,
        album: track.album.name,
        imgAlbumURL: track.album.images[2].url,
        trackTitle: track.name,
        trackURI: track.uri,
        duration: track.duration_ms,
      }
    ]);

  } catch (error) {
    console.log(error.message);
  }
}

// Retorna 10 albumes de un Artista.
const getTopTenAlbums = async function (artist) {
  try {
    const artistId = await getArtistId(artist);

    const albums = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?market=US&limit=30`, parameters).then(res => res.json());

    let hash = {};

    return albums.items
      .filter(album => album.album_type === 'album')
      .sort(() => Math.random() - 0.5) // Ordenar aleatoriamente los elementos de un array.
      .slice(0, 10)
      .flatMap(album => [
        {
          // artist: album.artists[0].name,
          // idAlbum: album.id,
          album: album.name,
          imgURL: album.images[0].url,
          releaseDate: album.release_date,
          totalTracks: album.total_tracks,
          albumURI: album.uri,
        }
      ])
      .filter(element => hash[element.album] ? false : hash[element.album] = true); // Elimina objetos duplicados que poseen el mismo valor de la propiedad album. 

  } catch (error) {
    console.log(error.message);
  }
}

// export const getSearchArtist = async function (artist) {
//   try {
//     const artistId = await getArtistId(artist);

//     const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, parameters).then(res => res.json());

//     // console.log(res.name);

//     return res.name

//   } catch (error) {
//     console.log('Entre aca!', error.message);
//   }
// }