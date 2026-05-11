var questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    answer: 1
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
    answer: 2
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "CO2", "H2O", "HO"],
    answer: 2
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    answer: 2
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  },
  {
    question: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "226"],
    answer: 1
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "UK", "Brazil", "Australia"],
    answer: 2
  }
];

var currentIndex = 0;
var score = 0;
var answered = false;
var userAnswers = [];

function loadQuestion() {
  var q = questions[currentIndex];
  var buttons = document.querySelectorAll('.option-btn');

  document.getElementById('question-number').textContent =
    'Question ' + (currentIndex + 1) + ' of ' + questions.length;
  document.getElementById('question-text').textContent = q.question;

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].textContent = q.options[i];
    buttons[i].className = 'option-btn';
    buttons[i].disabled = false;
  }

  document.getElementById('next-btn').style.display = 'none';
  answered = false;
}

function selectAnswer(i) {
  if (answered) return;
  answered = true;

  var q = questions[currentIndex];
  var buttons = document.querySelectorAll('.option-btn');
  var isCorrect = i === q.answer;

  if (isCorrect) {
    score++;
    buttons[i].classList.add('correct');
  } else {
    buttons[i].classList.add('wrong');
    buttons[q.answer].classList.add('correct');
  }

  buttons[i].classList.add('selected');

  for (var j = 0; j < buttons.length; j++) {
    buttons[j].disabled = true;
  }

  userAnswers[currentIndex] = { selected: i, correct: q.answer, isCorrect: isCorrect };

  document.getElementById('score-display').textContent = score + ' / ' + questions.length;
  document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    showResults();
  } else {
    loadQuestion();
  }
}

function showResults() {
  document.getElementById('question-card').style.display = 'none';
  document.getElementById('results').style.display = 'block';

  document.getElementById('final-score').textContent = score + ' / ' + questions.length;

  var list = document.getElementById('review-list');
  list.innerHTML = '';

  for (var i = 0; i < questions.length; i++) {
    var q = questions[i];
    var ua = userAnswers[i];
    var li = document.createElement('li');
    li.className = ua && ua.isCorrect ? 'review-correct' : 'review-wrong';
    li.innerHTML =
      '<strong>Q' + (i + 1) + ':</strong> ' + q.question + '<br>' +
      '<span>Your answer: ' + (ua ? q.options[ua.selected] : 'Not answered') + '</span>' +
      (ua && !ua.isCorrect
        ? '<br><span class="correct-answer">Correct: ' + q.options[q.answer] + '</span>'
        : '');
    list.appendChild(li);
  }
}

function resetQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  userAnswers = [];

  document.getElementById('score-display').textContent = '0 / ' + questions.length;
  document.getElementById('results').style.display = 'none';
  document.getElementById('question-card').style.display = 'block';

  loadQuestion();
}

document.addEventListener('DOMContentLoaded', function () {
  loadQuestion();
});
