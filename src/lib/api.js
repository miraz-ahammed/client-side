// Backend er address (.env e NEXT_PUBLIC_API_URL dile seta, na dile localhost:5000)
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Sob product ana (search, category, sort dite parben)
export async function getProducts(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value)
  ).toString();

  const res = await fetch(`${API_URL}/products${query ? `?${query}` : ''}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

// Ekta product ana (id diye)
export async function getProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}