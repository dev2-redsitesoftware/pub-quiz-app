(function () {
  var currentIndex = 0;
  var score = 0;
  var answered = false;
  var userAnswers = [];

  var scoreDisplay = document.getElementById('score-display');
  var questionNumber = document.getElementById('question-number');
  var questionText = document.getElementById('question-text');
  var optionBtns = document.querySelectorAll('.option-btn');
  var nextBtn = document.getElementById('next-btn');
  var questionCard = document.getElementById('question-card');
  var resultsSection = document.getElementById('results');
  var finalScore = document.getElementById('final-score');
  var reviewList = document.getElementById('review-list');
  var playAgainBtn = document.getElementById('play-again-btn');

  function loadQuestion() {
    answered = false;
    var q = questions[currentIndex];

    questionNumber.textContent = 'Question ' + (currentIndex + 1) + ' / ' + questions.length;
    questionText.textContent = q.question;

    for (var i = 0; i < optionBtns.length; i++) {
      var btn = optionBtns[i];
      btn.textContent = q.options[i];
      btn.disabled = false;
      btn.className = 'option-btn';
      btn.setAttribute('data-index', i);
    }

    nextBtn.classList.add('hidden');
  }

  function handleOptionClick(e) {
    if (answered) return;
    answered = true;

    var selected = parseInt(e.currentTarget.getAttribute('data-index'), 10);
    var correct = questions[currentIndex].answer;

    userAnswers.push({ selected: selected, correct: correct });

    for (var i = 0; i < optionBtns.length; i++) {
      optionBtns[i].disabled = true;
      if (i === correct) {
        optionBtns[i].classList.add('correct');
      } else if (i === selected) {
        optionBtns[i].classList.add('incorrect');
      }
    }

    if (selected === correct) {
      score++;
      scoreDisplay.textContent = 'Score: ' + score;
    }

    nextBtn.classList.remove('hidden');
  }

  function showResults() {
    questionCard.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    finalScore.textContent = score + ' / ' + questions.length;

    reviewList.innerHTML = '';
    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];
      var ua = userAnswers[i];
      var li = document.createElement('li');
      var correct = ua.selected === ua.correct;
      li.className = correct ? 'review-correct' : 'review-incorrect';
      li.textContent = (correct ? '✅' : '❌') + ' ' + q.question +
        ' — Correct: ' + q.options[ua.correct];
      reviewList.appendChild(li);
    }
  }

  function nextQuestion() {
    currentIndex++;
    if (currentIndex >= questions.length) {
      showResults();
    } else {
      loadQuestion();
    }
  }

  function resetQuiz() {
    currentIndex = 0;
    score = 0;
    answered = false;
    userAnswers = [];
    scoreDisplay.textContent = 'Score: 0';
    resultsSection.classList.add('hidden');
    questionCard.classList.remove('hidden');
    loadQuestion();
  }

  for (var i = 0; i < optionBtns.length; i++) {
    optionBtns[i].addEventListener('click', handleOptionClick);
  }
  nextBtn.addEventListener('click', nextQuestion);
  playAgainBtn.addEventListener('click', resetQuiz);

  loadQuestion();
})();
