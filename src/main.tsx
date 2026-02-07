import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Layout } from './components/Layout'
import { ExplorerPage } from './pages/ExplorerPage'
import { StatsPage } from './pages/StatsPage'
import { CorrelationPage } from './pages/CorrelationPage'
import { RegressionPage } from './pages/RegressionPage'
import { DistributionPage } from './pages/DistributionPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ExplorerPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/correlation" element={<CorrelationPage />} />
          <Route path="/regression" element={<RegressionPage />} />
          <Route path="/distribution" element={<DistributionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
