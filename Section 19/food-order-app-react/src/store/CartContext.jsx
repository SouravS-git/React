import {createContext, useReducer, useEffect} from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (itemId) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const isItemInCart = state.items.some(item => item.id === action.payload.item.id);

      if (isItemInCart) {
        return {
          items: state.items.map(item => {
            if (item.id === action.payload.item.id) {
              return {
                ...item,
                quantity: item.quantity + 1
              };
            } else {
              return item;
            }
          })
        }
      } else {
        return {
          items: [...state.items, {
            ...action.payload.item,
            quantity: 1
          }]
        }
      }
    }

    case 'REMOVE_ITEM': {
      const existingItemInCart = state.items.find(item => item.id === action.payload.itemId);

      if (existingItemInCart) {
        if (existingItemInCart.quantity === 1) {
          return {
            items: state.items.filter(item => item.id !== action.payload.itemId)
          }
        } else {
          return {
            items: state.items.map(item => {
              if (item.id === action.payload.itemId) {
                return {
                  ...item,
                  quantity: item.quantity - 1
                };
              } else {
                return item;
              }
            })
          }
        }
      } else {
        return state;
      }
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      }
    }

    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [cart, cartDispatch] = useReducer(
    cartReducer,
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {items: []}
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addItem(item) {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        item,
      },
    });
  }

  function removeItem(itemId) {
    cartDispatch({
      type: 'REMOVE_ITEM',
      payload: {
        itemId,
      },
    });
  }

  function clearCart() {
    cartDispatch({
      type: 'CLEAR_CART',
    });
  }

  const contextValues = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext value={contextValues}>
      {children}
    </CartContext>
  );
}

export default CartContext;