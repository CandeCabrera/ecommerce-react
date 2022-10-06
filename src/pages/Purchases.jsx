import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slice";
import ListGroup from "react-bootstrap/ListGroup";

const Purchases = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  const navigate = useNavigate();
  const purchases = useSelector((state) => state.purchases);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = (data) => {
    const created = new Date(data);
    return created.toLocaleDateString("en-US", options);
  };

  return (
    <div className="purchases-container">
      <h2>YOUR PURCHASES</h2>
      <ListGroup className="purchases-list">
        {purchases.map((purchase) => (
          <ListGroup.Item key={purchase.id}>
            <h4>{date(purchase.createdAt)}</h4>
            <ListGroup className="purchase-list-container">
              {purchase.cart.products.map((purchaseDetail) => (
                <ListGroup.Item
                  className="purchase-list-item"
                  onClick={() => navigate(`/products/${purchaseDetail.id}`)}
                  key={purchaseDetail.id}
                >
                  <div className="purchase-brand-title">
                    <h5>{purchaseDetail.title}</h5>
                    <p> by {purchaseDetail.brand}</p>
                  </div>
                  <div className="purchase-price-units">
                    <p className="pruchase-grid-title">UNITS</p>
                    <p></p>
                    <p className="pruchase-grid-title">PRICE</p>

                    <p></p>
                    <p className="pruchase-grid-title">TOTAL</p>
                    <p className="purchase-grid-amount">
                      {purchaseDetail.productsInCart?.quantity}
                    </p>
                    <p>x</p>
                    <p className="purchase-grid-amount">
                      {purchaseDetail.price}
                    </p>

                    <p>=</p>
                    <p className="purchase-item-total purchase-grid-amount">
                      $
                      {purchaseDetail.productsInCart?.quantity *
                        purchaseDetail.price}
                      .00
                    </p>
                  </div>
                  <br />
                  <br />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Purchases;
