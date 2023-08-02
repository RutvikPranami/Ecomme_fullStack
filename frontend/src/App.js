import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import PrivateComponent from "./Components/PrivateComponent";
import AddProduct from "./Components/AddProduct";
import ProductList from "./Components/ProductList";
import UpdateProduct from "./Components/UpdateProduct";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateProduct/>} />
            <Route
              path="/user_profile"
              element={<UserProfile/>}
            />
            <Route path="/logout" element={<h1>Log out component</h1>} />
            
          </Route>
          
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
