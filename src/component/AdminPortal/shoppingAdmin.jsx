import { useState } from "react";
import "../../Styles/addUniversity.css"

const AddUniversity = ()=>{

    const [ShopProductDetails,setShopProductDetails] = useState({
        Hindi_name:"",Name:"",Description:"",new_price:"",old_price:"",quantity:"", category: "",Imageurl:""
    })

    let name ,value;

    const handleInput=async (e)=>{
        name = e.target.name;
        value = e.target.value;
        setShopProductDetails({...ShopProductDetails,[name]:value})
    }

    // console.log(ShopProductDetails);

    const uploadData =async (e)=>{
        e.preventDefault();
        const {Hindi_name,Name,Description,new_price,old_price,quantity, category,Imageurl} = ShopProductDetails;

        const res = await  fetch("https://agroacers-backend.onrender.com/admin/AddShopproduct" ,{
                method : "POST",
                headers : { 
                    "content-Type" : "application/json"
                },
                body : JSON.stringify({
                    Hindi_name,
                    Name,
                    Description,
                    new_price,
                    old_price,
                    quantity,
                    category,
                    Imageurl
                })
            })

            const data = await res.json();
            console.log(data);
            
            if(res.status === 200){
                window.alert("Data added succesfully...")
                // navigate("/shop")
             }
            else{
                 window.alert("Error occured , Try again...")
            }
        } 
    
    return(
        <>
          <div className="addUniversitycontainer">
              <div style={{fontSize: '3rem', color: '#77bc3f'}} className="m-2 mt-4 text-decoration-underline text-center">
                  <h1>Add Shopping Products</h1>
              </div>
              <div className="addUniversity-form-container">
              <form method="POST">
                     {/* Product Hindi Name  */}
                    <label htmlFor="Hindi_name">Name of Product in Hindi:</label><br />
                    <input className="input-agro-university" placeholder="Enter The Product Name in Hindi...." type="text" name="Hindi_name" value={ShopProductDetails.Hindi_name} onChange={handleInput} id="Hindi_name" /> <br />
                     
                    {/* Product Name  */}
                    <label htmlFor="Name">Name of Product :</label><br />
                    <input className="input-agro-university" placeholder="Enter the name of product...." type="text" name="Name" value={ShopProductDetails.Name} onChange={handleInput} id="Name" /> <br />
                  
                    {/* Product Description  */}
                    <label htmlFor="Description">Product Description:</label> <br />
                    <input className="input-agro-university" placeholder="Enter the product description...." type="text" name="Description" value={ShopProductDetails.Description} onChange={handleInput} id="Description" /> <br />
                  
                    {/* Product Price Original  */}
                    <label htmlFor="new_price">Original Price :</label> <br />
                    <input className="input-agro-university" placeholder="Enter Product Price...." type="number" name="new_price" value={ShopProductDetails.new_price} onChange={handleInput} id="new_price" />  <br /> 

                    {/* Product Price Market  */}
                    <label htmlFor="old_price">Market Price :</label> <br />
                    <input className="input-agro-university" placeholder="Enter Product Price...." type="number" name="old_price" value={ShopProductDetails.old_price} onChange={handleInput} id="old_price" />  <br /> 

                    {/* Product Quantity  */}
                    <label htmlFor="quantity">Quantity :</label> <br />
                    <input className="input-agro-university" placeholder="Enter Product Quantity...." type="number" name="quantity" value={ShopProductDetails.quantity} onChange={handleInput} id="quantity" />  <br /> 
                  
                    {/* Category  */}
                    <label htmlFor="category">Product Category :</label> <br />
                    <input className="input-agro-university" placeholder="Category of product ...." type="text" name="category" value={ShopProductDetails.category} onChange={handleInput} id="category" /> <br /> 
                  
                  {/* Image of Product  */}
                  <label htmlFor="Imageurl">Product Image url :</label> <br />
                  <input className="input-agro-university" placeholder="Enter the Url of Image..." type="text" name="Imageurl" value={ShopProductDetails.Imageurl} onChange={handleInput} id="Imageurl" /> <br /> 
                  
                  {/* Submit  */}
                  <input className="btn btn-secondary add-university-btn"  type="submit" value="Submit" onClick={uploadData} id="submit-btn" />
                </form>
              </div>
          </div>
        </>
    );
    }
export default AddUniversity;;