import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import appLogo from "../assets/logo.jpg";
import Button from "./ui/Button.jsx";

export default function Header() {
  const {items} = useContext(CartContext);
  const totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0);
  const {showCart} = useContext(UserProgressContext);

  function handleShowCart() {
    showCart();
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={appLogo} alt="app-logo"/>
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>Cart ({totalItemsInCart})</Button>
        </nav>
      </header>
    </>
  );
}