import React from "react";
import "./../../../Styles/AgroShopHome.css";
import 'bootstrap/dist/css/bootstrap.css';
import Data from "./../AgroShopJSON/Shoppolicy.json";
import DataImages from "./../AgroShopJSON/PolicyImages.json";
import HomeFeatures from "./LatestProducts";

function ShopPolicy(){

    return(
        <>
           {/* policies Shown  */}
          <div className="home-products-policies-container poicy_check mt-4 pb-4" data-aos="fade-down-right">
            <h1>We take complete control of the supply chain</h1>
            <div className="poicy_check_div">
            <p>Agro Network connects Indian farmers directly to businesses across the country by taking complete <br />
              control of the supply chain. Each step is captured and monitored by our team enabled rural <br />
              management portal. Our integrated services include:</p>
            </div>
          </div>

          <div className="home-products-policies-container mt-4 pb-4" data-aos="fade-right">
            {DataImages.map( (item) => {
              return(
                <div className="text-center main-product-poicy-container" key={item.id}>
                  <div className="products-images-ship">
                    <img src={item.image} alt="Shopping" />
                  </div>
                  <h4>{item.text}</h4>
                </div>
              )
            })}
          </div>

          {/* Products  */}
          <HomeFeatures />

          <div className="home-products-policies-container xyzborder" data-aos="fade-up">
            {Data.map( (item) => {
              return(
                <div className="products-shipping" key={item.id}>
                    <img src={item.image} alt="Shopping" />
                    <div>
                        <h4 className="products-shipping-heading">{item.heading}</h4>
                        <p className="products-shipping-para">{item.paragraph}</p>
                    </div>
                </div>
              )
            })}
          </div>
        </>
    )
}

export default ShopPolicy;
