import  React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Loader from "../Loader";
import "./../../Styles/addUniversity.css";
import "./../../Styles/Agrosubscribe.css";
import 'bootstrap/dist/css/bootstrap.css';
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const FarmerCropDetail = () => {

  // States for Basic Details 
  const [FarmerName, setFarmerName] = useState("");
  const [FarmerFatherName, setFarmerFatherName] = useState("");
  const [EmailOfFarmer, setEmailOfFarmer] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Gender, setGender] = useState("");
  const [city, setcity] = useState("");
  const [State, setState] = useState("");
  const [Pincode, setPincode] = useState("");
  const [AdressOfFarmer, setAdressOfFarmer] = useState("");


  // States for Personal Details 
  const [BankName, setBankName] = useState("");
  const [BankAccountNo, setBankNum] = useState("");
  const [BankIFSC, setBankCode] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [AadharNumber, setaadhar] = useState("");

  // States for Land Details
  const [AdressOfLand, setAdressOfLand] = useState("");
  const [TotalLandinAcers, setTotalLandinAcers] = useState("");
  const [CropVariety, setCropVariety] = useState("");
  const [SeedUsed, setSeedUsed] = useState("");
  const [DescriptionOfCrop, setDescriptionOfCrop] = useState("");
  const [YieldTime, setYieldTime] = useState("");
  const [HarvestTime, setHarvestTime] = useState("");
  const [Min_price, setMin_price] = useState("");
  const [Max_price, setMax_price] = useState("");
  const [ImageOfCrop, setImageOfCrop] = useState("");

  const [page, setpage] = useState(1);
  const [DataLoading, setDataLoading] = useState(false);
  const [UserDetail,setUserDetail] = useState([]);

  const navigate = useNavigate();

    const callAboutPage = async () => {
        try {
            const res = await fetch("https://agroacers-backend.onrender.com/aboutuser", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
    
            const data = await res.json();
            setUserDetail(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } 
        catch (err) {
            console.log(err);
            navigate("/login", { replace: true })
        }
    };

    useEffect(() => {
        callAboutPage();
        window.scroll(0,0);
        setDataLoading(true);
    }, [])

    if (!DataLoading){
        return (
            <Loader />
        );
    }

  const handlepagemove1 = () => {
    
    if(page === 4) return;
    
    else if(!FarmerName || !FarmerFatherName || !EmailOfFarmer || !ContactNo || !Gender || !city || !State || !Pincode  || !AdressOfFarmer ){
        alert("Please enter all the required fields.")
    }
    
    else{
      setpage(page + 1);
      window.scroll(0,0);
    }
  }

  const handlepagemove2 = () => {
    
    if(page === 4) return;
    
    else if(!BankName || !BankAccountNo || !BankIFSC || !AadharNumber ||!dateofbirth){
        alert("Please enter all the required fields.")
    }
    
    else{
      setpage(page + 1)
      window.scroll(0,0);
    }
  }

  const handlepagemove3 = () => {
    
    if(page === 4) return;
    
    else if(!AdressOfLand || !TotalLandinAcers || !CropVariety || !SeedUsed || !DescriptionOfCrop || !YieldTime || !HarvestTime || !Min_price || !Max_price){
        alert("Please enter all the required fields.")
    }
    
    else{
      setpage(page + 1)
      window.scroll(0,0);
    }
  }

  const handlepagemoveback = () => {
    if(page === 1) return;
    
    setpage(page - 1);
    window.scroll(0,0);
  }

  async function displayRazorpay() {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Check your Internet Connection.')
      return
    }

    const pricepay = 199;

    // console.log(pricepay + "I/m running to pay")

    const data = await fetch('https://agroacers-backend.onrender.com/razorpay',{ 
            method: 'POST',
            headers: {
                "content-Type" : "application/json",
            },
            body: JSON.stringify({
                pricepay,
            })
        }).then((t) =>
      t.json()
    )

    // console.log(data)

    const options = {
      key: 'rzp_test_119cJvO3u59nKY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: FarmerName,
      description: 'AgroAcers Subscription Payment Gateway',
      handler: async function (response) {
        // alert(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_order_id)
        // alert(`Successful Transaction.\nPayment ID: ${response.razorpay_payment_id}`);

                const name = UserDetail.name;
                const mail = UserDetail.email;
                const UserId = UserDetail._id;
                const orderid = response.razorpay_order_id;
                const transid = response.razorpay_payment_id;
                const amountpay = Number(data.amount.toString())/100;
                const res =  await fetch("https://agroacers-backend.onrender.com/sendSubscription" ,{
                    method : "POST",
                    headers : { 
                        "content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        name,mail,orderid,transid,amountpay,UserId
                    })
                });

                if(res.status === 201){
                   alert(`Successful Transaction.\nPayment ID: ${response.razorpay_payment_id}.`);
                }
                else {
                    window.alert("Error occured , try again")
                }
        const Farmer_id = UserDetail._id;
        let today  = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yy =today.getFullYear();
        let hh = today.getHours();
        let mi = today.getMinutes();
        let ss = today.getSeconds();
        let time = dd+"/"+mm+"/"+yy+"("+hh+":"+mi+":"+ss+")";
        const resp =  await fetch("https://agroacers-backend.onrender.com/SellCrop" ,{
          method : "POST",
          headers : { 
              "content-Type" : "application/json"
          },
          body : JSON.stringify({
            FarmerName,
            FarmerFatherName,
            EmailOfFarmer,
            ContactNo,
            Gender,
            city,
            State,
            Pincode,
            AdressOfFarmer,
            BankName,
            BankIFSC,
            BankAccountNo,
            AadharNumber,
            AdressOfLand,
            dateofbirth,
            TotalLandinAcers,
            CropVariety,
            SeedUsed,
            DescriptionOfCrop,
            YieldTime,
            HarvestTime,
            ImageOfCrop,
            Min_price,
            Max_price,
            Farmer_id,
            time
          })
        });

        if(resp.status === 200){
            window.alert("Now You are Part of AgroAcers Shop.");
            navigate("/CropSellDashboard"); 
        }
        else {
          window.alert("Error occured , try again")
        }
      },
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open();
    }

  
  return (
    <div className="subscribebg">
        <div style={{fontSize: '3rem', color: '#77bc3f'}} className="p-3 text-decoration-underline text-center">
            <h1>Subscribe To AgroAcers Shop</h1>
        </div>
        {/* Progress Bar of Subscribe Page  */}
        <div className="progresssteps">
            <div className="eachprogressstep">
              <div className="Circleprogress activeprogress">1</div>
                <div>Basic information</div>
            </div>
            <div className="eachprogressstep">
              <div className={page >= 2 ? "Circleprogress activeprogress" : "Circleprogress"}>2</div>
              <div>Personal information</div>
            </div>
            <div className="eachprogressstep">
              <div className={page >= 3 ? "Circleprogress activeprogress" : "Circleprogress"}>3</div>
              <div>Land information</div>
            </div>
            <div className="eachprogressstep">
              <div className={page === 4 ? "Circleprogress activeprogress" : "Circleprogress"}>4</div>
              <div>Payment</div>
            </div>
        </div>

        {/* the content goes here */}
        <div>
            {page === 1 && 
              <div className="container-fluid">
                <form className="container-fluid subscribebgform">
                  <div className="row g-3 p-2">
                      {/* Farmers Name  */}
                      <div className="col-md-4" >
                          <label htmlFor="Farmername" className="form-label">Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="Farmername" 
                            placeholder="Farmer name" 
                            name="Farmername" value={FarmerName} 
                            required 
                            onChange={(e) => setFarmerName(e.target.value)} 
                          />
                      </div>
                      {/* Farmers Farther Name  */}
                      <div className="col-md-4">
                          <label htmlFor="Farmer-father-name" className="form-label">Father Name</label>
                            <input
                              name="FarmerFatherName"
                              type="text"
                              className="form-control"
                              id="Farmer-father-name"
                              placeholder="Father Name"
                              value={FarmerFatherName}
                              required
                              onChange={(e) => setFarmerFatherName(e.target.value)}
                            />
                       </div>
  
                       {/* Farmer Email  */}
                        <div className="col-md-4">
                            <label htmlFor="EmailOfFarmer" className="form-label">Email </label>
                            <input
                                name="EmailOfFarmer"
                                type="email"
                                className="form-control"
                                id="EmailOfFarmer"
                                placeholder="Email"
                                value={EmailOfFarmer}
                                required
                                onChange={(e) => setEmailOfFarmer(e.target.value)}
                              />
                        </div>
                        {/* Contact Number  */}
                        <div className="col-md-4">
                              <label htmlFor="ContactNo" className="form-label">Phone</label>
                                  <input
                                    name="ContactNo"
                                    type="number"
                                    className="form-control"
                                    id="ContactNo"
                                    placeholder="+91-7852671434"
                                    min={0}
                                    value={ContactNo}
                                    required
                                    onChange={(e) => setContactNo(e.target.value)}
                                  />
                        </div>
                        {/* DOB  */}
                        <div className="col-md-4">
                              <label htmlFor="dateofbirth" className="form-label">Date of Birth</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="dateofbirth"
                                  id="dateofbirth"
                                  value={dateofbirth}
                                 required
                                 onChange={(e) => setdateofbirth(e.target.value)}
                                />
                        </div>
                        {/* Gender  */}
                        <div className="col-md-4">
                              <label htmlFor="validationCustomgender" className="form-label">Gender</label>
                              <select className="form-select" id="validationCustomgender" required onChange={(e) => setGender(e.target.value)}>
                                  <option selected disabled value="">Choose...</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                              </select>
                        </div>
                        {/* City name  */}
                        <div className="col-md-6 mt-1">
                              <label htmlFor="city" className="form-label">City</label>
                              <input 
                                 name="city"
                                 type="text"
                                 className="form-control"
                                 id="city"
                                 placeholder="City"
                                 value={city}
                                 required
                                 onChange={(e) => setcity(e.target.value)}
                              />
                        </div>
                        {/* State of Farmer  */}
                        <div className="col-md-3">
                              <label htmlFor="State" className="form-label">State</label>
                              <select className="form-select" id="State" required value={State} onChange={(e) => setState(e.target.value)}>
                                  <option disabled value="">Choose...</option>
                                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                  <option value="Assam">Assam</option>
                                  <option value="Bihar">Bihar</option>
                                  <option value="Chandigarh">Chandigarh</option>
                                  <option value="Chhattisgarh">Chhattisgarh</option>
                                  <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                  <option value="Daman and Diu">Daman and Diu</option>
                                  <option value="Delhi">Delhi</option>
                                  <option value="Lakshadweep">Lakshadweep</option>
                                  <option value="Puducherry">Puducherry</option>
                                  <option value="Goa">Goa</option>
                                  <option value="Gujarat">Gujarat</option>
                                  <option value="Haryana">Haryana</option>
                                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                  <option value="Jharkhand">Jharkhand</option>
                                  <option value="Karnataka">Karnataka</option>
                                  <option value="Kerala">Kerala</option>
                                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                                  <option value="Maharashtra">Maharashtra</option>
                                  <option value="Manipur">Manipur</option>
                                  <option value="Meghalaya">Meghalaya</option>
                                  <option value="Mizoram">Mizoram</option>
                                  <option value="Nagaland">Nagaland</option>
                                  <option value="Odisha">Odisha</option>
                                  <option value="Punjab">Punjab</option>
                                  <option value="Rajasthan">Rajasthan</option>
                                  <option value="Sikkim">Sikkim</option>
                                  <option value="Tamil Nadu">Tamil Nadu</option>
                                  <option value="Telangana">Telangana</option>
                                  <option value="Tripura">Tripura</option>
                                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                                  <option value="Uttarakhand">Uttarakhand</option>
                                  <option value="West Bengal">West Bengal</option>
                              </select>
                        </div>
                        {/* PinCode  */}
                          <div className="col-md-3">
                              <label htmlFor="Pincode" className="form-label ">Pincode</label>
                              <input 
                                  type="number"
                                  className="form-control" 
                                  name="Pincode"
                                  id="Pincode" 
                                  required 
                                  value={Pincode}
                                  onChange={(e) => setPincode(e.target.value)}
                              />
                          </div>
                          {/* Address */}
                          <div className="col-12">
                              <label htmlFor="AdressOfFarmer" className="form-label mt-1">Permanent Address</label>
                              <input 
                                  type="text" 
                                  className="form-control" 
                                  name="AdressOfFarmer"
                                  id="AdressOfFarmer" 
                                  placeholder="27 Main Steet, Delhi"
                                  required 
                                  value={AdressOfFarmer}
                                  onChange={(e) => setAdressOfFarmer(e.target.value)}
                              />
                          </div>
                          {/* Address 2 */}
                          <div className="col-12">
                              <label htmlFor="inputAddress2" className="form-label mt-1">Temporary Address</label>
                              <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                          </div>
                          {/* Button To Next Page  */}
                          <div className="col-12 mt-5 mb-3">
                              <button className="btn btn-primary w-100" onClick={handlepagemove1}>Save &amp; Continue</button>
                          </div>
                      </div>
                  </form>
                </div>
            }
            {/* Form 2 Personal Details  */}
            {page === 2 && 
                <div className="container-fluid mb-5">
                 <div className="container-fluid subscribebgform">
                   <div className="row g-3 p-2">
                       {/* Farmers Bank Name  */}
                       <div className="col-md-12" >
                           <label htmlFor="BankName" className="form-label mt-3">Bank Name</label>
                           <input 
                             type="text" 
                             className="form-control" 
                             id="BankName" 
                             placeholder="Punjab National Bank"
                             name="BankName" 
                             value={BankName} 
                             required 
                             onChange={(e) => setBankName(e.target.value)} 
                           />
                       </div>
                       {/* Farmers Bank Account Number  */}
                       <div className="col-md-6">
                           <label htmlFor="BankNum" className="form-label">Bank Account Number</label>
                             <input
                               name="BankNum"
                               type="number"
                               className="form-control"
                               id="BankNum"
                               value={BankAccountNo}
                               required
                               min={0}
                               onChange={(e) => setBankNum(e.target.value)}
                             />
                        </div>
   
                        {/* Farmer Bank Account Code  */}
                         <div className="col-md-6">
                             <label htmlFor="BankCode" className="form-label">Bank IFSC CODE</label>
                             <input
                                 name="BankCode"
                                 type="text"
                                 className="form-control"
                                 id="BankCode"
                                 value={BankIFSC}
                                 required
                                 onChange={(e) => setBankCode(e.target.value)}
                               />
                         </div>
                         {/* Contact Number  */}
                        <div className="col-md-6">
                              <label htmlFor="ContactNo2" className="form-label">Phone Number</label>
                                  <input
                                    name="ContactNo2"
                                    type="number"
                                    className="form-control"
                                    id="ContactNo2"
                                    placeholder="Alternate Number"
                                    min={0}
                                    required
                                  />
                        </div>
                         {/* Aadhar Number  */}
                         <div className="col-md-6">
                             <label htmlFor="inputNumberadd" className="form-label">Aadhar Number</label>
                             <input 
                                type="number" 
                                className="form-control" 
                                placeholder="XXXX XXXX XXXX" 
                                id="inputNumberadd" 
                                min={0} required
                                value={AadharNumber}
                                onChange={(e) => setaadhar(e.target.value)}
                              />
                         </div>
                         {/* Part of Shop  */}
                         <div className="col-md-12 mt-1">
                            <label htmlFor="whyjoin" className="form-label mb-1 mt-4">Why you want to be Part of AgroAcers ?</label><br />
                            <textarea className="form-control" aria-label="With textarea" id="whyjoin" required></textarea>
                        </div>
                        {/* checkbox  */}
                        <div className="col-12 mt-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="true" id="invalidCheck" required />
                                <span className="form-check-label" htmlFor="invalidCheck">
                                    Agree to terms and conditions &nbsp;&nbsp;&nbsp;
                                    <Link to="/PrivacyPolicy">(AgroAcers Policy)</Link>
                                </span>
                            </div>
                        </div>
                          {/* Button To Next Page Previous Page */}
                           <div className="d-flex justify-content-end align-items-start">
                              <div className="col-3 m-3 mb-3">
                                  <button className="btn btn-outline-secondary w-100" onClick={handlepagemoveback}>Previous</button>
                              </div>
                              <div className="col-3 m-3 mb-3">
                                  <button className="btn btn-outline-success w-100" onClick={handlepagemove2} >Next</button>
                              </div>
                           </div>
                       </div>
                   </div>
                </div>
            }
            {/* Land Information  */}
            {page === 3 && 
              <div className="container-fluid mb-5">
                <div className="container-fluid subscribebgform">
                  <div className="row g-3 p-2">
                      {/* Farmers Address Of Land  */}
                      <div className="col-md-12" >
                          <label htmlFor="AddressOfLand" className="form-label mt-3">Address Of Land</label>
                          <textarea 
                            type="text" 
                            className="form-control" 
                            id="AddressOfLand" 
                            name="AddressOfLand" 
                            value={AdressOfLand} 
                            required 
                            onChange={(e) => setAdressOfLand(e.target.value)} 
                          ></textarea>
                      </div>
                      {/* Farmers Total Land in Acers  */}
                      <div className="col-md-4">
                          <label htmlFor="TotalLandinAcers" className="form-label">Total Land Area</label>
                            <input
                              name="TotalLandinAcers"
                              type="number"
                              className="form-control"
                              id="TotalLandinAcers"
                              placeholder="In Acers"
                              value={TotalLandinAcers}
                              required
                              min={0}
                              onChange={(e) => setTotalLandinAcers(e.target.value)}
                            />
                       </div>
  
                       {/* Farmer Crop Variety  */}
                        <div className="col-md-4">
                            <label htmlFor="CropVariety" className="form-label">Crop Produce</label>
                            <input
                                name="CropVariety"
                                type="text"
                                className="form-control"
                                id="CropVariety"
                                value={CropVariety}
                                required
                                onChange={(e) => setCropVariety(e.target.value)}
                              />
                        </div>
                        {/* Seed Used  */}
                       <div className="col-md-4">
                             <label htmlFor="SeedUsed" className="form-label">Seed Quality</label>
                                 <input
                                   name="SeedUsed"
                                   type="text"
                                   className="form-control"
                                   id="SeedUsed"
                                   placeholder="Seed Company"
                                   value={SeedUsed}
                                   required
                                   onChange={(e) => setSeedUsed(e.target.value)}
                                 />
                       </div>
                        {/* Yield Time  */}
                        <div className="col-md-6">
                            <label htmlFor="YieldTime" className="form-label">Crop YieldTime</label>
                            <input 
                               name="YieldTime"
                               type="date" 
                               className="form-control" 
                               placeholder="June 6, 20XX" 
                               id="YieldTime" 
                               required
                               value={YieldTime}
                               onChange={(e) => setYieldTime(e.target.value)}
                             />
                        </div>
                        {/* Harvest Time  */}
                        <div className="col-md-6">
                            <label htmlFor="HarvestTime" className="form-label">Crop HarvestTime</label>
                            <input 
                               name="HarvestTime"
                               type="date" 
                               className="form-control" 
                               placeholder="Dec 6, 20XX" 
                               id="HarvestTime" 
                               required
                               value={HarvestTime}
                               onChange={(e) => setHarvestTime(e.target.value)}
                             />
                        </div>
                        {/* Min_price  */}
                        <div className="col-md-6">
                            <label htmlFor="Min_price" className="form-label">Min Price Demand</label>
                            <input 
                               name="Min_price"
                               type="number" 
                               className="form-control" 
                               id="Min_price" 
                               required
                               value={Min_price}
                               onChange={(e) => setMin_price(e.target.value)}
                             />
                        </div>
                        {/* Max_price  */}
                        <div className="col-md-6">
                            <label htmlFor="Max_price" className="form-label">Max Price Demand</label>
                            <input 
                               name="Max_price"
                               type="number" 
                               className="form-control"
                               id="Max_price" 
                               required
                               value={Max_price}
                               onChange={(e) => setMax_price(e.target.value)}
                             />
                        </div>
                        {/* Image of Land */}
                        <div className="col-md-12">
                            <label htmlFor="ImageOfCrop" className="form-label mt-2">Image Of Crop</label>
                            <input 
                               name="ImageOfCrop"
                               type="text" 
                               className="form-control"
                               id="ImageOfCrop" 
                               required
                               onChange={(e) => setImageOfCrop(e.target.value)}
                             />
                        </div>
                        {/* Description Of Crop  */}
                        <div className="col-md-12 mt-1">
                           <label htmlFor="DescriptionOfCrop" className="form-label mb-1 mt-4">Description Of Crop ?</label><br />
                           <textarea 
                              name="DescriptionOfCrop"
                              className="form-control" 
                              aria-label="With textarea" 
                              id="DescriptionOfCrop" 
                              placeholder="The Benefit of buying my crops are..."
                              required
                              value={DescriptionOfCrop}
                              onChange={(e) => setDescriptionOfCrop(e.target.value)}
                            ></textarea>
                       </div>
                        {/* Button To Next Page Previous Page */}
                          <div className="d-flex justify-content-end align-items-start">
                             <div className="col-3 m-3 mb-3">
                                 <button className="btn btn-outline-secondary w-100" onClick={handlepagemoveback}>Previous</button>
                             </div>
                             <div className="col-3 m-3 mb-3">
                                 <button className="btn btn-outline-success w-100" onClick={handlepagemove3} >Next</button>
                             </div>
                          </div>
                      </div>
                  </div>
               </div>
            }
            {/* Pay The Amount  */}
            {page === 4 && 
              <div className="container-fluid mb-5">
                <div className="container-fluid subscribebgform">
                  <div className="row g-3 p-2">
                      <div onClick={handlepagemoveback} style={{color: "#0000ff", cursor: "pointer"}}>&lt;- Return</div>

                      <div className="text-center">
                        <h1>Enjoy the convenience of AgroAcers Shop.</h1>
                      </div>

                      <div className="paysubscripefee">
                        <p>Thank you for using our online tool. Please have your bill and account number ready for the payment process.</p>
                        <p>We appreciate your patience as we work to simplify our multiple payment options into a more streamlined system. For additional assistance making your payment </p>
                      </div>

                      <div className="text-center">
                        <h4>Subcription Fee: 199 Rs.</h4>
                      </div>

                      <div className="paysubscripefee">
                          <p>Sell Your Crops on best Price with guarantee of AgroAcers.</p>
                      </div>

                      {/* Button To Next Page Previous Page */}
                        <div className="col-12 mt-5 mb-3">
                            <button className="btn btn-primary w-100" onClick={displayRazorpay}>Pay Amount</button>
                        </div>
                    </div>
                </div>
              </div>
            }

        </div>
    </div>
  );
};
export default FarmerCropDetail;
