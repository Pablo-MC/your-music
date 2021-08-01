import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import { getArtistData } from "../lib/api";

import ArtistInfo from '../components/Artist/ArtistInfo';
import TrackList from '../components/Artist/TrackList';

const Artist = () => {
  const params = useParams();
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const artistData = await getArtistData(params.artist);
      setArtist(artistData);
    }
    fetchData();
  }, [params.artist])

  return (
    <Fragment>
      {artist.length !== 0 &&
        <div>
          <ArtistInfo data={artist} />
          <TrackList tracks={artist.tracks} />
        </div>
      }
    </Fragment>
  );
}

export default Artist;