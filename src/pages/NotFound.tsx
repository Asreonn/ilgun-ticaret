import { Link } from "react-router-dom";
export default function NotFound() { return <div className="page-shell container empty-state"><span className="eyebrow">404</span><h1>Bu sayfa bulunamadı</h1><p>Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p><Link className="button primary" to="/">Ana sayfaya dön</Link></div>; }
