import classes from './ArtistInfo.module.css';

import Container from '../UI/Container';

const ArtistInfo = (props) => {
  const { name, biography, listeners, imgBackURL } = props.data;

  console.log(props.data);

  const background = {
    backgroundImage: `url(${imgBackURL})`,
    backgroundSize: 'cover',
    height: '100vh'
  };

  return (
    <section style={background}>
      <Container>
        <div className={classes.content}>
          <h2>{name}</h2>
          <p>{biography}</p>
          <div>
            <button>Aleatorio</button>
            <button>Radio</button>
            <button>Suscritores {`${listeners}`}</button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ArtistInfo;