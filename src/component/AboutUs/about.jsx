import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../../Styles/about.css"
import AImg1 from "./../../Images/info.jpg";
import AImg2 from "./../../Images/blogs.jpg";
import AImg3 from "./../../Images/buy2.jpg";
import AImg4 from "./../../Images/govt.jpg";
import AImg5 from "./../../Images/advice2.jfif";
import tech from "./../../Images/tech.jpg"
import Anmol from "./../../Images/Founder1.jpg";
import Aman from "./../../Images/Founder 2.jpg";

class AboutUS extends React.Component {

    componentDidMount(){
        window.scroll(0,0);
    }
    render() {
    return (
        <>
           <div>
                <div className="about-banner">
                    <h1 className="about-banner-heading">About Us</h1>
                    <p className="about-banner-para">We are an all in one solution for your farming, our services ranges from <br />employee management to accounting know-how, to  increase production and income</p>
                </div>

                {/* Image and Text  */}
                <div className="about-outer-container mt-2">
                    <div className="p-3 pt-0">
                        <h2 className="about-story-heading">All you need for your farming</h2>
                        <p className="about-para">Agriculture, with its allied sectors, is the largest source of livelihoods in India. 
                        70 percent of its rural households still depend primarily on agriculture for their livelihood, with 82 percent of farmers being small and marginal. 
                        In 2017-18, total food grain production was estimated at 275 million tonnes (MT).  India is the largest producer (25% of global production), consumer 
                        (27% of world consumption) and importer (14%) of pulses in the world. India's annual milk production was 165 MT (2017-18),
                        making India the largest producer of milk, jute and pulses, and with world's second-largest cattle population 190 million in 2012.[153] 
                        It is the second-largest producer of rice, wheat, sugarcane, cotton and groundnuts, as well as the second-largest fruit and vegetable producer,
                        accounting for 10.9% and 8.6% of the world fruit and vegetable production, respectively.</p>
                        <p className="about-para">Agriculture is the art and science of cultivating the soil, growing crops and raising livestock. 
                        It includes the preparation of plant and animal products for people to use and their distribution to markets.</p>
                        <p className="about-para">Traditionally, farmers have used a variety of methods to protect their crops from pests and diseases. 
                        They have put herb-based poisons on crops, handpicked insects off plants, bred strong varieties of crops, and rotated crops to control insects. 
                        Now, almost all farmers, especially in developed countries, rely on chemicals to control pests. The definition of “pest” ranges from insects to animals such as rabbits and mice, 
                        as well as weeds and disease-causing organisms—bacteria, viruses, and fungi. With the use of chemicals, crop losses and prices have declined dramatically.</p>
                    </div>
                </div>
                <hr style={{margin: "2px"}}/>
                {/* Our Story  */}
                <div>
                     <h1 className="about-story-heading">Empowering Sustainable Agriculture In India</h1>
                     <p className="about-story-para">Our goal to deliver accurate information, manage video conferencing for farmers by agro experts on a particular time slot and date. We are doing our work as responsibility as we want to connect every single farmer our "Annadaata" with us so, we will be to provide them everything they want. Empower every farmer to achieve more productivity, yield, and income. Kisaan Helpline makes Ground level connectivity with farmers via live procedures and knowledge on present crops.</p>
                     <h4 className="about-story-h">Mission &amp; Vision:</h4>

                     <ul className="about-story-ul">
                        <li>To improve the financial condition of farmers, so they must sow a crop which has a value of more than RS 50 per kg.</li>
                        <li>They should adopt mixed cropping to remain financially stable in case of non favorable climate.</li>
                        <li>They should reduce the inorganic chemicals fertilizers which drastically harm their soil.</li>
                        <li>They should adopt organic farming which reduces their input cost and provide high yielding.</li>
                        <li>They should apply for soil testing and use the ingredients which are required by soil not what market recommend.</li>
                        <li>Financially Stable farmers may adopt micro irrigation to save water for the poor farmers who cannot afford drip irrigation &amp; sprinklers etc.</li>
                        <li>or credit facilities do not buy what shopkeeper recommends you, either try to understand the ingredients or consult with Agro clinics.</li>
                        <li>Don't sow the only crop which is beneficial last year, because present year bulk production can suddenly reduce in cost.</li>
                        <li>Farmers should about cash crops to boycott the merchants which use harmful chemicals to produce fruits &amp; vegetable sooner to get more profit.</li>
                        <li>Advice to all farmers about Vermicompost Khad, Add more value in Vermicompost like soil bacterial, bio nutrient, carbon contents, etc.</li>
                        <li>Uneducated &amp; illiterate farmers should take advice of educated and genuine farmers before taking any decision.</li>
                        <li>To Advice for produces Healthy Fruit &amp; Seeds.</li>
                        <li>Awareness of new farming methods.</li>

                     </ul>
                </div>
                <hr />
                {/* Features  */}
                <h1 className="about-story-heading">Our Features</h1>
                <div className="features-container" data-aos="fade-right">
                     {/* Image 1  */}
                     <div className="card">
                        <img src={AImg1} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <h5 className="card-title">Well Planned Information Architecture and Services.</h5>
                        </div>
                    </div>
                     {/* Image 2  */}
                     <div className="card">
                        <img src={AImg3} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <h5 className="card-title">Buy and Sell Crops in just one click.</h5>
                        </div>
                    </div>
                     {/* Image 3  */}
                     <div className="card">
                        <img src={AImg4} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <h5 className="card-title">Information about Government Schemes and Plans.</h5>
                        </div>
                    </div>
                </div>
                <div className="container-fluid features-container" data-aos="fade-right">
                   
                    {/* Image 4  */}
                    <div className="card">
                        <img src={AImg2} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <h5 className="card-title">Latest Blogs on Farming Technology and Research.</h5>
                        </div>
                    </div>
                     {/* Image 5  */}
                     <div className="card">
                        <img src={AImg5} className="card-img-top" alt="Feature" />
                        <div className="card-body">
                            <h5 className="card-title">Get Expert Advice within 24 hours.</h5>
                        </div>
                    </div>
                </div>
                <hr />
                {/* Founder Info  */}
                <div className="container-fluid" data-aos="fade-down">
                    <h1 className="about-story-heading">AgroAcers Founders</h1>
                    <p className="about-found-para">AgroAcers works to improve the financial condition of farmers &amp; <br /> awareness them about all new farming methods and Latest Technology.</p>

                    <div className= "container-fluid features-container">
                        {/* Anmol  */}
                        <div className="card foundercard">
                            <img src={tech} className="card-img-top fouImg" alt="Founder" />
                            <div className="card-body" >
                                <h5 className="card-title card-f-head">Anmol Garg</h5>
                                <p className="card-f-para">Co-Founder, AgroAcers</p>
                                <hr style={{margin: "6px"}}/>
                                <p className="card-text card-f-para2">Anmol is a Full Stack Web Developer and has a great passion for farming and help other farmers in adopt organic farming which reduces their input cost and provide high yielding. </p>
                                <a href="https://www.linkedin.com/in/anmol-garg-25a5771a2/"  target="_blank"  rel="noreferrer" className="btn btn-primary">Know More</a>
                            </div>
                            <img src={Anmol} className="card-img-top fouImground" alt="Founder" />
                        </div>
                        {/* Aman  */}
                        <div className="card foundercard">
                            <img src={tech} className="card-img-top fouImg"  alt="Founder" />
                            <div className="card-body">
                                <h5 className="card-title card-f-head">AmanDeep Singh</h5>
                                <p className="card-f-para">Co-Founder, AgroAcers</p>
                                <hr style={{margin: "6px"}}/>
                                <p className="card-text card-f-para2">Amandeep singh is a Fullstack Web developer and he is a nature lover and belong to farming family . So decided to create the website to contribute for the farmers of india. </p>
                                <a href="https://amandeep-portfolio.herokuapp.com/" target="_blank"  rel="noreferrer" className="btn btn-primary">Know More</a>
                            </div>
                            <img src={Aman} className="card-img-top fouImground " alt="Founder" />
                        </div>
                    </div>
                </div>
                <hr />
           </div>
        </>
    )}
}

export default AboutUS;


                        