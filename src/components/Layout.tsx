import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { name: 'Explorer', path: '/' },
  { name: 'Statistics', path: '/stats' },
  { name: 'Correlation', path: '/correlation' },
  { name: 'Regression', path: '/regression' },
  { name: 'Distribution', path: '/distribution' },
];

export function Layout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-white text-xs font-bold">
              D
            </div>
            <span className="text-lg font-bold text-slate-900">DataLens</span>
          </div>
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
