import { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/GovtScheme.css"
import AgroSchemeBanner from "../../Images/crousal/AgroSchemes1.jpg"
import Loader from "../Loader";
const GovtScheme = ()=>{
    const [SchemeData,SetSchemeData] = useState([]);
    const [IsLoading,setIsLoading] = useState(false);
    const [Dataslice,setDataSlice] = useState(5);
    var x=1;
    useEffect(() => {
        const fetchdata = async () =>{
              const {data} = await axios.get("/GovtSchemeData");
              SetSchemeData(data);
              setIsLoading(true);
            
          }
        fetchdata();
        window.scroll(0,0);
      },[]);
      if(!IsLoading){
          return(
              <Loader />
          )
      }
      else{
    return(
      <>
        <div className="govt-scheme-container">
            <div className="Govt-scheme-header">
                <img style={{width:"100%"}} src={AgroSchemeBanner} alt="Govt Scheme" />
            </div>
            <div className="govt-scheme-header">
                <h1 >Government Schemes</h1>
                <p>All agriculture government schemes with accurate information. Our goal to deliver this service to every Indian farmer.</p>
            </div>
           <div className="govt-schemes-body university-card-container">
              {SchemeData.slice(0,Dataslice).map((item)=>{
                  return(
                        <div className="card mb-3" key={x++}>
                            <img className="card-img-top imageuniver" src={item.Imageurl} alt="Card cap" />
                        
                            <div className="card-body">
                              <h2 className="card-title pagricheckhead" style={{color:"#77BC3F"}}>{item.SchemeName}</h2>
                              <p className="card-text pagricheck">
                                <span style={{fontWeight: "300",fontSize:"16px" ,color:"#77BC3F"}}>{item.Description}</span>
                              </p>

                              {item.website && (
                                <a href={item.website} target={"_blank"} rel="noopener noreferrer external">
                                  <button className="btn btn-success mt-2">
                                    Visit Scheme
                                  </button>
                                </a>
                              )}
                            </div>
                        </div>
                  )
              })}
           </div>
           {
              Dataslice <= SchemeData.length ?
              <div className=" d-flex align-items-center justify-content-center">
                <button onClick={()=>{
                  setDataSlice(Dataslice + 5)
                }} className="btn btn-success" id="load-more-btn" style={{margin:"3%"}}>Load more &nbsp;<i className="fa fa-chevron-circle-down"></i></button>
              </div>
              : 
              null
            }   
        </div>
      </>
    )
            }
}
export default GovtScheme;