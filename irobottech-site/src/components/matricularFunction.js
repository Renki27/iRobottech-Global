import axios from "axios";

export const matricular = account => {
  return axios
    .post("users/matricular", {
     id_person: account.id_person,
     id_account: account.id_account,
     id_personUser: account.id_personUser,
     id_accountUser: account.id_accountUser,
     accountType: account.accountType,
     curseName: account.curseName,
     numberCurse: account.numberCurse,
     startDate: account.startDate,
     endDate: account.endDate,
     number_weeks: account.number_weeks,
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};