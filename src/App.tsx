import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import cls from './app.module.scss';

function App() {
  return (
    <Router>
      <div className={cls.app}>
        <CssBaseline />
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/users">Users</Link>
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
