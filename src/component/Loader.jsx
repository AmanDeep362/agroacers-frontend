import React from "react";
import loader from '../Images/New Img/loader1.gif'
class Loader extends React.Component {


     render(){
         return(
             <>  
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "80vh"}}>
                    <img  style={{width:"28%"}} src={loader} alt="Loader" />
                    <h1  style={{color:"#77BC3F"}}>Data is Loading ...</h1>
                </div>            
             </>
         );
     }
}
export default Loader;