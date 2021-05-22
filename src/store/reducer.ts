import React from 'react';

export type StateType = {
  auth: any;
  open: any;
  load: any;
};
export const intialState = {
  auth: false,
  open: false,
  load: false,
};
export const ContextApp = React.createContext<{
  state: StateType;
  dispatch: React.Dispatch<any>;
}>({
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
  LOAD: {};
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
const LOGIN = 'LOGIN';
const OPEN = 'OPEN';
const LOAD = 'LOAD';
export const reducer = (state: StateType, action: Actions) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, auth: action.payload };
    case OPEN:
      return { ...state, open: action.payload };
    case LOAD:
      return { ...state, load: action.payload };
    default:
      return state;
  }
};
export const setLogin = (dispatch: any, payload: any) =>
  dispatch({ type: LOGIN, payload });
export const setOpen = (dispatch: any, payload: any) =>
  dispatch({ type: OPEN, payload });
export const setLoad = (dispatch: any, payload: any) =>
  dispatch({ type: LOAD, payload });

// export const action = {
//   login: (payload: {}, dispatch: (payload: {}) => void) =>
//     dispatch({ type: LOGIN, payload }),
// };
