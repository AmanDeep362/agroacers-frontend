import React from "react";
import "../../Styles/privacypage.css";
import { Link } from "react-router-dom";

class PrivacyPolicy extends React.Component {
  render() {
    window.scroll(0,0)
    return (
      <>
        <div className="container-fluid">
            <h1 className="privacy-page-heading">AgroAcers Privacy Policy</h1>

            <p className="privacy-head-1">
              This is the Privacy Policy governing your use of the AgroAcers.com
              Site.
            </p>
            <p className="privacy-head-1">
              By using this Site, you approve and agree to our Privacy Policy
              set out below.
            </p>
            <p className="privacy-2">
              All terms not defined in this document have the meanings ascribed
              to them in the Terms of Use Agreement between you and
              AgroAcers.com which by use of this Site you agree to accept.
            </p>
            <p className="privacy-2">
              The fundamental purpose of the services that AgroAcers.com
              provides you requires that we gather, process, use and distribute
              the member's information which also you provide directly by
              filling out our various forms and formats; for example, your name,
              contact information, user profile and services page and the
              products you buy and sell, etc. Therefore, AgroAcers.com does not
              guarantee that your information will be protected from exposure in
              any particular party or profile. In fact the purpose of this
              e-marketplace web site is to make you and your profile/company
              known all over the commercial world. If you wish to remove your
              profile/company or update your company's information, please
              Contact Us.
            </p>
            <h4 className="privacy-head">
              <strong> 1. The Information We Collect</strong>
            </h4>
            <p className="privacy-2">
              <strong>Registration Information:</strong> At the time you
              register to become a Registered User of the Site, you will be
              asked to fill out a registration form which requires you provide
              information such as your name, address, phone/fax number, email
              address and other personal information as well as information
              about your business ("Registration Information").
            </p>
            <p className="privacy-2">
              Publishing Information:If you submit any information to
              AgroAcers.com to be published on the Site through the publishing
              tools, including but not limited to Company Directory, Product
              Catalog, Trade Leads, then you are deemed to have given consent to
              the publication of such information ("Publishing Information").
            </p>
            <p className="privacy-2">
              Payment Information:If you establish a credit account with us or
              our providers or if you purchase a product or service from
              AgroAcers.com or a vendor available through KisaanTrade.com,
              we collect additional information, including billing information,
              (but not credit card numbers and expiration dates) and tracking
              information from cheques or money orders ("Payment Information").
            </p>
            <p className="privacy-2">
              Statistical Information:In addition, we gather aggregate
              statistical information about our Site and Users, such as IP
              addresses, browser software, operating system, pages viewed,
              number of sessions and unique visitors, etc. ("Statistical
              Information").
            </p>
            <p className="privacy-2">
              Registration Information:Publishing Information, Payment
              Information, Statistical Information and any information we
              collect from you through the use of cookies (see Section 5 below)
              or any other means shall collectively be referred to as "Collected
              Information".
            </p>
            <p className="privacy-2">
              We take permission from user READ_PHONE_STATE, INTERNET,
              READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE,
              ACCESS_NETWORK_STATE, ACCESS_WIFI_STATE, SEND_SMS, READ_SMS,
              RECEIVE_SMS, CAMERA.
            </p>
            <h4 className="privacy-head">
              <strong>2. Contacting Us</strong>
            </h4>
            <p className="privacy-2">
              AgroAcers.com If you have any questions about this Privacy
              Policy, Contact us at <Link to="/contact">www.agroacers/contact</Link> , or your dealings with this Web
              site, you can contact at: AgroAcersInfo@gmail.com
            </p>
            <br />
        </div>
      </>
    );
  }
}
export default PrivacyPolicy;
