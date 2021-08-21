import { useParams, useHistory } from 'react-router';
import classes from './Notification.module.css';

const Notification = () => {
  const params = useParams();
  const history = useHistory();

  return (
    <div className={classes.notification}>
      <h2>{params.msg}</h2>
      {params.msg !== 'Token expired...' && <button onClick={() => history.go(-2)}>◀ &#x2063; Regresar</button>}
      {/* <button onClick={() => closeCurrentWindow()}>Salir</button> */}
    </div>
  );
}

export default Notification;

// HACER: Implementar mensaje cuando el token expira. (Cerrar la aplicacion).