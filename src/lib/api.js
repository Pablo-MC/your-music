import axios from 'axios';

export const getTopArtists = async function () {
  try {
    const page = Math.floor((Math.random() * (4 - 1 + 1)) + 1);
    const res = await axios(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${process.env.REACT_APP_API_KEY}&format=json&page=${page}`);

    const artists = res.data.artists.artist
      .sort(() => Math.random() - 0.5) // Ordenar aleatoriamente los elementos de un array.
      .slice(0, 20)
      .flatMap(artist => fetch(`https://theaudiodb.com/api/v1/json/1/search.php?s=${artist.name}`).then(res => res.json())) // artists => [Promise, Promise, ...]

    const artistsData = await Promise.all(artists); // [{artist1}, {artist2}, ...]

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