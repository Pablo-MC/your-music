import classes from './AlbumInfo.module.css';
import { Link } from 'react-router-dom';

import Container from '../UI/Container';

const AlbumInfo = (props) => {

  const { artist, title, totalTracks, releaseDate, imgURL, albumURI } = props.info;

  const playAlbumHandler = (album) => {
    props.onPlayAlbum(album);
  }

  return (
    <Container>
      <div className={classes.album}>
        <img src={imgURL} alt={title} />
        <div className={classes.content}>
          <h2>{title}</h2>
          <Link to={`/artist/${artist}`}>{artist}</Link> <span>{`• ${releaseDate}`}</span>
          <p>{`${totalTracks}  canciones`}</p>
          <button onClick={() => playAlbumHandler(albumURI)}>Reproducir</button>
          <button>Quitar de la Biblioteca</button>
        </div>
      </div>
    </Container>
  );
}

export default AlbumInfo;