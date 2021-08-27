import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getSpotifyUser } from '../../../lib/api';
import classes from './Navbar.module.css';

import logo from '../../../assets/logo.svg';
import search from '../../../assets/search.svg';
import avatar from '../../../assets/avatar.svg';
import logo_phone from '../../../assets/logo_phone.svg';
import home_phone from '../../../assets/home_phone.svg';
import explore_phone from '../../../assets/explore_phone.svg';
import library_phone from '../../../assets/library_phone.svg';

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
      <Link to='/' className={classes.desktop}><img src={logo} alt='logo' className={classes.logo} /></Link>
      <Link to='/' className={classes.phone}><img src={logo_phone} alt='logo_phone' className={classes.logo_phone} /></Link>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.desktop}><NavLink exact to='/' activeClassName={classes.active}>Principal</NavLink></li>
          <li className={classes.desktop}><NavLink to='/explore' activeClassName={classes.active}>Explorar</NavLink></li>
          <li className={classes.desktop}><NavLink to='/library' activeClassName={classes.active}>Biblioteca</NavLink></li>

          <li className={classes.phone}><NavLink exact to='/' activeClassName={classes.active}><img src={home_phone} alt='home_phone' /></NavLink></li>
          <li className={classes.phone}><NavLink to='/explore' activeClassName={classes.active}><img src={explore_phone} alt='explore_phone' /></NavLink></li>
          <li className={classes.phone}><NavLink to='/library' activeClassName={classes.active}><img src={library_phone} alt='library_phone' /></NavLink></li>
          {!searchIsShown
            ? <li><NavLink to='#'><img src={search} alt='search' onClick={() => setSearchIsShown(true)} /></NavLink></li>
            : <Search onClosedSearch={closeSearchHandler} />
          }
        </ul>
      </nav>
      <Link to='/'><img src={user ? user.photo : avatar} alt='avatar' className={classes.avatar} /></Link>
    </header>
  );
}

export default Navbar;