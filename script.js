const quoteContainer = document.getElementById('main-container');
const quoteText = document.getElementById('quote');

const authorText = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');



let apiQuotes = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// show new quote
function newQuote() {
  loading();
  //pick random from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // unknown author check
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  }
  else {
    authorText.textContent = quote.author;
  }

  // if quote length is too long, change styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  }
  else {
    quoteText.classList.remove('long-quote');
  }
  // set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

// quotes from API

async function getQuote() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // error is catched here
  }
}

// on page load
getQuote();



// tweeting button
function twetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank')
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', twetQuote);