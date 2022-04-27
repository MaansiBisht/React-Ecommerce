/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { isAutheticated } from "../auth/helper";
import ProductDes from "../core/Product";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  //   function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  //console.log(product);

  const cartTitle = product ? product.title : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";
  const Image = product ? product.image : "A photo from pexels";

  const addToCart = () => {
    if(isAutheticated()){
    addItemToCart(product, () => setRedirect(true));
    }
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = addtoCart => {
    if(isAutheticated()){
    return (
     
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
      }
  };

  const showRemoveFromCart = removeFromCart => {
    if(isAutheticated()){
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
        }
  };

  

  return (
    <div>  
    <div className="card text-white bg-dark border  row " style ={{display:"flex", flexDirection:"column", flexWrap: "wrap",width:"100%"}} >
      <div className="card-body" style={{ display:"flex", flexDirection:"column", width:"33,33%"}}>
        {getARedirect(redirect)}
        <div className="rounded border border-success p-2">
        <img  src={Image} alt="no-img" style={{ maxHeight: "150px", maxWidth: "150px" }} className="mb-3 rounded" />
    </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartTitle}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
       <a href={"/product/"+product.id} className="btn btn-success rounded  btn-sm px-4 " >More Details</a>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Card;