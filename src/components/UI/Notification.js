import { Fragment } from 'react';
import { useParams, useHistory } from 'react-router';
import classes from './Notification.module.css';

import login from '../../assets/login.jpg';

const Notification = () => {
  const params = useParams();
  const history = useHistory();

  return (
    <div className={classes.notification}>
      {params.msg === 'Token expired...'
        ?
        <Fragment>
          <img src={login} alt='logo' />
          <p><span>El tiempo de uso de la aplicación ha finalizado.</span> <br /> Si desea continuar usando la aplicación, cierre el navegador y vuelva a ingresar.</p>
        </Fragment>
        :
        <Fragment>
          <h2>{params.msg}</h2>
          <button onClick={() => history.go(-2)}>◀ &#x2063; Regresar</button>
        </Fragment>
      }
    </div>
  );
}

export default Notification;

// HACER: Implementar mensaje cuando el token expira. (Cerrar la aplicacion).