import { createContext, useContext, useReducer } from 'react';

export const actionTypes = {
  SET_UID: 'SET_UID',
  SET_ADMIN: 'SET_ADMIN',
};

export const Store = createContext();

const initialState = {
  uid: null,
  admin: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_UID:
      return {
        ...state,
        uid: action.uid,
      };
    case actionTypes.SET_ADMIN:
      return {
        ...state,
        admin: action.admin,
      };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  return (
    <Store.Provider value={useReducer(reducer, initialState)}>
      {props.children}
    </Store.Provider>
  );
};

export const useStateValue = () => useContext(Store);
