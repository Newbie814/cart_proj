import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../../reducers/reducer';

import { getCartTotal } from '../../utilities/utils';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

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
  cart: new Map(),
};

//
// ----------- RETURN FUNCTION -----------------
//

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalAmount, totalCost } = getCartTotal(state.cart);

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

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { data } });
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseCartItem,
        decreaseCartItem,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
