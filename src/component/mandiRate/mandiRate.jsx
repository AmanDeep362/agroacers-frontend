import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Analysis from "./../../Images/Analysis.jpg";
import ProductsBrands from "./Mandibrands.json";
import "./../../Styles/mandirate.css";
import Loader from "../Loader";
import axios from "axios";

function MandiRate() {
  const [DataisLoading, setDataisLoading] = useState(false);
  const [pricedata, setpricedata] = useState([]);
  const [pricedatabackup, setpricedatabackup] = useState([]);
  var result = [];

  const [start, setstart] = useState(20);

  var x = 1;

  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await axios.get(
        "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=1000"
      );
      console.log(data);
      setpricedata(data.records);
      setpricedatabackup(data.records);
      window.scroll(0, 0);
    };
    fetchdata();
    setDataisLoading(true);
  }, []);
console.log(pricedata);
  const LoadMoreData = () => {
    setstart(start + 10);
  };

  const LoadLessData = () => {
    if (start <= 0) {
      return;
    }
    setstart(start - 10);
  };

  const sortproductMSP = () => {
    var e = document.getElementById("SortedProductMSP");
    var value = e.value;

    setpricedata(pricedatabackup);

    if (value === "Select") {
      return;
    } else if (value === "Lowest") {
      result.sort((a, b) => {
        return a.min_price - b.min_price;
      });
      setpricedata(result);
    } else {
      result.sort((a, b) => {
        return b.min_price - a.min_price;
      });
      setpricedata(result);
    }
  };

  result = pricedata.filter((e) => e);

  const HandleTheSearch = (value) => {
    var ans = pricedatabackup.filter((e) => e.state === value);

    ans = ans.filter((e) => e !== undefined);

    // console.log(result, ans)
    setpricedata(ans);
  };

  const SearchMSPDetails = () => {
    var e = document.getElementById("FindProductsMSP");
    var value = e.value;

    setpricedata(pricedatabackup);
    // console.log(pricedata, pricedatabackup)

    if (value === "selected") {
      setpricedata(pricedatabackup);
    } else {
      HandleTheSearch(value);
    }
  };

  if (!DataisLoading) return <Loader />;

  return (
    <div className="App">
      {/* Banner of Mandi Price  */}
      <div className="mandi-banner">
        <h1 className="mandi-banner-heading">Mandi Rate</h1>
        <p className="mandi-banner-para">
          The market price is the need of every farmer, the latest mandi Rate
          will show on the Agro Acers platform.
        </p>
      </div>

      {/* Heading of Sorting MSP  */}
      <div className="MSP-info-container">
        <h3 className="mb-0 text-capitalize">Mandi Price of My City</h3>
        <div className="innner-MSP-info-container">
          <span>Sort By: </span>
          <select id={"SortedProductMSP"} onChange={sortproductMSP}>
            <option value="Select">Select All...</option>
            <option value="Lowest">Lowest Price</option>
            <option value="Highest">Highest Price</option>
          </select>

          <span>Filter By: </span>
          <select id="FindProductsMSP" onChange={SearchMSPDetails}>
            <option value="selected">Select All...</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Dadar and Nagar Haveli">
              Dadar and Nagar Haveli
            </option>
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
      </div>
      {/* Table conatining the MSP Prices  */}
      <div className="text-center m-3">
        <h1 id="CheckMSPPrice">MSP Price List</h1>
      </div>

      <div id="overflowonsmall">
        <table className="table table-striped table-light table-heading-msp mt-1">
          <thead>
            <tr id="showsmalltable">
              <th>Sr No.</th>
              <th>State</th>
              <th>District</th>
              <th>Market</th>
              <th>Item</th>
              <th>Variety</th>
              <th>Arrival Date</th>
              <th>Min price</th>
              <th>Max Price</th>
              <th>Modal Price</th>
            </tr>
          </thead>

          <tbody>
            {result.slice(0, start).map((item) => (
              <tr id="showsmalltable" key={x}>
                <td>{x++}.</td>
                <td>{item.state}</td>
                <td>{item.district}</td>
                <td>{item.market}</td>
                <td>{item.commodity}</td>
                <td>{item.variety}</td>
                <td>{item.arrival_date}</td>
                <td>{item.min_price} / Quantal</td>
                <td>{item.max_price} / Quantal</td>
                <td>{item.modal_price} / Quantal</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {start <= 0 ? <div className="norenderdata">No Data Found...</div> : null}

      {result.length > 20 ? (
        <div className="text-center mb-3">
          <button className="btn btn-outline-success" onClick={LoadMoreData}>
            Load More
          </button>
          <button
            className="btn btn-outline-success mx-4"
            onClick={LoadLessData}
          >
            Load Less
          </button>
        </div>
      ) : null}

      {/* Analysis Image of Mandi Price  */}
      <div className="mandi-Analysis">
        <div className="mandi-Analysis-image-container">
          <img src={Analysis} alt="Analysis" className="mandi-Analysis-image" />
        </div>
        <div>
          <div className="mandi-Analysis-inner">
            <h1>AgroAcers MSP Price List</h1>
            <ul>
              <li>AgroAcers works with idea of One Nation, One MSP, One DBT</li>
              <li>
                AgroAcers have more than 3000+ MSP Price List of various Mandi
                all over India.
              </li>
              <li>
                AgroAcers helps you to deal with Companies and sell crops on the
                best price.
              </li>
              <li>
                Sell your Crops directly to Mandi and Companies without any
                middleman.
              </li>
              <li>AgroAcers help you to get the best deal on your Crops.</li>
            </ul>
            <div className="w-100 text-center mb-4">
              <a href="#CheckMSPPrice">
                <button className="btn btn-outline-success mt-4 w-100">
                  Check Now
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Brands of AgroAcers  */}
      <div className="home_products_sell borderbrands">
        <h1 className="m-4 mb-5">Top Trusted Brands</h1>
      </div>
      {/* Details of Product Brands */}
      <div
        className="home-products-details container-fluid mb-5"
        data-aos="fade-down"
      >
        {ProductsBrands.map((item) => {
          return (
            <div className="TopBrandsMandiPrice" key={item.id}>
              <img
                src={item.image}
                alt="Product"
                className="MandiBrandsImage"
              />
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default MandiRate;
