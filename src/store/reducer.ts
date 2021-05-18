import React from 'react';

export type StateType = {};
export const intialState = {};
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
type Payload = {};
export type Actions = ActionMap<any>[keyof ActionMap<Payload>];

export const reducer = (state: StateType, action: Actions) => {
  switch (action.type) {
    default:
      return state;
  }
};
