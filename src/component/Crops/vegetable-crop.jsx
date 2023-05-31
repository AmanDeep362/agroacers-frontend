import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Vegetablecropbanner from "../../Images/crousal/Vegetable-crop-banner.jpg";
import "../../Styles/rabi-crop.css";
import Loader from "../Loader";
import axios from "axios";

const VegetableCrop = () => {
  const [cropData, setCropdata] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await axios.get("https://agroacers-backend.onrender.com/cropdata");
      setCropdata(data);
      setIsLoading(true);
    };
    fetchdata();
    window.scroll(0, 0);
  }, []);

  let VegetableCrops = cropData.filter(
    (item) => item.category === "Vegetables"
  );

  if (!IsLoading) {
    return <Loader />;
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
                  src={Vegetablecropbanner}
                  alt="First slide"
                />
                <div className="carousel-caption crousal-text d-none d-md-block">
                  <h2>Vegetables</h2>
                  <p>
                    The source of Indian crop information, and reminder for new
                    crop details, new crop varieties and crops farming details.
                    The information hub for all Indian farmers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rabi-crop-header">
          <h2>Vegetable Crops</h2>
          <p>
            India is a country where all kinds of vegetables and fruits are
            easily cultivated. India's diverse climate ensures availability of
            all varieties of fresh fruits and vegetables. It is the second
            largest producer of fruits and vegetables in the world after China.
            According to the National Horticultural Database published by the
            National Horticulture Board, during 2015-16, India produced 90.2
            million metric tonnes of fruits and 169.1 million metric tonnes of
            vegetables. The area under cultivation of fruits was 6.3 million
            hectares, while the cultivation of vegetables was done on 10.1
            million hectares.
          </p>
        </div>
        <div className="type-o-rabi-container">
          <h2 className="type-rabi-header">Types Of Rabi Crops</h2>
          <div className="crop-type-card-container">
            {VegetableCrops.map((item) => (
                <div className="card" key={item._id}>
                  <Link style={{ textDecoration: "none" }} to={item._id}>
                    <img
                      className="card-img-top img-fluid"
                      src={item.Image}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <h3 className="card-title">{item.title}</h3>
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

export default VegetableCrop;
