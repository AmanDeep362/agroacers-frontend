import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "../../Styles/subscriberplan.css"
import 'bootstrap/dist/css/bootstrap.css';

const SubscriberPlan = ()=>{

    const { state} = useContext(UserContext);
    const navigate = useNavigate();
    const [pricepay,setPricePay] = useState("");
    const [UserDetail,setUserDetail] = useState([]);
 
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
  
    const callAboutPage = async () => {
        try {
          const res = await fetch("https://agroacers-backend.onrender.com/aboutuser", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
    
          const data = await res.json();
          setUserDetail(data);
    
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
        } catch (err) {
          console.log(err);
          navigate("/login", { replace: true })
        }
      };
      useEffect(()=>{
        callAboutPage();
    },[])
   
     const displayRazorpay= async (e)=> {

        let totalPrice = e.target.value;
        setPricePay(totalPrice);

        // console.log(pricepay)

		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Check your Internet Connection.')
			return
		}

		const data = await fetch('https://agroacers-backend.onrender.com/razorpay',{ 
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
			key: 'rzp_test_119cJvO3u59nKY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: UserDetail.name,
			description: 'AgroAcers Payment Gateway',
			handler: async function (response) {
				// alert(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_order_id)

                const name = UserDetail.name;
                const mail = UserDetail.email;
                const UserId = UserDetail._id;
                const orderid = response.razorpay_order_id;
                const transid = response.razorpay_payment_id;
                const amountpay = Number(data.amount.toString())/100;
                const res =  await fetch("https://agroacers-backend.onrender.com/sendSubscription" ,{
                    method : "POST",
                    headers : { 
                        "content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        name,mail,orderid,transid,amountpay,UserId
                    })
                });

                if(res.status === 201){
                   alert(`Successful Transaction.\nPayment ID: ${response.razorpay_payment_id}. \nNow You are Part of AgroAcers Shop.`);
                   navigate("/CropSellDashboard"); 
                      }
                else {
                    window.alert("Error occured , try again")
                }
			},
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open();
	}

  
  const Subscribercard = ()=>{

    if(UserDetail.isSubscriber === true && state){
        return(
          <>
             <div className="d-flex justify-content-center align-items-center w-100" style={{height: '75vh'}}>
                <h1>Already a Subscriber of AgroAcers Shop.</h1>
             </div>
          </>
        )
      }
    else if(UserDetail.isSubscriber===false){
        return(
            <>
              <div className="pricing8 py-5">
                <div className="container-fluid">
                  {/* Heading  */}
                  <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                      <h3 className="mb-3">Pricing to make your Work Effective</h3>
                      <h6 className="subtitle font-weight-normal">We offer 100% satisafaction and Money back Guarantee</h6>
                    </div>
                  </div>

                  {/* Plans for Subscribe  */}
                  <div className="d-flex justify-content-evenly align-items-center flex-wrap mt-4">
                      {/* Regular Plan  */} 
                      <div className="card p-0 m-3" style={{width: "18rem"}}>
                        <div className="card-body m-2">
                              <h5 className="card-title">Regular Plan</h5>
                              <span className="text-dark display-5">99 ₹</span>
                              <h6 className="font-weight-light font-14">Monthly</h6>
                              <p className="card-text mb-2 mt-2">The Master license allows you to Bid on your Favourite crop unlimited till 1 months and enjoy a realible / easy communication with farmer.</p>  
                        </div>
                        <button className="btn  btn-info-gradiant p-3 btn-block border-0 text-white"  onClick={displayRazorpay} value="99"  >CHOOSE PLAN </button>
                      </div>
                      {/* Master Plan  */}
                      <div className="card p-0 m-3" style={{width: "18rem"}}>
                        <div className="card-body m-2">
                              <h5 className="card-title">Master Plan</h5>
                              <span className="text-dark display-5">249 ₹</span>
                              <h6 className="font-weight-light font-14">6 Months</h6>
                              <p className="card-text mb-2 mt-2">The Master license allows you to Bid on your Favourite crop unlimited till 6 months and enjoy a realible / easy communication with farmer.</p>  
                        </div>
                        <button className="btn btn-info-gradiant p-3 btn-block border-0 text-white"  onClick={displayRazorpay} value="249"  >CHOOSE PLAN </button>
                      </div>

                      {/* Premium Plan  */}
                      <div className="card p-0 m-3" style={{width: "18rem"}}>
                        <div className="card-body m-2">
                              <h5 className="card-title">Premium Plan</h5>
                              <span className="text-dark display-5">499 ₹</span>
                              <h6 className="font-weight-light font-14">YEARLY</h6>
                              <p className="card-text mb-2 mt-2">The Master license allows you to Bid on your Favourite crop unlimited till yearly and enjoy a realible communication with farmer.</p>  
                        </div>
                        <button className="btn btn-info-gradiant p-3 btn-block border-0 text-white"  onClick={displayRazorpay} value="499"  >CHOOSE PLAN </button>
                      </div>
                  </div>
                </div>
              </div>
            </>
        )
      
      }
      else{
        return(
          null
        )
      }
    
    }
    return(
        <>
        <Subscribercard />
        </>
    )
}
export default SubscriberPlan;