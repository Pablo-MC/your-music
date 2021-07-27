import { Fragment } from "react";
import { Switch, Route } from "react-router";

import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/'> </Route>
        <Route path='/explore'> </Route>
        <Route path='/library'> </Route>
      </Switch>
    </Fragment>
  );
}

export default App;