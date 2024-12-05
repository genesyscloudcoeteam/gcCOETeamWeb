/* global Genesys */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { executeAcCommand } from "../utils/acHelper";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://your-api-endpoint/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
