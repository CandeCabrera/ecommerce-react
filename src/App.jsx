import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsThunk } from "./store/slices/products.slice";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        {isLoading && <Loader />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoutes/>}>
            <Route path="/purchases" element={<Purchases />} />
            </Route>

         
        </Routes>

        <footer>
        <div className="footer-top"> © 1998-2022 highTech™ | by Candelaria Cabrera</div>
      
        </footer>
      </HashRouter>
    </div>
  );
}

export default App;
