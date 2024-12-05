/* global Genesys */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { executeAcCommand } from "./utils/acHelper";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://your-api-endpoint/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  const addToCart = () => {
    const userId = "demo-user-id"; // Replace with actual user ID after login implementation.
    axios.post("https://your-api-endpoint/cart", {
      userId,
      productId: product.id,
      quantity,
    });
    alert("Product added to cart!");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
