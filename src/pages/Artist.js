import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import { getArtistData } from '../lib/api';

import MainInfo from '../components/Artist/MainInfo';
import TrackList from '../components/Artist/TrackList';
import AlbumList from '../components/Artist/AlbumList';

const Artist = () => {
  const params = useParams();
  const [artist, setArtist] = useState({});

  useEffect(() => {
    async function fetchData() {
      const artistData = await getArtistData(params.artist);
      setArtist(artistData);
    }
    fetchData();
  }, [params.artist]);

  return (
    <Fragment>
      {Object.entries(artist || {}).length !== 0 &&
        <>
          <MainInfo info={artist} />
          <TrackList tracks={artist.tracks} />
          <AlbumList albums={artist.albums} />
        </>
      }
    </Fragment>
  );
}

export default Artist;