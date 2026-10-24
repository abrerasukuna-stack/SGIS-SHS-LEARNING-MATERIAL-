const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}
const quizQuestions = [
  { q: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'], answer: 1 },
  { q: 'What is 8 × 7?', options: ['54', '56', '64', '48'], answer: 1 },
  { q: 'Which gas do plants absorb from the air?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], answer: 2 }
];
let quizIndex = 0, quizScore = 0, quizChoice = null;
const questionEl = document.querySelector('#question');
const answersEl = document.querySelector('#answers');
const progressEl = document.querySelector('#progress');
const feedbackEl = document.querySelector('#feedback');
const nextButton = document.querySelector('#next');
function renderQuestion() {
  if (!questionEl || !answersEl) return;
  if (quizIndex >= quizQuestions.length) {
    questionEl.textContent = `You scored ${quizScore} out of ${quizQuestions.length}!`;
    answersEl.innerHTML = '<p>Great work! Review your answers and try again to practice.</p>';
    progressEl.textContent = 'Quiz complete';
    feedbackEl.textContent = '';
    nextButton.textContent = 'Try again ↻';
    nextButton.disabled = false;
    nextButton.onclick = () => { quizIndex = 0; quizScore = 0; quizChoice = null; nextButton.textContent = 'Next question →'; renderQuestion(); };
    return;
  }
  const item = quizQuestions[quizIndex];
  progressEl.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
  questionEl.textContent = item.q;
  feedbackEl.textContent = '';
  nextButton.disabled = true;
  quizChoice = null;
  answersEl.innerHTML = '';
  item.options.forEach((option, i) => {
    const button = document.createElement('button');
    button.className = 'answer'; button.textContent = option;
    button.addEventListener('click', () => {
      if (quizChoice !== null) return;
      quizChoice = i;
      const all = answersEl.querySelectorAll('button');
      all.forEach((b, j) => { b.disabled = true; if (j === item.answer) b.classList.add('correct'); });
      if (i === item.answer) { quizScore++; feedbackEl.textContent = 'Correct! Well done.'; }
      else { button.classList.add('wrong'); feedbackEl.textContent = 'Not quite. The correct answer is highlighted.'; }
      nextButton.disabled = false;
    });
    answersEl.appendChild(button);
  });
  nextButton.onclick = () => { quizIndex++; renderQuestion(); };
}
renderQuestion();
