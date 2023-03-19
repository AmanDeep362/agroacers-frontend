import React from "react";
import ProductsBrands from "./../AgroShopJSON/ProductBrands.json"
import "./../../../Styles/AgroShopHome.css";
import 'bootstrap/dist/css/bootstrap.css';

function ProductsBrand(){

    return(
        <>
          <div className="home_products_sell borderbrands">
            <h1  className="m-4">Benefit Of Top Trusted Brands</h1>
          </div>
          {/* Details of Product Brands */}
          <div className="home-products-details container-fluid mb-4" data-aos="fade-right">
                {ProductsBrands.map( (item) => {
                    return(
                       <div className="ProductforBrandsTop" key={item.id}>
                            <img src={item.image} alt="Product" className="Producttopbrandimage" />
                       </div>
                    )
                })}
          </div>
          <hr />
        </>
    )
}

export default ProductsBrand;