import { MapPin, MessageCircle, Navigation, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageMeta } from "../components/PageMeta";
import { Reveal } from "../components/Reveal";
import { contactWhatsappUrl, site, whatsappUrl } from "../lib/site";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    window.open(contactWhatsappUrl(name, message), "_blank", "noopener,noreferrer");
  };
  return <main className="page-shell contact-page">
    <PageMeta title="İletişim" description="İlgün Ticaret iletişim bilgileri. Telefon ve WhatsApp üzerinden ürün, fiyat ve stok bilgisi alın." canonical="/contact"/>
    <Reveal className="container contact-hero" direction="left"><div><span className="eyebrow">İLETİŞİM</span><h1>Size nasıl yardımcı olabiliriz?</h1><p>Ürün, güncel fiyat, stok ve sipariş bilgisi için doğrudan iletişime geçin.</p></div><div className="contact-person"><span>İletişim</span><strong>{site.contact}</strong><small>{site.serviceArea}</small></div></Reveal>
    <Reveal className="container contact-layout" direction="up"><section className="contact-options">
      <a href={site.phoneHref}><span><Phone/></span><div><small>Telefon</small><strong>{site.phoneDisplay}</strong><p>Aramak için dokunun</p></div></a>
      <a href={whatsappUrl()} target="_blank" rel="noreferrer"><span className="wa"><MessageCircle/></span><div><small>WhatsApp</small><strong>Mesaj gönderin</strong><p>Ürün ve sipariş bilgisi alın</p></div></a>
      <a href={site.mapsUrl} target="_blank" rel="noreferrer"><span><MapPin/></span><div><small>Konum</small><strong>{site.location}</strong><p>Haritada görüntüleyin</p></div><Navigation/></a>
    </section><form className="contact-form" onSubmit={submit}><span className="eyebrow">HIZLI MESAJ</span><h2>WhatsApp mesajınızı hazırlayın</h2><p>Form gönderildiğinde mesajınız WhatsApp'ta hazır olarak açılır.</p><label>Adınız<input value={name} onChange={(event) => setName(event.target.value)} maxLength={60} placeholder="Adınız"/></label><label>Mesajınız<textarea value={message} onChange={(event) => setMessage(event.target.value)} minLength={5} maxLength={600} rows={6} placeholder="İlgilendiğiniz ürün veya sorunuz" required/></label><button className="button whatsapp"><Send/> WhatsApp'ta Gönder</button></form></Reveal>
  </main>;
}
