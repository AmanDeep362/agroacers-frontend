import React from "react";
import { Link } from "react-router-dom";
import "./../../../Styles/AgroShopHome.css";
import 'bootstrap/dist/css/bootstrap.css';
import GrowBusiness from "./../ImagesShop/GrowBusiness.webp"

function SellProduct(){

    return(
        <>
          <div className="home_products_sell mb-4 mt-3">
            <h1  className="m-0">Sell Crops!</h1>
            <h3>Sell Your Goods with the trust of AgroAcers.</h3>
          </div>

          <div className="SellerAgro">
                <div className="GrowYourBusinesscontainer">
                    <img src={GrowBusiness} alt="GrowYourBusiness" className="GrowYourBusinessimg"/>
                </div>
                <div className="GrowYourBusinesscontainer2">
                    <h2>Grow your Business by Subscribe To AgroAcer's Shop.</h2>
                    <h5>Benefits:</h5>
                    <ul>
                        <li>Get Chance to Sell Your crops on AgroAcer's Platform.</li>
                        <li>Sell Crops to Top Companies with trust of AcroAcers.</li>
                        <li>Get best price of your crops.</li>
                        <li>Get the payment of your product directly into your bank account without the involvement of any third person.</li>
                        
                    </ul>
                    <div className="text-center">
                        <Link to="/shop/subscribeshop"><button className="btn btn-primary mb-2 w-100">Subscribe Now</button></Link>
                    </div>
                </div>
          </div>
        </>
    )
}

export default SellProduct;