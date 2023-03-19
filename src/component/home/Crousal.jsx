import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

import image1 from '../../Images/crousal/image-6.jpg'
import image2 from '../../Images/crousal/10.jfif'
import image3 from '../../Images/crousal/image-5.jpg'


class CrousalBanner extends React.Component{
 
    render(){
      const mystyle = {
        backgroundColor: "rgba(0,0,0,0.4)",
        fontFamily: "Arial"
      };
        return( 
            <>
                <div className="crousal-banner-container" style={{marginTop : "2px"}}>
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                  <img className="d-block img-fluid  w-100" src={image1} alt="First slide"/>
                                  <Link to="/crops">
                                      <div className="carousel-caption d-none d-md-block" style={mystyle}>
                                          <h3>Agriculture for life</h3>
                                          <p>Agriculture is our wisest pursuit because it will in the end contribute most to real wealth, good morals, and happiness.</p>
                                      </div>
                                  </Link>
                            </div>
                            {/* New Img  */}
                            <div className="carousel-item">
                                  <img className="d-block img-fluid  w-100" src={image2} alt="First slide"/>
                                  <Link to="/crops">
                                    <div className="carousel-caption d-none d-md-block" style={mystyle}>
                                      <h3>The life-givers</h3>
                                      <p>An agricultural life is one eminently calculated for human happiness and human virtue.</p>
                                    </div>
                                  </Link>
                            </div>
                            {/* New Img  */}
                            <div className="carousel-item">
                                  <img className="d-block img-fluid  w-100" src={image3} alt="First slide"/>
                                  <Link to="/crops"> 
                                    <div className="carousel-caption d-none d-md-block" style={mystyle}>
                                      <h3>The nature’s people</h3>
                                      <p>It is only the farmer who faithfully plants seeds in the Spring, who reaps a harvest in the Autumn.</p>
                                    </div>
                                  </Link>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                              {/* Previous Click Link  */}
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                              <span className="carousel-control-next-icon" aria-hidden="true"></span>
                              {/* Next Click Link  */}
                        </a>
                  </div>
              </div>
            </>
        );
    }
}
export default CrousalBanner;
