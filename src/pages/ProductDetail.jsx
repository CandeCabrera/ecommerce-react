import React from "react";
import { Link, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import  {feedback}  from "./Home";
import { postCartItems } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const products = useSelector((state) => state.products);
  const [isOpen, setIsOpen] = useState(false);
  const [isRelatedProducts, setIsRelatedProducts] = useState(false);
    const [rate, setRate]=useState(1);
  const dispatch = useDispatch();

  const { id } = useParams();

  const productDetail = products.find((product) => product.id === Number(id));

  const relatedProducts = products.filter(
    (product) => product.category.id === productDetail.category.id
  );


  useEffect(()=>{
    setRate(1)
  },[id])

 const productSelected = {
    id: id,
    quantity: rate
}
  const addToCart = ()=>{
    alert(rate)
    dispatch(postCartItems(productSelected))
  }



  return (
    <div className="product-detail-app">
      <div className="product-grid" >
        <div className="carousel-container">
          <Carousel
            className="products-carousel"
            pause="hover"
            variant="dark"
            interval={5000}
          >
            {productDetail?.productImgs.map((image) => (
              <Carousel.Item key={image}>
                <img src={image} height="350px" />
              </Carousel.Item>
            ))}
          </Carousel>
        
        </div>

        <div className="product-description">
          <h2 className="product-name">{productDetail?.title}</h2>

          <div className="price-favorites-container">
            <p className="product-detail-price">${productDetail?.price}</p>

            <div className="vertical-line"></div>

            
            <p className="product-detail-review">
            <i className="fa-solid fa-star"></i> 
                {feedback[Number(productDetail?.id) - 1]?.stars }{" "}
                <span>
                {"(" + feedback[Number(productDetail?.id) - 1]?.review + " reviews)"}
                </span>
                
              </p> 
          </div>

          <div className="add-product-to-cart">
            <div className="counter-container">
              <button className="plus-minus" onClick={()=> setRate(rate -1)}>-</button>
              <p>{rate}</p>
              <button className="plus-minus" onClick={()=> setRate(rate +1)}>+</button>
            </div>
            <button className="add-to-cart-bttn" onClick={addToCart}>Add to cart</button>
          </div>

          {/* <button className="checkout-bttn">Checkout</button> */}

          <div className="product-info-container description">
            {isOpen ? (
              <div
                className="description-toggle "
                onClick={() => setIsOpen(!isOpen)}
              >
                <h6>Description</h6> <i className="fa-solid fa-minus"></i>
              </div>
            ) : (
              <div
                className="description-toggle"
                onClick={() => setIsOpen(!isOpen)}
              >
                <h6>Description</h6> <i className="fa-solid fa-plus"></i>
              </div>
            )}

            {isOpen && (
              <p className="product-detail-text">
                {productDetail?.description}
              </p>
            )}
          </div>

          <div className="product-info-container related-products-container">
            {isRelatedProducts ? (
              <div
                className="description-toggle"
                onClick={() => setIsRelatedProducts(!isRelatedProducts)}
              >
                <h6>Related products</h6> <i className="fa-solid fa-minus"></i>
              </div>
            ) : (
              <div
                className="description-toggle"
                onClick={() => setIsRelatedProducts(!isRelatedProducts)}
              >
                <h6>Related products</h6> <i className="fa-solid fa-plus"></i>
              </div>
            )}

            {isRelatedProducts && (
              <ul className="related-products-list">
                {relatedProducts.map((product) => (

                  <li key={product.id}>
        
                    <Link to={`/products/${product.id}`}>
                     <div className="related-image-container">
                     <img src={product.productImgs[1]} height="100px" />
                     </div>
                      <div className="title-price-container">
                      <h5>{product.title}</h5>
                      <p>$ {product.price}</p>
                      </div>
                      
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="website-policy">
            <div className="policy one">
                <div className="logos-container">
                <i className="fa-brands fa-dhl"></i>
                <i className="fa-brands fa-fedex"></i>
                <i className="fa-brands fa-ups"></i>
                </div>
                <h5>Free shipping</h5>
                <p>On orders over $500.00</p>
            </div>
            <div className="policy two">
            <i className="fa-solid fa-rotate-left"></i>
                <h5>Very easy to return</h5>
                <p>Just phone number</p>
            </div>
            <div className="policy three">
            <i className="fa-solid fa-globe"></i>
                <h5>Worldwide Delivery</h5>
                <p>Fast delivery nationwide.</p>
            </div>
            <div className="policy four">
            <i className="fa-solid fa-money-bill-transfer"></i>
                <h5>Refunds policy</h5>
                <p>60 days return for any reason</p>
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
