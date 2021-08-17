import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getAlbumData } from '../lib/api';

import AlbumInfo from '../components/Album/AlbumInfo';
import TrackList from '../components/Track/TrackList';
import Spinner from '../components/UI/Spinner';

const Album = () => {
  const params = useParams();
  const [album, setAlbum] = useState({})
  const [spinner, setSpinner] = useState(true);

  const playAlbumHandler = (album) => {
    // Averiguar como reproducir un album completo.
    console.log(album);
  }

  useEffect(() => {
    async function fetchData() {
      const albumData = await getAlbumData(params.artist, params.album);
      setAlbum(albumData);
    }
    fetchData();

    setTimeout(() => {
      setSpinner(false);
    }, 2000);
  }, [params.artist, params.album]);

  return (
    <Fragment>
      {spinner ? <Spinner /> : Object.entries(album || {}).length !== 0 &&
        <section style={{ marginBottom: '15rem' }}>
          <AlbumInfo info={album} onPlayAlbum={playAlbumHandler} />
          <TrackList tracks={album.tracks} />
        </section>
      }
    </Fragment>
  );
}

export default Album;