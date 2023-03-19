import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../../../Styles/AgroShopHome.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";

function HomeFeaturesSlider(){

    const [product, setproduct] = useState([]);
    const navigate = useNavigate();

    const HandleClickSeed = () =>{
        navigate("/ProductsDetails?value=seeds");
    }
    const HandleClickTool = () =>{
        navigate("/ProductsDetails?value=AgricultureTools");
    }
    const HandleClickFertilizer = () =>{
        navigate("/ProductsDetails?value=Fertilizer");
    }
    const HandleClickPlant = () =>{
        navigate("/ProductsDetails?value=Pots&Planter");
    }

    useEffect(() => {
        const fetchdata = async () =>{
            const {data} = await axios.get("/Shopproductdata");
            // console.log(data);
            setproduct(data);
        }
        fetchdata();

        return () => {
            //
        }
    }, [])

    return(
        <>
          <div className="home_products_sell">
            <h1 style={{letterSpacing: '0.75px',color: '#22262A', margin: "2rem"}}>FEATURED PRODUCTS</h1>
          </div>
          
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{marginBottom: "3rem"}}>
            <div className="carousel-inner">
                {/* Feature Product Feature 1  */}
                <div className="carousel-item active">   
                    <div className="home-features-details" onClick={HandleClickSeed}>
                        {product.slice(4,8).map( (item) => {
                        return(
                        <div key={item._id} className="card " id="fc" style={{width: "18rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={"./../" + item.Imageurl} className="card-img-top" alt="Products" />
                            </div>
                            {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                <h5 className="card-title" style={{fontSize: '1.1rem'}}>{item.Hindi_name}</h5>
                                {/* Product Price in Body  */}
                                <div className="product-space">
                                    <span className="product-actual-price">&#8377;{item.new_price}</span>
                                    <span className="product-old-price">&#8377;{item.old_price}</span> 
                                </div>
                            </div>                                                       
                        </div>
                        )
                    })}
                    </div>
                </div>
                {/* Feature Product Feature   */}
                <div className="carousel-item">   
                    <div className="home-features-details" onClick={HandleClickTool}>
                        {product.slice(14,18).map( (item) => {
                        return(
                        <div key={item._id} className="card " id="fc" style={{width: "18rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={"./../" + item.Imageurl} className="card-img-top" alt="Products" />
                            </div>
                            {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                <h5 className="card-title" style={{fontSize: '1.1rem'}}>{item.Hindi_name}</h5>
                                {/* Product Price in Body  */}
                                <div className="product-space">
                                <span className="product-actual-price">&#8377;{item.new_price}</span>
                                    <span className="product-old-price">&#8377;{item.old_price}</span> 
                                </div>
                            </div>                                                       
                        </div>
                        )
                    })}
                    </div>
                </div>
                {/* Feature Product Feature 3  */}
                <div className="carousel-item">   
                    <div className="home-features-details" onClick={HandleClickFertilizer}>
                        {product.slice(24, 28).map( (item) => {
                        return(
                        <div key={item._id} className="card " id="fc" style={{width: "18rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={"./../" + item.Imageurl} className="card-img-top" alt="Products" />
                            </div>
                            {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                <h5 className="card-title" style={{fontSize: '1.1rem'}}>{item.Hindi_name}</h5>
                                {/* Product Price in Body  */}
                                <div className="product-space">
                                    <span className="product-actual-price">&#8377;{item.new_price}</span>
                                    <span className="product-old-price">&#8377;{item.old_price}</span> 
                                </div>
                            </div>                                                       
                        </div>
                        )
                    })}
                    </div>
                </div>
                {/* Feature Product Feature 4  */}
                <div className="carousel-item">   
                    <div className="home-features-details" onClick={HandleClickPlant}>
                        {product.slice(36, 40).map( (item) => {
                        return(
                        <div key={item._id} className="card " id="fc" style={{width: "18rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={"./../" + item.Imageurl} className="card-img-top" alt="Products" />
                            </div>
                            {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                <h5 className="card-title" style={{fontSize: '1.1rem'}}>{item.Hindi_name}</h5>
                                {/* Product Price in Body  */}
                                <div className="product-space">
                                    <span className="product-actual-price">&#8377;{item.new_price}</span>
                                    <span className="product-old-price">&#8377;{item.old_price}</span> 
                                </div>
                            </div>                                                       
                        </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true">&#60;</span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true">&#62;</span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </>
    )
}

export default HomeFeaturesSlider;
