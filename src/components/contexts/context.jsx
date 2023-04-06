import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../../reducers/reducer';
import cartItems from '../../data';

import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from '../../actions/actions';

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  const increaseCartItem = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decreaseCartItem = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseCartItem,
        decreaseCartItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
