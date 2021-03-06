import axios from 'axios';

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
    console.error('Error en getAccessToken: ', error.message);
  }
}

export const getSpotifyUser = async function () {
  try {
    const user = await axios(`https://api.spotify.com/v1/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('playerToken'),
      }
    });

    return {
      name: user.data.display_name,
      photo: user.data.images[0].url,
    }

  } catch (error) {
    console.error('Usuario NO Premium', error.message);
  }
}

export const getHomeData = async function () {
  try {
    const topArtist = await getTopArtists();
    const topAlbums = await getTopAlbums();

    return {
      artists: topArtist,
      albums: topAlbums,
    }
  } catch (error) {
    console.error('Error en getHomeData: ', error.message);
  }
}

export const getArtistData = async function (artist) {
  try {
    // Nombre, Número de seguidores, Imágen de Fondo en caso de que no se encuentre en la API de 'theaudiodb'.
    const info = await axios(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
      }
    });

    // Imágen de Fondo. OBS: Sino existe retorna null.
    const backgroundImg = await axios(`https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`);

    const albumsData = await getAlbums(artist);
    const tracksData = await getTopTenTracks(artist);

    artist = artist === 'Oasis' ? 'Oasis (banda)' : artist;
    const biography = await axios(`https://es.wikipedia.org/api/rest_v1/page/summary/${artist}`);

    const background = backgroundImg.data.artists !== null && backgroundImg.data.artists[0].strArtistFanart !== null
      ? backgroundImg.data.artists[0].strArtistFanart
      : info.data.artists.items[0].images[0].url;

    const artistData = {
      artist: info.data.artists.items[0].name,
      followers: new Intl.NumberFormat('es-AR').format(info.data.artists.items[0].followers.total),
      biography: biography.data?.extract || null,
      backgroundImg: background,
      albums: albumsData, // []
      tracks: tracksData, // []
    };

    return artistData;

  } catch (error) {
    console.error('Error en getArtistaData', error.message);
  }
}

export const getAlbumData = async function (artist, albumTitle) {
  try {
    const album = await axios(`https://api.spotify.com/v1/search?q=${artist} ${albumTitle}&type=track&limit=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
      }
    });
    if (album.data.tracks.items.length === 0) throw new Error('Album no disponible...');

    // Obtener el id del album para obtener los tracks.
    const albumId = album.data.tracks.items[0].album.id;

    const albumTracks = await axios(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
      }
    });

    const tracks = albumTracks.data.items
      .map(track => {
        return {
          type: 'album',
          trackTitle: track.name,
          trackNumber: track.track_number,
          duration: track.duration_ms,
          trackURI: track.uri,
        }
      });

    const albumData = {
      artist: album.data.tracks.items[0].artists[0].name,
      title: album.data.tracks.items[0].album.name,
      imgURL: album.data.tracks.items[0].album.images[0].url,
      releaseDate: album.data.tracks.items[0].album.release_date.slice(0, 4), // Solamente el año.
      totalTracks: album.data.tracks.items[0].album.total_tracks,
      albumURI: album.data.tracks.items[0].album.uri, // URI que reproduce todos los tracks.
      tracks: tracks,
    }

    return albumData;

  } catch (error) {
    console.error('Error en getAlbumData', error.message);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Retorna un array con el nombre de 15 artistas Top aleatorios. // ["artist", "artist", ...]
const getRandomTopArtist = async function () {
  try {
    const artists = await axios(`https://api.spotify.com/v1/search?q=genre:"rock"&type=artist&limit=50`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
      }
    }); // [{artist}, {artist}, ...]

    const poorImgQuality = ['Lynyrd Skynyrd', 'Queen', 'AC/DC', 'Nirvana', 'Weezer', 'Pink Floyd', 'Grateful Dead', 'Creedence Clearwater Revival', 'Chase Atlantic'];

    return artists.data.artists.items
      .sort(() => Math.random() - 0.5) // Ordenar aleatoriamente los elementos de un array.
      .slice(0, 15)
      .map(artist => artist.name)
      .filter(artist => !poorImgQuality.includes(artist));

  } catch (error) {
    console.error('Error en getRandomTopArtist: ', error.message);
  }
}

const getArtistId = async function (artist) {
  try {
    const artistId = await axios(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
      }
    });

    if (artistId.data.artists.items.length === 0) throw new Error('Artista no encontrado...');

    return artistId.data.artists.items[0].id;

  } catch (error) {
    console.error('Error en getArtistId', error.message);
  }
}

const getTopTenTracks = async function (artist) {
  try {
    const idArtist = await getArtistId(artist);

    const topTracks = await axios(`https://api.spotify.com/v1/artists/${idArtist}/top-tracks?market=US`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
      }
    }); // [{track}, {track}, ...]

    return topTracks.data.tracks
      .map(track => {
        return {
          type: 'track',
          artist: track.artists[0].name,
          album: track.album.name,
          imgAlbumURL: track.album.images[2].url,
          trackTitle: track.name,
          trackURI: track.uri,
          duration: track.duration_ms,
        }
      });

  } catch (error) {
    console.error('Error en getTopTenTracks: ', error.message);
  }
}

// Retorna "todos" los albumes oficiales de un Artista.
const getAlbums = async function (artist) {
  try {
    const artistId = await getArtistId(artist);

    const albums = await axios(`https://api.spotify.com/v1/artists/${artistId}/albums?market=US&limit=30`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
      }
    });

    // if (albums.data?.error) {
    //   throw new Error('ERROR: NO se encontraron albumes del artista!');
    // }

    let hash = {};

    return albums.data.items
      .filter(album => album.album_type === 'album')
      .sort(() => Math.random() - 0.5) // Ordenar aleatoriamente los elementos de un array.
      .slice(0, 30)
      .map(album => {
        return {
          album: album.name,
          imgURL: album.images[0].url,
        }
      })
      .filter(element => hash[element.album] ? false : hash[element.album] = true); // Eliminar albumes duplicados. 

  } catch (error) {
    console.error('Error en getAlbums: ', error.message);
  }
}

const getTopArtists = async function () {
  try {
    const artists = await getRandomTopArtist(); // ["artist", "artist", ...]

    const artistsPromise = artists.map(artist => axios(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
      }
    })); // [Promise, Promise, ...]

    const artistsData = await Promise.all(artistsPromise); // [{artist}, {artist}, ...]

    return artistsData
      .map(item => {
        return {
          artist: item.data.artists.items[0].name,
          imgURL: item.data.artists.items[0].images[1].url,
          followers: new Intl.NumberFormat('es-AR').format(+item.data.artists.items[0].followers.total) + ' suscriptores',
        }
      });

  } catch (error) {
    console.error('Error en getTopArtists: ', error.message);
  }
}

// Retorna de 15 artistas Top aleatorios, 1 de sus 3 mejores albumes aleatoriamente. 
const getTopAlbums = async function () {
  try {
    const randomAlbum = Math.floor((Math.random() * (2 - 0 + 1)) + 0); // Entero aleatorio entre 0 y 2 inclusive.

    const artists = await getRandomTopArtist(); // ["artist", "artist", ...]

    const artistPromise = artists.map(artist => axios(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
      }
    })); // [Promise, Promise, ...]

    const artistsData = await Promise.all(artistPromise); // [{artist}, {artist}, ...]

    const albumsPromise = artistsData.map(artist => axios(`https://api.spotify.com/v1/artists/${artist.data.artists.items[0].id}/albums?market=US&limit=3`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
      }
    })); // [Promise, Promise, ...]

    const albumsData = await Promise.all(albumsPromise); // [{album}, {album}, ...]

    return albumsData
      .map(album => {
        return {
          artist: album.data.items[0].artists[0].name,
          album: album.data.items[randomAlbum].name,
          imgURL: album.data.items[randomAlbum].images[1].url,
        }
      });

  } catch (error) {
    console.error('Error en getTopAlbums', error.message);
  }
}