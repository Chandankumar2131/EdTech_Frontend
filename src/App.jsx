import React from "react";

import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VarifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
// import StudentRoute from "./components/core/Auth/StudentRoute";

export default function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-950 flex flex-col">
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VarifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="/about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <OpenRoute>
              <Contact />
            </OpenRoute>
          }
        />

        {/* Protected Dashboard routes */}
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

          {/* Student-only routes */}
          <Route path="dashboard/enrolled-courses"element={<EnrolledCourses />}
          />
          <Route path="dashboard/cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}
