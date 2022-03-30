const books = [];

document.querySelector("form").onsubmit = function (event) {
  // Prevents default behavior of form (Page transition)
  event.preventDefault();
  // Extract data from form
  const data = new FormData(event.target);
  // Create book object
  const book = {
    title: data.get("title"),
    author: data.get("author"),
    published: parseInt(data.get("published")),
    price: parseInt(data.get("price")),
  };

  // check if title is empty
  if (book.title == "") {
    showError("What is the book called?");
    return;
  }

  // check if author is empty
  if (book.author == "") {
    showError("Who wrote this damn book?");
    return;
  }

  // check if year of publish is empty
  if (isNaN(book.published)) {
    showError("Please fill inn year of publish");
    return;
  }

  // check if book if published after 1990
  if (book.published < 1990) {
    showError("That book is too old!!");
    return;
  }

  // check if book is published before 2022
  if (book.published > 2022) {
    showError("The book cannot be published in the future!");
    return;
  }

  // check if price is empty
  if (isNaN(book.price)) {
    showError("Price cannot be empty!");
    return;
  }

  // check if price is not 0 or below
  if (book.price <= 0) {
    showError("No book is free of charge");
    return;
  }

  // add book to book list
  books.push(book);
  // update book list
  updateBookList();
};

function showError(error) {
  const errorElement = document.querySelector("#error");
  errorElement.textContent = error;
  errorElement.removeAttribute("hidden");
}

function updateBookList() {
  const bookList = document.querySelector("table tbody");
  bookList.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const row = document.createElement("tr");

    const titleColumn = document.createElement("td");
    titleColumn.textContent = book.title;

    const authorColumn = document.createElement("td");
    authorColumn.textContent = book.author;

    const publishedColumn = document.createElement("td");
    publishedColumn.textContent = book.published;

    const priceColumn = document.createElement("td");
    priceColumn.textContent = book.price;

    const removeColumn = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "🗑";
    removeButton.addEventListener("click", function () {
      books.splice(i, 1);
      updateBookList();
    });
    removeColumn.appendChild(removeButton);

    row.appendChild(titleColumn);
    row.appendChild(authorColumn);
    row.appendChild(publishedColumn);
    row.appendChild(priceColumn);
    row.appendChild(removeColumn);

    bookList.appendChild(row);
  }
}
