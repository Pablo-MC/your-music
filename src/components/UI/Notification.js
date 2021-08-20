import { useParams } from 'react-router';
import classes from './Notification.module.css';

const Notification = () => {
  const params = useParams();

  return (
    <div className={classes.notification}>
      <h2>{params.msg}</h2>
      <button onClick={() => window.history.back()}>◀ &#x2063; Regresar</button>
      {/* <button onClick={() => closeCurrentWindow()}>Salir</button> */}
    </div>
  );
}

export default Notification;

// HACER: Implementar mensaje cuando el token expira. (Cerrar la aplicacion).
