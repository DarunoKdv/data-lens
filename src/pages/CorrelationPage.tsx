import { useState, useMemo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { datasets } from '../data/datasets';
import { computeCorrelationMatrix } from '../utils/stats';

export function CorrelationPage() {
  const [activeId, setActiveId] = useState(datasets[0].id);
  const dataset = datasets.find((d) => d.id === activeId)!;
  const svgRef = useRef<SVGSVGElement>(null);

  const matrix = useMemo(() => computeCorrelationMatrix(dataset.data, dataset.columns), [dataset]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const cols = dataset.columns;
    const n = cols.length;
    const cellSize = Math.min(80, 400 / n);
    const margin = { top: 80, right: 20, bottom: 20, left: 100 };
    const w = margin.left + n * cellSize + margin.right;
    const h = margin.top + n * cellSize + margin.bottom;

    svg.attr('width', w).attr('height', h);

    const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([1, -1]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Cells
    matrix.forEach((row, i) => {
      row.forEach((val, j) => {
        g.append('rect')
          .attr('x', j * cellSize)
          .attr('y', i * cellSize)
          .attr('width', cellSize - 2)
          .attr('height', cellSize - 2)
          .attr('rx', 4)
          .attr('fill', colorScale(val))
          .attr('stroke', '#e2e8f0')
          .attr('stroke-width', 0.5);

        g.append('text')
          .attr('x', j * cellSize + cellSize / 2 - 1)
          .attr('y', i * cellSize + cellSize / 2 + 1)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('font-size', cellSize > 50 ? '11px' : '9px')
          .attr('font-weight', '600')
          .attr('fill', Math.abs(val) > 0.5 ? '#fff' : '#334155')
          .text(val.toFixed(2));
      });
    });

    // Column labels (top)
    cols.forEach((col, i) => {
      g.append('text')
        .attr('x', i * cellSize + cellSize / 2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('fill', '#475569')
        .text(col);
    });

    // Row labels (left)
    cols.forEach((col, i) => {
      g.append('text')
        .attr('x', -8)
        .attr('y', i * cellSize + cellSize / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '11px')
        .attr('fill', '#475569')
        .text(col);
    });
  }, [matrix, dataset.columns]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Correlation Matrix</h1>
        <p className="text-sm text-slate-500">Pairwise Pearson correlation heatmap using D3.js</p>
      </div>

      <div className="flex gap-2">
        {datasets.map((ds) => (
          <button
            key={ds.id}
            onClick={() => setActiveId(ds.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeId === ds.id ? 'bg-primary-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {ds.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <svg ref={svgRef} />
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-block h-3 w-3 rounded" style={{ background: '#2166ac' }} /> -1.0
          <div className="h-3 w-32 rounded" style={{ background: 'linear-gradient(to right, #2166ac, #f7f7f7, #b2182b)' }} />
          <span className="inline-block h-3 w-3 rounded" style={{ background: '#b2182b' }} /> +1.0
        </div>
      </div>

      {/* Correlation Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500" />
              {dataset.columns.map((col) => (
                <th key={col} className="px-4 py-3 text-center text-xs font-semibold text-slate-500">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {dataset.columns.map((rowCol, i) => (
              <tr key={rowCol}>
                <td className="px-4 py-2 text-xs font-semibold text-slate-600">{rowCol}</td>
                {matrix[i].map((val, j) => (
                  <td key={j} className="px-4 py-2 text-center text-sm font-mono">
                    <span className={Math.abs(val) > 0.7 ? 'font-bold text-primary-700' : 'text-slate-600'}>
                      {val.toFixed(3)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
