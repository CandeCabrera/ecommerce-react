import React from "react";
import { useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems, purchaseCartCheckout, deleteCartItem } from "../store/slices/cart.slice";


const Cart = ({ show, handleClose }) => {
  const cartItems = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const checkout = ()=>{
    dispatch(purchaseCartCheckout())
    navigate('/purchases')
    handleClose()
  }

  const deleteItem = (id) =>{
    dispatch(deleteCartItem(id))
  }

  const total = ()=>{
    let finalPrice = 0
    cartItems?.forEach(product => {
        finalPrice += Number(product.price) * product.productsInCart?.quantity
     
    })
    return finalPrice
  }

  
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <h2>MY CART</h2>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="cart-item-list">
          {cartItems?.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-top">
              <i onClick={()=> deleteItem(item.id)} className="fa-solid fa-xmark"></i>
              <p className="cart-item-brand">{item.brand.toUpperCase()}</p>
              <h5 style={{ fontSize: item.title.length > 24 ? '14px' : '17px'}}>{item.title}</h5>
              </div>
              <div className="cart-item-grid">
                <h6>PRICE</h6>
                <h6>UNITS</h6>
                <h6>TOTAL</h6>
                <p>${item.price}</p>
                <p className="cart-item-units">{item.productsInCart?.quantity} </p>
                <p>${item.productsInCart?.quantity * item.price}.00</p>
              </div>
              <div className="cart-item-bttn">
              <Link className="cart-item-see-product" to={`/products/${item.id}`}>SEE PRODUCT</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
            <div className="cart-total">
                <h4>total</h4>
                <h4>$ {total()}.00</h4> 
            </div>
            <button onClick={checkout}>Checkout</button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
