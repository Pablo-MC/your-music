import Container from '../UI/Container';
import Carousel from '../Layout/Carousel/Carousel';

import classes from './AlbumList.module.css';

const AlbumList = ({ albums }) => {
  return (
    <Container>
      <section className={classes.albums}>
        <h2>Álbumes</h2>
        <Carousel
          items={albums}
          category='albums'
        />
      </section>
    </Container>
  );
}

export default AlbumList;