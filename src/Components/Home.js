import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/download.webp";
import store from "../images/shopping-cart-20392.png";
import imgae from "../images/Daco_1617365.png";
import imgae1 from "../images/men-removebg-preview.png";
import imgae2 from "../images/kidz-removebg-preview (1).png";
import Eyewear from "./eyeData";
import profileImage from "../images/images.jpeg";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stoken, setstoken] = useState(false);
  const [ltoken, setltoken] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Initialize search query state
  const images = [imgae, imgae1, imgae2];
  const recommendedRef = useRef(null);
  const featuredRef = useRef(null);
  const navigate = useNavigate();
const [name,setname]=useState("");
  useEffect(() => {
    const userString = localStorage.getItem("login");
    if (userString !== null) {
      console.log(userString);
      const user = JSON.parse(userString);
      console.log(user)
      if (user.newToken) {
        setltoken(true);
        setname(user.username);
        console.log(name)
      }
    }
    const sign = localStorage.getItem("user");
    const signuser = JSON.parse(sign);
    if (signuser) {
      const hasToken = signuser.some((user) => user.hasOwnProperty("token"));
      if (hasToken) {
        setstoken(true);
      }
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [ltoken]);

  const handleCartClick = (e) => {
    e.preventDefault();
    if (ltoken) {
      navigate("/cart");
    } else {
      alert("Please login first.");
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (ltoken) {
      navigate("/checkout");
    } else {
      alert("Please login first.");
    }
  };

  const filteredEyewear = Eyewear.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="leftheader">
            <img src={logo} alt="kkk" />
            <p onClick={() => navigate("/")}>Home</p>
            <p onClick={handleCartClick}>Shop</p>
            <p onClick={() => recommendedRef.current.scrollIntoView({ behavior: "smooth" })}>Recommended</p>
            <p onClick={() => featuredRef.current.scrollIntoView({ behavior: "smooth" })}>Featured</p>
          </div>
          <div className="centreheader">
            <input
              type="text"
              placeholder="Search Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src={store} alt="kkk" onClick={handleCheckout} />
          </div>
          <div className="rightheader">
  {!stoken ? (
    <button className="black" onClick={handleSignupClick}>SignUp</button>
  ) : ltoken ? (
    <div className="profile-info-container">
      <div className="profile-circle">
        <img src={profileImage} alt="Profile" onClick={() => navigate("/profile")} />
      </div>
      <h3 className="profile-name">{name}</h3>
    </div>
  ) : (
    <button className="gray" onClick={() => navigate("/login")}>LogIn</button>
  )}
</div>

        </div>
        <div className="center">
          <div className="centerleft">
            <p className="one">See <span>everything</span> with Clarity</p>
            <p className="two">Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses,
             sunglasses, and contacts—we’ve got your eyes covered</p>
            <button className="black" onClick={handleCartClick}>Shop Now</button>
          </div>
          <div className="centerright">
            <img src={images[currentImageIndex]} alt="kkk" />
          </div>
        </div>
        <div className="recomended" ref={recommendedRef}>
          <div className="onerec">
            <h3>Recommended</h3>
            <button className="gray" onClick={() => {
              setSearchQuery("");
              handleCartClick();
            }}>
              See all
            </button>
          </div>
          <div className="showitems">
  {filteredEyewear.length > 0 ? (
    filteredEyewear
      .filter((item, index) => index >= 0 && index < 3)
      .map((item, index) => (
        <div className="items" key={index}>
          <img src={item.eyewearLink} alt="404" />
          <h5>{item.name}</h5>
          <p>Price {item.price} INR</p>
        </div>
      ))
  ) : (
    <p>No items found.</p>
  )}
</div>

        </div>
        <div className="recomended" ref={featuredRef}>
          <div className="onerec">
            <h3>Featured</h3>
            <button className="black" onClick={() => {
              setSearchQuery("");
              handleCartClick();
            }}>
              See all
            </button>
          </div>
          <div className="showitems">
            { Eyewear
              .filter((item, index) => index > 7 && index < 11)
              .map((item, index) => (
                <div className="items" key={index}>
                  <img src={item.eyewearLink} alt="404" />
                  <h5>{item.name}</h5>
                  <p>Price {item.price} INR</p>
                </div>
              ))
            }
          </div>
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
              <p>We are committed to providing high-quality eyewear that fits your style and needs.</p>
            </div>
          </div>
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/returns">Return & Exchange Policy</a>
          </div>
          <p className="copyright">© 2023 Roshnee Eyewear Store. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
