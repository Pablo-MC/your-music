import classes from './ArtistInfo.module.css';
import Container from '../UI/Container';

const ArtistInfo = (props) => {

  const { artist, biography, followers, backgroundImg } = props.info;

  return (
    <div style={{ backgroundImage: `url(${backgroundImg})` }} className={classes.background}>
      <Container>
        <div className={classes.content}>
          <h2>{artist}</h2>
          <p>{biography}</p>
          {/* Agregar acá la opción de exapandir/contraer la biografía 'MÁS/MENOS'*/}
          <div>
            <button>Aleatorio</button>
            <button>Radio</button>
            <button>{`Suscriptores 🎵 ${followers}`}</button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ArtistInfo;