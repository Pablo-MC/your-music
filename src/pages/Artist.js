import { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { getArtistData } from '../lib/api';

import ArtistInfo from '../components/Artist/ArtistInfo';
import ArtistAlbums from '../components/Artist/ArtistAlbums';
import TrackList from '../components/Track/TrackList';
import Spinner from '../components/UI/Spinner';

const Artist = (props) => {
  const params = useParams();
  const history = useHistory();
  const [artist, setArtist] = useState({});
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setSpinner(true);
      const artistData = await getArtistData(params.artist);

      !artistData
        ? history.push('/notification/Artista no encontrado...')
        : setArtist(artistData);
    }
    fetchData();

    setTimeout(() => {
      setSpinner(false);
    }, 2500);
  }, [params.artist, history]);

  const trackHandler = (track) => {
    props.onPlayTrack(track);
  }

  return (
    <Fragment>
      {spinner ? <Spinner /> : Object.entries(artist || {}).length !== 0 &&
        <section style={{ marginBottom: '14rem' }}>
          <ArtistInfo info={artist} onPlayRandomTracks={trackHandler} />
          <TrackList tracks={artist.tracks} onPlaySelectTrack={trackHandler} />
          <ArtistAlbums albums={artist.albums} />
        </section>
      }
    </Fragment>
  );
}

export default Artist;