import React,{useEffect, useState} from "react";
import "./../../../Styles/AgroShopHome.css";
import "./../../../Styles/UniqueProduct.css";
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate, useParams  } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";
import SellProduct from "../AgroShopSubComponents/ProductSubscribe";
import HomeFeaturesSlider from "./ProductSliderUnique";


function UniqueProductsDetails(){ 

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setproduct] = useState([]);
    const [qty, setqty] = useState(1);
    const [DataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        const fetchdata = async () =>{
            const {data} = await axios.get("/Shopproductdata/" + id);
            // console.log(data);
            setproduct(data);

            window.scroll(0,0);
            setDataLoading(true);
        }
        fetchdata();
        window.scroll(0,0);
    }, [id])

    if (!DataLoading){
        return (
            <Loader />
        );
    }

    // Code to redirect user to cart page on click to add cart
    const handleAddToCart = () => {
        navigate("/cart/" + id + "?qty=" + qty);
    }
    
    return(
            <div className="details" key={product._id}>
                
                <div className="smallrenderingproductuni col-md-8">
                    {/* Show the Image  */}
                    <div className="details-image ">
                        <img src={"./../" + product.Imageurl} alt="Product" />
                    </div>
                    {/* show the content  */}
                    <div className="details-info ">
                    <ul>
                        <li>
                            <h3><span style={{color: "#77BC3F"}}>Product : </span> {product.Name} ( {product.Hindi_name} )</h3>
                        </li>
                        {/* <li>
                            <h4><span style={{color: "#77BC3F"}}>Product ID : </span> {product._id}</h4>
                        </li> */}
                        <li>
                            <h4><span style={{color: "#77BC3F"}}>Price : </span>&#8377;{product.new_price} &nbsp;&nbsp;
                            <span style={{color: "#c0c0c0", textDecoration: "line-through"}}>(&#8377;{product.old_price})</span></h4>
                        </li>
                        <li>
                            <h5><span style={{color: "#77BC3F"}}>You Save : </span>&#8377;{product.old_price - product.new_price} </h5>
                        </li> 
                        <li>
                            <h5><span style={{color: "#77BC3F"}}>Discount : </span>{Math.round(100*(product.old_price - product.new_price)/product.old_price)}% </h5>
                        </li>                   
                        <li>
                            <p style={{textAlign: "justify", fontWeight: "500"}}><span style={{color: "#77BC3F", fontSize: "20px"}}>Description: </span>{product.Description}</p>
                        </li>
                    </ul>
                    </div>
                </div>

                <div className="details-action col-md-4">
                <ul>
                    <li className="mt-2">
                        <h3><span style={{color: "#FF1E56"}}>Order Now : </span>  {product.Name}</h3>
                    </li>
                    <li>
                        <h4><span style={{color: "#FF1E56"}}>Price : </span> &#8377;{product.new_price}</h4> 
                    </li>
                    <li>
                        <h4><span style={{color: "#FF1E56"}}>Status : </span>{product.quantity > 0 ? "Available In Stock" : "Out Of Stock"}</h4>
                    </li>
                    <li>
                        <h4><span style={{color: "#FF1E56"}}>Quantity : &nbsp;</span></h4> <select value={qty} onChange={ (e) => {setqty(e.target.value) }}>
                            {/* Making a dyanimic approch to product quantity  */}
                            {[...Array(product.quantity).keys()].map( x => {
                                return(
                                    <option value={x+1}>{x+1}</option>
                                )
                            })}
                        </select>
                    </li>
                    <li className="d-flex m-2 mt-3">
                        {product.quantity > 0 && <button onClick={handleAddToCart} className="btn btn-success btn-addto-cart">Add to Cart</button>}
                    </li>
                </ul>
            </div>
            

            {/* Display The Products Silder  */}
            <hr style={{marginTop: "5px", marginBottom: "0px"}}/>
            <HomeFeaturesSlider />

            {/* Display The Subscription  */}
            <hr style={{marginTop: "5px", marginBottom: "0px"}}/>
            <SellProduct />
        </div>
    )
}

export default UniqueProductsDetails;