import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import { setBaseUrl, setPageSize } from "./api";
import App from "./components/App";
import { defaultPageSize } from "./components/shared/pageSizes";

setBaseUrl("/api");
setPageSize(defaultPageSize);

function renderToDom() {
  const app = document.getElementById("app");
  ReactModal.setAppElement(app);
  ReactDOM.render(<App />, app);
}

renderToDom();

if (module.hot) {
  module.hot.accept("./components/App", () => {
    renderToDom();
  });
}
