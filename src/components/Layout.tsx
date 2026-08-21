import { MessageCircle } from "lucide-react";
import { Outlet } from "react-router-dom";
import { whatsappUrl } from "../lib/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  return <><Header /><main><Outlet /></main><Footer /><a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp üzerinden iletişime geç"><MessageCircle /></a></>;
}
