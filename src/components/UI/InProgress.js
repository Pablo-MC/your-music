import classes from './InProgress.module.css';
import programming from '../../assets/programming.svg';

const InProgress = () => {
  return (
    <div className={classes.progress}>
      <h2>¡Próximamente!</h2>
      <img src={programming} alt='In progress' />
    </div>
  );
}

export default InProgress;