import {
  mean as ssMean,
  median as ssMedian,
  mode as ssMode,
  standardDeviation as ssStdDev,
  variance as ssVariance,
  sampleSkewness,
  quantile,
  sampleCorrelation,
  linearRegression,
  linearRegressionLine,
  min as ssMin,
  max as ssMax,
} from 'simple-statistics';

export interface ColumnStats {
  column: string;
  count: number;
  mean: number;
  median: number;
  mode: number;
  stdDev: number;
  variance: number;
  min: number;
  max: number;
  q1: number;
  q3: number;
  skewness: number;
}

export function computeStats(values: number[], column: string): ColumnStats {
  return {
    column,
    count: values.length,
    mean: ssMean(values),
    median: ssMedian(values),
    mode: ssMode(values),
    stdDev: ssStdDev(values),
    variance: ssVariance(values),
    min: ssMin(values),
    max: ssMax(values),
    q1: quantile(values, 0.25),
    q3: quantile(values, 0.75),
    skewness: values.length >= 3 ? sampleSkewness(values) : 0,
  };
}

export function computeCorrelationMatrix(data: Record<string, number>[], columns: string[]): number[][] {
  return columns.map((colA) => {
    const valuesA = data.map((d) => d[colA]);
    return columns.map((colB) => {
      const valuesB = data.map((d) => d[colB]);
      return sampleCorrelation(valuesA, valuesB);
    });
  });
}

export function computeRegression(xValues: number[], yValues: number[]) {
  const pairs: [number, number][] = xValues.map((x, i) => [x, yValues[i]]);
  const reg = linearRegression(pairs);
  const line = linearRegressionLine(reg);
  const xMin = ssMin(xValues);
  const xMax = ssMax(xValues);

  const yPred = xValues.map((x) => line(x));
  const yMean = ssMean(yValues);
  const ssTot = yValues.reduce((sum, y) => sum + (y - yMean) ** 2, 0);
  const ssRes = yValues.reduce((sum, y, i) => sum + (y - yPred[i]) ** 2, 0);
  const rSquared = 1 - ssRes / ssTot;

  return {
    slope: reg.m,
    intercept: reg.b,
    rSquared,
    linePoints: [
      { x: xMin, y: line(xMin) },
      { x: xMax, y: line(xMax) },
    ],
  };
}
