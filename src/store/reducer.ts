import React from 'react';

export type StateType = {
  auth: any;
  open: any;
  openLeftMenu: any;
  sendMoneyDialog: any;
  userAllTokens: any;
  userCollections: any;
  userCollectionTokens: any;
  nftAuctions: any;
};
export const initialState = {
  auth: false,
  open: false,
  openLeftMenu: false,
  sendMoneyDialog: {
    open: false,
    addr: '',
    value: '',
  },
  userCollections: [],
  userCollectionTokens: [],
  userAllTokens: [],
  nftAuctions: [],
};
export const ContextApp = React.createContext<any>({
  state: initialState,
  dispatch: () => null,
});

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type Payload = {
  LOGIN: {};
  OPEN: {};
  OPEN_LEFT_MENU: {};
  SET_SEND_MONEY_DIALOG: {};
  SET_USER_COLLECTIONS: {};
  SET_USER_COLLECTION_TOKENS: {};
  SET_NFT_AUCTIONS: {};
  SET_USER_ALL_TOKENS: {};
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
const LOGIN = 'LOGIN';
const OPEN = 'OPEN';
const OPEN_LEFT_MENU = 'OPEN_LEFT_MENU';
const SET_SEND_MONEY_DIALOG = 'SET_SEND_MONEY_DIALOG';
const SET_USER_COLLECTION_TOKENS = 'SET_USER_COLLECTION_TOKENS';
const SET_USER_COLLECTIONS = 'SET_USER_COLLECTIONS';
const SET_USER_ALL_TOKENS = 'SET_USER_ALL_TOKENS';
const SET_NFT_AUCTIONS = 'SET_NFT_AUCTIONS';

export const reducer = (state: StateType, action: Actions) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, auth: action.payload };
    case OPEN:
      return { ...state, open: action.payload };
    case OPEN_LEFT_MENU:
      return { ...state, openLeftMenu: action.payload };
    case SET_SEND_MONEY_DIALOG:
      return { ...state, sendMoneyDialog: action.payload };
    case SET_USER_COLLECTION_TOKENS:
      return { ...state, userCollectionTokens: action.payload };
    case SET_USER_ALL_TOKENS:
      return { ...state, userAllTokens: action.payload };
    case SET_NFT_AUCTIONS:
      return { ...state, nftAuctions: action.payload };
    case SET_USER_COLLECTIONS:
      return { ...state, userCollections: action.payload };
    default:
      return state;
  }
};

export const setLogin = (dispatch: any, payload: any) =>
  dispatch({ type: LOGIN, payload });
export const setOpen = (dispatch: any, payload: any) =>
  dispatch({ type: OPEN, payload });
export const setOpenLeftMenu = (dispatch: any, payload: any) =>
  dispatch({ type: OPEN_LEFT_MENU, payload });
export const setSendMoneyDialog = (dispatch: any, payload: any) =>
  dispatch({ type: SET_SEND_MONEY_DIALOG, payload });
export const setUserCollectionTokens = (dispatch: any, payload: any) =>
  dispatch({ type: SET_USER_COLLECTION_TOKENS, payload });
export const setUserCollections = (dispatch: any, payload: any) =>
  dispatch({ type: SET_USER_COLLECTIONS, payload });
export const setUserAllTokens = (dispatch: any, payload: any) =>
  dispatch({ type: SET_USER_ALL_TOKENS, payload });
export const setNftAuctions = (dispatch: any, payload: any) =>
  dispatch({ type: SET_NFT_AUCTIONS, payload });
