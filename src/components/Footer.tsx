import { MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { site, whatsappUrl } from "../lib/site";

export function Footer() {
  return <footer id="contact" className="footer"><div className="container footer-grid">
    <div><div className="logo logo-light"><span>İLGÜN</span><small>TİCARET</small></div><p>Elektronik, aksesuar ve küçük ev aletlerinde özenle seçilmiş ürünler.</p></div>
    <div><h3>Hızlı Bağlantılar</h3><Link to="/products">Tüm Ürünler</Link><Link to="/cart">Sepetim</Link><Link to="/categories">Kategoriler</Link><Link to="/contact">İletişim</Link><Link to="/admin">Yönetim</Link></div>
    <div><h3>İletişim</h3><strong>{site.contact}</strong><a className="footer-contact-link" href={site.phoneHref}><Phone/> {site.phoneDisplay}</a><a className="footer-contact-link" href={site.mapsUrl} target="_blank" rel="noreferrer"><MapPin/> {site.location}</a><a className="button whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp'tan Yaz</a></div>
  </div><div className="container copyright">© {new Date().getFullYear()} İlgün Ticaret. Tüm hakları saklıdır.</div></footer>;
}
