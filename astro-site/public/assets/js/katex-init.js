function gdInitKaTeX() {
  renderMathInElement(document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: true  },
      { left: '$',  right: '$',  display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true  }
    ],
    throwOnError: false,
    errorColor: '#e05c6b',
    trust: false
  });
}

// Handle deferred script load order
if (typeof renderMathInElement !== 'undefined') {
  gdInitKaTeX();
} else {
  window.__gdKatexCb = gdInitKaTeX;
}

// Called by auto-render script's onload
window.__gdKatexReady = function() {
  if (window.__gdKatexCb) { window.__gdKatexCb(); window.__gdKatexCb = null; }
};

// Re-render a specific element (for dynamic content)
window.gdRenderMath = function(el) {
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(el, {
      delimiters: [
        { left: '$$', right: '$$', display: true  },
        { left: '$',  right: '$',  display: false }
      ],
      throwOnError: false,
      errorColor: '#e05c6b'
    });
  }
};
