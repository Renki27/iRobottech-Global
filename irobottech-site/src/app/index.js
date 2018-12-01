import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "mdbreact/dist/css/mdb.css";
import { HashRouter } from "react-router-dom";

render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
