import React, {useEffect} from "react";
import CropBanner1 from "../../Images/crousal/indian-crop-banner-1.jpg";
import CropBanner2 from "../../Images/crousal/image-3.jpg";
import CropBanner3 from "../../Images/crousal/image-4.jpg";
import rabiimg from '../../Images/rabi-crop.jpg'
import kharifimg from "../../Images/Kharif-crop.jpg"
import vegetableimg from "../../Images/vegetable-crop.jpg"
import { Link } from "react-router-dom";
import "../../Styles/croppage.css";
import "bootstrap/dist/css/bootstrap.css";

const CropBlog = () => {

  useEffect(() => {
    window.scroll(0,0);
  }, []);
  
  return (
    <>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100 img-fluid"
              src={CropBanner1}
              alt="First slide"/>
            <div className="carousel-caption crousal-text d-none d-md-block">
              <h2>Indian Crops</h2>
              <p>
                The source of Indian crop information, and reminder for new crop
                details, new crop varieties and crops farming details. The
                information hub for all Indian farmers.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={CropBanner2}
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={CropBanner3}
              alt="Third slide"
            />
          </div>
        </div>
      </div>
      <div className="crop-blog-container">
        <div className="crop-blog-header">
          <h2>Crops</h2>
          <p>
            AgroAcers online portal delivering the service of agriculture world
            means Indian crop information of rabi (wheat, garlic, chickpea,
            cumin, onion, mustard, rabi vegetables, pea, opium, coriander,
            barley, strawberry and oat), Kharif (urad, cotton, maize, onion,
            vegetables, ginger, rice, moong, sorghum, pearl millet/bajra, finger
            millet/ragi (cereals), arhar (pulses), groundnut (oilseeds)
            and herbal like turmeric, tulsi, kalmegh, stevia, giloy, betel leaf,
            white musli, mentha, moringa, Malabar neem, sandalwood, flex seeds,
            kalonji, quinoa seeds, black cumin, mushroom. All mentioned
            information purpose is to provide detail about crop name, variety,
            yielding and basic queries.
          </p>
        </div>
        <div className="crop-blog-type-container">
          <h2 className="types-o-crop-head">Types Of crops</h2>
          <div className="crop-card-container">
            <Link className="Crop-link" to="Rabi">
              <div className="card">
                <img
                  className="card-img-top img-fluid"
                  src={rabiimg}
                  alt="Card cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Rabi Crops</h5>
                  <p className="card-text">
                    The main crops of the rabi season include wheat, maize,
                    gram, sesame, mustard, peas, oats, jowar, bajra. Rabi sowing
                    begins in October and concludes in mid-November. Sugarcane
                    plantation for rabi commences from December.
                  </p>
                </div>
              </div>
            </Link>
            <Link className="Crop-link" to="kharif">
              <div className="card">
                <img className="card-img-top img-fluid" src={kharifimg} alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">Kharif Crops</h5>
                  <p className="card-text">
                    What is kharif and rabi crop? Image result for kharif crops
                    The crops that are sown in the rainy season are called
                    kharif crops. ... Kharif crops are usually sown with the
                    beginning of the first rains in July, during the south-west
                    monsoon season.
                  </p>
                </div>
              </div>
            </Link>
            <Link className="Crop-link" to="Vegetables">
              <div className="card">
                <img className="card-img-top img-fluid" src={vegetableimg} alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">Vegetables</h5>
                  <p className="card-text">
                  Salad vegetable crops consist of a diverse range of plants that are suitable for eating raw or uncooked. This group includes lettuce, baby leaf, celery, radish, and salad onion. ... Crops may consist of individual plants or separated leaves.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default CropBlog;
