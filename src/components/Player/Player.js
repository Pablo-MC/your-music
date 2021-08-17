import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'

import classes from './Player.module.css';

const Player = (props) => {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [props.track])

  return (
    <div className={classes.player}>
      <SpotifyPlayer
        token={localStorage.getItem('playerToken')}
        // uris={track.uri ? [track.uri] : []}

        uris={props.track}

        autoPlay
        initialVolume={0.5}
        // showSaveIcon

        play={play}
        callback={state => {
          if (!state.isPlaying) setPlay(false)
        }}

        styles={{
          activeColor: '#fff',
          bgColor: '#212121',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#ff0000',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
          sliderTrackColor: '#909090',
          sliderHandleColor: '#ff0000',
          height: '7rem',
          // altColor: ,
          // sliderHeight: ,
        }}
      />
    </div>
  );
}

export default Player;