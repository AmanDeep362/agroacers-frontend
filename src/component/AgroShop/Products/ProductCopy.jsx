import React,{useEffect, useState} from "react";
import "./../../../Styles/AgroShopHome.css";
import "./../../../Styles/ShopProductsDetails.css";
import Banner from "./../ImagesShop/banner.png"
import 'bootstrap/dist/css/bootstrap.css';
import {useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";
import GrowBusiness from "./../ImagesShop/Grow.png"
import GrowBusiness2 from "./../ImagesShop/Grow2.png"
import ShopPolicy from "../AgroShopSubComponents/ShopPolicy";

function ProductsDetailsAll(){ 

    const value = useLocation().search;
    var qty = value.split("=")[1];

    const navigate = useNavigate();

    const [product, setproduct] = useState([]);
    const [productbackup, setproductbackup] = useState([]);
    const [cntProduct, setcntProduct] = useState([8]);

    const IncrementProductsCards = () =>{
        setcntProduct(Number(cntProduct) + 4);
    }

    const [DataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        const fetchdata = async () =>{
            const {data} = await axios.get("https://agroacers-backend.onrender.com/Shopproductdata");
            // console.log(data);
            setproduct(data);
            setproductbackup(data)

            setDataLoading(true);
        }
        fetchdata();
        window.scroll(0,0);
    }, [])

    if (!DataLoading){
        return (
            <Loader />
        );
    }

    var result = []
    product.map( (e) => result.push(e));


    if(cntProduct >= result.length){
        var e = document.getElementById("load");
        if(e){
            e.style.display = "none";
        }
    }


    const navigatefilterproduct = () => {
        var e = document.getElementById("FindProducts");
        var value = e.value;

        // console.log(value)
        if(value === "Select"){
            
        }
        else{
            setproduct(productbackup)
            navigate(value)
        }
    }

    const sortproduct = () => {
        var e = document.getElementById("SortedProduct");
        var value = e.value;

        // console.log(value)
        if(value === "Select"){
            
        }
        else if(value === "Lowest"){       
            result.sort((a, b) => {
                return a.new_price - b.new_price;
            });
            setproduct(result)
        }
        else{       
            result.sort((a, b) => {
                return b.new_price - a.new_price;
            });
            setproduct(result)
        }
    }

    const RenderNone = () => {
        return(
            <> 
               <div className="d-flex justify-content-center align-items-center" style={{height: "34vh", fontSize: "2rem", color: "#c0c0c0"}}>
                        No data Found ...
               </div>
            </>
        )
    }

    const HandleTheSearch = (value) => {
        var ans = productbackup.map((a) => {
            if(a.Name.search(value) > -1){
                return a
            }
        });

        ans = ans.filter((e) => e !== undefined)
        
        // console.log(result, ans)
        setproduct(ans);
    }

    const SearchProductDetails = () => {
        var e = document.getElementById("ProductSearcher");
        var value = e.value;


        setproduct(productbackup)
        // console.log(product)


        if(value === ""){
            setproduct(productbackup)
        }
        else{
            HandleTheSearch(value)
        }       
    }

    return(
        <>
            {/* Banner  */}
            <img src={Banner} alt="Product Banner" className="productsDetailsImage"/>

            <div className="productsDetailsHeading">
                <p className="productsDetailsinfo text-capitalize">AgroAcers Store</p>
            </div> 
            
            <div className="product-info-right-inner-acc">
                <h3 className="mb-0 text-capitalize">Total Items in {qty} Store: {result.length}</h3>  
                <div className="innner-product-info-container marginforsmalltopagain">
                    <span>Sort By: </span>
                    <select onChange={sortproduct} id={"SortedProduct"}>
                        <option value="Select">Select </option>
                        <option value="Lowest">Lowest </option>
                        <option value="Highest">Highest</option>
                    </select>

                    <span>Filter</span>
                    <select onChange={navigatefilterproduct} id="FindProducts">
                            <option value="Select">Select </option>
                            <option value="/ProductsDetails?value=seeds">Hybrid Seeds</option>
                            <option value="/ProductsDetails?value=Fertilizer">Fertilizer</option>
                            <option value="/ProductsDetails?value=AgricultureTools">Hardware &amp; Tools</option>
                            <option value="/ProductsDetails?value=seeds">Organic Farming</option>
                            <option value="/Products?value=Agro">Farm Product</option>
                    </select>
                </div> 

                <div className="d-flex marginforsmalltop">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="ProductSearcher" />
                    <button className="btn btn-outline-success" type="submit" onClick={SearchProductDetails}>Search</button>
                </div>
            </div>   

            {(!result.length) ? <RenderNone /> : null}

            {/* Details of Product  */}
            <div className="home-products-details container-fluid mt-4 mb-4">
                {result.slice(0,cntProduct).map( (item) => {
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

          {result.length > 8 ? 
            <div className="product-load-more-container" id="load"> 
              <span onClick={IncrementProductsCards} className="product-load-more-btn">LOAD MORE</span>
            </div> 
            :
            null
          }

        

          <hr style={{margin: "0px"}}/>
          {/* Show The Product Slider  */}
          <ShopPolicy />

            <div className="Productdetailsgrowbusinness" onClick={ (e) =>  navigate("/shop/subscribeshop")}>
                <img src={GrowBusiness} alt="GrowYourBusiness" className="Productdetailsgrowbusinnessimg"/>
                <img src={GrowBusiness2} alt="GrowYourBusiness" className="Productdetailsgrowbusinnessimg2"/>
                <div className="absproductbutton">
                    <h2>Let's Grow!</h2>
                    <Link to="/shop/subscribeshop"><button className="btn btn-outline-success">Subscribe Now</button></Link>
                </div>
            </div>
        </>
    )
}

export default ProductsDetailsAll;