
const API_URL = './books.json';
const IS_MOCK_API = API_URL.startsWith('http');

export async function fetchBooks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Không thể tải dữ liệu sách!');
  return await res.json();
}

export async function createBookApi(newBook) {
  if (!IS_MOCK_API) return { ...newBook, id: Date.now().toString() };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook)
  });
  return await res.json();
}

export async function deleteBookApi(id) {
  if (!IS_MOCK_API) return true;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return true;
}