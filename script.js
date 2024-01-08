const randomEndpoint = 'https://api.quotable.io/random';
const searchEndpoint = 'https://api.quotable.io/quotes?author=';

function getRandomQuote() {
  fetch(randomEndpoint)
    .then(response => response.json())
    .then(data => displayQuote(data))
    .catch(error => console.error('Error fetching random quote:', error));
}

function searchByAuthor(authorName) {
  const searchURL = searchEndpoint + encodeURIComponent(authorName); 
  fetch(searchURL)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        displayQuote(data.results[0]); 
      } else {
        alert('No quotes found for this author.');
      }
    })
    .catch(error => console.error('Error searching by author:', error));
}

function displayQuote(quoteData) {
  const quoteText = document.querySelector('.quote-text');
  const quoteAuthor = document.querySelector('.quote-author');

  quoteText.textContent = `"${quoteData.content}"`;
  quoteAuthor.textContent = `- ${quoteData.author}`;
}

function handleSearch() {
  const authorName = document.getElementById('author-input').value.trim();
  if (authorName) {
    searchByAuthor(authorName);
  } else {
    getRandomQuote();
  }
}
getRandomQuote();
