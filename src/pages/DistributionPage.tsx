import { useState, useMemo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { datasets } from '../data/datasets';
import { computeStats } from '../utils/stats';

export function DistributionPage() {
  const [activeId, setActiveId] = useState(datasets[0].id);
  const dataset = datasets.find((d) => d.id === activeId)!;
  const [selectedCol, setSelectedCol] = useState(dataset.columns[0]);
  const histRef = useRef<SVGSVGElement>(null);
  const boxRef = useRef<SVGSVGElement>(null);

  useMemo(() => { setSelectedCol(dataset.columns[0]); }, [dataset]);

  const values = useMemo(() => dataset.data.map((d) => d[selectedCol]), [dataset, selectedCol]);
  const stats = useMemo(() => computeStats(values, selectedCol), [values, selectedCol]);

  // Histogram
  useEffect(() => {
    if (!histRef.current) return;
    const svg = d3.select(histRef.current);
    svg.selectAll('*').remove();

    const width = 500, height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%');

    const xScale = d3.scaleLinear()
      .domain([d3.min(values)! * 0.9, d3.max(values)! * 1.1])
      .range([0, innerW]);

    const bins = d3.bin().domain(xScale.domain() as [number, number]).thresholds(12)(values);
    const yMax = d3.max(bins, (b) => b.length) ?? 0;

    const yScale = d3.scaleLinear().domain([0, yMax]).range([innerH, 0]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g').attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(xScale).ticks(6))
      .call((g) => g.selectAll('text').attr('fill', '#64748b').attr('font-size', '10px'));

    g.append('g').call(d3.axisLeft(yScale).ticks(5))
      .call((g) => g.selectAll('text').attr('fill', '#64748b').attr('font-size', '10px'))
      .call((g) => g.select('.domain').remove());

    g.selectAll('rect')
      .data(bins)
      .join('rect')
      .attr('x', (d) => xScale(d.x0!) + 1)
      .attr('width', (d) => Math.max(0, xScale(d.x1!) - xScale(d.x0!) - 2))
      .attr('y', (d) => yScale(d.length))
      .attr('height', (d) => innerH - yScale(d.length))
      .attr('fill', '#6366f1')
      .attr('fill-opacity', 0.7)
      .attr('rx', 2);

    // Mean line
    g.append('line')
      .attr('x1', xScale(stats.mean)).attr('x2', xScale(stats.mean))
      .attr('y1', 0).attr('y2', innerH)
      .attr('stroke', '#f43f5e').attr('stroke-width', 2).attr('stroke-dasharray', '4 3');

    g.append('text')
      .attr('x', xScale(stats.mean) + 4).attr('y', 12)
      .attr('font-size', '10px').attr('fill', '#f43f5e').text(`mean: ${stats.mean.toFixed(2)}`);

  }, [values, stats]);

  // Box plot
  useEffect(() => {
    if (!boxRef.current) return;
    const svg = d3.select(boxRef.current);
    svg.selectAll('*').remove();

    const width = 500, height = 120;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%');

    const xScale = d3.scaleLinear()
      .domain([stats.min * 0.9, stats.max * 1.1])
      .range([0, innerW]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const cy = innerH / 2;

    g.append('g').attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(xScale).ticks(6))
      .call((g) => g.selectAll('text').attr('fill', '#64748b').attr('font-size', '10px'));

    // Whiskers
    g.append('line').attr('x1', xScale(stats.min)).attr('x2', xScale(stats.q1))
      .attr('y1', cy).attr('y2', cy).attr('stroke', '#475569').attr('stroke-width', 1.5);
    g.append('line').attr('x1', xScale(stats.q3)).attr('x2', xScale(stats.max))
      .attr('y1', cy).attr('y2', cy).attr('stroke', '#475569').attr('stroke-width', 1.5);

    // Min/Max caps
    [stats.min, stats.max].forEach((v) => {
      g.append('line').attr('x1', xScale(v)).attr('x2', xScale(v))
        .attr('y1', cy - 10).attr('y2', cy + 10).attr('stroke', '#475569').attr('stroke-width', 1.5);
    });

    // Box (Q1 to Q3)
    g.append('rect')
      .attr('x', xScale(stats.q1)).attr('y', cy - 18)
      .attr('width', xScale(stats.q3) - xScale(stats.q1)).attr('height', 36)
      .attr('fill', '#e0e7ff').attr('stroke', '#6366f1').attr('stroke-width', 1.5).attr('rx', 4);

    // Median line
    g.append('line').attr('x1', xScale(stats.median)).attr('x2', xScale(stats.median))
      .attr('y1', cy - 18).attr('y2', cy + 18).attr('stroke', '#4338ca').attr('stroke-width', 2.5);

    // Mean dot
    g.append('circle').attr('cx', xScale(stats.mean)).attr('cy', cy)
      .attr('r', 4).attr('fill', '#f43f5e');

  }, [stats]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Distribution Plots</h1>
        <p className="text-sm text-slate-500">Histograms and box plots rendered with D3.js</p>
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
        <select value={selectedCol} onChange={(e) => setSelectedCol(e.target.value)}
          className="ml-auto rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm">
          {dataset.columns.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Histogram — {selectedCol}</h3>
            <svg ref={histRef} />
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Box Plot — {selectedCol}</h3>
            <svg ref={boxRef} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-700">Summary</h3>
            <div className="mt-3 space-y-2">
              {[
                { label: 'Min', value: stats.min, color: 'text-slate-800' },
                { label: 'Q1', value: stats.q1, color: 'text-slate-800' },
                { label: 'Median', value: stats.median, color: 'text-primary-700' },
                { label: 'Q3', value: stats.q3, color: 'text-slate-800' },
                { label: 'Max', value: stats.max, color: 'text-slate-800' },
                { label: 'Mean', value: stats.mean, color: 'text-rose-600' },
                { label: 'Std Dev', value: stats.stdDev, color: 'text-slate-800' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span className="text-xs text-slate-500">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>
                    {item.value >= 1000 ? item.value.toLocaleString() : item.value.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
            <p><span className="inline-block h-2 w-2 rounded-full bg-rose-500 mr-1" /> Mean</p>
            <p><span className="inline-block h-2 w-4 bg-primary-700 mr-1" /> Median</p>
            <p><span className="inline-block h-3 w-6 bg-primary-100 border border-primary-500 rounded mr-1" /> IQR (Q1-Q3)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
