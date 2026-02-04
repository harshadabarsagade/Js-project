// LOGIN ELEMENTS
const loginBox = document.getElementById("loginBox");
const welcomeBox = document.getElementById("welcomeBox");
const quoteApp = document.getElementById("quoteApp");

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const startBtn = document.getElementById("startBtn");
const togglePassword = document.getElementById("togglePassword");

// SHOW / HIDE PASSWORD
togglePassword.addEventListener("click", () => {
    if(password.type === "password"){
        password.type = "text";
        togglePassword.textContent = "🙈";
    }else{
        password.type = "password";
        togglePassword.textContent = "👁️";
    }
});

// LOGIN
loginBtn.addEventListener("click", () => {
    if(email.value === "" || password.value === ""){
        alert("Please enter email and password");
        return;
    }

    loginBox.classList.add("hide");
    welcomeBox.classList.remove("hide");
});

// START APP
startBtn.addEventListener("click", () => {
    welcomeBox.classList.add("hide");
    quoteApp.classList.remove("hide");
});

// QUOTE APP
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");

const newQuoteBtn = document.getElementById("newQuote");
const copyBtn = document.getElementById("copyBtn");
const saveBtn = document.getElementById("saveBtn");
const likeBtn = document.getElementById("likeBtn");
const shareBtn = document.getElementById("shareBtn");

let likeCount = 0;

const quotes = [
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Dream big. Start small. Act now.", author: "Robin Sharma" },
    { quote: "Success doesn’t come to you, you go to it.", author: "Marva Collins" },
    { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { quote: "Your limitation—it’s only your imagination.", author: "Unknown" }
];

function generateQuote(){
    const random = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = `"${quotes[random].quote}"`;
    authorText.textContent = `— ${quotes[random].author}`;
}

newQuoteBtn.addEventListener("click", generateQuote);

copyBtn.addEventListener("click", () => {
    const text = `${quoteText.textContent} ${authorText.textContent}`;
    navigator.clipboard.writeText(text);
    alert("Quote copied!");
});

saveBtn.addEventListener("click", () => {
    const saved = JSON.parse(localStorage.getItem("savedQuotes")) || [];
    const quote = `${quoteText.textContent} ${authorText.textContent}`;

    if(!saved.includes(quote)){
        saved.push(quote);
        localStorage.setItem("savedQuotes", JSON.stringify(saved));
        alert("Quote saved!");
    }else{
        alert("Already saved!");
    }
});

likeBtn.addEventListener("click", () => {
    likeCount++;
    likeBtn.textContent = `👍 Like (${likeCount})`;
});

shareBtn.addEventListener("click", async () => {
    const text = `${quoteText.textContent} ${authorText.textContent}`;
    if(navigator.share){
        await navigator.share({ text });
    }else{
        alert("Sharing not supported");
    }
});

generateQuote();

