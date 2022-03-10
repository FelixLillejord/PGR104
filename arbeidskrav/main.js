var books = [];

document.querySelector("form").onsubmit = function (event) {
  // Prevents default behavior of form (Page transition)
  event.preventDefault();
  // Extract data from form
  var data = new FormData(event.target);
  // Create book object
  var book = {
    title: data.get("title"),
    author: data.get("author"),
    published: parseInt(data.get("published")),
    price: parseInt(data.get("price")),
  };

  if (book.title == "") {
    showError("What is the book called?");
    return;
  }

  if (book.author == "") {
    showError("Who wrote this damn book?");
    return;
  }

  if (isNaN(book.published)) {
    showError("Please fill inn year of publish");
    return;
  }

  if (book.published < 1990) {
    showError("That book is too old!!");
    return;
  }
  if (book.published > 2022) {
    showError("The book cannot be published in the future!");
    return;
  }

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
  var errorElement = document.querySelector("#error");
  errorElement.textContent = error;
  errorElement.removeAttribute("hidden");
}

function updateBookList() {
  var bookList = document.querySelector("table tbody");
  bookList.innerHTML = "";
  for (var book of books) {
    var row = document.createElement("tr");

    var titleColumn = document.createElement("td");
    titleColumn.textContent = book.title;

    var authorColumn = document.createElement("td");
    authorColumn.textContent = book.author;

    var publishedColumn = document.createElement("td");
    publishedColumn.textContent = book.published;

    var priceColumn = document.createElement("td");
    priceColumn.textContent = book.price;

    row.appendChild(titleColumn);
    row.appendChild(authorColumn);
    row.appendChild(publishedColumn);
    row.appendChild(priceColumn);

    bookList.appendChild(row);
  }
}
