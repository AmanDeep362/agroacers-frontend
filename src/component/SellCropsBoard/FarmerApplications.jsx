import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Login from "../auth/login/Login";
const FarmerCropDashboard = ()=>{
    const { state, dispatch } = useContext(UserContext);
    const [userData, setUserData] = useState([]);
    const [cropData, setCropData] = useState([]);
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
          setUserData(data);
    
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
        } catch (err) {
          console.log(err);
        }
      };
    
    const FarmerCropData = async () => {
        try {
          const res = await fetch("https://agroacers-backend.onrender.com/Sellercropdata", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
    
          const data = await res.json();
          setCropData(data);
    
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        callAboutPage();
        FarmerCropData();
      
      }, []);
      const farmerCrop = cropData.filter((item1=>item1.Farmer_id ===userData._id));
    
        if(!state){
            return(
                <Login/>
            )
        }
        else if(farmerCrop.length<1){
            return(
                <>
                 No DATA FOUND
                </>
            )
        }
        else{
           return(
      <>
          <div className="farmer-dashboard-container">
            <h2>My Applications!</h2>
            <div className="application-container">
            <table>
              
                        <tr>
                            <th>Image</th>
                            <th>Application Id</th>
                            <th> Crop Name</th>
                            <th>Applied On</th>
                            <th>Number Of Bids</th>
                            <th>View Application</th>
                        </tr>   
                        {farmerCrop.map((item1)=>{
                            return(
                                <>
                                <tr>
                                    <td><img style={{width:"100px"}} src={item1.ImageOfCrop}></img></td>
                            <td>{item1._id}</td>
                            <td>{item1.CropVariety}</td>
                            <td>{item1.time}</td>
                            <td>{item1.bid_by.length}</td>
                            <td><Link to={""+item1._id}><button className="btn btn-primary"><i class="fa fa-file-text"></i></button></Link></td>
                    </tr>
                                </>
                            )
                    
                            }
                            )}
                </table>
               
                </div>
          </div>
      </>
           )
}
}
export default FarmerCropDashboard