import {Link, useParams} from "react-router-dom";

export default function ProductDetail() {
  const params = useParams();

  return (
    <>
      <h1>Product Detail Page</h1>
      <p>Product ID: {params.productId}</p>
      <p><Link to={'..'} relative='path'>Go back</Link></p>
    </>
  );
}