import { useRef, use } from 'react';
import { CartContext } from '../store/shopping-cart-context.jsx';
import CartModal from './CartModal.jsx';


export default function Header() {
  // To consume the context, we can also use the use() hook instead of the useContext() hook.
  // The difference between the use() hook and the useContext() hook is that the use() can also be used conditionally or inside a loop.
  const { items } = use(CartContext);
  const modal = useRef();
  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
