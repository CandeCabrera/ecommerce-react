import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Favourite from "../components/Favourite";
import Hero from "../components/Hero";


export const feedback = [
  {
    stars: 4.5,
    review: 23,
  },
  {
    stars: 4.0,
    review: 10,
  },
  {
    stars: 4.1,
    review: "no",
  },
  {
    stars: 4.5,
    review: 17,
  },
  {
    stars: 4.0,
    review: 14,
  },
  {
    stars: 4.8,
    review: 30,
  },
  {
    stars: 4.5,
    review: 11,
  },
  {
    stars: 5.0,
    review: 37,
  },
  {
    stars: 4.7,
    review: 20,
  },
  {
    stars: 5.0,
    review: 29,
  },
  {
    stars: 5.0,
    review: 29,
  },
];

const Home = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [fontSize, setFontSize] = useState("22px")
  

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => {
    setProductsFiltered(products);
  }, [products]);

  const allProducts = () => {
    setProductsFiltered(products);
  };

  const filterCategory = (categoryId) => {
    const filteredProducts = products.filter(
      (product) => product.category.id === categoryId
    );
    setProductsFiltered(filteredProducts);
  };

  

  const searchProduct = () => {
    const inputFiltered = products.filter((product) =>
      product.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (inputFiltered) {
      setProductsFiltered(inputFiltered);
    } else {
      setProductsFiltered(products);
    }
    setInputValue("");
  };

  const filterApple = () => {
    const apple = products.filter((product) => 
    product.title.toLowerCase().includes('apple'))
    const iphone = products.filter((product) => 
    product.title.toLowerCase().includes('iphone'))
    const appleProducts = [... apple, ... iphone]
    if (appleProducts) {
      setProductsFiltered(appleProducts);
    } else {
      setProductsFiltered(products);
    }

  }

  const filterSamsung = ()=>{
    const samsungProducts = products.filter(product =>
      product.title.toLowerCase().includes('samsung')
    )
    if (samsungProducts) {
      setProductsFiltered(samsungProducts);
    } else {
      setProductsFiltered(products);
    }
  }




  return (
    <div className="home-App">

      <Hero
      filterApple={filterApple}
      filterSamsung={filterSamsung}/>
    

      <div className="searcher-container">
        <form onSubmit={searchProduct}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search product"
            aria-label="Recipient's username with two button addons"
          />
          <button >Search</button>
        </form> 
        </div> 

      <div className="categories-home">
        <button

          type="submit"
          className="bttns lead"
          variant="dark"
          onClick={allProducts}

        >
          All Products
        </button>

        {categories.map((category) => (
          <button
           
            type="submit"
            className="bttns lead"
            variant="dark"
            onClick={() => filterCategory(category.id)}

            key={category.id}
          >
            {category.name}
          </button>
        ))}

        
      </div>

      <ul id="product-list" className="products-container">
        {productsFiltered.map((product) => (
          <li
            onClick={() => navigate(`/products/${product.id}`)}
            className="product-card"
            key={product.id}
          >

    
            <div className="product-img-container">
            
              <Favourite productTitle={product.title} />

              <img
                className="product-img-card"
                src={product.productImgs[0]}
                height="165px"
              />
            </div>

            <div className="product-title-container">
              <p className="product-title-card" style={{ fontSize: product.title.length > 21 ? '18px': '22px' }}>{product.title}</p>
            </div>

            <div className="product-price-container">
              <p className="product-price-card">${product.price}</p>
              <i className="fa-solid fa-cart-shopping shopping-cart"></i>
            </div>

             <div className="stars-review-container">
             <i className="fa-solid fa-star"></i>
          
              <p>
                {feedback[Number(product.id) - 1].stars }{" "}
                <span className="reviews">
                {"(" + feedback[Number(product.id) - 1].review + " reviews)"}
                </span>
                
              </p> 
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
