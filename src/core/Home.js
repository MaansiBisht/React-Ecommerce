/* eslint-disable no-unused-vars */

import React, { useState, useEffect , useRef} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";


export default function Home() {
  const inputE1 = useRef("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortType, setSortType] = useState("asc");

  const loadAllProduct = () => {
    getProducts().then(data => { 
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

 

  
  const getSearchItem = () => {
    setSearchItem(inputE1.current.value);
  
  }

 
  useEffect(() =>{
    const searchHandler = (searchItem) => {
      if (searchItem !== "") {
        const newProducts = products.filter((product) => {
          return(Object.values(product).join("").toLowerCase().includes(searchItem.toLowerCase()))
        });
  
        setSearchResults(newProducts);
       }else{
        
         setSearchResults(products)
         
      }
    }
    searchHandler(searchItem);
  },[searchItem,products]);

  //console.log(products);
    
  useEffect(() =>{
    const sorted = products.sort((a,b) => {
      const isReversed = (sortType === 'asc') ?1 : -1;
      console.log(isReversed);
      return isReversed * a.title.localeCompare(b.title);
    })
    setSearchResults(sorted);
    },[sortType, products])


    return (
      
      <Base title="Home Page" description="Welcome to the  Store">
        <div className="row text-center">
          <h1 className="text-white">All Products</h1>
          <input ref={inputE1} type="search"  icon ="search" className="form-control rounded" label="Search" aria-label="Search" aria-describedby="search-addon" value ={searchItem} onChange={getSearchItem}/>
          <div className="col">
              <button className="button" onClick={() => {setSortType("asc")}}>Sort By Asc</button>
              <button className="button" onClick={() => {setSortType("desc")}}>Sort By Desc</button>
          </div>
          <div className="row">        
            {searchResults.map((product,index) => {
              return (
                <div key={index} className="col-4 mb-4">               
                  <Card product={product} />
                </div>
              );}
            )}           
          </div>
        </div>
      </Base>
    );
}