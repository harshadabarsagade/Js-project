
// ==================== VARIABLES ====================
const loginCard = document.querySelector(".login");
const welcomeCard = document.querySelector(".welcome");
const setupCard = document.querySelector(".setup");
const quizCard = document.querySelector(".quiz");
const resultCard = document.querySelector(".result");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const finalScore = document.getElementById("finalScore");

let index = 0;
let score = 0;
let currentQuestions = [];

// ==================== QUESTION DATABASE ====================
const questionDB = {
  HTML: [
    {q:"HTML stands for?", o:["Hyper Text Markup Language","High Text Machine Language","Hyper Tool Markup","Home Text Markup"], a:0},
    {q:"<a> tag is used for?", o:["Image","Link","Button","Table"], a:1},
    {q:"<img> tag is used for?", o:["Images","Links","Lists","Tables"], a:0},
    {q:"HTML document extension?", o:[".html",".htm",".xml",".css"], a:0},
    {q:"Which tag is for table row?", o:["<tr>","<td>","<table>","<th>"], a:0},
    {q:"HTML is a ___ language?", o:["Programming","Markup","Scripting","Database"], a:1},
    {q:"<p> tag is used for?", o:["Paragraph","Page","Picture","Print"], a:0},
    {q:"<ul> is for?", o:["Ordered list","Unordered list","Underline text","None"], a:1},
    {q:"<div> is a?", o:["Container","Text","Image","Link"], a:0},
    {q:"<h1> is for?", o:["Heading 1","Horizontal line","Header","None"], a:0}
  ],
  CSS: [
    {q:"CSS stands for?", o:["Cascading Style Sheets","Creative Style System","Color Style Sheet","Computer Style Syntax"], a:0},
    {q:"CSS is used for?", o:["Logic","Styling","Database","Server"], a:1},
    {q:"Property to change text color?", o:["background-color","color","font-size","text-align"], a:1},
    {q:"Which selector is for id?", o:[".","#","*","$"], a:1},
    {q:"Property for bold text?", o:["font-weight","text-style","text-decoration","font-style"], a:0},
    {q:"To center text?", o:["text-align:center","align:center","center-text","text:center"], a:0},
    {q:"Background color property?", o:["bgcolor","background-color","color","background"], a:1},
    {q:"Font size property?", o:["font-size","size-font","text-size","fontsize"], a:0},
    {q:"CSS file extension?", o:[".css",".style",".html",".js"], a:0},
    {q:"Selector for class?", o:[".","#","*","$"], a:0}
  ],
  JS: [
    {q:"JS stands for?", o:["Java Style","JavaScript","JustScript","Jolly Script"], a:1},
    {q:"Which is correct to declare variable?", o:["var x = 5;","x = 5;","int x = 5;","let x"], a:0},
    {q:"Which symbol is used for comments?", o:["//","/* */","<!-- -->","**"], a:0},
    {q:"JS file extension?", o:[".js",".java",".css",".html"], a:0},
    {q:"Function keyword is?", o:["function","fun","def","var"], a:0},
    {q:"To log in console?", o:["console.log()","print()","echo()","log.console()"], a:0},
    {q:"JS is a ___ language?", o:["Markup","Programming","Styling","Database"], a:1},
    {q:"How to add 2+3 in JS?", o:["2+3","'2'+'3'","add(2,3)","sum(2,3)"], a:0},
    {q:"Array syntax?", o:["[]","{}","()","<>"], a:0},
    {q:"To declare constant?", o:["let","var","const","constant"], a:2}
  ]
};

// ==================== LOGIN FUNCTIONS ====================
function togglePassword(){
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

function login(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if(email && password){
    loginCard.classList.add("hide");
    welcomeCard.classList.remove("hide");
  } else {
    alert("Please enter email and password!");
  }
}

function editUser(){
  alert("Edit clicked! You can modify email/password here.");
}

function removeUser(){
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

// ==================== NAVIGATION FUNCTIONS ====================
function goToSetup(){
  welcomeCard.classList.add("hide");
  setupCard.classList.remove("hide");
}

// ==================== START QUIZ ====================
function startQuiz(){
  const category = document.getElementById("category").value;
  let count = parseInt(document.getElementById("count").value); // number of questions
  let allQuestions = questionDB[category];

  if(allQuestions.length === 0){
    alert("No questions available for this category!");
    return;
  }

  // Shuffle questions
  let shuffled = allQuestions.sort(()=>0.5 - Math.random());

  // Select only required number of questions
  currentQuestions = shuffled.slice(0, count);

  setupCard.classList.add("hide");
  quizCard.classList.remove("hide");
  index = 0;
  score = 0;
  loadQuestion();
}

// ==================== LOAD QUESTION ====================
function loadQuestion(){
  nextBtn.disabled = true;
  optionsEl.innerHTML = "";
  const q = currentQuestions[index];
  questionEl.textContent = q.q;

  q.o.forEach((opt,i)=>{
    const div = document.createElement("div");
    div.className="option";
    div.textContent = opt;
    div.onclick = ()=>checkAnswer(div,i);
    optionsEl.appendChild(div);
  });
}

// ==================== CHECK ANSWER ====================
function checkAnswer(el,i){
  document.querySelectorAll(".option").forEach(o=>o.onclick=null);

  if(i === currentQuestions[index].a){
    el.classList.add("correct");
    score++;
  }else{
    el.classList.add("wrong");
  }
  nextBtn.disabled = false;
}

// ==================== NEXT QUESTION ====================
function nextQuestion(){
  index++;
  if(index < currentQuestions.length){
    loadQuestion();
  }else{
    quizCard.classList.add("hide");
    resultCard.classList.remove("hide");
    finalScore.textContent = `Your Score: ${score} / ${currentQuestions.length}`;
  }
}
