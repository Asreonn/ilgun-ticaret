import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import App from "./App";
import { CatalogProvider } from "./context/CatalogContext";

test("ana sayfa marka ve yedi ürünü gösterir", async () => {
  render(<HelmetProvider><MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><CatalogProvider><App/></CatalogProvider></MemoryRouter></HelmetProvider>);
  expect(screen.getByText("Günlük Hayatı", { exact: false })).toBeInTheDocument();
  expect(screen.getAllByText("Ürünü İncele")).toHaveLength(7);
  expect(screen.getAllByText("İLGÜN").length).toBeGreaterThan(0);
});
