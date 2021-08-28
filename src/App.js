import { Fragment, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';

import Home from './pages/Home';
import Artist from './pages/Artist';
import Album from './pages/Album';

import Navbar from './components/Layout/Navbar/Navbar';
import Login from './components/Login/Login';
import Player from './components/Player/Player';
import NotFound from './components/UI/NotFound';
import InProgress from './components/UI/InProgress';
import Notification from './components/UI/Notification.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playerIsShown, setPlayerIsShown] = useState(false);
  const [track, setTrack] = useState([]);

  useEffect(() => {
    const storedUserLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (storedUserLoggedIn === '1') setIsLoggedIn(true);
  }, []);

  const loginHandler = () => {
    sessionStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const playTrackHandler = (track) => {
    setPlayerIsShown(true);
    setTrack(track);
  }

  return (
    <Fragment>
      {!isLoggedIn
        ? <Login onLogin={loginHandler} />
        :
        <main>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />

            <Route exact path='/artist/:artist'>
              <Artist onPlayTrack={playTrackHandler} />
            </Route>

            <Route path='/artist/:artist/:album'>
              <Album onPlayTrack={playTrackHandler} />
            </Route>

            <Route path='/explore' component={InProgress} />
            <Route path='/library' component={InProgress} />

            <Route path='/notification/:msg' component={Notification} />

            <Route path='*' component={NotFound} />
          </Switch>
          {playerIsShown && <Player track={track} />}
        </main>
      }
    </Fragment>
  );
}

export default App;