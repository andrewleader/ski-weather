import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FindGrid from './components/FindGrid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit">
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            <Switch>
              <Route path="/find-grid">
                Find grid
              </Route>
              <Route path="/">
                Weather forecast
              </Route>
            </Switch>
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/find-grid">
            <FindGrid/>
          </Route>
          <Route path="/">

          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
