# DataLens — Statistical Analysis Tool

An interactive statistical analysis dashboard built with **React 19**, **Vite**, **D3.js**, and **Tailwind CSS 4**. Features dataset exploration, descriptive statistics, correlation heatmaps, regression analysis, and distribution plots — all computed client-side with pre-loaded sample datasets.

## Features

- **Dataset Explorer** — Browse 3 pre-loaded datasets (Iris, Housing, Sales) with sortable data tables
- **Descriptive Statistics** — Mean, median, mode, std deviation, variance, quartiles, IQR, skewness per column
- **Correlation Matrix** — D3.js heatmap with diverging color scale (RdBu), plus numeric correlation table
- **Regression Analysis** — Interactive scatter plot with linear regression line, R-squared, slope/intercept, and fit quality indicator
- **Distribution Plots** — D3.js histogram with mean line + box plot showing min/Q1/median/Q3/max

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI framework |
| Vite 6 | Build tool |
| D3.js 7 | Data visualizations (heatmap, scatter, histogram, box plot) |
| simple-statistics | Statistical computations |
| React Router 7 | Client-side routing |
| Tailwind CSS 4 | Styling |
| TypeScript | Type safety |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build & Deploy

```bash
npm run build    # Output: dist/
npm run preview  # Preview production build
```

Deploy `dist/` to Vercel, Netlify, or any static host.

## Project Structure

```
src/
├── components/
│   └── Layout.tsx          # Top nav with route links
├── data/
│   └── datasets.ts         # 3 sample datasets (Iris, Housing, Sales)
├── pages/
│   ├── ExplorerPage.tsx     # Dataset browser + data table
│   ├── StatsPage.tsx        # Descriptive statistics cards
│   ├── CorrelationPage.tsx  # D3 correlation heatmap
│   ├── RegressionPage.tsx   # D3 scatter + regression line
│   └── DistributionPage.tsx # D3 histogram + box plot
├── utils/
│   └── stats.ts             # Statistical computation utilities
└── main.tsx                 # Router setup
```

## Datasets

| Dataset | Rows | Columns | Description |
|---------|------|---------|-------------|
| Iris Flower | 30 | 4 | Sepal/petal measurements |
| Housing Prices | 20 | 5 | Property features + price |
| Monthly Sales | 12 | 5 | Revenue, expenses, customers |

## License

MIT
