import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import { getArtistData } from '../lib/api';

import MainInfo from '../components/Artist/MainInfo';
import TrackList from '../components/Artist/TrackList';
import AlbumList from '../components/Artist/AlbumList';
import Player from '../components/Player/Player';

const Artist = () => {
  const params = useParams();

  const [artist, setArtist] = useState({});
  const [track, setTrack] = useState([])

  useEffect(() => {
    async function fetchData() {
      const artistData = await getArtistData(params.artist);
      setArtist(artistData);
    }
    fetchData();
  }, [params.artist]);

  const playerHandler = (track) => {
    setTrack(track);
  }

  console.log(artist.tracks);

  return (
    <Fragment>
      {Object.entries(artist || {}).length !== 0 &&
        <>
          <MainInfo info={artist} />
          <TrackList tracks={artist.tracks} onPlayer={playerHandler} />

          <Player track={track} />

          <AlbumList albums={artist.albums} />
        </>
      }
    </Fragment>
  );
}

export default Artist;