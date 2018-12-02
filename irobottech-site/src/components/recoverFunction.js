import axios from "axios";

export const recover = account => {
  return axios
    .put("RecoverPass/recover", {      
      email: account.email,
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


export const sendMessage = mensaje => {
  return axios
    .post("RecoverPass/message", {      
      nombre: mensaje.nombre,
      correo: mensaje.correo,
      asunto: mensaje.asunto,
      mensaje: mensaje.mensaje,
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
