insert into public.product_images (product_id, image_path, alt_text, sort_order)
select
  products.id,
  photos.image_path,
  photos.alt_text,
  coalesce((select max(existing.sort_order) from public.product_images existing where existing.product_id = products.id), -1) + photos.position
from (
  values
    ('yesido-wb65', 'images/reviews/wb65-elif.webp', 'YESIDO WB65 müşteri fotoğrafı', 1),
    ('linkage-lkb-39', 'images/reviews/lkb39-ahmet.webp', 'Linkage LKB-39 müşteri fotoğrafı', 1),
    ('linkage-lkb-39', 'images/reviews/lkb39-yusuf.webp', 'Linkage LKB-39 kutu fotoğrafı', 2),
    ('blic-bls-92', 'images/reviews/bls92-gizem.webp', 'BLIC BLS-92 müşteri fotoğrafı', 1),
    ('blic-bls-92', 'images/reviews/bls92-hakan.webp', 'BLIC BLS-92 kutu fotoğrafı', 2),
    ('blic-bls-96', 'images/reviews/bls96-nazli.webp', 'BLIC BLS-96 müşteri fotoğrafı', 1),
    ('blic-bls-96', 'images/reviews/bls96-okan.webp', 'BLIC BLS-96 kutu fotoğrafı', 2),
    ('blic-bls-74', 'images/reviews/bls74-irem.webp', 'BLIC BLS-74 müşteri fotoğrafı', 1),
    ('blic-bls-74', 'images/reviews/bls74-pinar.webp', 'BLIC BLS-74 kutu fotoğrafı', 2),
    ('yesido-ec27', 'images/reviews/ec27-fatma.webp', 'YESIDO EC27 müşteri fotoğrafı', 1),
    ('yesido-ec27', 'images/reviews/ec27-zeynep.webp', 'YESIDO EC27 mutfak fotoğrafı', 2),
    ('cy-818', 'images/reviews/cy818-leyla.webp', 'CY-818 müşteri fotoğrafı', 1),
    ('cy-818', 'images/reviews/cy818-melis.webp', 'CY-818 ev fotoğrafı', 2)
) as photos(slug, image_path, alt_text, position)
join public.products on products.slug = photos.slug
where not exists (
  select 1 from public.product_images existing
  where existing.product_id = products.id
    and existing.image_path = photos.image_path
);
