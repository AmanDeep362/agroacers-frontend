import React, { useContext, useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../../../Styles/login.css";
import loginfarm from "../../../Images/New Img/farm2.jpg";
import { UserContext } from "../../../App";

const Login = () => {
  
  const {dispatch} = useContext(UserContext)

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("https://agroacers-backend.onrender.com/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  
    if (res.status === 200) {
      const data = await res.json()
      dispatch({type:"USER",payload:true});
      localStorage.setItem("isLoggedin", Number(true));
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.removeItem("cartItems");
      window.alert("Login succesful");
      navigate("/", { replace: true });
      window.location.reload()
    }
    else if (res.status === 400){
      window.alert("Enter Email and Password.");
    }
    else if (res.status === 401){
      window.alert("Incorrect Password.");
    }
    else if (res.status === 402){
        window.alert("Email don't exist Invalid Credential.");
    }
    else{
        window.alert("Invalid Credential");
    }
  };
 
  return (
    <>
      <div id="main-container">
        <div className="login_container">
            {/* Image code  */}
            <div className="col-md-6 hidelogin">
               <img src={loginfarm} alt="Famer" className="LoginsideImg"/>
            </div>
            {/* form code  */}
            <div className="col-md-6 col-sm-12">
              <div className="login-page">
                  <div className="login-form-container">
                      <h2 className="login-heading">Sign in to your account</h2>
                      <p className="login-para">"Do not wait until the conditions are perfect.<br />&nbsp;&nbsp;&nbsp;&nbsp;Beginning makes the condition perfect."</p>
                      
                      <form method="POST">
                          <label htmlFor="email" className="labelinp">
                              <i className="fa fa-user">&nbsp;</i>
                              <input
                                  className="email-input"
                                  autoComplete="off"
                                  type="email"
                                  name="email"
                                  value={email.toLowerCase()}
                                  onChange={(e) => {
                                      setEmail(e.target.value);
                                    }}
                                  id="email"
                                  placeholder="Enter your email"
                              />
                          </label>
                          <br />

                          <label htmlFor="password" className="labelinp mt-0">
                                <i className="fa fa-lock">&nbsp;</i>
                                <input
                                    className="password-input"
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) => {
                                      setPassword(e.target.value);
                                    }}
                                    id="password"
                                  placeholder="Enter your password"
                                />
                          </label>
                          <br />
                          <div>
                              <p className="login-par-reg mb-2">Don't have account? <Link to="/register">Register</Link> </p>
                              <Link to="/changepassword">Forgot Password?</Link>
                          </div>
                          <label htmlFor="submit" className="labelinp btn">
                            <input
                                type="submit"
                                name="login"
                                onClick={loginUser}
                                id="login"
                                className="form-submit"
                                value="Sign In"
                            />
                          </label> 
                      </form>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Login;
