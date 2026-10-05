import {Link, useNavigate} from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate('products');
  }

  return (
    <>
      <h1>Home Page</h1>
      <p>
        Go to <Link to="products">the list of products.</Link>
      </p>
      <button onClick={navigateHandler}>Click to navigate programmatically to Products</button>
    </>
  );
}