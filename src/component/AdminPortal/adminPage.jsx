import adminimg from "../../Images/crousal/admin-template.jpg";
import UserBanner from "../../Images/New Img/Userbanner.jpg";
import contactBanner from "../../Images/New Img/contactPage.jpg";
import blogBanner from "../../Images/New Img/addBanner.jpg";
import productBanner from "../../Images/New Img/addProduct.jpg";
import universityBanner from "../../Images/New Img/agricultureuniversity.jpg";
import govtSchemeBanner from "../../Images/New Img/Govtschemebanner.jpg";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import '../../Styles/adminpage.css'
const AdminPage = () => {
  return (
    <>
      <div className="container">
        <img
          className="d-block img-fluid  w-100"
          src={adminimg}
          alt="First slide"
        />

        <h2 className="admin-page-heading">Administrator Services</h2>

        {/* Card For User Details  */}
        <div className="admin-card-container">
          <div className="card" style={{width: '18rem'}}>
            <img
              className="card-img-top img-fluid"
              src={UserBanner}
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">User Details</h5>
              <p className="card-text">
                This section is for view the User details. To get the details of all the
                user
              </p>
              <Link to="Userdata" className="btn btn-primary">
                User Details
              </Link>
            </div>
          </div>

          {/* Card for Contact details made by user  */}
          <div className="card" style={{width: '18rem'}}>
            <img
              className="card-img-top img-fluid"
              src={contactBanner}
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">Contact Details</h5>
              <p className="card-text">
                This section is for Contact details. To get the details of all
                the message sent by User
              </p>
              <Link to="contact" className="btn btn-primary">
                Contact Details
              </Link>
            </div>
          </div>

          {/* Card to add Blogs  */}
          <div className="card" style={{width: '18rem'}}>
            <img
              className="card-img-top img-fluid"
              src={blogBanner}
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">Add blog</h5>
              <p className="card-text">
                This section is for add blog. To add the content in blog to the website.
              </p>
              <Link to="uploadpost"  className="btn btn-primary">
                Add Blog
              </Link>
            </div>
          </div>

          {/* Card to add Products in Cart  */}
          <div className="card" style={{width: '18rem'}}>
            <img
              className="card-img-top img-fluid"
              src={productBanner}
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">Add product</h5>
              <p className="card-text">
                This section is for add the product in Agroacers Shopping in website.
              </p>
              <Link to="shoppingpost"  className="btn btn-primary">
                Add Product
              </Link>
            </div>
          </div>

          {/* Card to add Universities  */}
          <div className="card" style={{width: '18rem'}}>
            <img
              className="card-img-top img-fluid"
              src={universityBanner}
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">Add  University</h5>
              <p className="card-text">
                This section is for add the details of university in Agriculture University.
              </p>
              <Link to="AddUniversity"  className="btn btn-primary">
                Add University
              </Link>
            </div>
          </div>

          {/* Card to add Govt Scheme  */}
          <div className="card" style={{width: '18rem'}}>
            <img
              className="card-img-top img-fluid"
              src={govtSchemeBanner}
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">Add Govt. Scheme</h5>
              <p className="card-text">
                This section is for add the Government Schemes in portal.
              </p>
              <Link to="GovtScheme"  className="btn btn-primary">
                Add Scheme
              </Link>
            </div>
          </div>

          {/* Card to See Shop Details  */}
          <div className="card" style={{width: '18rem'}}>
            <img
              className="card-img-top img-fluid"
              src={blogBanner}
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">Check Order Details</h5>
              <p className="card-text">
                This section helps to check the ordered products in Shop.
              </p>
              <Link to="adminshopdetail"  className="btn btn-primary">
                Check Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminPage;
