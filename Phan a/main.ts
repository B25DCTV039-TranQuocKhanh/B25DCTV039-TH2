export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
}

const books: Book[] = [];
const favorites: string[] = JSON.parse(localStorage.getItem('FAV_BOOKS') || '[]');

export function filterBooks(list: Book[], keyword: string, genre: string): Book[] {
  return list.filter((b: Book) => {
    const matchName = b.title.toLowerCase().includes(keyword.toLowerCase());
    const matchGenre = genre === 'ALL' || b.genre === genre;
    return matchName && matchGenre;
  });
}