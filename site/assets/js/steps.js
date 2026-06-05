document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gd-example').forEach(ex => {
    const id = ex.dataset.exampleId;
    const steps = [...ex.querySelectorAll('.gd-example__step')];
    const answer = ex.querySelector('.gd-example__answer');
    const btn = ex.querySelector('.gd-example__btn--reveal');
    const resetBtn = ex.querySelector('.gd-example__btn--reset');
    const progress = ex.querySelector('.gd-example__progress');
    let current = 0;

    function updateProgress() {
      if (progress) progress.textContent = `${current} / ${steps.length} step${steps.length !== 1 ? 's' : ''}`;
    }

    function updateBtn() {
      if (!btn) return;
      if (current < steps.length) {
        btn.textContent = `Reveal Step ${current + 1}`;
        btn.disabled = false;
      } else if (answer) {
        btn.textContent = 'Show Answer';
        btn.disabled = false;
      } else {
        btn.textContent = 'All steps shown';
        btn.disabled = true;
      }
    }

    if (btn) {
      btn.addEventListener('click', () => {
        if (current < steps.length) {
          steps[current].classList.add('gd-example__step--visible');
          current++;
          updateProgress();
          updateBtn();
        } else if (answer && !answer.classList.contains('gd-example__answer--visible')) {
          answer.classList.add('gd-example__answer--visible');
          btn.textContent = 'All steps shown';
          btn.disabled = true;
          if (window.gdRenderMath) gdRenderMath(answer);
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        steps.forEach(s => s.classList.remove('gd-example__step--visible'));
        if (answer) answer.classList.remove('gd-example__answer--visible');
        current = 0;
        updateProgress();
        updateBtn();
      });
    }

    updateProgress();
    updateBtn();
  });
});
