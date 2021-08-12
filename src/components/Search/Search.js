import { Fragment, useState } from 'react';
import { useHistory } from 'react-router';

import classes from './Search.module.css';

const Search = (props) => {
  const history = useHistory();
  const [artist, setArtist] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    history.push(`/artist/${artist}`)

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
          placeholder='Buscar'
          autoFocus
          onChange={(e) => setArtist(e.target.value)}
        />
      </form>
    </Fragment>
  );
}

export default Search;