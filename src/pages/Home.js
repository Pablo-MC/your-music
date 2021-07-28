import Container from "../components/UI/Container";
import Category from "../components/Layout/Category/Category";

import photo from '../assets/pablo.jpg';

const Home = () => {

  const data = [
    { id: '1', img: photo, artist: 'Diego Torres', subscribers: '674,000 suscriptores' },
    { id: '2', img: photo, artist: 'Diego Torres', subscribers: '674,000 suscriptores' },
    { id: '3', img: photo, artist: 'Diego Torres', subscribers: '674,000 suscriptores' },
    { id: '4', img: photo, artist: 'Diego Torres', subscribers: '674,000 suscriptores' },
    { id: '5', img: photo, artist: 'Diego Torres', subscribers: '674,000 suscriptores' },
    { id: '6', img: photo, artist: 'Diego Torres', subscribers: '674,000 suscriptores' },
    { id: '7', img: photo, artist: 'Diego Torres', subscribers: '674,000 suscriptores' },
    { id: '8', img: photo, artist: 'Diego Torres', subscribers: '674,000 suscriptores' }
  ];

  return (
    <main>
      <Container>
        <Category
          title='Artistas populares'
          items={data}
        />
        <Category
          title='Tu música para el atardecer'
          items={data}
        />
      </Container>
    </main>
  );
}

export default Home;