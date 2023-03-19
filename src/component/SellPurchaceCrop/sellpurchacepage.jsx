import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../Styles/sellcropDetail.css";
import Loader from "../Loader";
import axios from "axios";
const SellerPurchace = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [pagedata, setPagedate] = useState([]);
  const [userData, setuserData] = useState([]);
  const [name, setname] = useState("");
  const [company, setcompany] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [body, setbody] = useState("");
  const [bidvalue, setbidvalue] = useState(0);
  const [sendbid, setsendbid] = useState({
    nameOfOrg: "",
    emailoforg: "",
    contactoforg: "",
    intrestoforg: "",
  });
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () =>{
        if(id){
            const {data} = await axios.get("/sellerCrop/" + id);
            setPagedate(data);
            setbidvalue(data.Min_price);
            setisLoading(true)
        }
    }
    fetchdata();
    window.scroll(0,0);
    
    }, [id]);
    
  useEffect(() => {
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
        setuserData(data);

        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
    };
    callAboutPage();

  }, []);

  const HandleBid = (e) => {
    setbidvalue(e.target.value);
  };
    
  let name1, value;

  const handlebidInput = (e) => {
    name1 = e.target.name;
    value = e.target.value;
    setsendbid({ ...sendbid, [name1]: value });
    // console.log(sendbid);
  };

  const postmessage = async (e)=>{
    e.preventDefault();

    let Farmername = pagedata.FarmerName;
    let Farmeremail = pagedata.EmailOfFarmer;

    const res =  await fetch("/sendMessagetofarmer" ,{
      method : "POST",
      headers : { 
          "content-Type" : "application/json"
      },
      body : JSON.stringify({
        name,company,body,Farmername,Farmeremail
      })
    });

    if(res.status === 200){
        window.alert("Your mail is succesfully sent.");
        const element = document.getElementsByClassName("btn-close");
      
        if(element){
          element[0].click();
          element[1].click();
        }

      navigate("/CropSellDashboard");
    }
    else {
      window.alert("Error occured , try again")
    }
  }

  const postBid = async (e) => {
    e.preventDefault();

    const { nameOfOrg, emailoforg, contactoforg, intrestoforg  } = sendbid;
    const cropname = pagedata.CropVariety;
    const farmername = pagedata.FarmerName;
    const bidprice = bidvalue;
    const farmeremail = pagedata.EmailOfFarmer;
    const UserId = userData._id;
    const CropId = pagedata._id;
    const res = await fetch("/sendbid", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        nameOfOrg,
        emailoforg,
        contactoforg,
        intrestoforg,
        cropname,
        farmername,
        bidprice,
        farmeremail,
        UserId,
        CropId
      }),
    });



    if (res.status === 201) {
      window.alert("Your bid is succesfully sent.");
      const element = document.getElementsByClassName("btn-close");
      // console.log(element);
      if(element){
        element[0].click();
        element[1].click();
      }

      navigate("/CropSellDashboard");
      // window.location.reload()
    } 
    else if (res.status === 500) {
      window.alert("Filled are required to fill");
    } 
    else {
      window.alert("Error occured , try again");
    }
  };

  if (!isLoading) {
    return <Loader />;
  } 
  
  else {
    return (
      <>
        <div>

          {/* Heading  */}
          <h1 className="headingofseller">{pagedata.CropVariety}</h1>

          {/* First Data  */}
          <div className="seller-purchace-header-container">
            {/* Image  */}
            <div className="sell-p-image-container">
              <img src={pagedata.ImageOfCrop} alt="Crop" />
             
              {/* Button to send message to Farmer  */}
                  <button type="button" className="btn btn-success" data-toggle="modal" data-target={"#Contactwithfarmer"}>Send Message to Farmer</button>
              
            </div>
              {/* Modal of Button  */}
              <div className="modal fade" id={"Contactwithfarmer"} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                              <h4 className="modal-title" id="exampleModalLabel">Send Message to {pagedata.FarmerName}</h4>
                              <button type="button" className="btn-close text-reset" data-dismiss="modal" aria-label="Close"></button>
                        </div>

                      <div className="modal-body">
                          <form  method="post">

                            <div className="mb-3">
                              <label htmlFor="formGroupExampleInputmodal" className="form-label mt-1">Sender Name</label>
                              <input 
                                  type="text" 
                                  className="form-control" 
                                  id="formGroupExampleInputmodal" 
                                  placeholder="John Smith" 
                                  value={name}
                                  onChange={(e) => setname(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="formGroupExampleInputmodalcomp" className="form-label mt-1">Company Name</label>
                              <input 
                                  type="text" 
                                  className="form-control" 
                                  id="formGroupExampleInputmodalcomp" 
                                  placeholder="Farmers Wealth Foundation" 
                                  value={company}
                                  onChange={(e) => setcompany(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="formGroupExampleInputmodalemail" className="form-label mt-1">Email Id</label>
                              <input 
                                  type="email" 
                                  className="form-control" 
                                  id="formGroupExampleInputmodalemail" 
                                  placeholder="agroacers.team@gmail.com" 
                                  value={email}
                                  onChange={(e) => setemail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="formGroupExampleInputmodalnum" className="form-label mt-1">Phone Number</label>
                              <input 
                                  type="number" 
                                  min={0}
                                  className="form-control" 
                                  id="formGroupExampleInputmodalnum" 
                                  placeholder="Farmers Wealth Foundation" 
                                  value={contact}
                                  onChange={(e) => setcontact(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="formGroupExampleInputmodalbody" className="form-label mt-1">Message</label>
                              <textarea 
                                  type="text" 
                                  className="form-control" 
                                  id="formGroupExampleInputmodalcomp" 
                                  placeholder="I'm from xyz company want to deal with you." 
                                  value={body}
                                  onChange={(e) => setbody(e.target.value)}
                                />
                            </div>
        
                              <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" onClick={postmessage}>Send Message</button>
                              </div>
                          </form>
                      </div>
                    </div>
                  </div>
              </div>
            

              {/* Table of Details */}
              <div className="sell-pur-crop-con">
                <table className="table">
                  <tr>
                    <td colSpan={2}>
                      <h2 style={{ textAlign: "center" }}>
                        <strong>Details</strong>
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Crop Produce : </strong>
                    </td>
                    <td>{pagedata.CropVariety}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Seed Company Used : </strong>
                    </td>
                    <td>{pagedata.SeedUsed}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        Total Land Farmer <br />
                        &nbsp; Want to Deal :{" "}
                      </strong>
                    </td>
                    <td>{pagedata.TotalLandinAcers} Acers</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Time of Yielding :</strong>
                    </td>
                    <td>{pagedata.YieldTime}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>State :</strong>
                    </td>
                    <td>{pagedata.State}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>City :</strong>
                    </td>
                    <td>{pagedata.city}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Address of Land :</strong>
                    </td>
                    <td>{pagedata.AdressOfLand}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Min Price Offer(per Quantal) :</strong>
                    </td>
                    <td>{pagedata.Min_price} Rs.</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Max Price Offer(per Quantal) :</strong>
                    </td>
                    <td>{pagedata.Max_price} Rs.</td>
                  </tr>
                </table>
              </div>
            </div>

          </div>

          {/* description of crop  */}
          <div className="sell-pur-dis-container">
            <h2>Description :</h2>
            <p>{pagedata.DescriptionOfCrop}</p>
          </div>

          {/* farmer Info  */}
          <div className="farmer-informaition-container">
            <h2>Farmer Details :</h2>
            <table className="table table-hover">
              <tr>
                <td>
                  <strong>Farmer Name:</strong>
                </td>
                <td>{pagedata.FarmerName}</td>
              </tr>

              <tr>
                <td>
                  <strong>Farmer's Father Name:</strong>
                </td>
                <td>{pagedata.FarmerFatherName}</td>
              </tr>

              <tr>
                <td>
                  <strong>Contact No :</strong>
                </td>
                <td>{pagedata.ContactNo}</td>
              </tr>

              <tr>
                <td>
                  <strong>Farmer's Email :</strong>
                </td>
                <td style={{ textTransform: "none" }}>
                  {pagedata.EmailOfFarmer}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>State :</strong>
                </td>
                <td>{pagedata.State}</td>
              </tr>

              <tr>
                <td>
                  <strong>City/Village :</strong>
                </td>
                <td>{pagedata.city}</td>
              </tr>

              <tr>
                <td>
                  <strong>Total Land Farmer Have (Acers) :</strong>
                </td>
                <td>{pagedata.TotalLandinAcers} Acers</td>
              </tr>

              <tr>
                <td>
                  <strong>Address Of Farmer :</strong>
                </td>
                <td>{pagedata.AdressOfFarmer}</td>
              </tr>

              <tr>
                <td>
                  <strong>Address Of Land :</strong>
                </td>
                <td>{pagedata.AdressOfLand}</td>
              </tr>

              <tr>
                <td>
                  <strong>Expected Harvest Time :</strong>
                </td>
                <td>{pagedata.HarvestTime}</td>
              </tr>
            </table>
          </div>

          {/* Bid Rate  */}
          <div className="bidding">
            <h3>
              <span>
                <strong>Bidding Amount :</strong>
              </span>{" "}
              {bidvalue || "Set your Bid value in "} Rs.
            </h3>

            <div className="biddingrating">
              <span style={{ marginLeft: "0px" }}>
                Min Price Offer(Per Quantal) : {pagedata.Min_price} Rs.
              </span>
              <input
                type="range"
                min={pagedata.Min_price}
                max={pagedata.Max_price}
                name="BidValue"
                onChange={HandleBid}
                id="BidValue"
                defaultValue={pagedata.Min_price}
              />
              <span>
                Max Price Offer(Per Quantal) : {pagedata.Max_price} Rs.
              </span>
            </div>

            <button
              type="button"
              className="btn btn-success"
              data-toggle="modal" 
              data-target={"#bd-example-modal-lg"}
            >
              Bid your Price
            </button>

            {/* modal of Bid Price  */}
          
            {/* Modal of Button  */}
            <div className="modal fade" id={"bd-example-modal-lg"} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                              <h4  style={{ color: "#77BC18", fontSize: "32px" }} className="modal-title" id="exampleModalLabel">Bid your Amount to deal with {pagedata.FarmerName}</h4>
                              <button type="button" className="btn-close text-reset" data-dismiss="modal" aria-label="Close"></button>
                        </div>

                      <div className="modal-body">

                          <p style={{ color: "#77BC3F", fontSize: "32px" }}>
                            <strong>Your Bidding Amount : </strong>
                            {bidvalue} Rs.
                          </p>
                          <form  method="post">

                            <div className="mb-3">
                              <label htmlFor="nameOfOrg" className="form-label mt-1">Name Of Organization :</label>
                              <input 
                                  type="text" 
                                  className="form-control" 
                                  id="nameOfOrg" 
                                  placeholder="Enter the Name or Company or Organisation"
                                  value={sendbid.nameOfOrg}
                                  onChange={handlebidInput}
                                  name="nameOfOrg"
                                  required
                                />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="emailoforg" className="form-label mt-1">Email of Organization :</label>
                              <input 
                                  type="email" 
                                  className="form-control" 
                                  id="emailoforg" 
                                  name="emailoforg"
                                  placeholder="Organization@gmail.com"
                                  value={sendbid.emailoforg}
                                  onChange={handlebidInput}
                                  required
                                />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="contactnooforg" className="form-label mt-1">Contact Number :</label>
                              <input 
                                  type="number" 
                                  className="form-control" 
                                  id="contactnooforg" 
                                  min={0}
                                  name="contactoforg"
                                  value={sendbid.contactoforg}
                                  onChange={handlebidInput}
                                  required
                                />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="intrestoforg" className="form-label mt-1">Why you want to Buy this Crop ?</label>
                              <textarea 
                                  type="text" 
                                  className="form-control" 
                                  id="intrestoforg" 
                                  placeholder="Write the intrest about crop you want to buy"
                                  value={sendbid.intrestoforg}
                                  onChange={handlebidInput}
                                  name="intrestoforg"
                                  required
                                />
                            </div>
        
                              <div className="modal-footer m-2">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                     Close
                                  </button>
                                <button type="submit" className="btn btn-primary mx-3" onClick={postBid}  value="Send your Bid">Send Message</button>
                              </div>
                          </form>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            <div className="dash-banner-per-id">
              <h2 className="dash-banner-headingper-id">My Crop, My MSP</h2>
            </div> 
      </>
    );
  }
};
export default SellerPurchace;
