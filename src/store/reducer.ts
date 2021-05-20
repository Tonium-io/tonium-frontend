import React from 'react';

export type StateType = {};
export const intialState = {
  auth: false,
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
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
const LOGIN = 'LOGIN';
export const reducer = (state: StateType, action: Actions) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, auth: true };

    default:
      return state;
  }
};
export const login = (dispatch: any) => dispatch({ type: LOGIN });

// export const action = {
//   login: (payload: {}, dispatch: (payload: {}) => void) =>
//     dispatch({ type: LOGIN, payload }),
// };
