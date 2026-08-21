export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  sort_order: number;
  active: boolean;
};

export type ProductImage = { id?: string; image_path: string; alt_text: string; sort_order: number };
export type ProductFeature = { id?: string; label: string; value: string; sort_order: number };
export type ProductReview = { id: string; product_id: string; reviewer_name: string; rating: number; comment: string; approved: boolean; created_at: string; product?: { name: string; model: string } };

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  model: string;
  category_id: string;
  short_description: string;
  description: string;
  price: number | null;
  old_price: number | null;
  currency: string;
  stock_quantity: number;
  stock_status: "in_stock" | "low_stock" | "out_of_stock" | "contact";
  featured: boolean;
  active: boolean;
  main_image: string;
  source_url: string | null;
  price_source_url?: string | null;
  price_checked_at?: string | null;
  price_note?: string | null;
  sort_order: number;
  category?: Category;
  product_images: ProductImage[];
  product_features: ProductFeature[];
};
