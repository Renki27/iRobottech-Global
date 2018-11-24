import axios from "axios";

export const registerProfessor = newProfessor => {
  return axios
    .post("users/registerProfessor", {
      firstName: newProfessor.firstName,
      secondName: newProfessor.secondName,
      lastName1: newProfessor.lastName1,
      lastName2: newProfessor.lastName2,
      idNumber: newProfessor.idNumber,
      birthDate: newProfessor.birthDate,
      phone: newProfessor.phone,
      address: newProfessor.address,
      email: newProfessor.email
    })
    .then(response => {
      console.log("Registrado");
    });
};

export const registerSecretary = newSecretary => {
  return axios
    .post("users/registerSecretary", {
      firstName: newSecretary.firstName,
      secondName: newSecretary.secondName,
      lastName1: newSecretary.lastName1,
      lastName2: newSecretary.lastName2,
      idNumber: newSecretary.idNumber,
      birthDate: newSecretary.birthDate,
      phone: newSecretary.phone,
      address: newSecretary.address,
      email: newSecretary.email
    })
    .then(response => {
      console.log("Registrado");
    });
};

//Register Student
export const registerStudent = newStudent => {
  return axios
    .post("users/registerStudent", {
      firstName: newStudent.firstName,
      secondName: newStudent.secondName,
      lastName1: newStudent.lastName1,
      lastName2: newStudent.lastName2,
      idNumber: newStudent.idNumber,
      birthDate: newStudent.birthDate,
      phone: newStudent.phone,
      address: newStudent.address,
      guardianName: newStudent.guardianName,
      guardianID: newStudent.guardianID,
      emergencyPhone: newStudent.emergencyPhone,
      email: newStudent.email
    })
    .then(response => {
      console.log("Registrado");
    });
};

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
