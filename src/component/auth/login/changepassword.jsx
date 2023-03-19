import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "../../../Styles/newpassword.css";

const Changepassword = () => {
  
  const navigate = useNavigate();
  const [verifyemail, setverifyemail] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [matchotp, setmatchotp] = useState("")

  // State to manage page move 
  const [emailtime, setemailtime] = useState(true);
  const [otptime, setotptime] = useState(false);
  const [passwordtime, setpasswordtime] = useState(false)
  const [hide, sethide] = useState(false)
  

  const passwordcrudchange = async () => {
      // Sending request to change password
      const res =  await fetch("/setnewpassword" ,{
        method : "POST",
        headers : { 
            "content-Type" : "application/json"
        },
        body : JSON.stringify({
            email, password, cpassword
        })
      } );

      if(res.status === 200){
        window.alert("Password Update Successful");
        navigate("/login", { replace: true })
      }
      else{
          window.alert("Error occur , Try again")
      }
  }

  const changeuserpassword = () => {
    if(!password || !cpassword){
      window.alert("Enter Password")
    }
    else if(password.length < 8){
      window.alert("The Password should have atleast 8 characters.")
    }
    else if(password !== cpassword){
      window.alert("Passwords are not same.")
    }
    else{
      passwordcrudchange();
    }
  }

  const sendotptoemailverifier = async (e) => {

    // Generate OTP To send On Email 
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    // console.log(OTP);
    setmatchotp(OTP);

    // Sending OTP via Email
    const res =  await fetch("/sendverifyemailtochnagepassword" ,{
        method : "POST",
        headers : { 
            "content-Type" : "application/json"
        },
        body : JSON.stringify({
            email, OTP
        })
    } );
}

  const sendtheemailtochangepassword = () => {
    if(!email){
      window.alert("Enter a valid Email address")
    }
    else{
      sendotptoemailverifier();
      setemailtime(false);
      setotptime(true);
    }
  }

  const sendemailagain = () => {
    sendotptoemailverifier();
    sethide(true);
  }

  const checktheotp = () => {
    if(matchotp !== verifyemail){
      window.alert("Invalid OTP")
    }
    else{
      setotptime(false);
      setpasswordtime(true)
    }
  }

  return (
    <>
      {emailtime && 
        <div className="container-changepassword">
            <div className="changepass-form-container text-center">
                <h2 className="npass-heading">Forgot Your Password?</h2>
                <p className="mb-1"> Tell us your email address, and we'll get your back on track in no time.</p>
                      <form method="POST" style={{margin: '1.6rem 1rem'}}>
                          <label htmlFor="email" className="labelinp">
                              <i className="fa fa-user">&nbsp;</i>
                              <input
                                  className="email-input"
                                  type="email"
                                  name="email"
                                  autoComplete="new-password" 
                                  value={email.toLowerCase()}
                                  onChange={(e) => {
                                      setemail(e.target.value);
                                    }}
                                  id="email"
                                  placeholder="Enter your email"
                              />
                          </label>
                          <br />

                          <label htmlFor="submit" className="labelinp">
                            <input
                                type="button"
                                name="checkotp"
                                onClick={sendtheemailtochangepassword}
                                id="checkotp"
                                className="form-submit"
                                value="Continue"
                            />
                          </label> 
                      </form>
                </div>
              </div> 
      }
      {otptime && 
        <div className="container-changepassword">
            <div className="changepass-form-container text-center">
                <h2 className="npass-heading">Reset Your Password</h2>
                <p className="mb-1 text-center">
                  <span>We want to sure it's really your. In order to further verify</span><br/>
                  <span>your identity, enter the verification code that was send to</span><br/>
                  <span>{email}.</span>
                </p>
                    <form method="POST" style={{margin: '1.6rem 1rem'}}>
                          <label htmlFor="otp" className="labelinp">
                              <i className="fa fa-lock">&nbsp;</i>
                              <input
                                  className="email-input"
                                  type="password"
                                  name="otp"
                                  autoComplete="new-password" 
                                  value={verifyemail}
                                  maxLength={6}
                                  onChange={(e) => {
                                    setverifyemail(e.target.value);
                                    }}
                                  id="otp"
                                  placeholder="Enter verification code"
                              />
                          </label>
                          <br />

                          <label htmlFor="submit" className="labelinp">
                            <input
                                type="button"
                                name="checkotp"
                                onClick={checktheotp}
                                id="checkotp"
                                className="form-submit"
                                value="Confirm"
                            />
                          </label> 
                    </form>
                    
                    <div className="text-center">
                      <p onClick={sendemailagain} className="resendotp">Resend Code</p>
                    </div>

                    {hide && 
                      <div className="text-center mt-2">
                        New OTP is send to your account please wait a moment.
                      </div>
                    }
              </div>
          </div> 
      }
      {passwordtime && 
        <div className="container-changepassword">
            <div className="changepass-form-container text-center">
                  <h2 className="npass-heading">Set New Password</h2>
                  <p className="mb-1">
                    The Password should have atleast 8 characters.
                  </p>
                    
                    <form method="POST" style={{margin: '1.6rem 1rem'}}>
                        <label htmlFor="password" className="labelinp">
                                <i className="fa fa-lock">&nbsp;</i>
                                <input
                                    className="password-input mt-1"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password" 
                                    minLength={8}
                                    value={password}
                                    onChange={(e) => {
                                      setpassword(e.target.value);
                                    }}
                                    id="password"
                                    placeholder="Enter New password"
                                />
                          </label>
                          <br />

                          <label htmlFor="cpassword" className="labelinp">
                                <i className="fa fa-lock">&nbsp;</i>
                                <input
                                    className="password-input mt-5"
                                    type="password"
                                    name="cpassword"
                                    autoComplete="new-password" 
                                    value={cpassword}
                                    onChange={(e) => {
                                      setcpassword(e.target.value);
                                    }}
                                    id="cpassword"
                                    placeholder="Confirm New password"
                                />
                          </label>
                          <br />

                          <label htmlFor="submit" className="labelinp">
                            <input
                                type="button"
                                name="checkotp"
                                onClick={changeuserpassword}
                                id="checkotp"
                                className="form-submit"
                                value="Confirm"
                            />
                          </label> 
                    </form>
                    <p >
                      To make sure your account is secure, our team work 24*7 at your service.
                    </p>
              </div>
          </div> 
      }
    </>
  );
};

export default Changepassword;
