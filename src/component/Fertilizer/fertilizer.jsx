import React, { useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../Styles/contactus.css";

const FertilizerDetailPage =()=>{

    const [fertilizer,setfertilizer] = useState({
        nitrogen:"",phosphorous:"",pottasium:"",cropgrow:""
    })
    let x = 0;

    const [recommend, setrecommend] = useState("");

    let name , value;

    const  handleInput = async (e)=>{
          name = e.target.name;
          value = e.target.value;
          setfertilizer({...fertilizer , [name]:value})
      }

    const postData = async (e)=>{
        e.preventDefault();
        const {nitrogen,phosphorous,pottasium,cropgrow} = fertilizer;
       
        const res =  await fetch("https://agroacers-backend.onrender.com/myfertilizer" ,{
            method : "POST",
            headers : { 
                "Accept" : "application/json",
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                nitrogen,phosphorous,pottasium,cropgrow
            })
        });

        const data = await res.json();
        setrecommend(data);

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
                    <b>Get informed advice on fertilizer based on soil</b>
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
                            <label htmlFor="crop" className="form-label mt-1">Crop you want to grow</label>
                            <select
                                name="cropgrow"
                                className="form-control"
                                id="crop"
                                placeholder="Select a crop"
                                onChange={handleInput}
                                required
                            >
                                <option>Select crop</option>
                                <option>rice</option>
                                <option>maize</option>
                                <option>chickpea</option>
                                <option>kidneybeans</option>
                                <option>pigeonpeas</option>
                                <option>mothbeans</option>
                                <option>mungbean</option>
                                <option>blackgram</option>
                                <option>lentil</option>
                                <option>pomegranate</option>
                                <option>banana</option>
                                <option>mango</option>
                                <option>grapes</option>
                                <option>watermelon</option>
                                <option>muskmelon</option>
                                <option>apple</option>
                                <option>orange</option>
                                <option>papaya</option>
                                <option>coconut</option>
                                <option>cotton</option>
                                <option>jute</option>
                                <option>coffee</option>
                            </select>
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
                                {recommend[0].map((item) => {
                                    return(
                                        <div key={x++}>
                                            <p className="text-center" style={{color: "black", fontSize: "20px"}}>
                                                {item}
                                            </p>
                                        </div>
                                    )
                                })}                            
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
export default FertilizerDetailPage;
