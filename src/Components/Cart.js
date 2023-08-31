import React, { useEffect, useState } from "react";
import Eyewear from "./eyeData";
import logo from "../images/download.webp";
import store from "../images/shopping-cart-20392.png";
import { useNavigate } from "react-router-dom";
import profileImage from "../images/images.jpeg";

const Cart = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedCartItems);
  }, []);

  const filteredEyewear = Eyewear.filter((item) =>
    item.name.toLowerCase().includes(inputText.toLowerCase())
  );

  const addToCart = (itemId) => {
    if (!cartItems.includes(itemId)) {
      const newCartItems = [...cartItems, itemId];
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };
  const removeFromCart = (itemId) => {
    const newCartItems = cartItems.filter((item) => item !== itemId);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };
  const isItemInCart = (itemId) => cartItems.includes(itemId);

  const countitems = cartItems.length;

  const navigateToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const navigatetoProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const navigateToCheck = (e) => {
    e.preventDefault();
    navigate("/checkout");
  };
  return (
    <div className="container">
      <div className="header">
        <div className="leftheader">
          <img src={logo} alt="kkk" />
          <p onClick={navigateToHome}>Home</p>
        </div>
        <div className="centreheader">
          <input
            type="text"
            placeholder="Search Product"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="cart-count">
            <img src={store} alt="kkk" onClick={navigateToCheck} />
         {countitems>0? <h4>{countitems}</h4>:null}
          </div>
        </div>
        <div className="rightheader">
        <div className="profile-circle">
                <img src={profileImage} alt="Profile" onClick={navigatetoProfile} />
              </div>
        </div>
      </div>
      <div className="cart">
         {filteredEyewear.length === 0 ? (
  <p>No data found.</p>
) : (
  filteredEyewear.map((item) => (
    <div className="cartitems" key={item.id}>
    <img src={item.eyewearLink} alt="404" />
              <h5>{item.name}</h5>
              <p>Price {item.price} INR</p>
              <button
                onClick={() => {
                  if (isItemInCart(item.id)) {
                    removeFromCart(item.id);
                  } else {
                    addToCart(item.id);
                  }
                }}
              >
                {isItemInCart(item.id) ? "Remove from Cart" : "Add to Cart"}
              </button>
    </div>
  ))
)}

      </div>
    <footer className="product-footer">
  <div className="footer-content">
    <div className="footer-section">
      <h4>Contact Us</h4>
      <p>Email: roshnee@eyewear.com</p>
      <p>Phone: +91 (123) 456-7890</p>
    </div>
    
    <div className="footer-section">
      <h4>About Us</h4>
      <p>We are committed to providing high-quality</p><p> eyewear that fits your style and needs.</p>
    </div>
  </div>
  <div className="footer-links">
    <a href="/privacy-policy">Privacy Policy</a>
    <a href="/terms-of-service">Terms of Service</a>
    <a href="/returns">Return & Exchange Policy</a>
  </div>
  <p className="copyright">© 2023 Roshnee. All rights reserved.</p>
</footer>
        </div>
    )
}

export default Cart;