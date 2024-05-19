import React, { useState } from "react";
import './App.css';
const ProductList = [
  {
    id: 1,
    name: "Product 1",
    image: "product1.jpg",
    height: "10cm",
    width: "5cm",
    price: 10.99,
  },
  {
    id: 2,
    name: "Product 2",
    image: "product2.jpg",
    height: "15cm",
    width: "8cm",
    price: 19.99,
  },
  {
    id: 3,
    name: "Product 3",
    image: "product3.jpg",
    height: "17cm",
    width: "3cm",
    price: 26.99,
  },
  // Add more products as needed
];

function App() {
  const [products, setProducts] = useState(ProductList);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setTotalPrice((prevPrice) => prevPrice + product.price); // Update total price
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
        />
        <div>
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <img
                src={`images/${product.image}`}
                alt={product.name}
                style={{ height: "100px" }}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <div>
          <span>Cart ({cart.length} items)</span>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={`images/${item.image}`}
                      alt={item.name}
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {cart.length > 0 && (
            <>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
              <button onClick={clearCart}>Clear Cart</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
