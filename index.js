const quoteContainer = document.querySelector('.quote-container')
const quoteText = document.querySelector('.quote-text')
const quoteAuthor = document.querySelector('.quote-author')
const twitterBtn = document.querySelector('.twitter-button')
const newQuoteBtn = document.querySelector('#new-quote')
const loader = document.querySelector('.loader')

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function completeLoading() {
    quoteContainer.hidden = false
    loader.hidden = true;
}

newQuoteBtn.addEventListener('click', () => {
    getOneRandomQuote()
})

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
    window.open(twitterUrl, '_blank')
}

twitterBtn.addEventListener('click', () => {
    tweetQuote()
})

const getOneRandomQuote = () => {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if (!quote.author) {
         quoteAuthor.textContent = 'Unknown'
    } else {
        quoteAuthor.textContent = quote.author
    }

    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
   
}

async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        getOneRandomQuote()
      
    } catch (error) {
        
    }
    completeLoading()
}


getQuotes()
