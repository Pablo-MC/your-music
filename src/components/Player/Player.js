import { useState, useEffect } from 'react';
import classes from './Player.module.css';
import SpotifyPlayer from 'react-spotify-web-playback'

const Player = (props) => {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [props.track])

  return (
    <div className={classes.player}>
      <SpotifyPlayer
        token={sessionStorage.getItem('playerToken')}
        uris={props.track} // uris={uri or [uris]}
        initialVolume={0.5}
        autoPlay={true}
        play={play}
        // play={true}
        callback={state => {
          if (!state.isPlaying) setPlay(false);
        }}
        styles={{
          activeColor: '#fff',
          bgColor: '#212121',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#f00',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
          sliderTrackColor: '#909090',
          sliderHandleColor: '#f00',
          height: '6rem',
        }}
      />
    </div>
  );
}

export default Player;