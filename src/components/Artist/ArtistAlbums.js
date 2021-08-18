import classes from './ArtistAlbums.module.css';
import Container from '../UI/Container';
import Carousel from '../Layout/Carousel/Carousel';

const ArtistAlbums = ({ albums }) => {
  return (
    <Container>
      <div className={classes.albums}>
        <h2>Álbumes</h2>
        <Carousel
          items={albums}
          category='albums'
        />
      </div>
    </Container>
  );
}

export default ArtistAlbums;