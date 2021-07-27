import { Link, NavLink } from "react-router-dom";
import classes from './Navbar.module.css';

import logo from '../../assets/logo.svg';
import search from '../../assets/search.svg';
import avatar from '../../assets/avatar.svg';

const Navbar = () => {

  const searchHandler = (e) => {
    // Implementar buscador.
  }

  return (
    <header className={classes.header}>
      <Link to='/'><img src={logo} alt='logo' className={classes.logo} /></Link>
      <nav className={classes.nav}>
        <ul>
          <li><NavLink exact to='/' activeClassName={classes.active}>Principal</NavLink></li>
          <li><NavLink to='/explore' activeClassName={classes.active}>Explorar</NavLink></li>
          <li><NavLink to='/library' activeClassName={classes.active}>Biblioteca</NavLink></li>
          <li><NavLink to='#'><img src={search} alt="search" onClick={searchHandler} /></NavLink></li>
        </ul>
      </nav>
      <Link to='/'><img src={avatar} alt="avatar" className={classes.avatar} /></Link>
    </header>
  );
}

export default Navbar;