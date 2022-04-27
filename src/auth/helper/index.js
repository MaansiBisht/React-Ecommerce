import { API } from "../../backend";


export const signin = user => {
  return fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },                                                                                                                                                                              
    body: JSON.stringify({
      username :"johnd",
      password: "m38rmF$"
    })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {  // not available
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
