import { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import classes from './Search.module.css';

const Search = (props) => {
  const history = useHistory();
  const [artist, setArtist] = useState('');

  const titleCase = artist => {
    const minorWords = ['el', 'la', 'de', 'del', 'los', 'the', 'a', 'and', 'of', 'in'];
    return artist
      .split(' ')
      .filter(str => str !== '')
      .map(str => str.toLowerCase())
      .map(str => minorWords.includes(str) ? str : str[0].toUpperCase() + str.slice(1))
      .join(' ');
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!artist) return;

    history.push(`/artist/${titleCase(artist)}`);
    props.onClosedSearch();
  }

  return (
    <Fragment>
      <form
        className={classes.form}
        onSubmit={submitHandler}
      >
        <input
          type="text"
          placeholder='Buscar artista . . .'
          autoFocus
          // required
          // onInvalid={(e) => e.target.setCustomValidity('Por favor ingrese el nombre de un artista!')}
          onChange={(e) => setArtist(e.target.value = e.target.value.trimStart())}
        />
        <div className={classes.close} onClick={() => props.onClosedSearch()}>✖</div>
      </form>
    </Fragment>
  );
}

export default Search;