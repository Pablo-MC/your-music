import axios from 'axios';

export const getTopArtists = async function () {
  try {
    const artists = await getRandomTopArtist();

    const artistPromises = artists
      .map(artist => fetch(`https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`).then(res => res.json())) // artistPromises => [Promise, Promise, ...]

    const artistsData = await Promise.all(artistPromises); // [{artist1}, {artist2}, ...]

    return artistsData
      .filter(item => item.artists !== null)
      .flatMap(i => [{
        id: i.artists[0].idArtist,
        name: i.artists[0].strArtist,
        imgURL: i.artists[0].strArtistThumb,
        subscribers: new Intl.NumberFormat('es-AR').format(+i.artists[0].idArtist) + ' suscriptores',
      }]);

  } catch (error) {
    console.log(error.message);
  }
}

export const getTopAlbums = async function () {
  try {
    const artists = await getRandomTopArtist();

    const albumPromises = artists.map(artist => fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=4`).then(res => res.json())); // albumPromises => [Promise, Promise, ...]

    const albumsData = await Promise.all(albumPromises); // [{topalbums}, {topalbums}, ...]

    const randomAlbum = Math.floor((Math.random() * (3 - 0 + 1)) + 0);

    return albumsData
      .flatMap(album => [{
        id: album.topalbums.album[randomAlbum].artist.name,
        artist: album.topalbums.album[randomAlbum].artist.name,
        album: album.topalbums.album[randomAlbum].name,
        imgURL: album.topalbums.album[randomAlbum].image[3]['#text']
      }]);

  } catch (error) {
    console.log(error.message);
  }
}

const getRandomTopArtist = async function () {
  try {
    const page = Math.floor((Math.random() * (4 - 1 + 1)) + 1);
    const res = await axios(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${process.env.REACT_APP_API_KEY}&format=json&page=${page}`);

    const artists = res.data.artists.artist
      .sort(() => Math.random() - 0.5) // Ordenar aleatoriamente los elementos de un array.
      .slice(0, 15)
      .map(artist => artist.name); // ["David Bowie", "Tyler, the Creator", "Eminem", ...]

    return artists;

  } catch (error) {
    console.log(error.message);
  }
}