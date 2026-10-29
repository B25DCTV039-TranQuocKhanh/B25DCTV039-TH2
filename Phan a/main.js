import { fetchBooks, createBookApi, deleteBookApi } from './api.js';
import { getFavorites, saveFavorites } from './storage.js';

let books = [];
let favorites = getFavorites();

const statusLine = document.getElementById('status-line');
const bookGrid = document.getElementById('book-grid');
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');
const favCountEl = document.getElementById('fav-count');
const bookForm = document.getElementById('book-form');
async function init() {
  updateFavHeader();
  try {
    statusLine.textContent = 'Đang tải...';
    books = await fetchBooks();
    populateGenres();
    renderBooks();
  } catch (err) {
    statusLine.textContent = 'Lỗi khi tải dữ liệu: ' + err.message;
  }
}
function populateGenres() {
  const genres = new Set(books.map(b => b.genre));
  genreFilter.textContent = '';
  
  const allOpt = document.createElement('option');
  allOpt.value = 'ALL';
  allOpt.textContent = 'Tất cả thể loại';
  genreFilter.appendChild(allOpt);

  genres.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    genreFilter.appendChild(opt);
  });
}
function renderBooks() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedGenre = genreFilter.value;

  const filtered = books.filter(b => {
    const matchName = b.title.toLowerCase().includes(keyword);
    const matchGenre = selectedGenre === 'ALL' || b.genre === selectedGenre;
    return matchName && matchGenre;
  });

  statusLine.textContent = `Đang hiển thị ${filtered.length} / ${books.length} cuốn`;
  bookGrid.textContent = '';

  filtered.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';

    const title = document.createElement('h3');
    title.textContent = book.title;

    const info = document.createElement('p');
    info.textContent = `Mã: ${book.id} | Tác giả: ${book.author} | Thể loại: ${book.genre} | Năm: ${book.year}`;

    const isFav = favorites.includes(book.id);
    const favBtn = document.createElement('button');
    favBtn.dataset.action = 'fav';
    favBtn.dataset.id = book.id;
    favBtn.textContent = isFav ? '★ Bỏ yêu thích' : '☆ Yêu thích';

    const delBtn = document.createElement('button');
    delBtn.dataset.action = 'delete';
    delBtn.dataset.id = book.id;
    delBtn.textContent = 'Xóa';

    card.appendChild(title);
    card.appendChild(info);
    card.appendChild(favBtn);
    card.appendChild(delBtn);
    bookGrid.appendChild(card);
  });
}

function updateFavHeader() {
  favCountEl.textContent = String(favorites.length);
}
searchInput.addEventListener('input', renderBooks);
genreFilter.addEventListener('change', renderBooks);
bookGrid.addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const { action, id } = btn.dataset;

  if (action === 'fav') {
    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
    } else {
      favorites.push(id);
    }
    saveFavorites(favorites);
    updateFavHeader();
    renderBooks();
  }

  if (action === 'delete') {
    if (confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
      await deleteBookApi(id);
      books = books.filter(b => b.id !== id);
      favorites = favorites.filter(favId => favId !== id);
      saveFavorites(favorites);
      updateFavHeader();
      populateGenres();
      renderBooks();
    }
  }
});
const inputs = {
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  genre: document.getElementById('genre'),
  year: document.getElementById('year')
};

function validateField(name) {
  const val = inputs[name].value.trim();
  const errEl = document.getElementById(`err-${name}`);
  let msg = '';

  if (name === 'title' && val.length < 3) msg = 'Tên sách phải từ 3 ký tự trở lên.';
  if (name === 'author' && !val) msg = 'Tác giả là bắt buộc.';
  if (name === 'genre' && !val) msg = 'Phải chọn một thể loại.';
  if (name === 'year') {
    const y = Number(val);
    const currentYear = new Date().getFullYear();
    if (!val || y < 1900 || y > currentYear) {
      msg = `Năm xuất bản phải từ 1900 đến ${currentYear}.`;
    }
  }
  errEl.textContent = msg;
  return msg === '';
}

Object.keys(inputs).forEach(name => {
  inputs[name].addEventListener('input', () => validateField(name));
  inputs[name].addEventListener('change', () => validateField(name));
});

bookForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const v1 = validateField('title');
  const v2 = validateField('author');
  const v3 = validateField('genre');
  const v4 = validateField('year');

  if (v1 && v2 && v3 && v4) {
    const newBookData = {
      title: inputs.title.value.trim(),
      author: inputs.author.value.trim(),
      genre: inputs.genre.value,
      year: Number(inputs.year.value)
    };
    const savedBook = await createBookApi(newBookData);
    books.unshift(savedBook); // Hiển thị ở đầu danh sách
    populateGenres();
    renderBooks();
    bookForm.reset();
  }
});
document.getElementById('theme-btn').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

init();