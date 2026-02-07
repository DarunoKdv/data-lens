import { useState, useMemo } from 'react';
import { datasets } from '../data/datasets';
import { computeStats } from '../utils/stats';

export function StatsPage() {
  const [activeId, setActiveId] = useState(datasets[0].id);
  const dataset = datasets.find((d) => d.id === activeId)!;

  const stats = useMemo(() => {
    return dataset.columns.map((col) => {
      const values = dataset.data.map((d) => d[col]);
      return computeStats(values, col);
    });
  }, [dataset]);

  const fmt = (n: number) => {
    if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (Math.abs(n) < 0.01) return n.toExponential(2);
    return n.toFixed(4);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Descriptive Statistics</h1>
        <p className="text-sm text-slate-500">Mean, median, mode, standard deviation, quartiles, and more</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {stats.map((s) => (
          <div key={s.column} className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-bold text-primary-600 uppercase tracking-wider">{s.column}</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                { label: 'Count', value: s.count },
                { label: 'Mean', value: fmt(s.mean) },
                { label: 'Median', value: fmt(s.median) },
                { label: 'Mode', value: fmt(s.mode) },
                { label: 'Std Dev', value: fmt(s.stdDev) },
                { label: 'Variance', value: fmt(s.variance) },
                { label: 'Min', value: fmt(s.min) },
                { label: 'Max', value: fmt(s.max) },
                { label: 'Q1 (25%)', value: fmt(s.q1) },
                { label: 'Q3 (75%)', value: fmt(s.q3) },
                { label: 'IQR', value: fmt(s.q3 - s.q1) },
                { label: 'Skewness', value: fmt(s.skewness) },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-slate-50 p-2">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
