import { ImagePlus, LogOut, PackagePlus, Pencil, Save, ShieldAlert, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { PageMeta } from "../components/PageMeta";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { formatPrice, imageUrl } from "../lib/site";
import type { Category, Product } from "../types";

type ProductForm = {
  id?: string; slug: string; name: string; brand: string; model: string; category_id: string; short_description: string; description: string;
  price: string; old_price: string; stock_quantity: string; stock_status: Product["stock_status"]; featured: boolean; active: boolean; main_image: string; source_url: string; sort_order: string; features: string; images: string;
};
const emptyForm: ProductForm = { slug: "", name: "", brand: "", model: "", category_id: "", short_description: "", description: "", price: "", old_price: "", stock_quantity: "0", stock_status: "contact", featured: false, active: true, main_image: "", source_url: "", sort_order: "0", features: "", images: "" };

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductForm | null>(null);
  const [saving, setSaving] = useState(false);

  const checkAdmin = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession); setChecking(true);
    if (!nextSession || !supabase) { setIsAdmin(false); setChecking(false); return; }
    const { data } = await supabase.from("admin_users").select("id").eq("id", nextSession.user.id).maybeSingle();
    setIsAdmin(Boolean(data)); setChecking(false);
  }, []);

  const loadAdminData = useCallback(async () => {
    if (!supabase) return;
    const [p, c] = await Promise.all([
      supabase.from("products").select("*, category:categories(*), product_images(*), product_features(*)").order("sort_order"),
      supabase.from("categories").select("*").order("sort_order")
    ]);
    if (p.error || c.error) setMessage(p.error?.message || c.error?.message || "Veri alınamadı.");
    else { setProducts((p.data || []) as Product[]); setCategories((c.data || []) as Category[]); }
  }, []);

  useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    void supabase.auth.getSession().then(({ data }) => checkAdmin(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => { void checkAdmin(nextSession); });
    return () => data.subscription.unsubscribe();
  }, [checkAdmin]);
  useEffect(() => { if (isAdmin) void loadAdminData(); }, [isAdmin, loadAdminData]);

  const login = async (event: FormEvent) => {
    event.preventDefault(); setMessage("");
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage("Giriş başarısız. E-posta ve parolayı kontrol edin.");
  };
  const edit = (p: Product) => setForm({
    id: p.id, slug: p.slug, name: p.name, brand: p.brand || "", model: p.model, category_id: p.category_id, short_description: p.short_description, description: p.description,
    price: p.price?.toString() || "", old_price: p.old_price?.toString() || "", stock_quantity: p.stock_quantity.toString(), stock_status: p.stock_status, featured: p.featured, active: p.active,
    main_image: p.main_image, source_url: p.source_url || "", sort_order: p.sort_order.toString(), features: [...(p.product_features || [])].sort((a,b) => a.sort_order-b.sort_order).map((f) => `${f.label}|${f.value}`).join("\n"),
    images: [...(p.product_images || [])].sort((a,b) => a.sort_order-b.sort_order).map((i) => `${i.image_path}|${i.alt_text}`).join("\n")
  });
  const setField = <K extends keyof ProductForm>(key: K, value: ProductForm[K]) => setForm((prev) => prev ? { ...prev, [key]: value } : prev);

  const upload = async (file: File) => {
    if (!supabase || !form) return;
    setSaving(true); setMessage("");
    const safeName = file.name.toLocaleLowerCase("tr-TR").replace(/[^a-z0-9.]+/g, "-");
    const path = `${form.slug || "new-product"}/${Date.now()}-${safeName}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: false });
    if (error) setMessage(`Görsel yüklenemedi: ${error.message}`);
    else {
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      const nextImages = [form.images, `${data.publicUrl}|${form.name || "Ürün görseli"}`].filter(Boolean).join("\n");
      setForm({ ...form, images: nextImages, main_image: form.main_image || data.publicUrl });
      setMessage("Görsel yüklendi.");
    }
    setSaving(false);
  };

  const save = async (event: FormEvent) => {
    event.preventDefault(); if (!supabase || !form) return;
    setSaving(true); setMessage("");
    const payload = {
      slug: form.slug.trim(), name: form.name.trim(), brand: form.brand.trim() || null, model: form.model.trim(), category_id: form.category_id,
      short_description: form.short_description.trim(), description: form.description.trim(), price: form.price ? Number(form.price) : null, old_price: form.old_price ? Number(form.old_price) : null,
      currency: "TRY", stock_quantity: Number(form.stock_quantity) || 0, stock_status: form.stock_status, featured: form.featured, active: form.active,
      main_image: form.main_image.trim(), source_url: form.source_url.trim() || null, sort_order: Number(form.sort_order) || 0
    };
    const result = form.id ? await supabase.from("products").update(payload).eq("id", form.id).select("id").single() : await supabase.from("products").insert(payload).select("id").single();
    if (result.error) { setMessage(`Kaydedilemedi: ${result.error.message}`); setSaving(false); return; }
    const productId = result.data.id;
    if (form.id) await Promise.all([supabase.from("product_features").delete().eq("product_id", productId), supabase.from("product_images").delete().eq("product_id", productId)]);
    const features = form.features.split("\n").map((line) => line.trim()).filter(Boolean).map((line, i) => { const [label, ...rest] = line.split("|"); return { product_id: productId, label: label.trim(), value: rest.join("|").trim(), sort_order: i }; });
    const images = form.images.split("\n").map((line) => line.trim()).filter(Boolean).map((line, i) => { const [image_path, ...rest] = line.split("|"); return { product_id: productId, image_path: image_path.trim(), alt_text: rest.join("|").trim() || form.name, sort_order: i }; });
    const children = await Promise.all([features.length ? supabase.from("product_features").insert(features) : Promise.resolve({ error: null }), images.length ? supabase.from("product_images").insert(images) : Promise.resolve({ error: null })]);
    const childError = children.find((x: any) => x.error)?.error;
    if (childError) setMessage(`Ürün kaydedildi fakat detaylarda hata oluştu: ${childError.message}`); else { setMessage("Ürün başarıyla kaydedildi."); setForm(null); await loadAdminData(); }
    setSaving(false);
  };
  const deactivate = async (p: Product) => { if (!supabase) return; await supabase.from("products").update({ active: !p.active }).eq("id", p.id); await loadAdminData(); };
  const remove = async (p: Product) => { if (!supabase || !confirm(`${p.name} kalıcı olarak silinsin mi?`)) return; const { error } = await supabase.from("products").delete().eq("id", p.id); setMessage(error ? error.message : "Ürün silindi."); await loadAdminData(); };

  if (!isSupabaseConfigured) return <div className="admin-shell"><PageMeta title="Yönetim" description="İlgün Ticaret yönetim paneli" canonical="/admin"/><div className="admin-login"><ShieldAlert/><h1>Yönetim yapılandırması gerekli</h1><p>Supabase ortam değişkenlerini ekleyin. Kurulum adımları README dosyasında yer alıyor.</p></div></div>;
  if (checking) return <div className="admin-shell"><div className="admin-login">Oturum kontrol ediliyor…</div></div>;
  if (!session) return <div className="admin-shell"><PageMeta title="Yönetim Girişi" description="İlgün Ticaret yetkili yönetim girişi" canonical="/admin"/><form className="admin-login" onSubmit={login}><div className="admin-mark">İT</div><h1>Yönetim Girişi</h1><p>Yalnızca yetkili hesaplar ürün kataloğunu değiştirebilir.</p><label>E-posta<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label><label>Parola<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>{message && <div className="form-message">{message}</div>}<button className="button primary" type="submit">Giriş Yap</button></form></div>;
  if (!isAdmin) return <div className="admin-shell"><div className="admin-login"><ShieldAlert/><h1>Yetkisiz hesap</h1><p>Bu kullanıcı yönetici listesinde bulunmuyor.</p><button className="button secondary" onClick={() => supabase?.auth.signOut()}>Çıkış Yap</button></div></div>;

  return <div className="admin-shell"><PageMeta title="Ürün Yönetimi" description="İlgün Ticaret ürün yönetimi" canonical="/admin"/><header className="admin-header"><div><span>İLGÜN TİCARET</span><strong>Ürün Yönetimi</strong></div><button onClick={() => supabase?.auth.signOut()}><LogOut size={18}/> Çıkış</button></header><main className="admin-main"><div className="admin-title"><div><h1>Ürünler</h1><p>Fiyat, stok, açıklama, özellik ve görselleri yönetin.</p></div><button className="button primary" onClick={() => setForm({ ...emptyForm, category_id: categories[0]?.id || "", sort_order: String(products.length + 1) })}><PackagePlus size={18}/> Yeni Ürün</button></div>{message && <div className="form-message">{message}</div>}
    <div className="admin-products">{products.map((p) => <article key={p.id}><img src={imageUrl(p.main_image)} alt=""/><div><span>{p.brand || "—"} · {p.model}</span><strong>{p.name}</strong><small>{formatPrice(p.price, p.currency)} · {p.stock_status} · Sıra {p.sort_order}</small></div><div className="admin-actions"><button onClick={() => edit(p)} title="Düzenle"><Pencil/></button><button onClick={() => deactivate(p)} title={p.active ? "Deaktif et" : "Aktif et"} className={p.active ? "active-state" : "inactive-state"}>{p.active ? "Aktif" : "Pasif"}</button><button onClick={() => remove(p)} title="Sil" className="danger"><Trash2/></button></div></article>)}</div>
    {form && <div className="modal-backdrop"><form className="product-form" onSubmit={save}><div className="form-title"><h2>{form.id ? "Ürünü Düzenle" : "Yeni Ürün"}</h2><button type="button" onClick={() => setForm(null)} aria-label="Kapat"><X/></button></div><div className="form-grid">
      <label className="span-2">Ürün adı<input value={form.name} onChange={(e) => setField("name", e.target.value)} required/></label><label>Slug<input value={form.slug} onChange={(e) => setField("slug", e.target.value)} required pattern="[a-z0-9-]+"/></label><label>Kategori<select value={form.category_id} onChange={(e) => setField("category_id", e.target.value)} required>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Marka<input value={form.brand} onChange={(e) => setField("brand", e.target.value)}/></label><label>Model<input value={form.model} onChange={(e) => setField("model", e.target.value)} required/></label><label>Fiyat (boş bırakılabilir)<input type="number" min="0" step="0.01" value={form.price} onChange={(e) => setField("price", e.target.value)}/></label><label>Eski fiyat<input type="number" min="0" step="0.01" value={form.old_price} onChange={(e) => setField("old_price", e.target.value)}/></label><label>Stok adedi<input type="number" min="0" value={form.stock_quantity} onChange={(e) => setField("stock_quantity", e.target.value)}/></label><label>Stok durumu<select value={form.stock_status} onChange={(e) => setField("stock_status", e.target.value as Product["stock_status"])}><option value="contact">İletişime geçin</option><option value="in_stock">Stokta</option><option value="low_stock">Sınırlı stok</option><option value="out_of_stock">Stokta yok</option></select></label><label>Sıralama<input type="number" value={form.sort_order} onChange={(e) => setField("sort_order", e.target.value)}/></label><div className="check-row"><label><input type="checkbox" checked={form.featured} onChange={(e) => setField("featured", e.target.checked)}/> Öne çıkan</label><label><input type="checkbox" checked={form.active} onChange={(e) => setField("active", e.target.checked)}/> Aktif</label></div><label className="span-2">Kısa açıklama<textarea value={form.short_description} onChange={(e) => setField("short_description", e.target.value)} required rows={2}/></label><label className="span-2">Açıklama<textarea value={form.description} onChange={(e) => setField("description", e.target.value)} required rows={5}/></label><label className="span-2">Özellikler <small>Her satır: Etiket|Değer</small><textarea value={form.features} onChange={(e) => setField("features", e.target.value)} rows={7}/></label><label className="span-2">Görseller <small>Her satır: Yol veya URL|Alt metin</small><textarea value={form.images} onChange={(e) => setField("images", e.target.value)} rows={5}/></label><label className="span-2">Ana görsel yolu<input value={form.main_image} onChange={(e) => setField("main_image", e.target.value)} required/></label><label className="span-2">Kaynak URL<input type="url" value={form.source_url} onChange={(e) => setField("source_url", e.target.value)}/></label><label className="upload-field span-2"><ImagePlus/><span>Yeni görsel yükle</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => e.target.files?.[0] && void upload(e.target.files[0])}/></label></div><div className="form-footer"><button type="button" className="button secondary" onClick={() => setForm(null)}>Vazgeç</button><button className="button primary" disabled={saving}><Save size={18}/>{saving ? "Kaydediliyor…" : "Kaydet"}</button></div></form></div>}
  </main></div>;
}
