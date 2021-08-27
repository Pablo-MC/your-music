import { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { getAlbumData } from '../lib/api';

import AlbumInfo from '../components/Album/AlbumInfo';
import TrackList from '../components/Track/TrackList';
import Spinner from '../components/UI/Spinner';

const Album = (props) => {
  const params = useParams();
  const history = useHistory();
  const [album, setAlbum] = useState({});
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const albumData = await getAlbumData(params.artist, params.album);

      !albumData
        ? history.push('/notification/Album no disponible...')
        : setAlbum(albumData);

      setAlbum(albumData);
    }
    fetchData();

    setTimeout(() => {
      setSpinner(false);
    }, 2500);
  }, [params.artist, params.album, history]);

  const trackHandler = (track) => {
    props.onPlayTrack(track);
  }

  return (
    <Fragment>
      {spinner ? <Spinner /> : Object.entries(album || {}).length !== 0 &&
        <section style={{ marginBottom: '14rem' }}>
          <AlbumInfo info={album} onPlayAlbum={trackHandler} />
          <TrackList tracks={album.tracks} onPlaySelectTrack={trackHandler} />
        </section>
      }
    </Fragment>
  );
}

export default Album;