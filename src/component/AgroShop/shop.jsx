import React,{useEffect, useState} from "react";
import "./../../Styles/AgroShopHome.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import Banner from "./ImagesShop/agriculture-banner-new.jpg";
import Banner2 from "./ImagesShop/Banner5.jpg";
import Loader from "../Loader";
import ShopPolicy from "./AgroShopSubComponents/ShopPolicy";
import HomeProducts from "./AgroShopSubComponents/ShopHomeProducts";
import ProductsForYou from "./AgroShopSubComponents/ProductsInHome";
import ProductsBrand from "./AgroShopSubComponents/ProductBrands";
import SellProduct from "./AgroShopSubComponents/ProductSubscribe";


function ShopHome(){


    const [DataLoading, setDataLoading] = useState(false);


    useEffect(() => {
        window.scroll(0,0);
        setDataLoading(true);
    }, []);

    if (!DataLoading){
        return (
            <Loader />
        );
    }

    return(
        <>
            {/* Print The Slider  */}
            <div className="ShopPageBannerHome">
                <img src={Banner} alt="" className="ShopPageBannerHomeImage"/>
                <div className="ShopPageBannerHomeInner">
                    <Link to="/Products?value=Agro"><button className="btn btn-light btn-endpad">SHOP NOW</button></Link>
                </div>
            </div>

            {/* Links */}
            <div className="home_products_links">
                <Link to="/ProductsDetails?value=seeds">Hybrid Seeds</Link>
                <Link to="/ProductsDetails?value=Fertilizer">Fertilizer</Link>
                <Link to="/ProductsDetails?value=AgricultureTools">Hardware &amp; Tools</Link>
                <Link to="/ProductsDetails?value=Pots&amp;Planter">Pots &amp; Planter</Link>
                <Link to="/Products?value=Agro">Farm Product</Link>
            </div>
           
            {/* Adding The Products to home  */}
            <HomeProducts />

            <div className="ShopPageBannerHome mt-2 nondisplayforsmall">
                <img src={Banner2} alt="" className="ShopPageBannerHomeImage"/>
                <div className="ShopPageBannerHomeInner2">
                    <h1>BEST PRICE AVAILABLE</h1>
                    <p>Our Best Seed Available At Your Doorstep!</p>
                    <Link to="/Products?value=Agro"><button className="btn btn-success btn-endpad">SHOP NOW</button></Link>
                </div>
            </div>

            {/* Print The Policy  */}
            <ShopPolicy />

            {/*Products for You to home  */}
            <ProductsForYou />

            {/* Top Brands  */}
            <ProductsBrand />

            {/* Sell Products  */}
            <SellProduct />
        </>
    )
}

export default ShopHome;
