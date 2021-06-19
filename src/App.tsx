import React, { useMemo, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CssBaseline from '@material-ui/core/CssBaseline';

import ToniumNFT from './blockchain/ToniumNTF';
import { ContextApp, reducer, initialState } from './store/reducer';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import CreateCollection from './pages/CreateCollection';
import MintNft from './pages/MintNft';
import Auction from './pages/Auction';
import Own from './pages/Own';
import Transaction from './pages/Transaction';
import Wp from './pages/Wp';
import Collection from './pages/Collection';
import AuctionToken from './pages/AuctionToken';
import Login from './Components/Login';
import SendMoneyDialog from './Components/SendMoneyDialog';
import SellToken from './pages/SellToken';

declare const window: any;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toniumNFT = useMemo(() => new ToniumNFT(state, dispatch), []);
  window.toniumNFT = toniumNFT;

  return (
    <ContextApp.Provider value={{ dispatch, state, toniumNFT }}>
      <Router>
        <MainLayout>
          <Switch>
            <Route exact path="/own">
              <Own />
            </Route>
            <Route exact path="/own/transaction">
              <Transaction />
            </Route>
            <Route exact path="/own/sell">
              <SellToken />
            </Route>
            <Route exact path="/auction">
              <Auction />
            </Route>
            <Route exact path="/auction/auction_token">
              <AuctionToken />
            </Route>
            <Route exact path="/wp">
              <Wp />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/collections">
              <Collections />
            </Route>
            <Route exact path="/collections/new">
              <CreateCollection />
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

        <CssBaseline />
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
