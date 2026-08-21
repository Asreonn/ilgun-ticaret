import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { whatsappUrl } from "./lib/site";
import App from "./App";
import { CatalogProvider } from "./context/CatalogContext";
import { CartProvider } from "./context/CartContext";

test("ana sayfa marka ve kompakt ürün seçkisini gösterir", async () => {
  render(<HelmetProvider><MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><CartProvider><App/></CartProvider></CatalogProvider></MemoryRouter></HelmetProvider>);
  expect(screen.getByText("Günlük Hayatı", { exact: false })).toBeInTheDocument();
  expect(screen.getAllByText("Sepete Ekle")).toHaveLength(4);
  expect(screen.getByText("₺6.899,00")).toBeInTheDocument();
  expect(screen.getByText("₺9.000,00")).toBeInTheDocument();
  expect(screen.getByText("₺499,00")).toBeInTheDocument();
  expect(screen.getByText("₺549,00")).toBeInTheDocument();
  expect(screen.getAllByText("İLGÜN").length).toBeGreaterThan(0);
});

test("kategori yolu ilgili ürünleri filtreler", () => {
  const { container } = render(<HelmetProvider><MemoryRouter initialEntries={["/products/category/ses-kulaklik"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><CartProvider><App/></CartProvider></CatalogProvider></MemoryRouter></HelmetProvider>);
  expect(screen.getByRole("heading", { name: "Ses & Kulaklık ürünleri" })).toBeInTheDocument();
  expect(container.querySelectorAll(".product-card")).toHaveLength(4);
});

test("iletişim sayfası telefon, konum ve WhatsApp formunu sunar", () => {
  render(<HelmetProvider><MemoryRouter initialEntries={["/contact"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><CartProvider><App/></CartProvider></CatalogProvider></MemoryRouter></HelmetProvider>);
  expect(screen.getByRole("heading", { name: "Size nasıl yardımcı olabiliriz?" })).toBeInTheDocument();
  expect(screen.getAllByText("Isparta Merkez / Isparta").length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /0543 434 20 32/ })[0]).toHaveAttribute("href", "tel:+905434342032");
  expect(screen.getByRole("button", { name: /WhatsApp'ta Gönder/i })).toBeInTheDocument();
});

test("sepet ürün adedini saklar ve WhatsApp mesajı isimsiz başlar", () => {
  localStorage.clear();
  render(<HelmetProvider><MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><CartProvider><App/></CartProvider></CatalogProvider></MemoryRouter></HelmetProvider>);
  fireEvent.click(screen.getAllByLabelText(/sepete ekle/i)[0]);
  expect(screen.getByLabelText("Sepet, 1 ürün")).toBeInTheDocument();
  expect(decodeURIComponent(whatsappUrl())).toContain("Merhabalar");
  expect(decodeURIComponent(whatsappUrl())).not.toContain("İshak Bey");
});
