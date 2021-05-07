import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PolymerIcon from '@material-ui/icons/Polymer';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import cls from './app.module.scss';

function App() {
  return (
    <Router>
      <div className={cls.app}>
        <CssBaseline />
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemIcon>
                <PolymerIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={Link} to="/users">
              <ListItemIcon>
                <PolymerIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </Grid>
          <Grid item xs={10}>
            <AppBar position="sticky">
              <Toolbar>
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  Dashboard
                </Typography>
              </Toolbar>
            </AppBar>
            <Switch>
              <Route path="/about">About</Route>
              <Route path="/users">Users</Route>
              <Route path="/">Home</Route>
            </Switch>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
