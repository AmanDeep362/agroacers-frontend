import "../../Styles/AgricultureUniversiry.css";
import Loader from "../Loader";
import Image from "./../../Images/crousal/agroSchemes2.jpg"
const { useEffect, useState } = require("react");

const AgricultureUniversity = () => {

  const [universityData, setUniversityData] = useState([]);
  const [DataLoading, setDataLoading] = useState(true);
  const [Dataslice,setDataSlice] = useState(8);
  var x = 0;

  const getPageData = async () => {
    try {
      const res = await fetch("https://agroacers-backend.onrender.comAgricultureUniversityData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setUniversityData(data);
      if (res.status === 200) {
        setDataLoading(false);
      }
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPageData();
    window.scroll(0,0);
  }, []);


  const IsDataLoad = () => {
    if (DataLoading === true) {
      return <Loader />;
    } 
    else {
      return (
        <>
          <div className="university-main-container">
            <div className="BannerofUniversityPage">
                 <img src={Image} alt="Banner" className="BannerofUniversityimagebanner" />
            </div>
            <div className="university-container-heading">
              <h1>Top Agriculture University Of India</h1>
            </div>

            {/* Data of University  */}
            <div className="university-card-container">
              {universityData.slice(0,Dataslice).map((item) => (
                  <div className="card mb-3" key={x++}>
                    <img className="card-img-top imageuniver" src={item.Imageurl} alt="Card cap" />
                    
                    <div className="card-body">
                      <h4 className="card-title pagricheckhead">{item.UniversityName}</h4>
                      <p className="card-text pagricheck">
                        <span style={{fontWeight: "700"}}>Address : </span> <cite>{item.adress}</cite>
                      </p>
                      <p className="card-text pagricheck"><span style={{fontWeight: "700"}}>Contact : </span>{item.contact}</p>
                      <p className="card-text pagricheck"><span style={{fontWeight: "700"}}>Email Id : </span>{item.emailId}</p>
                      {item.website && (
                        <a href={item.website} target={"_blank"} rel="noopener noreferrer external">
                          <button className="btn btn-success">
                            Visit University Website
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
              ))}
            </div>
            {
              Dataslice <= universityData.length ?
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
      );
    }
  };

  return <IsDataLoad />;
};

export default AgricultureUniversity;
