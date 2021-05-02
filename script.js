const url = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';
const twitterUrl = 'https://twitter.com/intent/tweet?text=';
const tumblrUrl =
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&amp;tags=quotes,';
const newQuote = document.querySelector('#new-quote');
const textQuote = document.querySelector('#text');
const authorQuote = document.querySelector('#author');
const twitterBtn = document.querySelector('#tweet-quote');
const tumblrBtn = document.querySelector('#tumblr-quote');

const loadQuotes = async() => {
    const quote = await getQuotes();
    updateUI(quote[0].author, quote[0].text);
};

newQuote.addEventListener('click', async() => {
    const quote = await getQuotes();
    updateUI(quote[0].author, quote[0].text);
});

function getQuotes() {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            if (response.Response === 'False') {
                throw new Error(response.Error);
            }
            return response.quotes;
        });
}

function updateUI(author, text) {
    const textUrl = text.split(' ').join('%20');
    const authorHashTag = author.split(' ').join('');
    const authorUrl = author.split(' ').join('%20');
    textQuote.textContent = text;
    authorQuote.textContent = author;
    twitterBtn.href = `https://twitter.com/intent/tweet?text=${textUrl}&hashtags=quotes,quoteoftheday,${authorHashTag}`;
    twitterBtn.target = '_blanks';
    tumblrBtn.target = '_blanks';
    tumblrBtn.href = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,${authorHashTag}&caption=${authorUrl}&content=${textUrl}`;
}

loadQuotes();