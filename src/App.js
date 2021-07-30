import { Fragment } from "react";
import { Switch, Route } from "react-router";

import Navbar from './components/Layout/Navbar/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/artist/:artist' ></Route>

        <Route path='/explore'> </Route>
        <Route path='/library'> </Route>
      </Switch>
    </Fragment>
  );
}

export default App;