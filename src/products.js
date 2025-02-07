const products = [
    {
      id: 1,
      name: "Stylish Jacket",
      description: "A trendy and warm jacket for winter.",
      price: 49.99,
      image: `${process.env.PUBLIC_URL}/images/jacket.jpg`,
    },
    {
      id: 2,
      name: "Running Shoes",
      description: "Lightweight and comfortable running shoes.",
      price: 79.99,
      image: `${process.env.PUBLIC_URL}/images/shoes.jpg`,
    },
    {
      id: 3,
      name: "Smartwatch",
      description: "Keep track of your health and notifications.",
      price: 199.99,
      image: `${process.env.PUBLIC_URL}/images/smartwatch.jpg`,
    },
    // Add more products up to 10
  ];
  
  export default products;
  