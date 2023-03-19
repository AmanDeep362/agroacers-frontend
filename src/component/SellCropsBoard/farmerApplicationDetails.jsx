import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../Styles/farmerApplication.css"
import { UserContext } from "../../App";
import Login from "../auth/login/Login";
import Loader from "../Loader";
const FarmerBiddingInfo = ()=>{
    const { state, dispatch } = useContext(UserContext);
    const [isLoading,setIsLoading] = useState(false);
    const [farmerApplication,setFarmerApplication] = useState({});
    const {id} = useParams();
    const FarmerApplicationData = async () => {
        try {
          const res = await fetch("https://agroacers-backend.onrender.com/CropSellDashboard/myApplication/"+id, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
    
          const data = await res.json();
          setFarmerApplication(data);
          setIsLoading(true)
    
    
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
          FarmerApplicationData()

      }, []);
      const BiddingDetails = ()=>{
        if(farmerApplication.bid_by <1){
          return(
            <>
            <h2>No Bid on Your Crop</h2>
            </>
          )
        }
        else{
          return(
            <>
            <table>
                 <tr > <th style={{textAlign:"center"}} colSpan={6}>Bidding Details</th> </tr>
                 <tr>
                   <th>Name Of Organization</th>
                   <th>Email</th>
                   <th>Contact</th>
                   <th>Message</th>
                   <th>Offered Price</th>
                   <th>Deal</th>
                 </tr>
                 {farmerApplication.bid_by.map((item)=>{
                   return(
                   <tr>
                     <td>{item.nameOfOrg}</td>
                     <td>{item.emailoforg}</td>
                     <td>{item.contactoforg}</td>
                     <td>{item.intrestoforg}</td>
                     <td>{item.bidprice}</td>
                     <td><button className="btn btn-primary"> chat <i class="fas fa-comment-alt-dots"></i></button></td>
                     </tr>
                   )
                   
                 })}
               </table>
            </>
          )
        }
      }
    if(!state){
    return(
        <>
        <Login/>
        </>
    )
}
else if(!isLoading){
  return(
  
  <Loader/>
    
  )
}
else {
    return(
        <>
        <div className="application-info-containe">
           <h2 className="application-info-header">Application Info</h2> 
           <hr />
           <div className="Info-card"  id="farmer-table-container">
            <table>
              <tr>
                <tr>
                <td><img src={farmerApplication.ImageOfCrop} alt="" /></td>
                </tr>
                <tr>
                  <th colSpan={2}>Farmer InFormation </th>
                </tr>
                <tr>
                  <th>Farmer Name</th>
                  <td>{farmerApplication.FarmerName}</td>
                </tr>
                <tr>
                  <th>Father Name</th>
                  <td>{farmerApplication.FarmerFatherName}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{farmerApplication.EmailOfFarmer}</td>
                </tr>
                <tr>
                  <th>Contact No</th>
                  <td>{farmerApplication.ContactNo}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{farmerApplication.Gender}</td>
                </tr>
              </tr>
              <br></br>
              <br></br>
              <tr>
                <tr>
                <th colSpan={2}>Farmer Adress Details</th>
                </tr>
                <tr> 
                  <th>State</th>
                  <td>{farmerApplication.State}</td>
                </tr>
                <tr> 
                  <th>City</th>
                  <td>{farmerApplication.city}</td>
                </tr>
                <tr> 
                  <th>State</th>
                  <td>{farmerApplication.State}</td>
                </tr>
                <tr> 
                  <th>PinCode</th>
                  <td>{farmerApplication.Pincode}</td>
                </tr>
                <tr> 
                  <th>Adress Of Farmer</th>
                  <td>{farmerApplication.AdressOfFarmer}</td>
                </tr>
              </tr>
              <br />
              <br />
              <tr>
                <tr>
                  <th colSpan={2}>Farmer Personal Details</th>
                </tr>
                <tr>
                  <th>Bank Name </th>
                  <td>{farmerApplication.BankName}</td>
                </tr>
                <tr>
                  <th>Bank Account No </th>
                  <td>{farmerApplication.BankAccountNo}</td>
                </tr>
                <tr>
                  <th>Bank IFSC Code </th>
                  <td>{farmerApplication.BankIFSC}</td>
                </tr>
                <tr>
                  <th>Aadhar Card Number </th>
                  <td>{farmerApplication.AadharNumber}</td>
                </tr>
                <tr>
                  <th>Date Of Birth</th>
                  <td>{farmerApplication.dateofbirth}</td>
                </tr>
              </tr>
              <br />
              <br />
              <tr>
                <tr>
                  <th colSpan={2}>Crop Details</th>
                </tr>
                <tr>
                  <th>Crop Name</th>
                  <td>{farmerApplication.CropVariety}</td>
                </tr>
                <tr>
                  <th>Total Land In Acers</th>
                  <td>{farmerApplication.TotalLandinAcers}</td>
                </tr>
                <tr>
                  <th>Adress Of Land</th>
                  <td>{farmerApplication.AdressOfLand}</td>
                </tr>
                <tr>
                  <th>Seed Used by Farmer</th>
                  <td>{farmerApplication.SeedUsed}</td>
                </tr>
                <tr>
                  <th>Description about Crop </th>
                  <td>{farmerApplication.DescriptionOfCrop}</td>
                </tr>
                <tr>
                  <th>Yield Time </th>
                  <td>{farmerApplication.YieldTime}</td>
                </tr>
                <tr>
                  <th>Harvest Time </th>
                  <td>{farmerApplication.HarvestTime}</td>
                </tr>
                <tr>
                 <th> Minimum Price of Crop </th>
                  <td>{farmerApplication.Min_price}</td>
                </tr>
                <tr>
                 <th> Maximum Price of Crop </th>
                  <td>{farmerApplication.Max_price}</td>
                </tr>
              </tr>
             
                
             
            </table>
            </div>
            <button onClick={()=>{
               var divElements = document.getElementById('farmer-table-container').innerHTML;
               //Get the HTML of whole page
               var oldPage = document.body.innerHTML;
               //Reset the page's HTML with div's HTML only
               document.body.innerHTML = 
                 "<html><head><title></title></head><body>" + 
                 divElements + "</body>";
               //Print Page
               window.print();
               //Restore orignal HTML
               document.body.innerHTML = oldPage;
          }} className="btn btn-primary">Print</button>
            </div>
            <div className="bid-info-container">
              <h2 className="bid-info-header">Bid Information</h2>
               <BiddingDetails/>
              </div>
        </>
    )
}

}
export default FarmerBiddingInfo;