import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { site, whatsappUrl } from "../lib/site";
import { useCart } from "../context/CartContext";

const nav = [
  ["Ana Sayfa", "/"], ["Ürünler", "/products"], ["Kategoriler", "/categories"], ["İletişim", "/contact"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  return <>
    <div className="topbar"><div className="container topbar-inner"><span>Elektronik • Aksesuar • Küçük Ev Aletleri</span><span>{site.contact} · {site.phoneDisplay}</span></div></div>
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo" aria-label="İlgün Ticaret ana sayfa"><span>İLGÜN</span><small>TİCARET</small></Link>
        <nav className="desktop-nav" aria-label="Ana menü">
          {nav.map(([label, to]) => <NavLink end={to === "/"} key={to} to={to}>{label}</NavLink>)}
        </nav>
        <Link className="cart-button" to="/cart" aria-label={`Sepet, ${totalItems} ürün`}><ShoppingBag size={20}/>{totalItems > 0 && <span>{totalItems}</span>}</Link>
        <a className="button whatsapp header-cta" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
        <button className="menu-button" onClick={() => setOpen((x) => !x)} aria-label={open ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="mobile-nav container" aria-label="Mobil menü">
        {nav.map(([label, to]) => <NavLink end={to === "/"} key={to} onClick={() => setOpen(false)} to={to}>{label}</NavLink>)}
        <NavLink className="mobile-cart-link" onClick={() => setOpen(false)} to="/cart"><ShoppingBag size={19}/> Sepetim {totalItems > 0 && <strong>{totalItems}</strong>}</NavLink>
        <a className="button whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
      </nav>}
    </header>
  </>;
}
