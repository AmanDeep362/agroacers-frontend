import React, { useEffect, useState, useContext } from "react";
import {useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Loader from "../../Loader";
import axios from "axios";
import "./../../../Styles/Cart.css";
import "./../../../Styles/checkout.css";
import CartContext from "../../../Reducer/Cart/CartContext";
import CartrecommendSlider from "./TopRecommend";

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

function MyCart(){

    const { addToCart, removeitem, emptymycartitem, cartItems } = useContext(CartContext);

    // console.log(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    const navigate = useNavigate();
    const [DataLoading, setDataLoading] = useState(false);
    const [coupon, setcoupon] = useState("");
    const [couponvalue, setcouponvalue] = useState("");
    const [userData, setUserData] = useState({});

    const [pricepay, setpricepay] = useState(0);

    const {id} = useParams();
    const values = useLocation().search;
    const qty = Number(values.split("=")[1]);

    // state to switch between pages 
    const [cartpage, setcartpage] = useState(true);
    const [checkoutpage, setcheckoutpage] = useState(false);


    // checkout Page Data 
    const [useritem,setuseritem] = useState({
        firstname:"",lastname:"",city:"",AdressOfBuyer:"",Pincode:""
    })

    const [deal, setdeal] = useState(false)

    let name , value;
    const  handleInput = async (e)=>{
        name = e.target.name;
        value = e.target.value;
        setuseritem({...useritem , [name]:value})
    }

    const HandleReturn = () => {
        setcheckoutpage(false);
        setcartpage(true);
    }

    const movetocheckout = () => {
        setcheckoutpage(true);
        setcartpage(false);
        setpricepay(totalPrice);
        window.scroll(0,0);
        if(coupon === "YES"){
            setpricepay(totalPrice-200)
        }
    }

    const additemtoshop = async (_id, Nameofproduct ,_idofproduct ,qtyofproduct ,priceofproduct) => {
        // console.log(_id,Nameofproduct ,_idofproduct ,qtyofproduct ,priceofproduct)
        const res =  await fetch("/sendcheckoutdata" ,{
            method : "POST",
            headers : { 
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                _id, Nameofproduct ,_idofproduct ,qtyofproduct ,priceofproduct
            })
        })

        if(res.status === 200){
            // Call Function to Sell Data
            console.log("Successful");
        }
        else{
            window.alert("Insufficient / Invalid Data in Array");
        }
    }

    const adduserproductslist = (dataid) => {
        cartItems.map((item) => {
            var _id = dataid;
            var Nameofproduct = item.Name;
            var _idofproduct = item._id;
            var qtyofproduct = item.qty;
            var priceofproduct = item.new_price;

            additemtoshop(_id, Nameofproduct, _idofproduct, qtyofproduct, priceofproduct);
        })
    }


    const addcheckoutdetails = async () => {
        const {firstname, lastname ,city ,AdressOfBuyer ,Pincode } = useritem;

        setdeal(true);
        let today  = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yy =today.getFullYear();
        let hh = today.getHours();
        let mi = today.getMinutes();
        let ss = today.getSeconds();
        let time = dd+"/"+mm+"/"+yy+"("+hh+":"+mi+":"+ss+")";

        const EmailofBuyer = userData.email;
        const BuyerName = firstname + " " + lastname;

        const res =  await fetch("/sendcheckoutdatabasic" ,{
                method : "POST",
                headers : { 
                    "content-Type" : "application/json"
                },
                body : JSON.stringify({
                    BuyerName, EmailofBuyer ,city ,AdressOfBuyer ,Pincode, time
                })
        })
                    
        const data = await res.json();
        const dataid = await data._id;
       
        // console.log(dataid);

        if(res.status === 200){
            // Call Function to Sell Data
            // console.log("Successful Data Added To Checkout");
            adduserproductslist(dataid);

            // console.log("data Added to shop Checkout successfully");
            displayRazorpay();
        }
        else{
            window.alert("Insufficient /Invalid Data");
        }
    }

    const callAboutPage = async () => {
        try {
            const res = await fetch("/aboutuser", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
    
            const data = await res.json();
                
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

            setUserData(data);
        } 
        catch (err) {
            console.log(err);
            navigate("/login", { replace: true })
        }
    };

    useEffect(() => {
        callAboutPage();

        const fetchdata = async () =>{
            if(id){
                const {data} = await axios.get("/Shopproductdata/" + id);
                // console.log(data, qty);
                addToCart(data, qty);
            }
        }
        fetchdata();

        window.scroll(0,0);
        setDataLoading(true);
    }, [id]);
 
    const removeFromCartHandler = (productId) =>{
        removeitem(productId);
    }

    const navigatetoproduct = (id) => {
        navigate("/products/" + id);
    }

    const totalPrice = cartItems.reduce( (a, c) => a + c.new_price * Number(c.qty), 0 + 200);

    const HandleVoucher = () => {
        if(couponvalue === "AGROACERSVOUCHER200"|| couponvalue === "FARMER200"){
            setcoupon("YES")
            var element = document.getElementById("button-addon2voucher");
            if(element){
                element.disabled = true;
                setpricepay(totalPrice-200)
            }
        }
        else if(couponvalue === ""){
            setcoupon("")
            setpricepay(totalPrice)
        }
        else{
            setcoupon("Invalid")
            setpricepay(totalPrice)
        }
    }

    async function displayRazorpay() {

        setpricepay(totalPrice);

        // console.log(pricepay)

		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Check your Internet Connection.')
			return
		}

		const data = await fetch('/razorpay',{ 
            method: 'POST',
            headers: {
                "content-Type" : "application/json",
            },
            body: JSON.stringify({
                pricepay,
            })
        }).then((t) =>
			t.json()
		)

		// console.log(data)

		const options = {
			key: 'rzp_test_18Hu4bjMNivXOV',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: userData.name,
			description: 'AgroAcers Payment Gateway',
			handler: async function (response) {
				// alert(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_order_id)
				alert(`Successful Transaction.\nPayment ID: ${response.razorpay_payment_id}`);

                const name = userData.name;
                const mail = userData.email;
                const orderid = response.razorpay_order_id;
                const transid = response.razorpay_payment_id;
                const amountpay = Number(data.amount.toString())/100;
                
                const res =  await fetch("/sendcartReply" ,{
                    method : "POST",
                    headers : { 
                        "content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        name,mail,orderid,transid,amountpay
                    })
                });

                if(res.status === 201){
                    window.alert("Your product will dispatch soon.\nPlease check the details sent on your email");
                }
                else {
                  window.alert("Error occured , try again")
                }

                // Update items in backend 

                async function changeitem(id, quantity) {

                    const res =  await fetch("/Shopproductcartdata" ,{
                        method : "POST",
                        headers : { 
                            "content-Type" : "application/json"
                        },
                        body : JSON.stringify({
                            id, quantity
                    })
                    });
    
                }

                cartItems.map((item) => {
                    var id = item._id;
                    var quantity = item.quantity - item.qty;

                    changeitem(id, quantity);
                })


                // window.alert("Thanks for order from AgroAcers.\nYour Order will dispatch soon.");
                // destroy the cookies
                localStorage.removeItem("cartItems");
                emptymycartitem();
                navigate("/");
                // window.location.reload();
			},
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open();
	}


    if (!DataLoading){
        return (
            <Loader />
        );
    }

    return(
        <>
        {cartpage ? 
            <>
            <div className="cart mb-5">
                <div className="cartheading">
                    AgroAcers Cart
                </div>
                <div className="cartLinkStyle">
                    <Link to="/shop">&lt;- Return</Link>
                </div>
                <div className="cart-list">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>PRODUCT</th>
                                    <th>PRODUCT NAME</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>UNIT PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                            cartItems.length === 0 ? <tr><td className="noitems">Cart Is Empty</td></tr> 
                            :
                            cartItems.map((item) => {
                                return(
                                    <tr key={item._id}>
                                            <td onClick={() => removeFromCartHandler(item._id)}><div className="cutitem">x</div></td>
                                            <td><img src={"./../" + item.Imageurl} alt="CartProduct" /></td>
                                            <td  onClick={() => navigatetoproduct(item._id)} className="cartproduct">{item.Name}</td>
                                            <td><span className="hideonsmallcart">Total Price:&nbsp;&nbsp;</span> &#8377; {item.new_price * Number(item.qty)}</td>
                                            <td><span className="hideonsmallcart">Quantity:  &nbsp; &nbsp; </span><select value={item.qty} onChange={ (e) => addToCart(item, e.target.value)}>
                                                    {[...Array(item.quantity).keys()].map( x => {
                                                        return(
                                                            <option value={x+1}>{x+1}</option>
                                                        )
                                                    })}
                                            </select>
                                            </td>
                                            <td><span className="hideonsmallcart">Unit Price:  &nbsp; &nbsp;</span>&#8377;{item.new_price}</td>
                                        </tr>
                                )
                                })}
                            </tbody>
                        </table>
                </div>
                <div className="cart-action">
                        {/* left Coupon  */}
                        <div className="mb-3 inputvoutcher">
                            <input type="text"  placeholder="Voucher code" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => {
                                        setcouponvalue(e.target.value);
                                        }} />
                            <button className="btn btn-success" type="button" id="button-addon2voucher" onClick={HandleVoucher}>Redeem</button>
                        </div>
                        {/* Right Add Cart  */}
                        <div className="mb-3 mt-3 col-md-5">
                            <div className="checkout marginsmall">
                                <p>SubTotal </p>
                                <span>&#8377;{cartItems.reduce( (a, c) => a + c.new_price * c.qty , 0)}</span> 
                            </div>
                            <div className="checkout">
                                <p>Shipping fee</p>
                                <span>&#8377;200</span> 
                            </div>
                            <div className="checkout">
                                <p>Coupon</p>
                                {coupon ? (coupon === "YES") ? <span>Accepted</span> : <span>Incorrect</span> : <span>No</span>} 
                            </div>
                            <hr />
                            <div className="checkout">
                                <h3>GRAND TOTAL </h3>
                                {coupon ? (coupon === "YES") ? <h3>&#8377;{totalPrice-200}</h3> : <h3>&#8377;{totalPrice}</h3> : <h3>&#8377;{totalPrice}</h3>} 
                            </div>
                            <div className="checkout mt-3">
                                <button onClick={movetocheckout} className="btn btn-success btn-block" disabled={cartItems.length === 0}>Check out</button>
                            </div>
                        </div>
                </div>
            </div>
            <CartrecommendSlider />
            </>
          :
          null
          }

          {checkoutpage ? 
            <>
              <div className="row mt-3 mx-3" style={{height: "92vh", alignItems: "center"}}>
                {/* First Side  */}
                <div className="col-md-3">
                    {/* Text  */}
                    <div style={{marginTop: "50px", marginLeft: "10px"}} className="text-center">
                        <h3 className="mt-3">Welcome</h3>
                        <p>You are few steps away from completing your order!</p>
                    </div>
                    <div style={{marginTop: "50px", marginLeft: "10px"}} className="text-center">
                        <h3 className="mt-3">Order Bill !</h3>
                        <h4 className="mt-3 stylebill">{pricepay} Rs.</h4>
                    </div>
                    {/* Back Button  */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-white btn-rounded back-button" onClick={HandleReturn}>Go back</button>
                    </div>            
                </div>

                <div className="col-md-9 justify-content-center">
                    <div className="card-custom mb-4">
                        <div className="mt-0 mx-5">
                            <div className="text-center mb-3 pb-2 mt-3">
                                <h3 style={{color: "#495057"}}>Delivery Details</h3>
                            </div>
                    
                            <form className="mb-0" style={{margin: "5px 10px"}}>
                    
                                <div className="row mb-3 smallscreenactiveform">
                                    {/* First Name  */}
                                <div className="col">
                                    <div className="form-outline">
                                    <input type="text" id="form9Example1" name="firstname" value={useritem.firstname}  onChange={handleInput}  className="form-control input-custom" />
                                    <label className="form-label checkoutlabel" htmlFor="form9Example1">First name</label>
                                    </div>
                                </div>
                                    {/* last Name  */}
                                <div className="col">
                                    <div className="form-outline">
                                    <input type="text" id="form9Example2" name="lastname" value={useritem.lastname}  onChange={handleInput} className="form-control input-custom" required/>
                                    <label className="form-label checkoutlabel" htmlFor="form9Example2">Last name</label>
                                    </div>
                                </div>
                                </div>

                                <div className="row mb-3 smallscreenactiveform">
                                    {/* Email  */}
                                <div className="col">
                                    <div className="form-outline">
                                    <input type="email" id="typeEmail" value={userData.email} className="form-control input-custom" disabled/>
                                    <label className="form-label checkoutlabel" htmlFor="typeEmail">Email</label>
                                    </div>
                                </div>
                                    {/* City  */}
                                <div className="col">
                                    <div className="form-outline">
                                    <input type="text" id="form9Example3" name="city" value={useritem.city}  onChange={handleInput} className="form-control input-custom" />
                                    <label className="form-label checkoutlabel" htmlFor="form9Example3">City</label>
                                    </div>
                                </div>
                                </div>
                                <div className="row mb-3 smallscreenactiveform">
                                    {/* Address  */}
                                <div className="col">
                                    <div className="form-outline">
                                    <input type="text" id="form9Example6" name="AdressOfBuyer" value={useritem.AdressOfBuyer}  onChange={handleInput} className="form-control input-custom" />
                                    <label className="form-label checkoutlabel" htmlFor="form9Example6">Address</label>
                                    </div>
                                </div>
                                    {/* Zip code  */}
                                <div className="col">
                                    <div className="form-outline">
                                    <input type="number" min={0} id="form9Example4" name="Pincode" value={useritem.Pincode}  onChange={handleInput} className="form-control input-custom" />
                                    <label className="form-label checkoutlabel" htmlFor="form9Example4">Zip</label>
                                    </div>
                                </div>
                               
                                </div>
                    
                             
                                {/* <!-- Submit button --> */}
                                <button type="button" onClick={addcheckoutdetails} className="btn btn-primary btn-rounded mx-4"
                                    disabled={deal}
                                    style={{backgroundColor: '#0062CC'}}>Proceed to Pay
                                </button>
                                {
                                    deal ? 
                                    <><span id="invalidregister">"Please wait we are processing your request"</span></> : null
                                }
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </>
          :
          null
          }
        </>
    )
}

export default MyCart;
