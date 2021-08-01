import classes from './ArtistInfo.module.css';

import Container from '../UI/Container';

const ArtistInfo = (props) => {

  // Aplicar filtro en la request para TODAS las propiedades en caso de que no existan!. (.name, .biography, .listeners, .imgBackURL)
  const { name, biography, listeners, imgBackURL } = props.data;

  const background = {
    backgroundImage: `url(${imgBackURL})`,
    backgroundSize: 'cover',
    height: '60vh',
    boxShadow: 'inset 0 -22px 90px 100px #030303', // Averiguar cómo hacer para que no se vea el border-buttom.

    // Seguir probando para ver cuál queda mejor!.

    // backgroundAttachment: 'fixed',
    // backgroundSize: 'initial',
    // backgroundSize: 'contain',
    // backgroundSize: 'auto',
    // backgroundPosition: 'center',
    // backgroundPosition: 'top',
    // backgroundRepeat: 'no-repeat',
    // height: '100vh',
    // height: '70vh',
    // position: 'relative',
    // boxShadow: 'inset 0 -22px 40px 48px #030303', // Averiguar cómo hacer para que no se vea el border-buttom.
    // opacity: '80%',
    // marginTop: '10rem' // Probar!.

    /*
     backgroundImage: `linear-gradient(
      to right bottom,
      rgba(235, 151, 78, 0.35),
      rgba(230, 125, 34, 0.35)
    ),
    url(${imgBackURL})`;
    */
  };

  return (
    <section style={background}>
      <Container>
        <div className={classes.content}>
          <h2>{name}</h2>
          <p>{biography}</p>
          {/* Agregar acá la opción de exapandir/contraer la biografía 'MÁS/MENOS'*/}
          <div>
            <button>Aleatorio</button>
            <button>Radio</button>
            <button>Suscriptores {`${listeners}`}</button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ArtistInfo;