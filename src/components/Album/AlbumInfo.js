import classes from './AlbumInfo.module.css';
import { Link } from 'react-router-dom';

import Container from '../UI/Container';

import play from '../../assets/play_black.svg';
import library from '../../assets/library.svg';

const AlbumInfo = (props) => {
  const { artist, title, totalTracks, releaseDate, imgURL, albumURI } = props.info;

  const playAlbumHandler = () => {
    props.onPlayAlbum(albumURI);
  }

  return (
    <Container>
      <div className={classes.album}>
        <img src={imgURL} alt={title} />
        <div className={classes.content}>
          <h2>{title}</h2>
          <Link to={`/artist/${artist}`}>{artist}</Link> <span>{`• ${releaseDate}`}</span>
          <p>{`${totalTracks} canciones`}</p>
          <button onClick={playAlbumHandler}><img src={play} alt='play' />Reproducir</button>
          <button><img src={library} alt='library' />Agregar a la Biblioteca</button>
        </div>
      </div>
    </Container>
  );
}

export default AlbumInfo;