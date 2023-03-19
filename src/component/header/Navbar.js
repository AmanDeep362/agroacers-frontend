import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, Link } from "react-router-dom";
import Logo from "./../../Images/Logo.png";
import "./../../Styles/header.css";
import { UserContext } from "../../App";
import GoogleTranslate from "../home/googletranslator";


const Navbar = () => {
  
    const { state, dispatch } = useContext(UserContext);
    //  console.log(dispatch);
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/aboutuser', {
                method: "GET",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
           
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);

            
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);


  const RenderAuth = () => {
    if (!state) {
      return (
        <>
          <ul className="navbar-nav" id="auth-btn">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <button className={"bg-btn"}>Login</button>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                <button className={"bg-btn"}>Register</button>
              </NavLink>
            </li>
          </ul>
        </>
      );
    } 
    //Testing
    else if (state.loggedIn === "undefined") {
      return (
        <>
          <ul className="navbar-nav" id="auth-btn">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <button className={"bg-btn"}>Login</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                <button className={"bg-btn"}>Register</button>
              </NavLink>
            </li>
          </ul>
        </>
      );
    }
    //
    else {
      if(userData.isAdmin === true){
      return (
        <>
        
          <div id="logout-btn">
              <ul className="navbar-nav">
                <div className="dropdown">
                  <li className="nav-item">
                    <div className="userinfoheader dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-user-circle-o">&nbsp;</i> Hi, {userData.name}
                    </div>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <Link className="dropdown-item" to="/cart">Cart</Link>
                      <Link className="dropdown-item"  to="/admin">Admin</Link>
                      <Link className="dropdown-item" to="/aboutuser">About User</Link>
                      <NavLink className="nav-link dropdown-item" to="/logout">
                        <button className={"bg-btn"}>Logout</button>
                      </NavLink>
        
                  </div>
                  </li>
                </div>
              </ul>
          </div>
        </>
      );
      }
      else if(userData.isAdmin === false){
        return (
          <>
              
            <div id="logout-btn">
              <ul className="navbar-nav">
                <div className="dropdown">
                  <li className="nav-item">
                    <div className="userinfoheader dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-user-circle-o">&nbsp;</i> Hi, {userData.name}
                    </div>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                      <Link className="dropdown-item" to="/cart">Cart</Link>
                      <Link className="dropdown-item" to="/aboutuser">About User</Link>
                      <NavLink className="nav-link dropdown-item" to="/logout">
                        <button className={"bg-btn"}>Logout</button>
                      </NavLink>
        
                  </div>
                  </li>
                </div>
              </ul>
          </div>
          </>
        );
      }
      else{
        return (
        <>
          <ul className="navbar-nav" id="auth-btn">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <button className={"bg-btn"}>Login</button>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                <button className={"bg-btn"}>Register</button>
              </NavLink>
            </li>
          </ul>
        </>
        )}
        
    }
  };

  // For Small Screen Render Login Register
  const RenderAuthSmall = () => {
    if (!state) {
      return (
        <>
          <div className={"hide_small hide_small_login"}>
              <NavLink className="nav-link" to="/login"
                       data-toggle="collapse"
                       data-target="#navbarSupportedContent"
                       aria-controls="navbarSupportedContent"
                       aria-expanded="false"
                       aria-label="Toggle navigation"
              >
                <button className={"bg-btn"}>Login</button>
              </NavLink>
              <NavLink className="nav-link" to="/register"
                       data-toggle="collapse"
                       data-target="#navbarSupportedContent"
                       aria-controls="navbarSupportedContent"
                       aria-expanded="false"
                       aria-label="Toggle navigation"
              >
                <button className={"bg-btn"}>Register</button>
              </NavLink>
            </div>
        </>
      );
    } 
    else if (state.loggedIn === "undefined") {
      return (
        <>
          <div className={"hide_small hide_small_login"}>
              <NavLink className="nav-link" to="/login"
                       data-toggle="collapse"
                       data-target="#navbarSupportedContent"
                       aria-controls="navbarSupportedContent"
                       aria-expanded="false"
                       aria-label="Toggle navigation"
              >
                <button className={"bg-btn"}>Login</button>
              </NavLink>
              <NavLink className="nav-link" to="/register"
                       data-toggle="collapse"
                       data-target="#navbarSupportedContent"
                       aria-controls="navbarSupportedContent"
                       aria-expanded="false"
                       aria-label="Toggle navigation"
              >
                <button className={"bg-btn"}>Register</button>
              </NavLink>
            </div>
        </>
      );
    }
    else {
      if(userData.isAdmin === true){
      return (
        <>
        
            <div className={"hide_small"}>
              <ul className="navbar-nav">
                <div className="dropdown">
                  <li className="nav-item">
                    <div className="userinfoheader dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-user-circle-o">&nbsp;</i> Hi, {userData.name}
                    </div>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <Link className="dropdown-item" to="/cart" 
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >Cart</Link>
                      <Link className="dropdown-item"  to="/admin"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                      >Admin</Link>
                      <Link className="dropdown-item" to="/aboutuser"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                      >About User</Link>
                      <NavLink className="nav-link dropdown-item" to="/logout"
                               data-toggle="collapse"
                               data-target="#navbarSupportedContent"
                               aria-controls="navbarSupportedContent"
                               aria-expanded="false"
                               aria-label="Toggle navigation"
                      >
                        <button className={"bg-btn"}>Logout</button>
                      </NavLink>
        
                  </div>
                  </li>
                </div>
              </ul>
            </div>
        </>
      );
      }
      else if(userData.isAdmin=== false) {
        return (
          <>
        
            <div className={"hide_small"}>
            <ul className="navbar-nav">
                <div className="dropdown">
                  <li className="nav-item">
                    <div className="userinfoheader dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-user-circle-o">&nbsp;</i> Hi, {userData.name}
                    </div>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                      <Link className="dropdown-item" to="/cart" 
                         data-toggle="collapse"
                         data-target="#navbarSupportedContent"
                         aria-controls="navbarSupportedContent"
                         aria-expanded="false"
                         aria-label="Toggle navigation"
                      >Cart</Link>
                      <Link className="dropdown-item" to="/aboutuser" 
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                      >About User</Link>
                      <NavLink className="nav-link dropdown-item" to="/logout"
                               data-toggle="collapse"
                               data-target="#navbarSupportedContent"
                               aria-controls="navbarSupportedContent"
                               aria-expanded="false"
                               aria-label="Toggle navigation"
                      >
                        <button className={"bg-btn"}>Logout</button>
                      </NavLink>
                      
                  </div>
                  </li>
                </div>
              </ul>

            </div>
          </>
        );
      }
      else{
        return (
        <>
          <div className={"hide_small hide_small_login"}>
              <NavLink className="nav-link" to="/login"
                       data-toggle="collapse"
                       data-target="#navbarSupportedContent"
                       aria-controls="navbarSupportedContent"
                       aria-expanded="false"
                       aria-label="Toggle navigation"
              >
                <button className={"bg-btn"}>Login</button>
              </NavLink>
              <NavLink className="nav-link" to="/register"
                       data-toggle="collapse"
                       data-target="#navbarSupportedContent"
                       aria-controls="navbarSupportedContent"
                       aria-expanded="false"
                       aria-label="Toggle navigation"
              >
                <button className={"bg-btn"}>Register</button>
              </NavLink>
            </div>
        </>
        )}
        
    }
  };

  return (
    <>
    <GoogleTranslate/>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{ color: "#77BC3F", fontWeight: "700", fontSize: "1.4rem" }}
          >
            <img
              src={Logo}
              alt=""
              width="35"
              height="30"
              className="d-inline-block align-text-top"
            />{" "}
            AgroAcers
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse ml-auto"
            id="navbarSupportedContent"
          >
          
          <RenderAuthSmall />
          
            <div className={"nav-box-margin hide_small"}>
              <ul className="navbar-nav ul-border">
                <li className="nav-item">
                  <Link className="nav-link nav-hov" to="/"
                   data-toggle="collapse"
                   data-target="#navbarSupportedContent"
                   aria-controls="navbarSupportedContent"
                   aria-expanded="false"
                   aria-label="Toggle navigation">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link nav-hov" to="/shop"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  >
                    Shop
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link nav-hov" to="/about"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  >
                    About
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle nav-hov"
                    to="#"
                    id="navbarDropdownbloge"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    
                  >
                    Blogs
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownbloge"
                  >
                    <NavLink className="dropdown-item" to="/crops/rabi" 
                             data-toggle="collapse"
                             data-target="#navbarSupportedContent"
                             aria-controls="navbarSupportedContent"
                             aria-expanded="false"
                             aria-label="Toggle navigation" 
                    >
                      Rabi
                    </NavLink>
                    <NavLink className="dropdown-item" to="/crops/kharif"
                              data-toggle="collapse"
                              data-target="#navbarSupportedContent"
                              aria-controls="navbarSupportedContent"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                    >
                      Kharif
                    </NavLink>
                    <NavLink className="dropdown-item" to="/crops/vegetables"
                              data-toggle="collapse"
                              data-target="#navbarSupportedContent"
                              aria-controls="navbarSupportedContent"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                    >
                      Vegetables
                    </NavLink>
                    <NavLink className="dropdown-item" to="/crops/strategies"
                              data-toggle="collapse"
                              data-target="#navbarSupportedContent"
                              aria-controls="navbarSupportedContent"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                    >
                      Strategies
                    </NavLink>
                    
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle nav-hov"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    
                  >
                    Services
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink className="dropdown-item" to="/crops" 
                             data-toggle="collapse"
                             data-target="#navbarSupportedContent"
                             aria-controls="navbarSupportedContent"
                             aria-expanded="false"
                             aria-label="Toggle navigation" 
                    >
                      Crops
                    </NavLink>
                    <NavLink className="dropdown-item" to="/mandirates"
                              data-toggle="collapse"
                              data-target="#navbarSupportedContent"
                              aria-controls="navbarSupportedContent"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                    >
                      Mandi Price
                    </NavLink>
                    <NavLink className="dropdown-item" to="/agri"
                              data-toggle="collapse"
                              data-target="#navbarSupportedContent"
                              aria-controls="navbarSupportedContent"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                    >
                      Courses/Universities
                    </NavLink>
                    <NavLink className="dropdown-item" to="/GovternmentScheme"
                             data-toggle="collapse"
                             data-target="#navbarSupportedContent"
                             aria-controls="navbarSupportedContent"
                             aria-expanded="false"
                             aria-label="Toggle navigation"
                    >
                      Government Policies
                    </NavLink>
                    <NavLink className="dropdown-item" to="/CropSellDashboard"
                             data-toggle="collapse"
                             data-target="#navbarSupportedContent"
                             aria-controls="navbarSupportedContent"
                             aria-expanded="false"
                             aria-label="Toggle navigation"
                    >
                      Sell &amp; Purchase Crops
                    </NavLink>
                  </div>
                </li>

                <li className="nav-item nav-hov">
                  <Link className="nav-link" to="/contact"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>


            {/* Small Screen Header element  */}
            <div className={"nav-box-margin hide_small_header"}>
              <ul className="navbar-nav ul-border">
                <li className="nav-item">
                  <Link className="nav-link nav-hov" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link nav-hov" to="/shop">
                    Shop
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link nav-hov" to="/about">
                    About
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle nav-hov"
                    to="#"
                    id="navbarDropdownblog"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    
                  >
                    Blogs
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownblog"
                  >
                    <NavLink className="dropdown-item" to="/crops/Rabi">
                      Rabi
                    </NavLink>
                    <NavLink className="dropdown-item" to="/crops/kharif">
                      Kharif
                    </NavLink>
                    <NavLink className="dropdown-item" to="/crops/Vegetables">
                      Vegetables
                    </NavLink>
                    <NavLink className="dropdown-item" to="/crops/strategies">
                      Strategies
                    </NavLink>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle nav-hov"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    
                  >
                    Services
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink className="dropdown-item" to="/crops">
                      Crops
                    </NavLink>
                    <NavLink className="dropdown-item" to="/mandirates">
                      Mandi Price
                    </NavLink>
                    <NavLink className="dropdown-item" to="/agri">
                      Courses/Universities
                    </NavLink>
                    <NavLink className="dropdown-item" to="/GovternmentScheme">
                      Government Policies
                    </NavLink>
                    <NavLink className="dropdown-item" to="/CropSellDashboard">
                      Sell &amp; Purchase Crops
                    </NavLink>
                  </div>
                </li>
               
                <li className="nav-item nav-hov">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className={"list-hide"}>
              <RenderAuth />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
