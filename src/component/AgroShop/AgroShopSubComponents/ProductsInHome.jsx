import React from "react";
import { Link } from "react-router-dom";
import ProductsData from "./../AgroShopJSON/ProductsHome"
import "./../../../Styles/AgroShopHome.css";
import 'bootstrap/dist/css/bootstrap.css';

function ProductsForYou(){

    return(
        <>
          <div className="home_products_sell mb-4 mt-3">
            <h1  className="m-0">Products for you!</h1>
          </div>
          {/* Details of Product  */}
          <div className="home-products-details container-fluid mb-4" data-aos="fade-down">
                {ProductsData.map( (item) => {
                    return(
                       <div className="Productforyoucont" key={item.id}>
                            <Link to="/ProductsDetails?value=seeds">
                                <img src={item.image} alt="Product" className="Productforyouimage" />
                                <h6 className="Productforyouheading">{item.heading}</h6>
                           </Link>
                       </div>
                    )
                })}
          </div>
          <hr />
        </>
    )
}

export default ProductsForYou;