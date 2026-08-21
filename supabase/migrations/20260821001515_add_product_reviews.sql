create table public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  reviewer_name text not null check (char_length(trim(reviewer_name)) between 2 and 60),
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(trim(comment)) between 10 and 800),
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create index product_reviews_public_idx on public.product_reviews(product_id, created_at desc) where approved = true;
alter table public.product_reviews enable row level security;

grant select, insert on public.product_reviews to anon;
grant select, insert, update, delete on public.product_reviews to authenticated;

create policy "public reads approved reviews"
on public.product_reviews for select to anon
using (approved = true and exists (select 1 from public.products p where p.id = product_id and p.active = true));

create policy "public submits reviews for moderation"
on public.product_reviews for insert to anon
with check (
  approved = false
  and approved_at is null
  and exists (select 1 from public.products p where p.id = product_id and p.active = true)
);

create policy "admins read all reviews"
on public.product_reviews for select to authenticated
using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));

create policy "admins insert reviews"
on public.product_reviews for insert to authenticated
with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));

create policy "admins update reviews"
on public.product_reviews for update to authenticated
using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())))
with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));

create policy "admins delete reviews"
on public.product_reviews for delete to authenticated
using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
