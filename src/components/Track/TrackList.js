import { useState } from 'react';
import shortid from 'shortid';
import classes from './TrackList.module.css';
import Track from './Track';
import Player from '../Player/Player';
import Container from '../UI/Container';

const TrackList = ({ tracks }) => {
  const [track, setTrack] = useState([])

  const trackHandler = (track) => {
    setTrack(track);
  }

  return (
    <section className={classes.tracks}>
      <Container>
        {tracks[0].type === 'track' ? <h2>Canciones</h2> : null}
        {tracks
          .map(track =>
            <Track
              key={shortid.generate()}
              data={track}
              onTrack={trackHandler}
            />
          )}
      </Container>
      <Player track={track} />
    </section>
  );
}

export default TrackList;