import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import { formatCurrency } from "./util/formatting.js";

export default function CartItem({ item }) {
  const {addItem, removeItem} = useContext(CartContext);

  function handleIncreaseItem() {
    addItem(item);
  }

  function handleDecreaseItem() {
    removeItem(item.id);
  }

  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {formatCurrency.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => handleDecreaseItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleIncreaseItem(item)}>+</button>
      </p>
    </li>
  );
}