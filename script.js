let library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  library.push(newBook);
}

const addBookBtn = document.getElementById("addBookBtn");
const addBookModal = document.getElementById("addBookModal");
const errorMsg = document.getElementById("errorMsg");
const overlay = document.getElementById("overlay");
const addBookForm = document.getElementById("addBookForm");
const booksGrid = document.getElementById("booksGrid");

const openAddBookModal = () => {
  addBookForm.reset();
  addBookModal.classList.add("active");
  overlay.classList.add("active");
};

const closeAddBookModal = () => {
  addBookModal.classList.remove("active");
  overlay.classList.remove("active");
  errorMsg.classList.remove("active");
  errorMsg.textContent = "";
};

const updateBooksGrid = () => {
  resetBooksGrid();
  for (let book of library) {
    createBookCard(book);
  }
};

const resetBooksGrid = () => {
  booksGrid.innerHTML = "";
};

const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const buttonGroup = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  buttonGroup.classList.add("button-group");
  readBtn.classList.add("btn");
  removeBtn.classList.add("btn", "btn-remove-red");
  title.classList.add("book-card-title");
  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;
  author.classList.add("author");
  pages.classList.add("pages");

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  if (book.isRead) {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-light-green");
  } else {
    readBtn.textContent = "Unread";
    readBtn.classList.add("btn-light-red");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookCard.appendChild(buttonGroup);
  booksGrid.appendChild(bookCard);
};

const getBookFromInput = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;
  return new Book(title, author, pages, isRead);
};

const handleKeyboardInput = (e) => {
  if (e.key === "Escape") closeAddBookModal();
};

const addBook = (e) => {
  e.preventDefault();
  const newBook = getBookFromInput();
  if (library.some((book) => book.title === newBook.title)) {
    errorMsg.textContent = "This book is already added to your library";
    errorMsg.classList.add("active");
    return;
  }
  library.push(newBook);
  updateBooksGrid();
  closeAddBookModal();
};

const toggleRead = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerText;
  const book = library.find((book) => book.title === title);
  book.isRead = !book.isRead;
  updateBooksGrid();
};

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.parentNode.firstChild.innerText;
  console.log(title);
  library = library.filter((book) => book.title !== title);
  updateBooksGrid();
};

addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;
window.onkeydown = handleKeyboardInput;
addBookForm.onsubmit = addBook;

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 368, true);
addBookToLibrary("The Silmarillion", "J.R.R. Tolkien", 480, false);
updateBooksGrid();
