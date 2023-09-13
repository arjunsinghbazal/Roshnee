import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const navigate=useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
const handleData=(e)=>{
e.preventDefault();
    const storedData = localStorage.getItem("user");
    const userData=JSON.parse(storedData);
    console.log(userData)
    const isMatch = userData.some((data) => data.username === username && data.password === password);
    if(isMatch){
        const newToken = Math.random().toString(36).substr(2);
        const userInfo = {
            username:username,
           password: password,
            newToken:newToken,
        };
        localStorage.setItem("login", JSON.stringify(userInfo));
    setMessage("Successfully Login!");
     setTimeout(() => {
        navigate("/");
     }, 1000);
    }
    else if(!isMatch){
   setMessage("Error:Please Enter Valid Username and password")
    }
    else{
        navigate("/signup")
    }
}

return(
    <div>
    <form className="form" onSubmit={handleData}>
      <h1>Login</h1>
      <input className="formitem" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="formitem" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password} />
      <p className={message.includes("Error") ? "red" : "Green"}>{message}</p>
      <div className="form-buttons">
          <button className="btn submit-btn decoration black" type="submit">Login</button>
          <Link className="btn submit-btn decoration gray" to="/signup">Back</Link>
          
        </div>
    </form>
    </div>
)
}

export default Login;