import classes from './TrackList.module.css';
import shortid from 'shortid';

import Track from './Track';
import Container from '../UI/Container';

const TrackList = (props) => {

  const trackHandler = (track) => {
    props.onSelectTrack(track);
  }

  return (
    <Container>
      <div className={classes.tracks}>
        {props.tracks[0].type === 'track' ? <h2>Canciones</h2> : null}
        {props.tracks.map(track =>
          <Track
            key={shortid.generate()}
            data={track}
            onTrack={trackHandler}
          />
        )}
      </div>
    </Container>
  );
}

export default TrackList;