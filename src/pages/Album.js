import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getAlbumData } from '../lib/api';

import AlbumInfo from '../components/Album/AlbumInfo';
import TrackList from '../components/Track/TrackList';
import Spinner from '../components/UI/Spinner';

const Album = (props) => {
  const params = useParams();
  const [album, setAlbum] = useState({})
  const [spinner, setSpinner] = useState(true);

  // Averiguar como reproducir un album completo.
  // const playAlbumHandler = (album) => {
  // console.log(album);
  // }

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

  const selectTrackHandler = (track) => {
    props.onPlayTrack(track);
  }

  return (
    <Fragment>
      {spinner ? <Spinner /> : Object.entries(album || {}).length !== 0 &&
        <section style={{ marginBottom: '15rem' }}>
          <AlbumInfo info={album} />
          <TrackList tracks={album.tracks} onSelectTrack={selectTrackHandler} />
        </section>
      }
    </Fragment>
  );
}

export default Album;