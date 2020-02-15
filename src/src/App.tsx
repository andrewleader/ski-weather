import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles, AppBar, Toolbar, IconButton, Typography, Switch as MaterialSwitch, FormControlLabel } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FindGrid from './components/FindGrid';
import Forecast from './components/Forecast';

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
  locationHeader: {
    marginTop: "24px"
  }
}));

const App = () => {
  const classes = useStyles();

  const [showNights, setShowNights] = React.useState<boolean>(false);

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
            <FormControlLabel control={<MaterialSwitch checked={showNights} onChange={event => setShowNights(event.target.checked)}/>} label="Show nights"/>
            <Typography variant="h4" className={classes.locationHeader}>Snoqualmie Pass</Typography>
            <Forecast pointInfo={{cwa: "SEW", gridX: 151, gridY: 53}} showNights={showNights}/>
            
            <Typography variant="h4" className={classes.locationHeader}>Crystal</Typography>
            <Forecast pointInfo={{cwa: "SEW", gridX: 144, gridY: 30}} showNights={showNights}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
