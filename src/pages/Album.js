import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getAlbumData } from '../lib/api';

import AlbumInfo from '../components/Album/AlbumInfo';

const Album = () => {
  const params = useParams();

  const [album, setAlbum] = useState({})

  useEffect(() => {
    async function fetchData() {
      const albumData = await getAlbumData(params.artist, params.album);
      setAlbum(albumData);
    }
    fetchData();
  }, [params.artist, params.album]);

  console.log(album);

  return (
    <Fragment>
      <AlbumInfo info={album} />

    </Fragment>
  );
}

export default Album;