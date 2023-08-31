import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inputData, setInputData] = useState([]);
  const navigate = useNavigate();

  // Load existing data from localStorage on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("user")) || [];
    setInputData(existingData);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(inputData));
  }, [inputData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "" || fullname === "" || email === "") {
      setMessage("Error: All fields are mandatory");
    } else if (password === confirmPassword) {
      setMessage("Successfully Sign up!");
      const token = Math.random().toString(36).substr(2);
      const newData = {
        username:fullname,
        email: email,
        password: password,
        token: token,
      };
      setInputData((prevData) => [...prevData, newData]);
      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setMessage("Error: Password Mismatch");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleFormSubmit}>
        <h1>Signup</h1>
        <input className="formitem" type="text" placeholder="Username" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        <input className="formitem" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="formitem" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password} />
        <input className="formitem" onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" value={confirmPassword} />
        <p className={message.includes("Error") ? "red" : "Green"}>{message}</p>
        <div className="form-buttons">
          <button className="btn submit-btn decoration black" type="submit">Signup</button>
          <Link className="btn submit-btn decoration gray" to="/">Back</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;