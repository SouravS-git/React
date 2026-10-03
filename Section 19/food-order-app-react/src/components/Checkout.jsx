import { useContext, useRef, useActionState } from "react";
import { formatCurrency } from "./util/formatting.js";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import Modal from "./ui/Modal.jsx";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import useHttp from "../hooks/useHttp.jsx";
import Error from "./Error.jsx";

export default function Checkout() {
  const {progress, hideCheckout} = useContext(UserProgressContext);
  const {items, clearCart} = useContext(CartContext);
  const totalAmount = items.reduce((total, item) => total + item.quantity * item.price, 0);

  const url = 'http://localhost:3000/orders';
  const config = useRef({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const {
    responseData,
    // isLoading,
    error,
    sendRequest,
    clearData,
  } = useHttp(url, config);

  function handleCloseCheckout() {
    hideCheckout();
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  /*function handleFormSubmission(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerDetails = Object.fromEntries(fd.entries());

    const data = {
      order: {
        items,
        customer: customerDetails
      }
    }

    sendRequest(data);
  }*/

  // Handling form submission with FormAction
  const [formState, formAction, isLoading] = useActionState(checkoutAction, null);

  async function checkoutAction(prevFormState, fd) {
    const customerDetails = Object.fromEntries(fd.entries());

    const data = {
      order: {
        items,
        customer: customerDetails
      }
    }

    await sendRequest(data);
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
      <Button>Place Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span className="center">Placing order...</span>;
  }

  if (responseData && !isLoading) {
    return (
      <Modal open={progress === 'checkout'} onClose={handleFinish}>
        <h2>Order Placed!</h2>
        <p>Thank you for your order!</p>
        <p>We'll get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal className="checkout" open={progress === 'checkout'} onClose={handleCloseCheckout}>
      {/*<form onSubmit={handleFormSubmission}>*/}
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {formatCurrency.format(totalAmount)}</p>
        <Input label="Full Name" type="text" id="name" autoComplete="off" />
        <Input label="E-Mail Address" type="email" id="email" autoComplete="off" />
        <Input label="Street Address" type="text" id="street" autoComplete="off" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" autoComplete="off" />
          <Input label="City" type="text" id="city" autoComplete="off" />
        </div>

        {error && <Error title="Failed to place the order!" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}