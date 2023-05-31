import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Loader from "../Loader";
import axios from "axios";
import './../../Styles/orderdetailsadmin.css'

function ShopOrderDetails(){

    const [isLoading, setisLoading] = useState(false);
    const [orderData, setorderData] = useState("");

    const navigate = useNavigate();
    // console.log(orderData);

    useEffect(() => {
        const fetchdata = async () =>{
            
            const {data} = await axios.get("https://agroacers-backend.onrender.com/orderdata");
            setorderData(data);
            setisLoading(true);

            // console.log(orderData);
        }
        fetchdata();
        window.scroll(0,0)
    }, [])

    const updatedispatchdetails = async (e) => {
        // console.log(e.target.value);
        const id = e.target.value;

        const res =  await fetch("https://agroacers-backend.onrender.com/updatedispatchdetail" ,{
            method : "POST",
            headers : { 
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                id
            })
        })

        if(res.status === 200){
            // Call Function to Sell Data
            window.alert("Successful Update Dispatch Detail");
            navigate("/admin")
        }
        else{
            window.alert("Error Occur");
        }
    }

    const updatedeliverydetails = async (e) => {
        // console.log(e.target.value);

        const id = e.target.value;

        const res =  await fetch("https://agroacers-backend.onrender.com/updatedeliverdetail" ,{
            method : "POST",
            headers : { 
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                id
            })
        })

        if(res.status === 200){
            // Call Function to Sell Data
            window.alert("Successful Update Delivery Detail");
            navigate("/admin")
        }
        else{
            window.alert("Error Occur");
        }
    }
    
    if(!isLoading){
       return(
           <Loader />
       )
    }
    return (
        <>
            <div className="text-center">
                <h1 className="m-3 mb-4 text-decoration-underline"  style={{fontSize: '3rem', color: '#77bc3f'}}>User Orders Details</h1>
            </div>
            <div className="container-fluid">
                {
                    orderData.map((item) => {
                        return(
                            <div key={item._id} className="inner-container-order">

                                <div className="order-each-container">
                                    <div>
                                        <span>Order ID</span>
                                        <p>{item._id}</p>
                                    </div>

                                    <div>
                                        <span>Name</span>
                                        <p><p>{item.BuyerName}</p></p>
                                    </div>

                                    <div>
                                        <span>Email</span>
                                        <p>{item.EmailofBuyer}</p>
                                    </div>

                                    <div>
                                        <span>Order Time</span>
                                        <p>{item.time}</p>
                                    </div>

                                    <div>
                                        <span>City</span>
                                        <p><p>{item.city}</p></p>
                                    </div>
                                </div>


                                <div className="order-each-container">
                                    <div>
                                        <span>Delivery Address</span>
                                        <p>{item.AdressOfBuyer}</p>
                                    </div>

                                    <div>
                                        <span>Pin Code</span>
                                        <p>{item.Pincode}</p>
                                    </div> 

                                    <div>
                                        {
                                            !(item.isDispatch) ?
                                            <button className="btn btn-primary" value={item._id} onClick={updatedispatchdetails}>Dispatch Now</button> 
                                            :
                                            <button className="btn btn-primary" disabled>Already Dispatched</button>
                                        }
                                    </div>

                                    <div>
                                        {
                                            !(item.isDelivered) ?
                                            <button className="btn btn-primary" value={item._id} onClick={updatedeliverydetails}>Deliver Now</button> 
                                            :
                                            <button className="btn btn-primary" disabled>Already Delivered</button>
                                        }
                                    </div> 
                                </div>

                                <h3 className="text-center">Order Product Details</h3>

                                <table className="table table-light table-striped">
                                    <thead>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                
                                {/* Buy Product  */}
                                <tbody>
                                {item.buyitem.map((i) => {
                                    return(
                                        <tr key={i._id}>
                                            <td>{i._idofproduct}</td>
                                            <td>{i.Nameofproduct}</td>
                                            <td>{i.priceofproduct}</td>
                                            <td>{i.qtyofproduct}</td>  
                                        </tr>
                                        )
                                     })}
                                </tbody>
                            </table>
                            
                        </div>
                        )
                    })
                }
            </div>
        </>
    );
}


export default ShopOrderDetails;
