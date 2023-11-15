// import React from "react";
// import "./index.css"; // Adjust the path if your file is named differently
// import WelcomePage from "./pages/WelcomePage";
// import LoginPage from "./pages/LoginPage";
// import Logout from "./components/Logout";
// import SignUpPage from "./pages/SignupPage";
// import DashboardPage from "./pages/DashboardPage";
//import Navigation from './components/Navigation';
// import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>

      <Router>

        {/*<============The Following Routes Can be accessed Only When the User Logs In========>*/}
        <Routes>
        <Route path="/" element={<HomePage/>} />
             <Route path="/product-list" element={<ProductListPage/>} />
             <Route path="/product-details/:id" element={<ProductDetailsPage/>} />
             <Route path="*" element="Page not exists 404"/>
        </Routes>



      </Router>
          
    </>
  );
}


export default App;
