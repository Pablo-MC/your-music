import { useState, useEffect, Fragment } from 'react';
import { getTopArtists, getTopAlbums } from '../lib/api';

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