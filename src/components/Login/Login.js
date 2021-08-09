import Container from '../UI/Container';

const Login = (props) => {

  // Autorización de Spotify: https://developer.spotify.com/documentation/general/guides/authorization-guide/

  const client_id = '8770d9edb0a349119d068564de97ad04';
  const redirect_uri = 'http://localhost:3000';

  // En producción, establecer en redirect_uri la url del hosting y tambien en el dashboard de la aplicación creada en Spotify.
  // const redirect_uri = ...

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

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