import { MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { whatsappUrl } from "../lib/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  const { pathname } = useLocation();
  const hasBottomAction = pathname.startsWith("/products/") || pathname === "/cart";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <>
      <Header />
      <main key={pathname} className="page-transition page-slide">
        <Outlet />
      </main>
      <Footer />
      {!hasBottomAction && (
        <a
          className="whatsapp-float"
          href={whatsappUrl()}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp üzerinden iletişime geç"
        >
          <MessageCircle />
        </a>
      )}
    </>
  );
}
