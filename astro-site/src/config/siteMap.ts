export interface SiteNote {
  id: string;
  label: string;
  href?: string;   // notes page — omit until page exists
  viz?: string;    // viz page
}

export interface SiteModule {
  id: string;
  label: string;
  href?: string;   // module index page
  notes: SiteNote[];
}

export const SITE_MAP: SiteModule[] = [
  {
    id: 'module1',
    label: 'Module 1 · Probability & Statistics',
    href: '/module1',
    notes: [
      { id: 'm1-1', label: '1.1 Counting & Basic Probability',        viz: '/module1/viz-1-1-counting' },
      { id: 'm1-2', label: '1.2 Conditional Probability & Bayes',     viz: '/module1/viz-1-2-bayes' },
      { id: 'm1-3', label: '1.3 Random Variables & Expectation',      viz: '/module1/viz-1-3-expectation' },
      { id: 'm1-4', label: '1.4 Probability Distributions',           viz: '/module1/viz-1-4-distributions' },
      { id: 'm1-5', label: '1.5 Normal Distribution & CLT',           viz: '/module1/viz-1-5-normal-clt' },
      { id: 'm1-6', label: '1.6 Covariance & Correlation',            viz: '/module1/viz-1-6-correlation' },
      { id: 'm1-7', label: '1.7 Estimation & Confidence Intervals',   viz: '/module1/viz-1-7-estimation' },
      { id: 'm1-8', label: '1.8 Hypothesis Testing',                  viz: '/module1/viz-1-8-hypothesis' },
    ],
  },
  {
    id: 'module2',
    label: 'Module 2 · Programming & DSA',
    href: '/module2',
    notes: [
      { id: 'm2-1', label: '2.1 Arrays & Searching',    href: '/module2/2-1-questions', viz: '/module2/viz-2-1-searching' },
      { id: 'm2-2', label: '2.2 Sorting Algorithms',    href: '/module2/2-2-questions', viz: '/module2/viz-2-2-sorting' },
      { id: 'm2-3', label: '2.3 Recursion & DP',        href: '/module2/2-3-questions', viz: '/module2/viz-2-3-dp' },
      { id: 'm2-4', label: '2.4 Trees & Heaps',         href: '/module2/2-4-questions', viz: '/module2/viz-2-4-trees' },
      { id: 'm2-5', label: '2.5 Graphs — BFS & DFS',   href: '/module2/2-5-questions', viz: '/module2/viz-2-5-graphs' },
      { id: 'm2-6', label: '2.6 Algorithm Complexity',  href: '/module2/2-6-questions', viz: '/module2/viz-2-6-complexity' },
      { id: 'm2-7', label: '2.7 Hashing & Collision',   href: '/module2/2-7-questions', viz: '/module2/viz-2-7-hashing' },
    ],
  },
  { id: 'module3', label: 'Module 3 · Machine Learning', notes: [] },
  { id: 'module4', label: 'Module 4 · Databases & Warehousing', notes: [] },
  { id: 'module5', label: 'Module 5 · Linear Algebra', notes: [] },
  { id: 'module6', label: 'Module 6 · Artificial Intelligence', notes: [] },
  { id: 'module7', label: 'Module 7 · Calculus & Optimization', notes: [] },
];
