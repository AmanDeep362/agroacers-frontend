import React from 'react'
import { Link } from 'react-router-dom';
import SellProduct from '../AgroShop/AgroShopSubComponents/ProductSubscribe';
import CrousalBanner from './Crousal';
import weather from "./../../Images/weather-forecast.jpg"
import AImg1 from "./../../Images/info.jpg";
import AImg2 from "./../../Images/blogs.jpg";
import AImg3 from "./../../Images/buy2.jpg";
import AImg4 from "./../../Images/govt.jpg";
import AImg5 from "./../../Images/advice2.jfif";
import AImg6 from "./../../Images/fertilizer.jpg";
import "./../../Styles/Homepage.css";
import ProductsBrands from "./../AgroShop/AgroShopJSON/ProductBrands.json";
import Productseat from "./../mandiRate/Mandibrands.json";

class Home extends React.Component{

    componentDidMount(){
        window.scroll(0,0);
        var counter = document.querySelector(".countermystatistic");
        var company = document.querySelector(".countermystatisticcompany");
        var Blog = document.querySelector(".countermystatisticblog");
        var Mandi = document.querySelector(".countermystatisticrate");

        let count = 1;
        let companycnt = 1;
        let blogcnt = 1;
        let mandicnt =1;


        setInterval( () => {
           if(count < 550){
               count++;
               counter.innerHTML = count;
               if(count === 550){
                counter.innerHTML = "550+";
               }
           }
        }, 22)

        setInterval( () => {
            if(companycnt < 50){
                companycnt++;
                company.innerHTML = companycnt;
                if(companycnt === 50){
                    company.innerHTML = "50+";
                }
            }
         }, 240)

         setInterval( () => {
            if(blogcnt < 200){
                blogcnt++;
                Blog.innerHTML = blogcnt;
                if(blogcnt === 200){
                    Blog.innerHTML = "200+";
                }
            }
         }, 60)

         setInterval( () => {
            if(mandicnt < 3000){
                mandicnt++;
                Mandi.innerHTML = mandicnt;
                if(mandicnt === 3000){
                    Mandi.innerHTML = "3000+";
                }
            }
         }, 0.1)
    }

    render(){
        return(
            <>
                <CrousalBanner />
                
                {/* Features  */}
                <div style={{margin:"1%"}}>
                    <h1  className="homepage-story-heading">What is AgroAcers ?</h1>

                    <p style={{textAlign:"justify"}}>
                        AgroAcers is a data-driven full-stack technology platform that makes farming 
                        intelligent and empowers farmers to double their income. Farmers can get soil testing, 
                        training, crop protection, crop nutrition, seeds, agriculture equipment, and tools which 
                        is 300 + product range and which involves approx 25 + Agro-skilled experts who are available 
                        for the farmer's services. This in turn will help farmers to select the right Agri inputs for 
                        farming which will enhance productivity and profitability and will reduce the cost of cultivation, 
                        and eventually increase farmers' income sustainably.
                    </p>
                   
                </div>

                {/* Our Statistics  */}
                <div className="crousal-statistic-outer-container">
                    {/* Head  */}
                    <div className="m-1 mt-2">
                        <h1 className="homepage-story-heading mb-2" style={{fontSize:"2.7rem", textDecoration: "underline"}}>Our Main Statistics</h1>
                    </div>

                    {/* inner contaier  */}
                    <div className="crousal-statistic-inner-container">
                        <div className="crousal-statistic-maincont">
                            <i className='fa fa-opencart' style={{color: "#77BC3F", fontSize: "100px"}}></i>
                            <div className='fixthewidth'>
                                <h2 className="countermystatistic">550+</h2>
                                <h3>Agriculture Products</h3>
                            </div>
                        </div>
                        <div className="crousal-statistic-maincont">
                            <i className='fa fa-building-o' style={{color: "#77BC3F", fontSize: "102px"}}></i>
                            <div className='fixthewidth'>
                                <h2 className="countermystatisticcompany">50+</h2>
                                <h3>Agriculture Companies</h3>
                            </div>
                        </div>
                        <div className="crousal-statistic-maincont">
                            <i className='fa fa-comments-o' style={{color: "#77BC3F", fontSize: "120px"}}></i>
                            <div className='fixthewidth'>
                                <h2 className="countermystatisticblog">200+</h2>
                                <h3>Agriculture Blogs</h3>
                            </div>
                        </div>
                        <div className="crousal-statistic-maincont">
                            <i className='fa fa-dollar' style={{color: "#77BC3F", fontSize: "108px"}}></i>
                            <div className='fixthewidth'>
                                <h2 className="countermystatisticrate">3000+</h2>
                                <h3>Agriculture Mandi</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What we Provide  */}
                <h1 className="homepage-story-heading mt-3">What We Provide ?</h1>
                <div className="features-container" data-aos="fade-right">
                     {/* Image 1  */}
                     <div className="card">
                        <img src={AImg1} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <Link to="/mandirates" className="card-title-link-home">
                                <h5 className="card-title">Well Planned Information Architecture and Services.</h5>
                            </Link>
                        </div>
                    </div>
                     {/* Image 2  */}
                     <div className="card">
                        <img src={AImg3} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <Link to="/shop" className="card-title-link-home">
                                <h5 className="card-title">Buy and Sell Crops in just one click.</h5>
                            </Link>
                        </div>
                    </div>
                     {/* Image 3  */}
                     <div className="card">
                        <img src={AImg4} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <Link to="/GovternmentScheme" className="card-title-link-home">
                                <h5 className="card-title">Information about Government Schemes and Plans.</h5>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="container-fluid features-container" data-aos="fade-right">
                    {/* Image 4  */}
                    <div className="card">
                        <img src={AImg2} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <Link to="/crops" className="card-title-link-home">
                                <h5 className="card-title">Latest Blogs on Farming Technology and Research.</h5>
                            </Link>
                        </div>
                    </div>
                     {/* Image 5  */}
                     <div className="card">
                        <img src={AImg5} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <Link to="/contact" className="card-title-link-home">
                                <h5 className="card-title">Get Expert Advice within 24 hours.</h5>
                            </Link>
                        </div>
                    </div>
                    {/* Image 6  */}
                    <div className="card">
                        <img src={AImg6} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <Link to="/fertilizer" className="card-title-link-home">
                                <h5 className="card-title">Type of fertilizer best suited for particular soil.</h5>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* shop  */}
                <div className='bodyofmyshopbanner'>
                    <div className='contentofmyshopbanner'>
                        <h2>Flat 200 Rs. Discount on AgroAcers Shop</h2>
                        <h5 className='mydiscount'>DISCOUNT COUPON: 'AGROACERSVOUCHER200'</h5>
                        <Link to={"/shop"}><button className='btn btn-outline-success'>SHOP NOW</button></Link>
                    </div>               
                </div>


                {/* Our Partners  */}
                <div className="home_products_sell borderbrands">
                    <h1  className="m-3" style={{fontSize: "3rem"}}>Our Partners</h1>
                </div>
                {/* Details of Product Brands */}
                <div data-aos="fade-right">
                    <div className="home-products-details container-fluid mb-2" >
                            {ProductsBrands.map( (item) => {
                                return(
                                <div className="ProductforBrandsTop" key={item.id}>
                                        <img src={item.image} alt="Product" className="Producttopbrandimage" />
                                </div>
                                )
                            })}
                    </div>
                    {/* Details of Product Brands */}
                    <div className="home-products-details container-fluid mb-3">
                            {Productseat.map( (item) => {
                                return(
                                <div className="TopBrandsMandiPrice" key={item.id}>
                                        <img src={item.image} alt="Product" className="MandiBrandsImage" />
                                </div>
                                )
                            })}
                    </div>
                </div>

                 {/* Weather  */}
                 <div className='bodyofweatherbanner'>
                    <img src={weather} className="d-block weatherimagebnr img-fluid" alt="Weather"/>
                    <div className='contentofweatherbanner'>
                        <h1>Today's Weather</h1>
                        <h6 className='mt-3 mb-3'>AgroAcers create a software to predection the live weather of 
                            any country, any state, any village globally.
                        </h6>
                        <h4 className='mb-3'>Just enter the city name and get weather details</h4>
                        <Link to="/MyWeather"><button className='btn btn-success'>Check Weather</button></Link>
                    </div>
                      
                </div>

                 {/* Subscribe  */}
                <div data-aos="fade-down">
                    <SellProduct />
                </div>
            </>
        );
    }
}
export default Home;