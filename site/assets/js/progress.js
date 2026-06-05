const GDProgress = {
  key: noteId => `gd-quiz-${noteId}`,
  summaryKey: 'gd-progress-summary',

  load(noteId) {
    try { return JSON.parse(localStorage.getItem(this.key(noteId))) || null; }
    catch { return null; }
  },

  save(noteId, state) {
    try {
      state.lastSaved = new Date().toISOString();
      localStorage.setItem(this.key(noteId), JSON.stringify(state));
      this._updateSummary(noteId, state);
    } catch {}
  },

  _updateSummary(noteId, state) {
    try {
      const s = JSON.parse(localStorage.getItem(this.summaryKey) || '{}');
      s[noteId] = { answered: state.answered, correct: state.correct, total: state.total };
      localStorage.setItem(this.summaryKey, JSON.stringify(s));
    } catch {}
  },

  clear(noteId) {
    localStorage.removeItem(this.key(noteId));
  },

  summary() {
    try { return JSON.parse(localStorage.getItem(this.summaryKey) || '{}'); }
    catch { return {}; }
  }
};
