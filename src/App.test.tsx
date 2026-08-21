import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { whatsappUrl } from "./lib/site";
import App from "./App";
import { CatalogProvider } from "./context/CatalogContext";
import { CartProvider } from "./context/CartContext";

test("ana sayfa marka ve kompakt ürün seçkisini gösterir", async () => {
  const { container } = render(<HelmetProvider><MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><CartProvider><App/></CartProvider></CatalogProvider></MemoryRouter></HelmetProvider>);
  expect(screen.getByRole("heading", { name: "Teknoloji seçkisini keşfedin" })).toBeInTheDocument();
  expect(screen.getAllByText("Sepete Ekle")).toHaveLength(4);
  expect(screen.getAllByText("₺6.899,00").length).toBeGreaterThan(0);
  expect(screen.getAllByText("₺9.000,00").length).toBeGreaterThan(0);
  expect(screen.getAllByText("₺499,00").length).toBeGreaterThan(0);
  expect(screen.getAllByText("₺549,00").length).toBeGreaterThan(0);
  expect(screen.getByText("(5 yorum)")).toBeInTheDocument();
  expect(screen.getByText("(3 yorum)")).toBeInTheDocument();
  expect(screen.getByText("(4 yorum)")).toBeInTheDocument();
  expect(screen.getByText("(2 yorum)")).toBeInTheDocument();
  expect(screen.getByText("Elif Kaya")).toBeInTheDocument();
  expect(screen.getAllByText("İLGÜN").length).toBeGreaterThan(0);
  const heroImage = screen.getAllByAltText("YESIDO WB65 Parmak İzi Kilitli Akıllı Sırt Çantası")[0];
  expect(heroImage.closest(".media-loader")).toHaveClass("is-loading");
  fireEvent.load(heroImage);
  expect(heroImage.closest(".media-loader")).toHaveClass("is-loaded");
  expect(container.querySelectorAll(".hero-product-slide")).toHaveLength(5);
  fireEvent.click(screen.getByRole("button", { name: "Sonraki ürün" }));
  expect(container.querySelectorAll(".hero-product-slide")).toHaveLength(5);
  expect(heroImage.closest(".media-loader")).toHaveClass("is-loaded");
});

test("ürün detayında gerçek değerlendirme özeti görünür", () => {
  render(<HelmetProvider><MemoryRouter initialEntries={["/products/blic-bls-92"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><CartProvider><App/></CartProvider></CatalogProvider></MemoryRouter></HelmetProvider>);
  expect(screen.getByRole("heading", { name: /Desk Sound Kablosuz Hoparlör/ })).toBeInTheDocument();
  expect(screen.getAllByText("4.5").length).toBeGreaterThan(0);
  expect(screen.getAllByText("4 değerlendirme").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Gizem Nur").length).toBeGreaterThan(0);
  expect(screen.queryByText(/demo/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/vitrin/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/yapay zeka/i)).not.toBeInTheDocument();
});

test("kategori yolu ilgili ürünleri filtreler", () => {
  const { container } = render(<HelmetProvider><MemoryRouter initialEntries={["/products/category/ses-kulaklik"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><CartProvider><App/></CartProvider></CatalogProvider></MemoryRouter></HelmetProvider>);
  expect(screen.getByRole("heading", { name: "Ses & Kulaklık ürünleri" })).toBeInTheDocument();
  expect(container.querySelectorAll(".product-card")).toHaveLength(5);
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
