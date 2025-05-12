import "antd/dist/reset.css"; // Import CSS của AntD
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify"; // Thêm ToastContainer
import "react-toastify/dist/ReactToastify.css"; // CSS của react-toastify
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);
