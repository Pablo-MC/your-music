import { useHistory } from 'react-router';
import classes from './Track.module.css';

import play from '../../assets/play_white.svg';

const Track = (props) => {
  const history = useHistory();
  const { type, artist, album, imgAlbumURL, trackTitle, trackURI, duration, trackNumber } = props.data;

  const millisecToMinAndSec = function (millisec) {
    const min = Math.floor(millisec / 60000);
    const sec = ((millisec % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? '0' : '') + sec;
  }

  const trackHandler = (track) => {
    props.onSelectTrack(track);
  }

  return (
    <div className={classes[`${type}`]}>
      <div className={classes.content}>
        {type === 'track'
          ? <img src={imgAlbumURL} alt={trackTitle} className={classes['img-album']} />
          : <span className={classes['track-number']}>{trackNumber}</span>
        }
        <img src={play} alt='play icon' className={classes['play-icon']} onClick={() => trackHandler(trackURI)} />
        <span className={classes['track-title']} onClick={() => trackHandler(trackURI)}>{trackTitle}</span>
      </div>
      <p className={classes.artist}>{artist}</p>
      <p className={classes['album-title']} onClick={() => history.push(`/artist/${artist}/${album}`)}>{album}</p>
      <p className={classes.duration}>{millisecToMinAndSec(duration)}</p>
    </div>
  );
}

export default Track;