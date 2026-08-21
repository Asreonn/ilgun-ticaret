import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const Admin = lazy(() => import("./pages/Admin"));

export default function App() {
  return <Suspense fallback={<div className="page-shell container">Yükleniyor…</div>}><Routes>
    <Route element={<Layout />}><Route path="/" element={<Home/>}/><Route path="/products" element={<Products/>}/><Route path="/products/:slug" element={<ProductDetail/>}/><Route path="/urunler" element={<Navigate to="/products" replace/>}/><Route path="*" element={<NotFound/>}/></Route>
    <Route path="/admin" element={<Admin/>}/>
  </Routes></Suspense>;
}
