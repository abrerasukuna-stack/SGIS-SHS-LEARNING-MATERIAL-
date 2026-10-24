const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn && nav) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const text = button.getAttribute('data-copy').replace(/&#10;/g, '\n');
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied ✓';
    } catch (e) {
      button.textContent = 'Select command above to copy';
    }
    setTimeout(() => button.textContent = button.dataset.copy.includes('release') ? 'Copy commands' : 'Copy command', 1800);
  });
});

const quiz = document.getElementById('quizForm');
if (quiz) {
  const answers = {q1:'a', q2:'b', q3:'b', q4:'b', q5:'c'};
  const updateProgress = () => {
    const count = Object.keys(answers).filter(q => quiz.querySelector(`input[name="${q}"]:checked`)).length;
    const text = document.getElementById('progressText');
    const bar = document.getElementById('progressBar');
    if (text) text.textContent = `${count} of 5 answered`;
    if (bar) bar.style.width = `${count * 20}%`;
  };
  quiz.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', updateProgress));
  quiz.addEventListener('submit', event => {
    event.preventDefault();
    let score = 0;
    for (const [q, answer] of Object.entries(answers)) {
      const selected = quiz.querySelector(`input[name="${q}"]:checked`);
      if (selected && selected.value === answer) score++;
    }
    const result = document.getElementById('result');
    const message = score === 5 ? 'Excellent! Perfect score — mahusay ang pagkaunawa mo.' : score >= 3 ? 'Good job! Balikan ang lessons para mapataas pa ang score.' : 'Balikan ang modules at subukan ulit. Practice makes progress!';
    result.innerHTML = `<strong>Score: ${score}/5</strong><p>${message}</p>`;
    result.className = `result ${score >= 3 ? 'good' : 'try'}`;
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  });
  quiz.addEventListener('reset', () => {
    setTimeout(() => {
      const result = document.getElementById('result');
      result.innerHTML = '';
      result.className = 'result';
      updateProgress();
    }, 0);
  });
  updateProgress();
}
