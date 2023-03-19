import React,{useEffect, useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import "./../../../Styles/register.css";
import "bootstrap/dist/css/bootstrap.css";
import regfarm from "../../../Images/New Img/Register1.jpg";
import Loader from "../../Loader";

const  Register = ()=>{
    const navigate = useNavigate();

    const [user,setUser] = useState({
        name:"",email:"",state:"",number:"",password:"",cpassword:"",time:""
    })

    const [Isloading,setisloading] = useState(false);

    // State to track the Register Auth 
    const [regbegin,setregbegin] = useState(true);
    const [emailverify,setemailverify] = useState(false);
    const [numverify,setnumverify] = useState(false);

    // State to get the user OTP Code 
    const [emailotpcode,setemailotpcode] = useState("");
    const [numotpcode,setnumotpcode] = useState("");

    // console.log(user.name,user.email,user.state,user.number,user.password,user.cpassword)
    // console.log(emailotpcode, numotpcode)

    const [emailsendotp,setemailsendotp] = useState("");


    let name , value;
    const  handleInput = async (e)=>{
        name = e.target.name;
        value = e.target.value;
        setUser({...user , [name]:value})
    }

    const verifyOTP = async (e) => {
        const number = user.number
        const OTP = numotpcode

        const res =  await fetch("https://agroacers-backend.onrender.com/verifynumber" ,{
            method : "POST",
            headers : { 
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                number,OTP
            })
        } );

        if(res.status === 200){
            postData();
        }
        else if(res.status === 400){
            window.alert("Invalid OTP, Unauthorize user")
            navigate("/", { replace: true })

        }
        else{
            window.alert("Invalid OTP")
        }
    }

    const sendemailotptoverify = async (e) => {
        const name = user.name;
        const number = user.number
    
        const res =  await fetch("https://agroacers-backend.onrender.com/sendverifynumber" ,{
            method : "POST",
            headers : { 
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                name,number
            })
        } );
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
        setemailsendotp(OTP);

        // Sending OTP via Email
        const name = user.name;
        const email = user.email
        const res =  await fetch("https://agroacers-backend.onrender.com/sendverifyemail" ,{
            method : "POST",
            headers : { 
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                name, email, OTP
            })
        } );
    }

    const checknumberexistance = async (e) => {
        const name = user.name;
        const number = user.number

        const res =  await fetch("https://agroacers-backend.onrender.com/verifyregisternumber" ,{
            method : "POST",
            headers : { 
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                name,number
            })
        } );
      
        if(res.status === 201){
            window.alert("Invalid Credentials");
        }
        else if(res.status === 202){
            window.alert("User Already exist with entered mobile number.");
        }
        else if(res.status === 200){
            // Send an OTP To Verify the Email
            sendotptoemailverifier();
            setregbegin(false)
            setemailverify(true)
        }
        else{
            window.alert("Registration Fails , Try again")
        }
    }

    const checkemailexistance = async (e)=>{

        const name = user.name;
        const email = user.email
    
        const res =  await fetch("https://agroacers-backend.onrender.com/verifyregisteremail" ,{
            method : "POST",
            headers : { 
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                name,email
            })
        } );
      
        if(res.status === 201){
            window.alert("Invalid Credentials");
        }
        else if(res.status === 202){
            window.alert("User Already exist with entered Email ID.");
        }
        else if(res.status === 200){
            checknumberexistance();
        }
        else{
            window.alert("Registration Fails , Try again")
        }
      }

    const verifyemailotp = () => {
        // Verify User Input all Data 
        if( !emailotpcode){
            window.alert("Please Enter the 6 digit OTP sent on your email.")
        }
        else if(emailotpcode.length < 6){
            window.alert("Please Enter the 6 digit OTP sent on your email.")

        }
        else{
            // Match the User Email OTP And move to next STEP
            if(emailsendotp === emailotpcode){
                setemailverify(false);
                setnumverify(true);
                sendemailotptoverify();
            }
            else{
                window.alert("Invalid OTP")
            }
            
        }
    }

    const verifynumberotp = () => {
        // Verify User Input all Data 
        if( !numotpcode){
            window.alert("Please Enter the 6 digit OTP sent on your number.")
        }
        else if(numotpcode.length < 6){
            window.alert("Please Enter the 6 digit OTP sent on your number.")

        }
        else{
            verifyOTP();
        }
    }
    

    const verifyemail = () => {
        // Verify User Input all Data 
        if( !user.name || !user.email || !user.state || !user.password || !user.cpassword || !user.number){
            var element = document.getElementById("invalidregister");
            // console.log(element)
            if(element){
                element.innerHTML = "**Fill out all the reqired fields.**"
                window.scroll(0,0);
            }
        }
        else if(user.password !== user.cpassword) {
            var element1 = document.getElementById("invalidregister");
            // console.log(element)
            if(element1){
                element.innerHTML = "**Passwords are not same**"
                window.scroll(0,0);
            }
        }
        else if(user.password.length < 8) {
            var element2 = document.getElementById("invalidregister");
            // console.log(element)
            if(element2){
                element.innerHTML = "**Length of password must be atleast 8 characters.**"
                window.scroll(0,0);
            }
        }
        else if(user.number.length !== 10) {
            var element3 = document.getElementById("invalidregister");
            // console.log(element)
            if(element3){
                element.innerHTML = "**Please Enter a valid mobile number.**"
                window.scroll(0,0);
            }
        }
        else{
            checkemailexistance();
        }    
    }


    const postData = async ()=>{

        const {name,email,state,number,password,cpassword} = user;

        let today  = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yy =today.getFullYear();
        let hh = today.getHours();
        let mi = today.getMinutes();
        let ss = today.getSeconds();
        let time = dd+"/"+mm+"/"+yy+"("+hh+":"+mi+":"+ss+")";

        const res =  await fetch("https://agroacers-backend.onrender.com/register" ,{
            method : "POST",
            headers : { 
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                name,email,state,number,password,cpassword,time
            })
        } );
        
        console.log(res)
    
        if(res.status === 200){
            window.alert("Successful Registration.\nCongratulation now you are a part of Agro Family.");
            navigate('login', { replace: true });
        }
        else{
            console.log(res)
            window.alert("Registration Fails , Try again")
        }
  }

    useEffect(()=>{
            setisloading(true)
    },[])

    if(!Isloading){
        return(
            <>
                <Loader />
            </>
        )
        }

    else{
    return(
        <>
           {regbegin &&
           <div id="main-container">
                <div className="register_container">
                    {/* Image code  */}
                    <div className="col-md-6 hidelogin">
                        <img src={regfarm} alt="Famer" className="regsideImg"/>
                    </div>
                    {/* form code  */}
                    <div className="col-md-6 col-sm-12">
                        <div className="register-page">
                            <div className="reg-form-container">
                            <h2 className="register-heading">Create your new account</h2>
                            <p className="register-para">"Do not wait until the conditions are perfect.<br />&nbsp;&nbsp;&nbsp;&nbsp;Beginning makes the condition perfect."</p>
                            
                            <form id="register-form">

                                <div id={"invalidregister"}></div>

                                {/* Name of User  */}
                                <label htmlFor="name" className="labelinp">
                                    <i className="fa fa-user">&nbsp;</i>
                                    <input type="text"
                                        className="all-input"
                                        name="name"  
                                        autoComplete="off" 
                                        required value={user.name} 
                                        onChange={handleInput} 
                                        id="name" 
                                        placeholder="Enter your name" 
                                    />
                                </label><br />

                                {/* Email of User  */}
                                <label htmlFor="email" className="labelinp">
                                    <i className="fa fa-envelope">&nbsp;</i>
                                    <input type="email" 
                                        className="all-input"
                                        name="email" 
                                        autoComplete="off" 
                                        required value={user.email.toLowerCase()} 
                                        onChange={handleInput} 
                                        id="email" 
                                        placeholder="Enter your email" 
                                    
                                    />
                                </label><br />

                                {/* Number of User  */}
                                <label htmlFor="number" className="labelinp">
                                    <i className="fa fa-phone">&nbsp;</i>
                                    <input type="text" 
                                        className="all-input"
                                        name="number" 
                                        autoComplete="off" 
                                        required value={user.number} 
                                        onChange={handleInput} 
                                        id="number" 
                                        min={0}
                                        maxLength={10}
                                        placeholder="Enter your number" 
                                    
                                    />
                                </label><br />
                                
                                {/* State To be selected  */}
                                <label htmlFor="state" className="labelinp">
                                    <i className="fa fa-home">&nbsp;</i>
                                    <select className="all-input" id="state" required onChange={handleInput} value={user.state} name="state">
                                        <option disabled value="">Choose...</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                        <option value="Daman and Diu">Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Puducherry">Puducherry</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                    </select>
                                </label><br />

                                {/* Password Of User  */}
                                <label htmlFor="password" className="labelinp">
                                    <i className="fa fa-lock">&nbsp;&nbsp;</i>
                                    <input type="password" 
                                        className="all-input"
                                        name="password" 
                                        autoComplete="new-password" 
                                        required value={user.password} 
                                        onChange={handleInput} 
                                        id="password" 
                                        placeholder="Enter your password" 
                                        minLength="8"
                                    />
                                </label><br />
                                <label htmlFor="cpassword" className="labelinp">
                                    <i className="fa fa-lock">&nbsp;&nbsp;</i>
                                    <input type="password" 
                                        className="all-input"
                                        name="cpassword" 
                                        autoComplete="new-password" 
                                        required value={user.cpassword} 
                                        onChange={handleInput} id="cpassword" 
                                        placeholder="Confirm your password"
                                        minLength="8"
                                    />
                                </label><br />

                                <div>
                                    <p className="reg-par-reg">Already have an Account? <Link to="/login">Login</Link> </p>
                                </div>

                                <label htmlFor="button" className="labelinp btn mb-5">
                                    <input type="button"  
                                        name="register" 
                                        id="register" 
                                        className="form-submit" 
                                        onClick={verifyemail}
                                        value="Register" 
                                    />
                                </label>
                            </form>            
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        }

        {emailverify && 
            <div className="emailverify">
                <h2>AgroAcers Verify Your Email</h2> 
                <p>Please take a moment to verify your Email ID send on <b>{user.email.toLowerCase()}</b>.</p>
                <p className="colorparav">This helps us to confirm your identity and secure your account.</p>

                <label htmlFor="otp">
                    <i className="fa fa-lock">&nbsp;&nbsp;</i>
                    <input type="password" 
                        className="all-input"
                        name="otp" 
                        id="otp" 
                        autoComplete="new-password" 
                        required 
                        value={emailotpcode}
                        onChange={ (e) => setemailotpcode(e.target.value)} 
                        placeholder="Enter OTP"
                        maxLength={6}
                    />
                </label><br />

                <label htmlFor="button" className="btn mb-5">
                    <input type="button"  
                            name="register" 
                            id="register" 
                            className="form-submit paddinginbtn" 
                            onClick={verifyemailotp}
                            value="Verify Email" 
                        />
                </label>
            </div>
        }
        {numverify && 
        <div className="emailverify">
            <h2>AgroAcers Verify Your Number</h2> 
            <p>Please take a moment to verify your mobile number send on <b>+91{user.number}</b>.</p>
            <p className="colorparav">This helps us to confirm your identity and secure your account.</p>

            <label htmlFor="numotp">
                <i className="fa fa-lock">&nbsp;&nbsp;</i>
                <input type="password" 
                    className="all-input"
                    name="numotp" 
                    autoComplete="new-password" 
                    required 
                    value={numotpcode}
                    onChange={e => {setnumotpcode(e.target.value)}} id="numotp" 
                    placeholder="Enter OTP "
                    maxLength={6}
                />
            </label><br />

            <label htmlFor="button" className="btn mb-5">
                <input type="button"  
                        name="register" 
                        id="register" 
                        className="form-submit paddinginbtn" 
                        onClick={verifynumberotp}
                        value="Verify Number" 
                    />
            </label>
        </div>
        }

        </>
    );
  }
    }

export default Register;
