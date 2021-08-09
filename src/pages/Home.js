import { useState, useEffect, Fragment } from 'react';
import { getTopArtists, getTopAlbums, getAccessToken } from '../lib/api';

import Container from '../components/UI/Container';
import Carousel from '../components/Layout/Carousel/Carousel';

const Home = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const artistsData = await getTopArtists();
      const albumsData = await getTopAlbums();
      setArtists(artistsData);
      setAlbums(albumsData);
    }
    fetchData()

  }, []);

  setTimeout(async () => {
    if (localStorage.getItem('accessToken') === null) {
      // Almacenar el valor de 'access_token' (query string) de la URL en localStorage para usar el reproductor de Spotify.
      const url = window.location.hash;
      const playerToken = url.slice(url.indexOf('=') + 1, url.indexOf('&'));
      localStorage.setItem('playerToken', playerToken);

      // Almacenar el token en localStorage para realizar las solicitudes a la API de Spotify.
      localStorage.setItem('accessToken', await getAccessToken());
      console.log('lo guarde!');
    }
  }, 3000);

  return (
    <main>
      <Container>
        {artists.length !== 0 && albums.length !== 0 &&
          <Fragment>
            <Carousel
              title='Artistas populares'
              items={artists}
              category='artists'
            />
            <Carousel
              title='Tu música para el atardecer'
              items={albums}
              category='albums'
            />
            {/* <Category
              title='Videos musicales recomendados'
              items={videos}
            /> */}
          </Fragment>
        }
      </Container>
    </main>
  );
}

export default Home;