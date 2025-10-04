import React from "react";

import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VarifyEmail from "./pages/VerifyEmail"
import About from "./pages/About";
import Contact from "./pages/Contact";
export default function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-950 flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
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
              <UpdatePassword/>
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
             <About/>
            </OpenRoute>
          }
        />
         <Route
          path="/contact"
          element={
            <OpenRoute>
             <Contact/>
            </OpenRoute>
          }
        />

      </Routes>
    </div>
  );
}
