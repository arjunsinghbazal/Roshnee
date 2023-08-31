import React from "react";
import Eyewear from "./eyeData";
import logo from "../images/download.webp";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const arr = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const navigate = useNavigate();

  const paynow = (e) => {
    e.preventDefault();
    if (totalPrice > 0) {
      localStorage.removeItem("cartItems");
      alert("Thank you for Shopping");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };
const Cancel=(e)=>{
  e.preventDefault()
  localStorage.removeItem("cartItems");
  navigate("/checkout")
}
  const navigateToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const navigateToCart = (e) => {
    e.preventDefault();
    navigate("/cart");
  };

  const matchedItems = arr
    .map((itemId) => {
      const matchedItem = Eyewear.find((item) => item.id === itemId);
      return matchedItem ? matchedItem : null;
    })
    .filter((item) => item !== null);

  const totalPrice = matchedItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <img src={logo} alt="kkk" />
        <p onClick={navigateToHome}>Home</p>
        <p onClick={navigateToCart}>Shop</p>
      </div>
      <div className="checkout-table">
        <table>
          <thead>
            <tr>
              <th>Items</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {matchedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price} INR</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total Price</td>
              <td>{totalPrice.toFixed(2)} INR</td>
            </tr>
          </tfoot>
        </table>
        {totalPrice > 0 && (
         <div className="btnpay">
         <button className="pay-now-button" onClick={paynow}>
            Pay Now
          </button><button className="cancel-button" onClick={Cancel}>
            Cancel Order
          </button>
         </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
