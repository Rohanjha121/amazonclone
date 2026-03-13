import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'amazon-clone-cart';

const initialState = {
  items: []
};

function getInitialCartState() {
  if (typeof window === 'undefined') {
    return initialState;
  }

  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!rawCart) {
      return initialState;
    }

    const parsedCart = JSON.parse(rawCart);
    if (!Array.isArray(parsedCart.items)) {
      return initialState;
    }

    return {
      items: parsedCart.items
    };
  } catch {
    return initialState;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          )
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    case 'UPDATE_QTY': {
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        )
      };
    }
    case 'REMOVE': {
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id)
      };
    }
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, getInitialCartState);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    const items = state.items;
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const cartItemsCount = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return {
      items,
      total,
      cartItemsCount,
      addToCart: (product, quantity = 1) =>
        dispatch({
          type: 'ADD',
          payload: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity
          }
        }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', payload: { id } }),
      clearCart: () => dispatch({ type: 'CLEAR' })
    };
  }, [state]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return ctx;
}
