import React from "react";
import "./index.css"; // Adjust the path if your file is named differently
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import Logout from "./components/Logout";
import SignUpPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard"; // Import the AdminDashboard
import ProtectedRoute from "./components/ProtectedRoute";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import ProductDetailPage from './components/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
              <DashboardPage />
          }
        />
        <Route path="/profile/:uniqueId" element={<ProfilePage />} />
        <Route
          path="/homepage"
          element={
            // <ProtectedRoute>
              <HomePage />
            // </ProtectedRoute>
          }
        />
        {/* Admin Dashboard Route */}
        <Route
          path="/admin-dashboard"c
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
