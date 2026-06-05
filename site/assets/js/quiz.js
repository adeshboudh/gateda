const QuizEngine = {
  _state: {},

  init(noteId) {
    this._state[noteId] = {
      noteId,
      answered: 0,
      correct: 0,
      total: document.querySelectorAll(`.gd-q[data-note="${noteId}"]`).length,
      questions: {}
    };

    const saved = GDProgress.load(noteId);

    document.querySelectorAll(`.gd-q[data-note="${noteId}"]`).forEach(qEl => {
      const qid = qEl.dataset.qid;
      const type = qEl.dataset.type;

      // Restore saved state
      if (saved && saved.questions[qid]) {
        this._restore(qEl, qid, saved.questions[qid], noteId);
        return;
      }

      if (type === 'mcq') this._bindMCQ(qEl, qid, noteId);
      if (type === 'nat') this._bindNAT(qEl, qid, noteId);
      if (type === 'msq') this._bindMSQ(qEl, qid, noteId);
    });

    if (saved) {
      this._state[noteId] = saved;
      this._state[noteId].total = document.querySelectorAll(`.gd-q[data-note="${noteId}"]`).length;
      this._updateScorecard(noteId);
    }
  },

  _bindMCQ(qEl, qid, noteId) {
    qEl.querySelectorAll('.gd-mcq__option input').forEach(radio => {
      radio.addEventListener('change', () => {
        if (qEl.classList.contains('gd-q--answered')) return;
        this.checkMCQ(qEl, qid, radio.value, noteId);
      });
    });
  },

  _bindNAT(qEl, qid, noteId) {
    const btn = qEl.querySelector('.gd-nat__btn');
    if (btn) btn.addEventListener('click', () => {
      if (qEl.classList.contains('gd-q--answered')) return;
      const val = parseFloat(qEl.querySelector('.gd-nat__input').value);
      if (isNaN(val)) return;
      this.checkNAT(qEl, qid, val, noteId);
    });
    const inp = qEl.querySelector('.gd-nat__input');
    if (inp) inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') btn && btn.click();
    });
  },

  _bindMSQ(qEl, qid, noteId) {
    const btn = qEl.querySelector('.gd-msq__btn');
    if (btn) btn.addEventListener('click', () => {
      if (qEl.classList.contains('gd-q--answered')) return;
      const selected = [...qEl.querySelectorAll('.gd-msq__option input:checked')]
        .map(cb => cb.value);
      this.checkMSQ(qEl, qid, selected, noteId);
    });
  },

  checkMCQ(qEl, qid, selected, noteId) {
    const correct = qEl.dataset.correct;
    const isCorrect = selected === correct;

    qEl.querySelectorAll('.gd-mcq__option').forEach(opt => {
      opt.classList.add('gd-mcq__option--disabled');
      opt.querySelector('input').disabled = true;
      if (opt.dataset.key === correct) opt.classList.add('gd-mcq__option--correct');
      else if (opt.dataset.key === selected && !isCorrect) opt.classList.add('gd-mcq__option--wrong');
    });

    this._finalize(qEl, qid, isCorrect, noteId, { status: isCorrect ? 'correct' : 'wrong', selected });
  },

  checkNAT(qEl, qid, value, noteId) {
    const answer  = parseFloat(qEl.dataset.answer);
    const tol     = parseFloat(qEl.dataset.tolerance || '0.005');
    const isCorrect = Math.abs(value - answer) <= tol;
    const inp = qEl.querySelector('.gd-nat__input');
    inp.disabled = true;
    inp.classList.add(isCorrect ? 'gd-nat__input--correct' : 'gd-nat__input--wrong');
    const btn = qEl.querySelector('.gd-nat__btn');
    if (btn) btn.disabled = true;
    this._finalize(qEl, qid, isCorrect, noteId, { status: isCorrect ? 'correct' : 'wrong', submitted: value });
  },

  checkMSQ(qEl, qid, selected, noteId) {
    const correct = qEl.dataset.correct.split(',').map(s => s.trim()).sort();
    const sortedSel = [...selected].sort();
    const isCorrect = JSON.stringify(sortedSel) === JSON.stringify(correct);

    qEl.querySelectorAll('.gd-msq__option').forEach(opt => {
      opt.querySelector('input').disabled = true;
      const key = opt.dataset.key;
      const inCorrect = correct.includes(key);
      const inSelected = selected.includes(key);
      if (inCorrect && inSelected) opt.classList.add('gd-msq__option--correct');
      else if (!inCorrect && inSelected) opt.classList.add('gd-msq__option--wrong');
      else if (inCorrect && !inSelected) opt.classList.add('gd-msq__option--missed');
    });

    const btn = qEl.querySelector('.gd-msq__btn');
    if (btn) btn.disabled = true;
    this._finalize(qEl, qid, isCorrect, noteId, { status: isCorrect ? 'correct' : 'wrong', selected });
  },

  _finalize(qEl, qid, isCorrect, noteId, record) {
    qEl.classList.add('gd-q--answered');
    const fb = document.getElementById(`fb-${qid}`);
    if (fb) {
      fb.classList.add('gd-feedback--visible', isCorrect ? 'gd-feedback--correct' : 'gd-feedback--wrong');
      if (window.gdRenderMath) gdRenderMath(fb);
    }

    const s = this._state[noteId];
    if (!s.questions[qid]) {
      s.answered++;
      if (isCorrect) s.correct++;
    }
    s.questions[qid] = record;
    GDProgress.save(noteId, s);
    this._updateScorecard(noteId);
  },

  _updateScorecard(noteId) {
    const s = this._state[noteId];
    if (!s) return;
    const sc = document.getElementById(`scorecard-${noteId}`);
    if (!sc) return;
    const cnt = sc.querySelector('.gd-scorecard__count');
    const pct = sc.querySelector('.gd-scorecard__pct');
    if (cnt) cnt.textContent = `${s.answered} / ${s.total} answered`;
    if (pct && s.answered > 0) {
      pct.textContent = `${Math.round(100 * s.correct / s.answered)}% correct`;
    }
  },

  _restore(qEl, qid, record, noteId) {
    const type = qEl.dataset.type;
    qEl.classList.add('gd-q--answered');
    const fb = document.getElementById(`fb-${qid}`);
    if (fb) {
      fb.classList.add('gd-feedback--visible',
        record.status === 'correct' ? 'gd-feedback--correct' : 'gd-feedback--wrong');
    }

    if (type === 'mcq') {
      qEl.querySelectorAll('.gd-mcq__option').forEach(opt => {
        opt.classList.add('gd-mcq__option--disabled');
        opt.querySelector('input').disabled = true;
        if (opt.dataset.key === qEl.dataset.correct) opt.classList.add('gd-mcq__option--correct');
        else if (opt.dataset.key === record.selected && record.status !== 'correct')
          opt.classList.add('gd-mcq__option--wrong');
      });
    } else if (type === 'nat') {
      const inp = qEl.querySelector('.gd-nat__input');
      if (inp) { inp.value = record.submitted; inp.disabled = true;
        inp.classList.add(record.status === 'correct' ? 'gd-nat__input--correct' : 'gd-nat__input--wrong'); }
      const btn = qEl.querySelector('.gd-nat__btn');
      if (btn) btn.disabled = true;
    } else if (type === 'msq') {
      const sel = Array.isArray(record.selected) ? record.selected : [];
      const correct = qEl.dataset.correct.split(',').map(s => s.trim());
      qEl.querySelectorAll('.gd-msq__option').forEach(opt => {
        opt.querySelector('input').disabled = true;
        const key = opt.dataset.key;
        if (correct.includes(key) && sel.includes(key)) opt.classList.add('gd-msq__option--correct');
        else if (!correct.includes(key) && sel.includes(key)) opt.classList.add('gd-msq__option--wrong');
        else if (correct.includes(key) && !sel.includes(key)) opt.classList.add('gd-msq__option--missed');
      });
      const btn = qEl.querySelector('.gd-msq__btn');
      if (btn) btn.disabled = true;
    }
  }
};
