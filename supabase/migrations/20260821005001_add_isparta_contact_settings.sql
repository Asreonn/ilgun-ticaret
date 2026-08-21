insert into public.site_settings (key, value) values
  ('location', 'Isparta Merkez / Isparta'),
  ('service_area', 'Isparta ve çevresi'),
  ('maps_url', 'https://www.google.com/maps/search/?api=1&query=Isparta+Merkez+Isparta')
on conflict (key) do update set value = excluded.value, updated_at = now();
