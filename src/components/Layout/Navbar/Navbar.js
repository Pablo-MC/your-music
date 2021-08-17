import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getSpotifyUser } from '../../../lib/api';

import classes from './Navbar.module.css';

import logo from '../../../assets/logo.svg'
import search from '../../../assets/search.svg';
import avatar from '../../../assets/avatar.svg';

import Search from '../../Search/Search';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchIsShown, setSearchIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      async function fetchData() {
        const userData = await getSpotifyUser();
        setUser(userData);
      }
      fetchData();
    }, 2000);
  }, []);

  const closeSearchHandler = () => {
    setSearchIsShown(false);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setSearchIsShown(false);
  });

  return (
    <header className={classes.header}>
      <Link to='/'><img src={logo} alt='logo' className={classes.logo} /></Link>
      <nav className={classes.nav}>
        <ul>
          <li><NavLink exact to='/' activeClassName={classes.active}>Principal</NavLink></li>
          <li><NavLink to='/explore' activeClassName={classes.active}>Explorar</NavLink></li>
          <li><NavLink to='/library' activeClassName={classes.active}>Biblioteca</NavLink></li>
          {!searchIsShown
            ? <li><NavLink to='#'><img src={search} alt='search' onClick={() => setSearchIsShown(true)} /></NavLink></li>
            : <Search onClosedSearch={closeSearchHandler} />
          }
        </ul>
      </nav>
      <Link to='/'><img src={user ? user.photo : avatar} alt="avatar" className={classes.avatar} /></Link>
    </header>
  );
}

export default Navbar;