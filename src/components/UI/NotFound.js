import Container from './Container';
import classes from './NotFound.module.css';
import notFound from '../../assets/not_found.svg';

const NotFound = () => {
  return (
    <Container>
      <img src={notFound} alt='Not found' className={classes['not-found']} />
    </Container>
  );
}

export default NotFound;