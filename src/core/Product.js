/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { getProducts, getProductsById } from "./helper/coreapicalls";
import { useParams } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { isAutheticated } from "../auth/helper";
import { Redirect } from "react-router-dom";

const ProductDes=(
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f,
    reload = undefined) => {

    const [product, setProduct] = useState([]);
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    let {id} = useParams();
    let param = parseInt(id);

    
    const Title = product ? product.title : "Default description";
    const Price = product ? product.price : "DEFAULT";
    const Image = product ? product.image : "A photo from pexels";
    const Description = product ? product.description : "A photo from pexels";


   // useEffect =(() =>{
        const loadProduct = () => {getProductsById(param).then(data => { 
          if (data.error) {
            setError(data.error);   
          } else {
              console.log(data)
            setProduct(data);
          }
        });
    }
    loadProduct();


  
  console.log(product)

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

  
    return (
        <Base title="Product Page" description="Product description page">
            {getARedirect(redirect)}
             <div className="rounded border border-success p-2" style={{ width:"100%", height:"100%"}}>
        <img  src={Image} alt="no-img" style={{ maxHeight: "150px", maxWidth: "150px" }} className="mb-3 rounded" />
    </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          {Title}
        </p><p className="lead bg-success font-weight-normal text-wrap">
          {Description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {Price}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
 
        </div>
            </Base>

    );
}

export default ProductDes;