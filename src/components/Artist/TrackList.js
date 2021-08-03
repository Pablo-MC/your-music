import shortid from 'shortid';
import classes from './TrackList.module.css';

import Container from '../UI/Container';
import Track from './Track';

const TrackList = ({ tracks }) => {
  return (
    <Container>
      <section className={classes.tracks}>
        <h2>Canciones</h2>
        {tracks
          // .filter(track => !track.error)
          .map(track =>
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