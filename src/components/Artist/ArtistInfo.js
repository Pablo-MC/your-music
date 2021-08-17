import classes from './ArtistInfo.module.css';

import Container from '../UI/Container';

const ArtistInfo = (props) => {

  const { artist, biography, followers, backgroundImg } = props.info;

  const background = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    height: '60vh',
    boxShadow: 'inset 0 -22px 90px 100px #030303', // Averiguar cómo hacer para que no se vea el border-buttom.
    // backgroundAttachment: 'fixed',
    // opacity: '80%',
  };

  return (
    <div style={background}>
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