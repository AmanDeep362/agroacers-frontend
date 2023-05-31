import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./../../../Styles/AgroShopHome.css";
import 'bootstrap/dist/css/bootstrap.css';

function HomeProducts(){

    const [product, setproduct] = useState([]);

    const [currentPage, setcurrentPage] = useState(0);
    const [productPerPage, setproductPerPage] = useState(8);
  
    useEffect(() => {
        const fetchdata = async () =>{
            const {data} = await axios.get("https://agroacers-backend.onrender.com/Shopproductdata");
            setproduct(data);
        }
        fetchdata();
    }, [])

    const ProductItemShowDisplay1 = () => {
        setcurrentPage(0)
        setproductPerPage(8);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay2 = () => {
        setcurrentPage(8)
        setproductPerPage(16);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay3 = () => {
        setcurrentPage(16)
        setproductPerPage(24);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay4 = () => {
        setcurrentPage(24)
        setproductPerPage(32);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay5 = () => {
        setcurrentPage(32)
        setproductPerPage(40);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay6 = () => {
        setcurrentPage(40)
        setproductPerPage(48);
        window.scroll(0, 200)
    }

    

    return(
        <>
          <div className="home_products_sell">
                <h1 className="mb-3">BEST SELLER</h1>
          </div>
          {/* Details of Product  */}
          <div className="home-products-details container-fluid">
                {product.slice(currentPage,productPerPage).map( (item) => {
                    return(
                        <div key={item._id} className={"card "} id="pc" style={{width: "17.5rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={item.Imageurl} className="card-img-top home-product-image" alt="Products" />
                                    {/* Hot Icon On Card  */}
                                    <div className="Hotproducts">
                                        Save {Math.round(100*(item.old_price - item.new_price)/item.old_price)}%
                                    </div>
                                    {/* OverLay Property of card  */}
                                    {item.quantity > 0 ? 
                                        <div className="overlay">
                                            <div className="overlay-img">
                                                <Link to={ "/products/" + item._id }><img src="./Images/Web/favorite_icon.svg" alt="Favorite" className="overlay-img-space" /></Link>
                                                <Link to={"/cart/" + item._id + "?qty=1"}><img src="./Images/Web/add_cart_icon.svg" alt="CartAdd" className="overlay-img-space" /></Link>
                                            </div>
                                        </div> : 
                                        <div className="overlay">
                                            <div className="overlay-img">
                                                <h5 className="overlay-out-0f-stock">Out Of Stock</h5>
                                            </div>
                                        </div>
                                    }
                             </div>
                             {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                    {/* Product Price in Body  */}
                                    <div className="product-space">
                                        <span className="product-actual-price">&#8377;{item.new_price}</span>
                                        <span className="product-old-price">&#8377;{item.old_price}</span>
                                    </div>
                                    <p className="card-text">{item.Name}</p>
                                    <h5 className="card-title fade-title-header">{item.Hindi_name}</h5>   
                            </div>
                        </div>
                    )
                })}
          </div>

     
            {product.length > 8 ? 
                <div className="product-load-more-container-brand" id="load"> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay1}>1</span> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay2}>2</span> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay3}>3</span> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay4}>4</span> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay5}>5</span> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay6}>6</span> 
                </div>
                : 
                null
            } 
        </>
    )
}

export default HomeProducts;