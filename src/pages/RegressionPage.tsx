import { useState, useMemo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { datasets } from '../data/datasets';
import { computeRegression } from '../utils/stats';

export function RegressionPage() {
  const [activeId, setActiveId] = useState(datasets[1].id); // Housing default
  const dataset = datasets.find((d) => d.id === activeId)!;
  const [xCol, setXCol] = useState(dataset.columns[0]);
  const [yCol, setYCol] = useState(dataset.columns[dataset.columns.length - 1]);
  const svgRef = useRef<SVGSVGElement>(null);

  // Reset columns when dataset changes
  useMemo(() => {
    setXCol(dataset.columns[0]);
    setYCol(dataset.columns[dataset.columns.length - 1]);
  }, [dataset]);

  const xValues = useMemo(() => dataset.data.map((d) => d[xCol]), [dataset, xCol]);
  const yValues = useMemo(() => dataset.data.map((d) => d[yCol]), [dataset, yCol]);
  const regression = useMemo(() => computeRegression(xValues, yValues), [xValues, yValues]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600, height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%');

    const xScale = d3.scaleLinear()
      .domain([d3.min(xValues)! * 0.95, d3.max(xValues)! * 1.05])
      .range([0, innerW]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(yValues)! * 0.95, d3.max(yValues)! * 1.05])
      .range([innerH, 0]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Grid
    g.append('g').call(d3.axisLeft(yScale).ticks(6).tickSize(-innerW))
      .call((g) => g.select('.domain').remove())
      .call((g) => g.selectAll('.tick line').attr('stroke', '#e2e8f0'))
      .call((g) => g.selectAll('.tick text').attr('fill', '#64748b').attr('font-size', '11px'));

    g.append('g').attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(xScale).ticks(6))
      .call((g) => g.select('.domain').attr('stroke', '#e2e8f0'))
      .call((g) => g.selectAll('.tick text').attr('fill', '#64748b').attr('font-size', '11px'));

    // Axis labels
    svg.append('text').attr('x', width / 2).attr('y', height - 8)
      .attr('text-anchor', 'middle').attr('font-size', '12px').attr('fill', '#475569').text(xCol);
    svg.append('text').attr('x', -height / 2).attr('y', 16)
      .attr('transform', 'rotate(-90)').attr('text-anchor', 'middle')
      .attr('font-size', '12px').attr('fill', '#475569').text(yCol);

    // Regression line
    g.append('line')
      .attr('x1', xScale(regression.linePoints[0].x))
      .attr('y1', yScale(regression.linePoints[0].y))
      .attr('x2', xScale(regression.linePoints[1].x))
      .attr('y2', yScale(regression.linePoints[1].y))
      .attr('stroke', '#f43f5e')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '6 3');

    // Scatter points
    g.selectAll('circle')
      .data(xValues.map((x, i) => ({ x, y: yValues[i] })))
      .join('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', '#6366f1')
      .attr('fill-opacity', 0.7)
      .attr('stroke', '#4338ca')
      .attr('stroke-width', 1);

  }, [xValues, yValues, regression, xCol, yCol]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Regression Analysis</h1>
        <p className="text-sm text-slate-500">Linear regression with scatter plot and R-squared using D3.js</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {datasets.map((ds) => (
            <button key={ds.id} onClick={() => setActiveId(ds.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${activeId === ds.id ? 'bg-primary-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
              {ds.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-xs font-medium text-slate-500">X:</label>
          <select value={xCol} onChange={(e) => setXCol(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm">
            {dataset.columns.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <label className="text-xs font-medium text-slate-500">Y:</label>
          <select value={yCol} onChange={(e) => setYCol(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm">
            {dataset.columns.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart */}
        <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-5">
          <svg ref={svgRef} />
        </div>

        {/* Regression Stats */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-700">Regression Results</h3>
            <div className="mt-3 space-y-2">
              {[
                { label: 'Slope', value: regression.slope.toFixed(4) },
                { label: 'Intercept', value: regression.intercept.toFixed(4) },
                { label: 'R-squared', value: regression.rSquared.toFixed(4) },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span className="text-xs text-slate-500">{item.label}</span>
                  <span className="text-sm font-bold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-700">Equation</h3>
            <p className="mt-2 font-mono text-sm text-primary-700">
              y = {regression.slope.toFixed(2)}x {regression.intercept >= 0 ? '+' : '-'} {Math.abs(regression.intercept).toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-5">
            <h3 className="text-sm font-semibold text-primary-800">Fit Quality</h3>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary-200">
              <div className="h-full rounded-full bg-primary-600" style={{ width: `${regression.rSquared * 100}%` }} />
            </div>
            <p className="mt-1 text-xs text-primary-600">
              R² = {(regression.rSquared * 100).toFixed(1)}% — {regression.rSquared > 0.8 ? 'Strong' : regression.rSquared > 0.5 ? 'Moderate' : 'Weak'} fit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
