import classes from './Track.module.css';

const Track = (props) => {

  const { artist, album, imgAlbumURL, trackTitle, trackURI, duration } = props.data;

  const millisecToMinAndSec = function (millisec) {
    const min = Math.floor(millisec / 60000);
    const sec = ((millisec % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? '0' : '') + sec;
  }

  const playTrackHandler = (track) => {
    props.onTrack(track);
  }

  return (
    <div className={classes.track} onClick={() => playTrackHandler(trackURI)}>
      <div className={classes['content-track']}>
        <img src={imgAlbumURL} alt={trackTitle} />
        <span>{trackTitle}</span>
      </div>
      <p>{artist}</p>
      <p>{album}</p>
      <p>{millisecToMinAndSec(duration)}</p>
    </div>
  );
}

export default Track;