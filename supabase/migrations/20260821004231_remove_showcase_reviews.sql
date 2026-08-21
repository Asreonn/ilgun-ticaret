delete from public.product_reviews where is_demo = true;

drop policy "public submits reviews for moderation" on public.product_reviews;

alter table public.product_reviews drop column is_demo;

create policy "public submits reviews for moderation"
on public.product_reviews for insert to anon
with check (
  approved = false
  and approved_at is null
  and exists (select 1 from public.products p where p.id = product_id and p.active = true)
);
