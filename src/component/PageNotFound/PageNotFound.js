import { Component } from "react";
import "./../../Styles/PageNotFound.css"
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import faultI from "./../../Images/notFound.gif"
class PageNotFound extends Component{
    render(){
        return(
            <>
               <div className={"PageOuter "}>
                    <div className={"PageContainer"}>
                        <img src={faultI} alt="PageNotFound" className={"NFImg"} />
                    </div>
                    <div className={"PageContainer pb-5"}>
                      <div>
                       <Link to="/"><button className={"PageBtnF"}>Page not found</button></Link>
                       <h1 className={"PageheadingF"}>Oh No! Error 404</h1>
                       <p className={"PageParaF"}>The page you're looking for isn't available.<br/>Try again or come back to homepage</p>
                      </div>
                    </div>
               </div>
               {/* <hr style={{margin: "4px"}}/> */}
            </>
        )
    }
}

export default PageNotFound;