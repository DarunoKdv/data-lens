import { useState } from 'react';
import { datasets } from '../data/datasets';

export function ExplorerPage() {
  const [activeId, setActiveId] = useState(datasets[0].id);
  const dataset = datasets.find((d) => d.id === activeId)!;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dataset Explorer</h1>
        <p className="text-sm text-slate-500">Browse and inspect pre-loaded datasets</p>
      </div>

      {/* Dataset Selector */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {datasets.map((ds) => (
          <button
            key={ds.id}
            onClick={() => setActiveId(ds.id)}
            className={`rounded-xl border p-4 text-left transition-all ${
              activeId === ds.id
                ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <h3 className="text-sm font-semibold text-slate-900">{ds.name}</h3>
            <p className="mt-1 text-xs text-slate-500">{ds.description}</p>
            <div className="mt-2 flex gap-2">
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
                {ds.data.length} rows
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
                {ds.columns.length} columns
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">#</th>
              {dataset.columns.map((col) => (
                <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {dataset.data.map((row, idx) => (
              <tr key={idx} className="transition-colors hover:bg-slate-50">
                <td className="px-4 py-2 text-xs font-mono text-slate-400">{idx + 1}</td>
                {dataset.columns.map((col) => (
                  <td key={col} className="px-4 py-2 text-sm font-mono text-slate-700">
                    {typeof row[col] === 'number' && row[col] > 999
                      ? row[col].toLocaleString()
                      : row[col]}
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
