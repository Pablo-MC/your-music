import classes from './Track.module.css';

const Track = (props) => {

  const { type, artist, album, imgAlbumURL, trackTitle, trackURI, duration, trackNumber } = props.data;

  const millisecToMinAndSec = function (millisec) {
    const min = Math.floor(millisec / 60000);
    const sec = ((millisec % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? '0' : '') + sec;
  }

  const clickTrackHandler = (track) => {
    props.onTrack(track);
  }

  return (
    <div className={classes[`${type}`]} onClick={() => clickTrackHandler(trackURI)}>
      <div className={classes.content}>
        {type === 'track' ? <img src={imgAlbumURL} alt={trackTitle} /> : <span style={{ marginRight: '3rem' }}>{trackNumber}</span>}
        <span>{trackTitle}</span>
      </div>
      <p>{artist}</p>
      <p>{album}</p>
      <p>{millisecToMinAndSec(duration)}</p>
    </div>
  );
}

export default Track;