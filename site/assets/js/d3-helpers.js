// Shared D3 utilities for GATE DA visualizations
// Requires D3 v7 loaded globally

const GD = {
  MARGIN: { top: 24, right: 30, bottom: 44, left: 52 },
  COLORS: {
    brand:   '#7c9eff',
    success: '#4caf82',
    warn:    '#f0a44a',
    error:   '#e05c6b',
    muted:   '#2e3a52',
    text2:   '#606880'
  },
  T: () => d3.transition().duration(350).ease(d3.easeCubicOut),

  // Create a responsive SVG that fills its container
  // Returns { svg, g, W, H } where W, H are inner dimensions
  createSVG(containerId, aspectH = 0.55) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    const totalW = container.clientWidth || 600;
    const totalH = Math.round(totalW * aspectH);
    const M = this.MARGIN;
    const W = totalW - M.left - M.right;
    const H = totalH - M.top  - M.bottom;

    d3.select(container).select('svg').remove();

    const svg = d3.select(container)
      .append('svg')
        .attr('viewBox', `0 0 ${totalW} ${totalH}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .style('width', '100%')
        .style('height', 'auto');

    const g = svg.append('g')
      .attr('transform', `translate(${M.left},${M.top})`);

    return { svg, g, W, H };
  },

  // Horizontal grid lines
  addGridH(g, yScale, W, ticks = 5) {
    g.append('g').attr('class', 'grid')
      .call(d3.axisLeft(yScale).ticks(ticks).tickSize(-W).tickFormat(''))
      .call(gr => gr.select('.domain').remove());
  },

  // Standard bottom + left axes
  addAxes(g, xScale, yScale, H, xLabel = '', yLabel = '', xTicks = null) {
    const xAxis = g.append('g').attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${H})`)
      .call(xTicks
        ? d3.axisBottom(xScale).ticks(xTicks)
        : d3.axisBottom(xScale));
    if (xLabel) {
      xAxis.append('text')
        .attr('x', xScale.range()[1] / 2)
        .attr('y', 36)
        .attr('fill', this.COLORS.text2)
        .attr('text-anchor', 'middle')
        .attr('font-size', 11)
        .text(xLabel);
    }

    const yAxis = g.append('g').attr('class', 'axis axis--y')
      .call(d3.axisLeft(yScale).ticks(5));
    if (yLabel) {
      yAxis.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -yScale.range()[0] / 2)
        .attr('y', -40)
        .attr('fill', this.COLORS.text2)
        .attr('text-anchor', 'middle')
        .attr('font-size', 11)
        .text(yLabel);
    }
    return { xAxis, yAxis };
  },

  // Draw/update bar chart (PMF)
  // data: [{k, p}]
  drawBars(g, data, xScale, yScale, color = null, transition = true) {
    color = color || this.COLORS.brand;
    const t = transition ? this.T() : null;
    const bars = g.selectAll('.gd-bar').data(data, d => d.k);

    bars.enter().append('rect')
        .attr('class', 'gd-bar')
        .attr('x',  d => xScale(d.k) - xScale.bandwidth() / 2)
        .attr('y',  yScale(0))
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .attr('fill', color)
        .attr('rx', 2)
      .merge(bars)
      .call(sel => {
        const s = transition ? sel.transition(t) : sel;
        s.attr('x', d => xScale(d.k) - xScale.bandwidth() / 2)
         .attr('y', d => yScale(d.p))
         .attr('width', xScale.bandwidth())
         .attr('height', d => Math.max(0, yScale(0) - yScale(d.p)));
      });

    bars.exit().remove();
  },

  // Draw a continuous curve (PDF)
  // pts: [{x, y}]
  drawCurve(g, pts, xScale, yScale, color = null, transition = true) {
    color = color || this.COLORS.brand;
    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveCatmullRom);

    let path = g.select('.gd-curve');
    if (path.empty()) {
      path = g.append('path').attr('class', 'gd-curve').attr('fill', 'none');
    }
    path.attr('stroke', color).attr('stroke-width', 2.5);

    const t = transition ? this.T() : null;
    const s = transition ? path.transition(t) : path;
    s.attr('d', line(pts));
    return path;
  },

  // Draw shaded area under curve
  drawArea(g, pts, xScale, yScale, H, color = null, opacity = 0.15, cls = 'gd-area') {
    color = color || this.COLORS.brand;
    const area = d3.area()
      .x(d => xScale(d.x))
      .y0(H)
      .y1(d => yScale(d.y))
      .curve(d3.curveCatmullRom);

    let path = g.select(`.${cls}`);
    if (path.empty()) path = g.append('path').attr('class', cls);
    path.attr('fill', color).attr('opacity', opacity)
        .transition(this.T())
        .attr('d', area(pts));
    return path;
  },

  // Vertical mean / reference line
  drawVLine(g, x, xScale, H, color, label = '', cls = 'gd-mean-line') {
    g.select(`.${cls}-group`).remove();
    const vg = g.append('g').attr('class', `${cls}-group`);
    vg.append('line')
      .attr('class', cls)
      .attr('x1', xScale(x)).attr('x2', xScale(x))
      .attr('y1', 0).attr('y2', H)
      .attr('stroke', color)
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '5 3');
    if (label) {
      vg.append('text')
        .attr('x', xScale(x) + 4)
        .attr('y', 14)
        .attr('fill', color)
        .attr('font-size', 11)
        .text(label);
    }
  },

  // Normal PDF value
  normalPDF(x, mu, sigma) {
    const z = (x - mu) / sigma;
    return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
  },

  // Normal CDF (Abramowitz & Stegun approximation)
  normalCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.8212560 + t * 1.3302744))));
    return x > 0 ? 1 - p : p;
  },

  // Binomial PMF
  binomPMF(k, n, p) {
    if (k < 0 || k > n) return 0;
    return this.logBinom(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p);
  },
  logBinom(n, k) {
    let res = 0;
    for (let i = 0; i < k; i++) res += Math.log(n - i) - Math.log(i + 1);
    return res;
  },
  binomPMFArr(n, p) {
    return Array.from({length: n + 1}, (_, k) => ({
      k, p: Math.exp(this.binomPMF(k, n, p))
    }));
  },

  // Poisson PMF
  poissonPMF(k, lambda) {
    let logP = -lambda + k * Math.log(lambda);
    for (let i = 1; i <= k; i++) logP -= Math.log(i);
    return Math.exp(logP);
  },
  poissonPMFArr(lambda, maxK = 30) {
    return Array.from({length: maxK + 1}, (_, k) => ({
      k, p: this.poissonPMF(k, lambda)
    }));
  },

  // Geometric PMF (number of trials until first success)
  geomPMFArr(p, maxK = 20) {
    return Array.from({length: maxK}, (_, i) => {
      const k = i + 1;
      return { k, p: p * Math.pow(1 - p, k - 1) };
    });
  },

  // Tooltip
  createTooltip(container) {
    return d3.select(container)
      .append('div')
      .attr('class', 'gd-tooltip');
  },
  showTooltip(tooltip, html, event) {
    tooltip.html(html)
      .classed('gd-tooltip--visible', true)
      .style('left', (event.offsetX + 12) + 'px')
      .style('top',  (event.offsetY - 30) + 'px');
  },
  hideTooltip(tooltip) {
    tooltip.classed('gd-tooltip--visible', false);
  }
};
