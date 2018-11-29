import axios from "axios";
import EditPass from './../pages/EditPass';

export const edit = token => {
  return axios
    .post("EditProfileRoute/edit", {
     id_person:token.id_person
    })
    .then(response => {
      console.log("RESPONDE DATA " + response.data);
      return response.data;
      //sin return y con redirect?
    })
    .catch(err => {
      console.log(err);
    });
}; 



export const fullEdit = valuesToEdit => {
  return axios
    .put("EditProfileRoute/editFull", {
      firstName:valuesToEdit.firstName,
      secondName:valuesToEdit.secondName,
      lastName1:valuesToEdit.lastName1,
      lastName2:valuesToEdit.lastName2,
      idNumber:valuesToEdit.idNumber,
      birthDate:valuesToEdit.birthDate,
      phone:valuesToEdit.phone,
      address:valuesToEdit.address,     
      id_person:valuesToEdit.id_person
    })
    .then(response => {
      console.log("RESPONDE DATA " + response.data);
      return response.data;
      //sin return y con redirect?
    })
    .catch(err => {
      console.log(err);
    });
};

export const editPass = myPass => {
  return axios
    .put("EditProfileRoute/editPass", {
      newPass:myPass.newPass1,
      id_person:myPass.id_person
    })
    .then(response => {
      console.log("RESPONDE DATA " + response.data);
      return response.data;
      //sin return y con redirect?
    })
    .catch(err => {
      console.log(err);
    });
};