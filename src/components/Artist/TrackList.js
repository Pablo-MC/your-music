import shortid from 'shortid';
import classes from './TrackList.module.css';

import Container from '../UI/Container';
import Track from './Track';

const TrackList = (props) => {
  return (
    <Container>
      <section className={classes.tracks}>
        <h2>Canciones</h2>
        {props.tracks.map(track =>
          <Track
            key={shortid.generate()}
            data={track}
          />
        )}
      </section>
    </Container>
  );
}

export default TrackList;