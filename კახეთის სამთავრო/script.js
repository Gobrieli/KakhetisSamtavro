// Scroll-in animation
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
faders.forEach(f => observer.observe(f));

// Quiz data
const questions = [
  { q: "რომელ საუკუნეებში გამოჩნდა კახეთის სამთავრო?",
    opts: ["V–VI","VII–VIII","IX–X","XI–XII"], ans: 1,
    exp: "სწორია! კახეთის სამთავრო VII–VIII საუკუნეებში განვითარდა." },
  // ...დანარჩენი კითხვები
];

let cur = 0, score = 0, answered = false;

function loadQ() {
  answered = false;
  const q = questions[cur];
  document.getElementById('quiz-prog').textContent = `კითხვა ${cur+1} / ${questions.length}`;
  document.getElementById('quiz-q').textContent = q.q;
  const optsEl = document.getElementById('quiz-opts');
  optsEl.innerHTML = '';
  q.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = o;
    btn.onclick = () => selectAnswer(i);
    optsEl.appendChild(btn);
  });
  document.getElementById('quiz-fb').className = 'quiz-feedback';
  document.getElementById('btn-next').classList.remove('visible');
}

function selectAnswer(i) {
  if (answered) return;
  answered = true;
  const q = questions[cur];
  const btns = document.querySelectorAll('.quiz-option');
  btns.forEach(b => b.disabled = true);
  btns[i].classList.add(i === q.ans ? 'correct' : 'wrong');
  btns[q.ans].classList.add('correct');
  if (i === q.ans) score++;
  const fb = document.getElementById('quiz-fb');
  fb.textContent = i === q.ans ? '✅ ' + q.exp : '❌ სამწუხაროდ. ' + q.exp;
  fb.className = 'quiz-feedback show ' + (i === q.ans ? 'good' : 'bad');
  document.getElementById('btn-next').classList.add('visible');
}

document.getElementById('btn-next').onclick = () => {
  cur++;
  if (cur < questions.length) { loadQ(); }
  else { showScore(); }
};

function showScore() {
  document.getElementById('quiz-body').style.display = 'none';
  document.getElementById('quiz-score').classList.add('show');
  document.getElementById('score-num').textContent = `${score}/${questions.length}`;
}

function restartQuiz() {
  cur = 0; score = 0;
  document.getElementById('quiz-score').classList.remove('show');
  document.getElementById('quiz-body').style.display = '';
  loadQ();
}

loadQ();