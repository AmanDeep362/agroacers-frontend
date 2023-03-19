import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/addUniversity.css"
const AddUniversity = ()=>{
    const navigate = useNavigate();
  const [UniversityDetails,setUniversityDetails] = useState({
    UniversityName:"",adress:"",contact:"",website:"",emailId:"",Imageurl:""
  })
  let name ,value;
  const handleInput=async (e)=>{
     name = e.target.name;
     value = e.target.value;
     setUniversityDetails({...UniversityDetails,[name]:value})
  }
    const uploadData =async (e)=>{
        e.preventDefault();
        const {UniversityName,adress,contact,website,emailId,Imageurl} = UniversityDetails;
          const res = await  fetch("https://agroacers-backend.onrender.com/admin/AgricultureUniversity" ,{
                method : "POST",
                headers : { 
                    "content-Type" : "application/json"
                },
                body : JSON.stringify({
                    UniversityName,
                    adress,
                    contact,
                    website,
                    emailId,
                    Imageurl
                })
              })
              const data = await res.json();
              console.log(data);
             if(res.status === 201){
                 window.alert("Data added succesfully...")
                navigate("/agri")
             }
             else{
                 window.alert("error occured , try again...")
             }
        } 
    
    return(
        <>
          <div className="addUniversitycontainer">
              <div style={{fontSize: '3rem', color: '#77bc3f'}} className="m-2 mt-4 text-decoration-underline text-center">
                  <h1>Add University Details</h1>
              </div>
              <div className="addUniversity-form-container">
              <form method="POST">
                  <label htmlFor="UniversityName">Name of University :</label><br />
                  <input className="input-agro-university" placeholder="enter the name of university...." type="text" name="UniversityName" value={UniversityDetails.UniversityName} onChange={handleInput} id="UniversityName" /> <br />
                  <label htmlFor="adress">University Adress :</label> <br />
                  <input className="input-agro-university" placeholder="Adress of University...." type="text" name="adress" value={UniversityDetails.adress} onChange={handleInput} id="adress" /> <br />
                  <label htmlFor="contact">University contact :</label> <br />
                  <input className="input-agro-university" placeholder="Enter University contact details...." type="text" name="contact" value={UniversityDetails.contact} onChange={handleInput} id="contact" />  <br /> 
                  <label htmlFor="website">University Website :</label> <br />
                  <input className="input-agro-university" placeholder="website of University ...." type="text" name="website" value={UniversityDetails.website} onChange={handleInput} id="website" /> <br /> 
                  <label htmlFor="emailId">University Email Id :</label> <br />
                  <input className="input-agro-university" placeholder="University Email Id..." type="text" name="emailId" value={UniversityDetails.emailId} onChange={handleInput} id="emailId" /> <br /> 
                  <label htmlFor="Imageurl">University Image url :</label> <br />
                  <input className="input-agro-university" placeholder="enter the Url of Image..." type="text" name="Imageurl" value={UniversityDetails.Imageurl} onChange={handleInput} id="Imageurl" /> <br /> 
                  <input className="btn btn-secondary add-university-btn"  type="submit" value="submit" onClick={uploadData} id="submit-btn" />
              </form>
              </div>
          </div>
        </>
    );
    }
export default AddUniversity;;