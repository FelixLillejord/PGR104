document.querySelector("form").onsubmit = function (event) {
  // Prevents default behavior of form (Page transition)
  event.preventDefault();

  // Hide error
  document.querySelector("#error").setAttribute("hidden", true);

  // Extract data from form
  const data = new FormData(event.target);
  // Get book data
  const title = data.get("title");
  const author = data.get("author");
  const published = parseInt(data.get("published"));
  const price = parseInt(data.get("price"));

  // Check if title is empty
  if (title == "") {
    showError("What is the book called?");
    return;
  }

  // Check if author is empty
  if (author == "") {
    showError("Who wrote this damn book?");
    return;
  }

  // Check if year of publish is empty
  if (isNaN(published)) {
    showError("Please fill inn year of publish");
    return;
  }

  // Check if book if published after 1990
  if (published < 1990) {
    showError("That book is too old!!");
    return;
  }

  // Check if book is published before 2022
  if (published > 2022) {
    showError("The book cannot be published in the future!");
    return;
  }

  // Check if price is empty
  if (isNaN(price)) {
    showError("Price cannot be empty!");
    return;
  }

  // Check if price is not 0 or below
  if (price <= 0) {
    showError("No book is free of charge");
    return;
  }

  // Create new table row
  const row = document.createElement("tr");

  // Create title column
  const titleColumn = document.createElement("td");
  titleColumn.textContent = title;

  // Create author column
  const authorColumn = document.createElement("td");
  authorColumn.textContent = author;

  // Create published column
  const publishedColumn = document.createElement("td");
  publishedColumn.textContent = published;

  // Create price column
  const priceColumn = document.createElement("td");
  priceColumn.textContent = price;

  // Create remove column
  const removeColumn = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.textContent = "🗑";
  removeButton.onclick = function () {
    row.remove();
  };
  removeColumn.appendChild(removeButton);

  // Add columns to row
  row.appendChild(titleColumn);
  row.appendChild(authorColumn);
  row.appendChild(publishedColumn);
  row.appendChild(priceColumn);
  row.appendChild(removeColumn);

  // Add new row to table
  document.querySelector("table tbody").appendChild(row);
};

// Show error at top
function showError(error) {
  const errorElement = document.querySelector("#error");
  errorElement.textContent = error;
  errorElement.removeAttribute("hidden");
}
