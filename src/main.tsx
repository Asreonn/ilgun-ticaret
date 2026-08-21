import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CatalogProvider } from "./context/CatalogContext";
import "./styles.css";

const savedRoute = sessionStorage.getItem("spa-route");
if (savedRoute) { sessionStorage.removeItem("spa-route"); history.replaceState(null, "", `${import.meta.env.BASE_URL.replace(/\/$/, "")}${savedRoute}`); }

ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><HelmetProvider><BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><App/></CatalogProvider></BrowserRouter></HelmetProvider></React.StrictMode>);
