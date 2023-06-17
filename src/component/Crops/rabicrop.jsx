import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import rabicropbanner from "../../Images/crousal/rabi-crop-banner.jpg";
import "../../Styles/rabi-crop.css";
import Loader from "../Loader";
import axios from "axios";
import AdSense from "../Adsens";

const RabiCrop = () => {
    const [cropData, setCropdata] = useState([]);
    const [IsLoading,setIsLoading] = useState(false)
  
    useEffect(() => {
      const fetchdata = async () =>{
            const {data} = await axios.get("https://agroacers-backend.onrender.com/cropdata");
            setCropdata(data);
            setIsLoading(true);
        }
      fetchdata();
      window.scroll(0,0);
    }, []);

    let rabiCrop = cropData.filter(item=>item.category==="Rabi")


    if(!IsLoading){
      return(
        <Loader />
      )
    }

    return (
      <>
        <div className="rabi-crop-container">
          <div className="rabi-crousal-container">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100 img-fluid"
                    src={rabicropbanner}
                    alt="First slide"
                  />
                  <div className="carousel-caption crousal-text d-none d-md-block">
                    <h2>Rabi Crops</h2>
                    <p>
                      The source of Rabi crop information, and reminder for new
                      crop details, new crop varieties and crops farming details.
                      The information hub for all Indian farmers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rabi-crop-header">
            <h2>Rabi Crops</h2>
            <p>
              The main crops of the rabi season include wheat, maize, gram,
              sesame, mustard, peas, oats, jowar, bajra. Rabi sowing begins in
              October and concludes in mid-November. Sugarcane plantation for rabi
              commences from December.Rabi is the healthiest and most useful crop
              in the Indian agriculture field, with the help of rabi crop section,
              the farmer can learn more. The purpose of the rabi crop section to
              deliver the right information about rabi crops name, types and
              season in India. The path is very innovative for rabi crop farming
              techniques.
            </p>
            <AdSense/>
          </div>
          <div className="type-o-rabi-container">
            <h2 className="type-rabi-header">Types Of Rabi Crops</h2>
            <div className="crop-type-card-container">
            {
            rabiCrop.map((item) => (
                <div className="card" key={item._id}>
                  <Link style={{textDecoration:"none"}} to={item._id}>
                    <img className="card-img-top img-fluid" src={item.Image} alt="Card cap" />
                    <div className="card-body">
                      <h3 className="card-title">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );     
};

export default RabiCrop;
