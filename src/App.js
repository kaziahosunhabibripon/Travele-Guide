import './App.css';
import Header from './Components/Header/Header';
import React, { createContext, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Destination from './Components/Destination/Destination';
import CreateAccount from './Components/Login/CreateAccount';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <Router>
        <Header />
        <Switch>
            <Route path="/home">
                <Home/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/createAccount">
                <CreateAccount/>
            </Route>
            <PrivateRoute path="/destination/:type">
                <Destination/>
            </PrivateRoute>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="*">
                <NotFound/>
            </Route>
        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
