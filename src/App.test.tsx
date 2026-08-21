import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { whatsappUrl } from "./lib/site";
import App from "./App";
import { CatalogProvider } from "./context/CatalogContext";
import { CartProvider } from "./context/CartContext";

test("ana sayfa marka ve yedi ürünü gösterir", async () => {
  render(<HelmetProvider><MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><CartProvider><App/></CartProvider></CatalogProvider></MemoryRouter></HelmetProvider>);
  expect(screen.getByText("Günlük Hayatı", { exact: false })).toBeInTheDocument();
  expect(screen.getAllByText("Sepete Ekle")).toHaveLength(7);
  expect(screen.getByText("₺6.899,00")).toBeInTheDocument();
  expect(screen.getByText("₺9.000,00")).toBeInTheDocument();
  expect(screen.getAllByText("İLGÜN").length).toBeGreaterThan(0);
});

test("sepet ürün adedini saklar ve WhatsApp mesajı isimsiz başlar", () => {
  localStorage.clear();
  render(<HelmetProvider><MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><CartProvider><App/></CartProvider></CatalogProvider></MemoryRouter></HelmetProvider>);
  fireEvent.click(screen.getAllByLabelText(/sepete ekle/i)[0]);
  expect(screen.getByLabelText("Sepet, 1 ürün")).toBeInTheDocument();
  expect(decodeURIComponent(whatsappUrl())).toContain("Merhabalar");
  expect(decodeURIComponent(whatsappUrl())).not.toContain("İshak Bey");
});
