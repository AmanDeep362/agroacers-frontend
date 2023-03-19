import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KharifCropBanner from "../../Images/crousal/Kharif-crop-banner.jpg";
import "../../Styles/rabi-crop.css";
import Loader from "../Loader";
import axios from "axios";

const KharifCrop = () => {
  const [cropData, setCropdata] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await axios.get("/cropdata");
      setCropdata(data);
      setIsLoading(true);
    };
    fetchdata();
    window.scroll(0, 0);
  }, []);

  let KharifCrop = cropData.filter((item) => item.category === "Kharif");

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
                  src={KharifCropBanner}
                  alt="First slide"
                />
                <div className="carousel-caption crousal-text d-none d-md-block">
                  <h2>Kharif Crops</h2>
                  <p>
                    All type of Kharif crop related information, news, details,
                    and the beneficial note will help the farmer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rabi-crop-header">
          <h2>Kharif Crops</h2>
          <p>
            Kharif Crop Types Kharif Crops: (crops means: when a similar plant
            grown on fields) that are sown in the rainy season from June to
            September are characterized as Kharif Crops. Groundnut, Paddy
            (rice), Maize all need more water to cultivate, so grown in the
            rainy season thus called Kharif Crops. According to the Indian
            farming and as per season of Kharif crops, In this crop category, we
            can include rice, maize, sorghum, pearl millet/bajra, finger
            millet/ragi, arhar, soybean, groundnut, cotton etc. The rabi crops
            include wheat, barley, oats, chickpea/gram, linseed, mustard etc. In
            India, the season starts in June and ends in October. The Kharif
            crops are harvested at the end of the monsoon season October or
            November month. In Kharif crops category rice, moong dal, millets,
            urad and maize are among the key crops of Kharif season. According
            to the season six types of Kharif crops: food crops, fiber crops,
            feed crops, industrial crops, oil crops and ornamental crops. As per
            the world's most popular food crops, we can include grains, corn,
            wheat and rice.
          </p>
        </div>
        <div className="type-o-rabi-container">
          <h2 className="type-rabi-header">Types Of Kharif Crops</h2>
          <div className="crop-type-card-container">
            {KharifCrop.map((item) => (
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

export default KharifCrop;
