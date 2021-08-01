import classes from './Track.module.css';

const Track = (props) => {

  const millisecToMinAndSec = function (millisec) {
    const min = Math.floor(millisec / 60000);
    const sec = ((millisec % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? '0' : '') + sec;
  }

  // Aplicar filtro en la request para TODAS las propiedades en caso de que no existan!. (.name, .duration, .title, .image)
  const track = {
    artist: props.data.track.artist?.name,
    name: props.data.track?.name,
    duration: millisecToMinAndSec(props.data.track?.duration), // min:sec // 3:45
    album: props.data.track.album?.title,
    imgURL: props.data.track.album?.image[3]['#text'], // extra large
  }

  return (
    <div className={classes.track}>
      <div className={classes['content-track']}>
        <img src={track.imgURL} alt={track.name} />
        <span>{track.name}</span>
      </div>
      <p>{track.artist}</p>
      <p>{track.album}</p>
      <p>{track.duration}</p>
    </div>
  );
}

export default Track;