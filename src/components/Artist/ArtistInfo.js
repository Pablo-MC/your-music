import classes from './ArtistInfo.module.css';
import Container from '../UI/Container';

import shuffle from '../../assets/shuffle.svg';
import radio from '../../assets/radio.svg';
import music from '../../assets/music.svg';

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
            <button><img src={shuffle} alt='play' />Aleatorio</button>
            <button><img src={radio} alt='radio' />Radio</button>
            {/* <button>{`Suscriptores ${followers}`}</button> */}
            {/* <button>{`Suscriptores 🎵 ${followers}`}</button> */}
            <button>Suscriptores <img src={music} alt='radio' />{followers}</button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ArtistInfo;