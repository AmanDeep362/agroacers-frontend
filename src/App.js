import React, { createContext, useReducer } from "react";
import "./Styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/header/Navbar";
import Home from "./component/home/Home";
import Login from "./component/auth/login/Login";
import Register from "./component/auth/Registration/Register.jsx";
import PageNotFound from "./component/PageNotFound/PageNotFound";
import Footer from "./component/footer/footer";
import ContactPage from "./component/contactPage/contactPage";
import PrivacyPolicy from "./component/footer/PrivacyPolicy";
import AboutUS from "./component/AboutUs/about";
import MandiRate from "./component/mandiRate/mandiRate.jsx";
import Logout from "./component/auth/logout/logout";
import { initialState, reducer } from "./Reducer/useReducer";
import AboutUser from "./component/User/AboutUse";
import ShopHome from "./component/AgroShop/shop";
import UserData from "./component/AdminPortal/Userdata";
import ContactPadeData from "./component/AdminPortal/contactData";
import AdminPage from "./component/AdminPortal/adminPage";
import UploadPost from "./component/AdminPortal/uploadpage";
import AddUniversity from "./component/AdminPortal/addUniversity";
import AgricultureUniversity from "./component/AgriculturUmiversity/AgricultureUniversities";
import ShoppingData from "./component/AdminPortal/shoppingAdmin";
import AddGovtScheme from "./component/AdminPortal/govtScheme";
import CropBlog from "./component/Crops/Crop-Page";
import RabiCrop from "./component/Crops/rabicrop";
import ProductsDetails from "./component/AgroShop/Products/ProductsDetails";
import UniqueProductsDetails from "./component/AgroShop/Products/UniqueProduct";
import ProductsDetailsAll from "./component/AgroShop/Products/ProductCopy";
import MyCart from "./component/AgroShop/Agrocart/cart";
import CRopDetails from "./component/Crops/cropdetails";
import KharifCrop from "./component/Crops/Kharifcrop";
import VegetableCrop from "./component/Crops/vegetable-crop";
import GovtScheme from "./component/govtSchemes/govtSchemes";
import FarmerCropDetail from "./component/SellPurchaceCrop/FarmerCropDetails";
import SubscriberPlan from "./component/Subscription/Subscriber-plan";
import CropsDashboard from "./component/SellCropsBoard/Dashboard";
import SellerPurchace from "./component/SellPurchaceCrop/sellpurchacepage";
import MyLocalWeather from "./component/home/WeatherAPI/weather";
import FertilizerDetailPage from "./component/Fertilizer/fertilizer";
import Changepassword from "./component/auth/login/changepassword";
import FarmerCropDashboard from "./component/SellCropsBoard/FarmerApplications";
import FarmerBiddingInfo from "./component/SellCropsBoard/farmerApplicationDetails";
import HelpFarmer from "./component/Crops/HelpFarmer";
import Croprecommended from "./component/Crop-reccomend/crop-recommend";
import ShopOrderDetails from "./component/AdminPortal/Shopbuydetails";
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <Routing />
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};
const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="changepassword" element={<Changepassword />} />
        <Route path="about" exact element={<AboutUS />} />
        <Route path="mandirates" element={<MandiRate />} />
        <Route path="AboutUser" exact element={<AboutUser />} />
        <Route path="Crops" exact element={<CropBlog />} />
        <Route path="GovternmentScheme" exact element={<GovtScheme />} />
        <Route path="sellYourCrop" exact element={<FarmerCropDetail />} />
        <Route path="SellerCrop/:id" exact element={<SellerPurchace />} />
        <Route path="SubscriberPlan" exact element={<SubscriberPlan />} />
        <Route path="CropSellDashboard" exact element={<CropsDashboard />} />
        <Route
          path="CropSellDashboard/myApplication"
          exact
          element={<FarmerCropDashboard />}
        />
        <Route
          path="CropSellDashboard/myApplication/:id"
          exact
          element={<FarmerBiddingInfo />}
        />
        <Route path="Sellercrop/:id" exact element={<SellerPurchace />} />
        <Route path="Crops/rabi" exact element={<RabiCrop />} />
        <Route path="Crops/Kharif" exact element={<KharifCrop />} />
        <Route path="Crops/strategies" exact element={<HelpFarmer />} />
        <Route path="Crops/strategies/:id" exact element={<CRopDetails />} />
        <Route path="Crops/Vegetables" exact element={<VegetableCrop />} />
        <Route path="Crops/Vegetables/:id" exact element={<CRopDetails />} />
        <Route path="Crops/Kharif/:id" exact element={<CRopDetails />} />
        <Route path="Crops/rabi/:id" exact element={<CRopDetails />} />
        <Route path="register/login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="agri" element={<AgricultureUniversity />} />
        <Route path="admin/UserData" element={<UserData />} />
        <Route path="admin/Contact" element={<ContactPadeData />} />
        <Route path="admin/uploadpost" element={<UploadPost />} />
        <Route path="admin/AddUniversity" element={<AddUniversity />} />
        <Route path="admin/shoppingpost" element={<ShoppingData />} />
        <Route path="admin/GovtScheme" element={<AddGovtScheme />} />
        <Route path="admin/adminshopdetail" element={<ShopOrderDetails />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/ProductsDetails" element={<ProductsDetails />} />
        <Route path="/Products" element={<ProductsDetailsAll />} />
        <Route path="/products/:id" element={<UniqueProductsDetails />} />
        <Route path="/shop/subscribeshop" element={<FarmerCropDetail />} />
        <Route path="/cart/:id" element={<MyCart />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="MyWeather" element={<MyLocalWeather />} />
        <Route path="fertilizer" element={<FertilizerDetailPage />} />
        <Route path="crop-recommended" element={<Croprecommended />} />
        <Route path="/" element={<Home />} exact />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default App;
