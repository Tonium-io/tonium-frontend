import React from 'react';

export type StateType = {
  auth: any;
  open: any;

  userCollections: any;
  userCollectionTokens: any;
};
export const intialState = {
  auth: false,
  open: false,
  userCollections: [],
  userCollectionTokens: [
    { name: 'Test1', address: '0:x12312312432534454' },
    { name: 'Test2', address: '0:x12312332425532535' },
  ],
  nftAuctions: [
    { name: 'Test1', address: '0:x12312312432534454', bided: false },
    { name: 'Test2', address: '0:x12312332425532535' },
  ],
};
export const ContextApp = React.createContext<any>({
  state: intialState,
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

  SET_USER_COLLECTIONS: {};
  SET_USER_COLLECTION_TOKENS: {};
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
const LOGIN = 'LOGIN';
const OPEN = 'OPEN';
const SET_USER_COLLECTION_TOKENS = 'SET_USER_COLLECTION_TOKENS';
const SET_USER_COLLECTIONS = 'SET_USER_COLLECTIONS';
export const reducer = (state: StateType, action: Actions) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, auth: action.payload };
    case OPEN:
      return { ...state, open: action.payload };

    case SET_USER_COLLECTION_TOKENS:
      return { ...state, userCollectionTokens: action.payload };
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
export const setUserCollenctionTokens = (dispatch: any, payload: any) =>
  dispatch({ type: SET_USER_COLLECTION_TOKENS, payload });
export const setUserCollenctions = (dispatch: any, payload: any) =>
  dispatch({ type: SET_USER_COLLECTIONS, payload });

// export const action = {
//   login: (payload: {}, dispatch: (payload: {}) => void) =>
//     dispatch({ type: LOGIN, payload }),
// };
