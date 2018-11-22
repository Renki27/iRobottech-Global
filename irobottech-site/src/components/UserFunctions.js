import axios from "axios";

export const login = account => {
  return axios
    .post("users/login", {
      account_type: account.account_type,
      email: account.email,
      password: account.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data); //el response data contiene el token
      console.log("RESPONDE DATA " + response.data);
      return response.data;
      //sin return y con redirect?
    })
    .catch(err => {
      console.log(err);
    });
};
