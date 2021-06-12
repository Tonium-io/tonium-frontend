import React, { useMemo, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CssBaseline from '@material-ui/core/CssBaseline';

import ToniumNFT from './blockchain/ToniumNTF';
import { ContextApp, reducer, intialState } from './store/reducer';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import Mint from './pages/Mint/Mint';
import CreateCol from './pages/Createcol/Createcol';
import MintNft from './pages/Mintnft/MintNft';
import Radar from './pages/Radar/Radar';
import Auction from './pages/Auction/Auction';
import Own from './pages/Own/Own';
import Transaction from './pages/Own/Transaction/Transaction';
import Wp from './pages/Wp/Wp';
import Collection from './pages/Collection/Collection';
import AuctionToken from './pages/Auction/AuctionToken/AuctionToken';
import Login from './Components/Login';
import SendMoneyDialog from './Components/SendMoneyDialog';

declare const window: any;

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const toniumNFT = useMemo(() => new ToniumNFT(state, dispatch), []);
  window.toniumNFT = toniumNFT;

  return (
    <ContextApp.Provider value={{ dispatch, state, toniumNFT }}>
      <Router>
        <CssBaseline />
        <MainLayout>
          <Switch>
            <Route exact path="/collections/new">
              <CreateCol />
            </Route>
            <Route exact path="/own">
              <Own />
            </Route>
            <Route exact path="/collections">
              <Mint />
            </Route>
            <Route exact path="/auction">
              <Auction />
            </Route>
            <Route exact path="/auction/auction_token">
              <AuctionToken />
            </Route>
            <Route exact path="/radar">
              <Radar />
            </Route>
            <Route exact path="/wp">
              <Wp />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/collections/:collection">
              <Collection />
            </Route>
            <Route exact path="/collections/:collection/mint-add">
              <MintNft />
            </Route>
          </Switch>
        </MainLayout>

        <Login />
        <SendMoneyDialog />

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </ContextApp.Provider>
  );
}

export default App;
