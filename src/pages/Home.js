import { useEffect, useState } from 'react';
import { getTopArtists } from '../lib/api';

import Container from "../components/UI/Container";
import Category from "../components/Layout/Category/Category";

const Home = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const artistsData = await getTopArtists();
      setArtists(artistsData);
    }
    fetchData()
  }, []);


  return (
    <main>
      <Container>
        <Category
          title='Artistas populares'
          items={artists}
        />
        {/* <Category
          title='Tu música para el atardecer'
          items={artists}
        /> */}
      </Container>
    </main>
  );
}

export default Home;