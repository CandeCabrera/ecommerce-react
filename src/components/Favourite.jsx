import React from "react";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const Favourite = ({ productTitle }) => {
  const [isFilled, setIsFilled] = useState(false);

  

  const filledHeart = (e) => {
    e.stopPropagation();
    setIsFilled(!isFilled);
    // if(isFilled){

      
    //     alert(`${productTitle} has been removed to favorites`)
    // } else{
    //     alert(`${productTitle} has been added to favorites`)    
    // }
  };

  return (
    <div>
     
      {isFilled ? (
        <i
          onClick={(e) => filledHeart(e)}
          className="fa-solid fa-heart filled-heart"
        ></i>
      ) : (
        <i
          onClick={(e) => filledHeart(e)}
          className="fa-regular fa-heart empty-heart"
        ></i>
      )}
    </div>
  );
};

export default Favourite;
