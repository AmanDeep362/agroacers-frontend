import { useState } from "react";
import "../../Styles/addUniversity.css"
const AddGovtScheme = ()=>{
   
  const [SchemeDetails,setSchemeDetails] = useState({
    SchemeName:"",state:"",website:"",Description:"",Imageurl:""
  })
  let name ,value;
  const handleInput=async (e)=>{
     name = e.target.name;
     value = e.target.value;
     setSchemeDetails({...SchemeDetails,[name]:value})
  }
    const uploadData =async (e)=>{
        e.preventDefault();
        const {SchemeName,state,website,Description,Imageurl} = SchemeDetails;
          const res = await  fetch("https://agroacers-backend.onrender.com/admin/GovtScheme" ,{
                method : "POST",
                headers : { 
                    "content-Type" : "application/json"
                },
                body : JSON.stringify({
                    SchemeName,
                    state,
                    website,
                    Description,
                    Imageurl
                })
              })
              const data = await res.json();
              console.log(data);
             if(res.status === 201){
                 window.alert("Data added succesfully...")
                
             }
             else{
                 window.alert("error occured , try again...")
             }
        } 
    
    return(
        <>
          <div className="addUniversitycontainer">
              <div style={{fontSize: '3rem', color: '#77bc3f'}} className="m-2 mt-4 text-decoration-underline text-center">
                  <h1>Add Government Scheme</h1>
              </div>
              <div className="addUniversity-form-container">
              <form method="POST">
                  <label htmlFor="schemename">Name of Scheme :</label><br />
                  <input className="input-agro-university" placeholder="enter the name of Scheme...." type="text" name="SchemeName" value={SchemeDetails.SchemeName} onChange={handleInput} id="schemename" /> <br />
                  <label htmlFor="state">State :</label> <br />
                  <input className="input-agro-university" placeholder="Enter state of Scheme." type="text" name="state" value={SchemeDetails.state} onChange={handleInput} id="state" /> <br />
                  <label htmlFor="website">Scheme Website :</label> <br />
                  <input className="input-agro-university" placeholder="website of Scheme...." type="text" name="website" value={SchemeDetails.website} onChange={handleInput} id="website" /> <br /> 
                  <label htmlFor="Description">Description :</label> <br />
                  <input className="input-agro-university" placeholder="Description Of scheme..." type="text" name="Description" value={SchemeDetails.Description} onChange={handleInput} id="Description" /> <br /> 
                  <label htmlFor="Imageurl">University Image url :</label> <br />
                  <input className="input-agro-university" placeholder="enter the Url of Image..." type="text" name="Imageurl" value={SchemeDetails.Imageurl} onChange={handleInput} id="Imageurl" /> <br /> 
                  <input className="btn btn-secondary add-university-btn"  type="submit" value="submit" onClick={uploadData} id="submit-btn" />
              </form>
              </div>
          </div>
        </>
    );
    }
export default  AddGovtScheme;