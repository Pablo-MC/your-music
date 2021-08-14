import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getArtistData } from '../lib/api';

import ArtistInfo from '../components/Artist/ArtistInfo';
import ArtistAlbums from '../components/Artist/ArtistAlbums';
import TrackList from '../components/Track/TrackList';
import Spinner from '../components/UI/Spinner';

const Artist = () => {
  const params = useParams();
  const [artist, setArtist] = useState({});
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const artistData = await getArtistData(params.artist);
      setArtist(artistData);
    }
    fetchData();

    setTimeout(() => {
      setSpinner(false);
    }, 2500);
  }, [params.artist]);

  return (
    <Fragment>
      {spinner ? <Spinner /> : Object.entries(artist || {}).length !== 0 &&
        <>
          <ArtistInfo info={artist} />
          <TrackList tracks={artist.tracks} />
          <ArtistAlbums albums={artist.albums} />
        </>
      }
    </Fragment>
  );
}

export default Artist;