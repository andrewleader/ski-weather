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
import { observer } from 'mobx-react';
import HomeState from './models/homeState';
import LocationState from './models/locationState';

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

const App = observer(() => {
  const classes = useStyles();
  const state = HomeState.current;

  const [showNights, setShowNights] = React.useState<boolean>(false);
  const [snoqualmie, setSnoqualmie] = React.useState<boolean>(true);
  const [crystal, setCrystal] = React.useState<boolean>(false);
  const [stevens, setStevens] = React.useState<boolean>(false);
  const [baker, setBaker] = React.useState<boolean>(false);

  const LocationSwitch = observer((props:{
    location:LocationState
  }) => {
    const onChange = (event:any) => {
      props.location.setShown(event.target.checked);
    }

    return (
      <FormControlLabel control={<MaterialSwitch checked={props.location.shown} onChange={onChange}/>} label={props.location.name}/>
    );
  });

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
            {state.locations.map(location => <LocationSwitch key={location.name} location={location}/>)}

            {state.locations.map(location => (
              <>
                {location.shown && (
                  <>
                    <Typography variant="h4" className={classes.locationHeader}>{location.name}</Typography>
                    <Forecast location={location} showNights={showNights}/>
                  </>
                )}
              </>
            ))}

          </Route>
        </Switch>
      </div>
    </Router>
  );
});

export default App;
