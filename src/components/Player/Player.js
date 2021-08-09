import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'

import Container from '../UI/Container';

const Player = (props) => {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [props.track])

  return (
    <Container>
      <SpotifyPlayer
        token={localStorage.getItem('playerToken')}
        // uris={track.uri ? [track.uri] : []}

        uris={props.track}

        initialVolume={0.5}
        showSaveIcon

        play={play}
        callback={state => {
          if (!state.isPlaying) setPlay(false)
        }}

        styles={{
          activeColor: '#fff',
          bgColor: '#333',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
        }}
      />
    </Container>
  );
}

export default Player;











