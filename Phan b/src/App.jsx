import { useState } from 'react';
import { initialBooks } from './booksData';
function Header({ favCount }) {
  return (
    <header style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px' }}>
      <h1>Thư Viện Lớp Học (React)</h1>
      <p>Số sách yêu thích: <strong>{favCount}</strong></p>
    </header>
  );
}
function Section({ title, children }) {
  return (
    <section style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px' }}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
      {genres.map((g) => (
        <button
          key={g}
          onClick={() => onSelectGenre(g)}
          style={{ fontWeight: selectedGenre === g ? 'bold' : 'normal' }}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
function BookCard({ book, isFav, onToggleFav }) {
  return (
    <div style={{ border: '1px solid #000', padding: '10px', width: '30%' }}>
      <h3>{book.title}</h3>
      <p>Mã: {book.id} | Tác giả: {book.author}</p>
      <p>Thể loại: {book.genre} | Năm: {book.year}</p>
      <button onClick={() => onToggleFav(book.id)}>
        {isFav ? '★ Bỏ yêu thích' : '☆ Yêu thích'}
      </button>
    </div>
  );
}
function BookList({ books, favorites, onToggleFav }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFav={favorites.includes(book.id)}
          onToggleFav={onToggleFav}
        />
      ))}
    </div>
  );
}
function Footer() {
  return (
    <footer style={{ border: '1px solid #000', padding: '10px' }}>
      <p>Bài tập thực hành 2 - Phần B (React Cơ Bản)</p>
    </footer>
  );
}
export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');

  const genres = ['Tất cả', ...new Set(initialBooks.map((b) => b.genre))];

  const handleToggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredBooks =
    selectedGenre === 'Tất cả'
      ? initialBooks
      : initialBooks.filter((b) => b.genre === selectedGenre);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '15px' }}>
      <Header favCount={favorites.length} />

      <Section title="Bộ lọc thể loại">
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />
      </Section>

      <Section title={`Danh sách sách (${filteredBooks.length} cuốn)`}>
        <BookList
          books={filteredBooks}
          favorites={favorites}
          onToggleFav={handleToggleFav}
        />
      </Section>

      <Footer />
    </div>
  );
}