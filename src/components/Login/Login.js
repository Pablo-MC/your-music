import classes from './Login.module.css';
import Container from '../UI/Container';

import login from '../../assets/login.jpg';

const Login = (props) => {

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  return (
    <Container>
      <div className={classes.login}>
        <img src={login} alt='Music Logo' />
        <p>Para acceder a la aplicación debes ingresar a tu cuenta premium de Spotify haciendo click en el siguiente botón</p>
        <a
          href={AUTH_URL}
          className={classes.btn}
          onClick={() => props.onLogin()}
        >Login Spotify</a>
      </div>
    </Container>
  );
}

export default Login;

// Autorización de Spotify: https://developer.spotify.com/documentation/general/guides/authorization-guide/
// En producción, establecer en REACT_APP_REDIRECT_URI la url del hosting y tambien en el dashboard de la aplicación creada en Spotify.