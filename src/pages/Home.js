import { useEffect, useState } from 'react';
import { getTopArtists, getTopAlbums } from '../lib/api';

import Container from "../components/UI/Container";
import Category from "../components/Layout/Category/Category";

// import axios from 'axios';

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

  ////////////////////////////////////////////////////////////////////








  return (
    <main>
      <Container>
        <Category
          title='Artistas populares'
          items={artists}
          imgStyle='artist'
        />
        <Category
          title='Tu música para el atardecer'
          items={albums}
          imgStyle='album'
        />
        {/* <Category
          title='Videos musicales recomendados'
          items={videos}
        /> */}
      </Container>
    </main>
  );
}

export default Home;