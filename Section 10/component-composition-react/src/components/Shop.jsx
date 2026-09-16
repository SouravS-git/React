// import { DUMMY_PRODUCTS } from '../dummy-products.js';
// import Product from './Product.jsx';

export default function Shop({
                               // onAddItemToCart,
                               children
}) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {/*Shifting this code to App component to avoid unnecessary props drilling and one extra layer of component nesting*/}
        {/*{DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}*/}
        {children}
      </ul>
    </section>
  );
}