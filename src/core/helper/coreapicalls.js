import { API } from "../../backend";


export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },                                                                                                                                                                              
  
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const getProductsById  = (id) =>{
  return fetch(`${API}/products/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

    },                                                                                                                                                                              
  
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
}