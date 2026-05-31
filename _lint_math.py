#!/usr/bin/env python3
"""Lint notes for known render traps (kramdown/MathJax on GitHub Pages).

Run:  python3 _lint_math.py
Exit code 1 if any issue found. See CONTRIBUTING.md for the rules.
"""
import re, glob, sys

FILES = sorted(
    glob.glob('module*/*.md') + glob.glob('cheatsheet/*.md') +
    glob.glob('rivision/*.md') + glob.glob('docs/*.md') + ['index.md']
)

INLINE  = re.compile(r'(?<!\$)\$(?!\$)[^$\n]+?\$(?!\$)')   # $...$
DISPLAY = re.compile(r'\$\$[^$]+?\$\$')                    # $$...$$
ALLMATH = re.compile(r'\$\$[^$]+?\$\$|(?<!\$)\$(?!\$)[^$\n]+?\$(?!\$)')

def strip_known(seg):
    return re.sub(r'\\lvert|\\rvert|\\lVert|\\rVert|\\mid|\\\|', '', seg)

issues = []
def add(f, n, msg, snip):
    issues.append(f'{f}:{n}: {msg} -> {snip[:70]}')

for f in FILES:
    lines = open(f).read().split('\n')
    fence = False
    for i, l in enumerate(lines, 1):
        if l.lstrip().startswith('```'):
            fence = not fence
            continue
        if fence:
            continue

        # Obsidian wikilinks / embeds (break Jekyll)
        if re.search(r'!?\[\[', l):
            add(f, i, 'Obsidian wikilink [[...]] (use [text](path))', l.strip())

        # table glued to a non-blank, non-table line above (no blank line)
        sep = l.strip().startswith('|') and set(l.strip().replace('|','').replace(':','').strip()) <= set('-') and '-' in l
        if sep and i >= 2:
            prev = lines[i-2]
            if prev.strip() != '' and not prev.strip().startswith('|'):
                add(f, i-1, 'table not preceded by blank line', lines[i-2].strip())

        for m in ALLMATH.finditer(l):
            seg = m.group()
            is_inline = not seg.startswith('$$')
            if '|' in strip_known(seg):
                add(f, i, 'bare | in math (use \\lvert/\\rvert/\\mid)', seg)
            if '*' in seg:
                add(f, i, 'literal * in math (use \\ast)', seg)
            if '#' in seg:
                add(f, i, '# in math (use N_{...})', seg)
            if any(c in seg for c in '₹€£'):
                add(f, i, 'currency in math (move outside $...$)', seg)
            # inline row-break must be \\\\ ; a lone 2-backslash run breaks
            if is_inline and re.search(r'(?<!\\)\\\\(?!\\)', seg):
                add(f, i, 'inline \\\\ (use \\\\\\\\ or move to $$...$$)', seg)

        # \textbf / \textit / \emph anywhere (render literally in math)
        for m in re.finditer(r'\\(textbf|textit|emph)\b', l):
            add(f, i, f'\\{m.group(1)} (use **md** / \\mathbf / \\text)', l.strip())

if issues:
    print(f'FOUND {len(issues)} issue(s):\n')
    print('\n'.join(issues))
    sys.exit(1)
print('OK — no render traps found across', len(FILES), 'files.')
