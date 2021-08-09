import Container from '../UI/Container';

const Login = (props) => {

  // Autorización de Spotify: https://developer.spotify.com/documentation/general/guides/authorization-guide/

  // En producción, establecer en REACT_APP_REDIRECT_URI la url del hosting y tambien en el dashboard de la aplicación creada en Spotify.

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  return (
    <Container>
      <p style={{ color: '#fff' }}>Para acceder a la aplicación debes acceder a tu cuenta premium de Spotify haciendo click en el siguiente boton</p>
      <a
        href={AUTH_URL}
        onClick={() => props.onLogin()}
      >Login Spotify</a>
    </Container>
  );
}

export default Login;