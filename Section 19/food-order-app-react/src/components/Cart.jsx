import { useContext } from "react";
import { formatCurrency } from "./util/formatting.js";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Modal from "./ui/Modal.jsx";
import Button from "./ui/Button.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const {items} = useContext(CartContext);
  const totalPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);
  const {progress, hideCart, showCheckout} = useContext(UserProgressContext);

  function handleCloseCart() {
    hideCart();
  }

  function handleShowCheckout() {
    showCheckout();
  }

  return (
    <Modal className="cart" open={progress === 'cart'} onClose={progress === 'cart' ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul id="cart-items">
        {items.map((item) =>
          <CartItem key={item.id} item={item} />
        )}
      </ul>
      <p className="cart-total">Total: {formatCurrency.format(totalPrice)}</p>
      <div className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        {items.length > 0 &&
          <Button onClick={handleShowCheckout}>Checkout</Button>
        }
      </div>
    </Modal>
  );
}