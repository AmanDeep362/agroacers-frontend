import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import "../../Styles/rabi-crop.css";
import Loader from "../Loader";
import axios from "axios";

const SimilarProduct = (props) => {
    const [cropData, setCropdata] = useState([]);
    const [IsLoading,setIsLoading] = useState(false)
  
    useEffect(() => {
      const fetchdata = async () =>{
            const {data} = await axios.get("https://agroacers-backend.onrender.com/cropdata");
            setCropdata(data);
            setIsLoading(true);
        }
      fetchdata();
      window.scroll(0,0);
    }, []);
    let rabiCrop = cropData.filter(item=>item.category===props.category&&item.title!==props.title)


    if(!IsLoading){
      return(
        <Loader />
      )
    }

    return (
      <>
        <div className="similiar-article">
            <h1 className="textofsimilarcrop">Similiar Crops</h1>
            <div className="crop-type-card-container">
                {
                rabiCrop.map((i) => (
                        <div className="card" key={i._id}>
                            <Link style={{textDecoration:"none"}} to={"/crops/Rabi/" + i._id}>
                                <img className="card-img-top img-fluid" src={i.Image} alt="Cardcap" />
                                <div className="card-body">
                                    <h3 className="card-title">
                                    {i.title}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                ))}
          </div>
        </div>
    </>
    )
}

export default SimilarProduct;
