import { useState, useEffect } from 'react';
import { getAccessToken, getHomeData } from '../lib/api';

import Container from '../components/UI/Container';
import Spinner from '../components/UI/Spinner';
import Carousel from '../components/Layout/Carousel/Carousel';

const Home = () => {
  const [data, setData] = useState({});
  const [spinner, setSpinner] = useState(true);

  setTimeout(async () => {
    if (localStorage.getItem('accessToken') === null) {
      // Almacenar el valor de 'access_token' (query string) de la URL en localStorage para usar el reproductor de Spotify.
      const url = window.location.hash;
      const playerToken = url.slice(url.indexOf('=') + 1, url.indexOf('&'));
      localStorage.setItem('playerToken', playerToken);
      // Almacenar el token en localStorage para realizar las solicitudes a la API de Spotify.
      localStorage.setItem('accessToken', await getAccessToken());
    }
  }, 1000);

  useEffect(() => {
    setTimeout(() => {
      async function fetchData() {
        const data = await getHomeData();
        setData(data);
      }
      fetchData();

      setTimeout(() => {
        setSpinner(false);
      }, 2000);
    }, 1500);
  }, []);

  console.log(data);

  return (
    <main>
      {spinner ? <Spinner /> : (Object.keys(data.artists || {}).length !== 0 && Object.keys(data.albums || {}).length !== 0) &&
        <Container>
          <Carousel
            title='Artistas populares'
            items={data.artists}
            category='artists'
          />
          <Carousel
            title='Tu música para el atardecer'
            items={data.albums}
            category='albums'
          />
          {/* <Category
              title='Videos musicales recomendados'
              items={videos}
            /> */}
        </Container>
      }
    </main >
  );
}

export default Home;