import { Fragment, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';

import Navbar from './components/Layout/Navbar/Navbar';
import Home from './pages/Home';
import Artist from './pages/Artist';
import Album from './pages/Album';

import Login from './components/Login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedIn === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <Fragment>
      {!isLoggedIn
        ? <Login onLogin={loginHandler} />
        :
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/artist/:artist' component={Artist} />
            <Route path='/album/:album' component={Album} />
            <Route path='/explore'> </Route>
            <Route path='/library'> </Route>
          </Switch>
        </>
      }
    </Fragment>
  );
}

export default App;