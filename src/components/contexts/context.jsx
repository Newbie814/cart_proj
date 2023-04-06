import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../../reducers/reducer';

import { CLEAR_CART } from '../../actions/actions';

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: [],
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
