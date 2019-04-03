import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import { setBaseUrl, setPageSize } from "./api";
import App from "./components/App";
import { defaultPageSize } from "./components/shared/pageSizes";

setBaseUrl("/api");
setPageSize(defaultPageSize);

function renderToDom() {
  const appElement = document.getElementById("app");
  ReactModal.setAppElement(appElement);
  ReactDOM.render(<App />, appElement);
}

renderToDom();

if (module.hot) {
  module.hot.accept("./components/App", () => {
    renderToDom();
  });
}
