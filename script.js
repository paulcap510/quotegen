async function fetchQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();

        if (response.ok) {
            const randomQuote = `${data.content} - ${data.author}`;
            const quoteText = document.getElementById("quote-text");
            quoteText.textContent = randomQuote;
        } else {
            console.error("Failed to fetch a quote.");
        }
    } catch (error) {
        console.error("An error occurred while fetching a quote.", error);
    }
}

const generateButton = document.getElementById("generate-button");
generateButton.addEventListener("click", fetchQuote);

// Call the fetchQuote function as soon as the page runs 
fetchQuote();


const toggleModeButton = document.getElementById("toggle-mode-button");
toggleModeButton.addEventListener("click", function () {
    const body = document.body;
    body.classList.toggle("dark-mode");
});



function shareOnTwitter(quote) {
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
    window.open(twitterURL, '_blank');
}

function shareOnLinkedIn(quote) {
    const linkedInURL = `https://www.linkedin.com/shareArticle?mini=true&url=&title=&summary=${encodeURIComponent(quote)}`;
    window.open(linkedInURL, '_blank');
}

function shareOnFacebook(quote) {
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(quote)}`;
    window.open(facebookURL, '_blank');
}

const quoteTextElement = document.getElementById("quote-text");
const quote = quoteTextElement.textContent;

const twitterShareButton = document.getElementById("twitter-share");
twitterShareButton.addEventListener("click", function () {
    shareOnTwitter(quote);
});

const linkedInShareButton = document.getElementById("linkedin-share");
linkedInShareButton.addEventListener("click", function () {
    shareOnLinkedIn(quote);
})

const facebookShareButton = document.getElementById("facebook-share");
facebookShareButton.addEventListener("click", function () {
    shareOnFacebook(quote);
});








// Function to save a quote to local storage
function saveQuoteToFavorites(quote) {
    // Check if local storage is available
    if (typeof(Storage) !== "undefined") {
        // Get the current list of favorite quotes or initialize an empty array
        let favoriteQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
        
        // Add the new quote to the list
        favoriteQuotes.push(quote);
        
        // Save the updated list back to local storage
        localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));
    } else {
        console.log("Local storage is not supported.");
    }
}

// Function to display favorite quotes
function displayFavoriteQuotes() {
    const favoriteQuotesList = document.getElementById("favorite-quotes-list");
    
    // Clear the existing list
    favoriteQuotesList.innerHTML = "";
    
    // Retrieve the list of favorite quotes from local storage
    const favoriteQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
    
    // Display each quote in the list
    favoriteQuotes.forEach(quote => {
        const listItem = document.createElement("li");


        listItem.textContent = quote;
        favoriteQuotesList.appendChild(listItem);
    });
}


// Save Button Click Event
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", function () {
    const quote = document.getElementById("quote-text").textContent;
    saveQuoteToFavorites(quote);
});

// Generate List Button Click Event
const generateListButton = document.getElementById("generate-list-button");
generateListButton.addEventListener("click", function () {
    displayFavoriteQuotes();
});
