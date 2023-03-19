import React, { useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../Styles/contactus.css";

const Croprecommended =()=>{

    const [crop,setcrop] = useState({
        nitrogen:"",phosphorous:"",pottasium:"",phlevel:"",rainfall:"",state:"",city:""
    })
    let x = 0;

    const [recommend, setrecommend] = useState("");

    let name , value;

    const  handleInput = async (e)=>{
          name = e.target.name;
          value = e.target.value;
          setcrop({...crop , [name]:value})
      }

    const postData = async (e)=>{
        e.preventDefault();
        const {nitrogen,phosphorous,pottasium,phlevel,rainfall,state,city} = crop;
       
        const res =  await fetch("https://agroacers-backend.onrender.com/myrecommendedcrop" ,{
            method : "POST",
            headers : { 
                "Accept" : "application/json",
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                nitrogen,phosphorous,pottasium,phlevel,rainfall,state,city
            })
        });

        const data = await res.json();
        setrecommend(data);
        console.log(data);

        if(res.status === 201){
            window.alert("Please enter all the fields");
        }
        else if(res.status === 200){
            window.scroll(0,550)
        }
        else {
            window.alert("Error occured , try again")
        }
    }

    useEffect(() => {
        window.scroll(0,0)
    }, []);

    return (
      <>
        <div className="container-fluid">
                <h1 style={{textAlign: "center", margin: "30px 0px"}}>
                    <b>Find out the most suitable crop to grow in your farm</b>
                </h1>
                <form method="POST" className="fertilizer-form">
                            
                        <div className="m-2">
                            <label htmlFor="Nitrogen" className="form-label mt-1">Nitrogen</label>
                            <input type="number"  
                                name="nitrogen" 
                                className="form-control"  
                                onChange={handleInput} 
                                id="Nitrogen" 
                                placeholder="Enter the value (example:50)"
                                required />                              
                        </div>

                        <div className="m-2">
                            <label htmlFor="Phosphorous" className="form-label mt-1">Phosphorous</label>
                            <input type="number"  
                                name="phosphorous" 
                                className="form-control"  
                                onChange={handleInput} 
                                id="Phosphorous" 
                                placeholder="Enter the value (example:50)"
                                required />                              
                        </div>

                        <div className="m-2">
                            <label htmlFor="Pottasium" className="form-label mt-1">Pottasium</label>
                            <input type="number"  
                                name="pottasium" 
                                className="form-control"  
                                onChange={handleInput} 
                                id="Pottasium" 
                                placeholder="Enter the value (example:50)"
                                required />                              
                        </div>

                        <div className="m-2">
                            <label htmlFor="phlevel" className="form-label mt-1">PH Level</label>
                            <input type="number"  
                                name="phlevel" 
                                className="form-control"  
                                onChange={handleInput} 
                                id="phlevel" 
                                placeholder="Enter the ph value"
                                required />                              
                        </div>

                        <div className="m-2">
                            <label htmlFor="rainfall" className="form-label mt-1">Rainfall</label>
                            <input type="number"  
                                name="rainfall" 
                                className="form-control"  
                                onChange={handleInput} 
                                id="rainfall" 
                                placeholder="Enter the rainfall value"
                                required />                              
                        </div>

                        <div className="m-2">
                            <label htmlFor="state" className="form-label mt-1">State</label>
                            <input type="text"  
                                name="state" 
                                className="form-control"  
                                onChange={handleInput} 
                                id="state" 
                                placeholder="Enter the rainfall value"
                                required />                              
                        </div>

                        <div className="m-2">
                            <label htmlFor="city" className="form-label mt-1">City</label>
                            <input type="text"  
                                name="city" 
                                className="form-control"  
                                onChange={handleInput} 
                                id="city" 
                                placeholder="Enter the rainfall value"
                                required />                              
                        </div>


                        <div className="d-flex justify-content-center w-100">
                        <button
                            type="submit"
                            className="mt-4 btn btn-info w-100"
                            onClick={postData}
                        >
                            Predict
                        </button>
                        </div>
                    </form>
            </div>

            {
                recommend.length > 0 ?
                  
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm py-2 py-md-3">
                            <div style={{justifyContent: "center", backgroundColor: "blanchedalmond", padding: "2%", margin: "2%"}}>   
                                {recommend}                         
                            </div>
                        </div>
                    </div>
                </div>
                :
                null
            }
      </>
    );
  
}
export default Croprecommended;
