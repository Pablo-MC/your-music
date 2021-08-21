import classes from './Spinner.module.css'; // https://tobiasahlin.com/spinkit/

const Spinner = () => {
  return (
    <div className={classes.spinner}>
      <div className={classes.bounce1}></div>
      <div className={classes.bounce2}></div>
      <div className={classes.bounce3}></div>
    </div>
  );
}

export default Spinner;

