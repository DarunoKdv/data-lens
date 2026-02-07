export interface DataPoint {
  [key: string]: number;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  columns: string[];
  data: DataPoint[];
}

const irisData: DataPoint[] = [
  { sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2 },
  { sepalLength: 4.9, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.2 },
  { sepalLength: 4.7, sepalWidth: 3.2, petalLength: 1.3, petalWidth: 0.2 },
  { sepalLength: 5.0, sepalWidth: 3.6, petalLength: 1.4, petalWidth: 0.2 },
  { sepalLength: 5.4, sepalWidth: 3.9, petalLength: 1.7, petalWidth: 0.4 },
  { sepalLength: 4.6, sepalWidth: 3.4, petalLength: 1.4, petalWidth: 0.3 },
  { sepalLength: 5.0, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.2 },
  { sepalLength: 4.4, sepalWidth: 2.9, petalLength: 1.4, petalWidth: 0.2 },
  { sepalLength: 4.9, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.1 },
  { sepalLength: 7.0, sepalWidth: 3.2, petalLength: 4.7, petalWidth: 1.4 },
  { sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5 },
  { sepalLength: 6.9, sepalWidth: 3.1, petalLength: 4.9, petalWidth: 1.5 },
  { sepalLength: 5.5, sepalWidth: 2.3, petalLength: 4.0, petalWidth: 1.3 },
  { sepalLength: 6.5, sepalWidth: 2.8, petalLength: 4.6, petalWidth: 1.5 },
  { sepalLength: 5.7, sepalWidth: 2.8, petalLength: 4.5, petalWidth: 1.3 },
  { sepalLength: 6.3, sepalWidth: 3.3, petalLength: 4.7, petalWidth: 1.6 },
  { sepalLength: 4.9, sepalWidth: 2.4, petalLength: 3.3, petalWidth: 1.0 },
  { sepalLength: 6.6, sepalWidth: 2.9, petalLength: 4.6, petalWidth: 1.3 },
  { sepalLength: 5.2, sepalWidth: 2.7, petalLength: 3.9, petalWidth: 1.4 },
  { sepalLength: 6.3, sepalWidth: 3.3, petalLength: 6.0, petalWidth: 2.5 },
  { sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9 },
  { sepalLength: 7.1, sepalWidth: 3.0, petalLength: 5.9, petalWidth: 2.1 },
  { sepalLength: 6.3, sepalWidth: 2.9, petalLength: 5.6, petalWidth: 1.8 },
  { sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.8, petalWidth: 2.2 },
  { sepalLength: 7.6, sepalWidth: 3.0, petalLength: 6.6, petalWidth: 2.1 },
  { sepalLength: 4.9, sepalWidth: 2.5, petalLength: 4.5, petalWidth: 1.7 },
  { sepalLength: 7.3, sepalWidth: 2.9, petalLength: 6.3, petalWidth: 1.8 },
  { sepalLength: 6.7, sepalWidth: 2.5, petalLength: 5.8, petalWidth: 1.8 },
  { sepalLength: 7.2, sepalWidth: 3.6, petalLength: 6.1, petalWidth: 2.5 },
  { sepalLength: 6.4, sepalWidth: 2.7, petalLength: 5.3, petalWidth: 1.9 },
];

const housingData: DataPoint[] = [
  { sqft: 1400, bedrooms: 3, bathrooms: 2, age: 15, price: 245000 },
  { sqft: 1800, bedrooms: 4, bathrooms: 2, age: 10, price: 312000 },
  { sqft: 2200, bedrooms: 4, bathrooms: 3, age: 5, price: 420000 },
  { sqft: 1100, bedrooms: 2, bathrooms: 1, age: 30, price: 175000 },
  { sqft: 1600, bedrooms: 3, bathrooms: 2, age: 20, price: 265000 },
  { sqft: 2500, bedrooms: 5, bathrooms: 3, age: 8, price: 475000 },
  { sqft: 900, bedrooms: 2, bathrooms: 1, age: 45, price: 145000 },
  { sqft: 2000, bedrooms: 3, bathrooms: 2, age: 12, price: 355000 },
  { sqft: 1350, bedrooms: 3, bathrooms: 1, age: 25, price: 215000 },
  { sqft: 3000, bedrooms: 5, bathrooms: 4, age: 3, price: 580000 },
  { sqft: 1700, bedrooms: 3, bathrooms: 2, age: 18, price: 289000 },
  { sqft: 2100, bedrooms: 4, bathrooms: 2, age: 7, price: 395000 },
  { sqft: 1200, bedrooms: 2, bathrooms: 1, age: 35, price: 185000 },
  { sqft: 1900, bedrooms: 3, bathrooms: 2, age: 14, price: 325000 },
  { sqft: 2800, bedrooms: 4, bathrooms: 3, age: 2, price: 540000 },
  { sqft: 1500, bedrooms: 3, bathrooms: 2, age: 22, price: 255000 },
  { sqft: 2300, bedrooms: 4, bathrooms: 3, age: 6, price: 445000 },
  { sqft: 1050, bedrooms: 2, bathrooms: 1, age: 40, price: 160000 },
  { sqft: 1650, bedrooms: 3, bathrooms: 2, age: 16, price: 278000 },
  { sqft: 2600, bedrooms: 5, bathrooms: 3, age: 4, price: 510000 },
];

const salesData: DataPoint[] = [
  { month: 1, revenue: 42000, expenses: 28000, customers: 150, adSpend: 5000 },
  { month: 2, revenue: 45000, expenses: 29000, customers: 165, adSpend: 5500 },
  { month: 3, revenue: 51000, expenses: 31000, customers: 180, adSpend: 6000 },
  { month: 4, revenue: 48000, expenses: 30000, customers: 170, adSpend: 5800 },
  { month: 5, revenue: 55000, expenses: 33000, customers: 200, adSpend: 7000 },
  { month: 6, revenue: 62000, expenses: 35000, customers: 230, adSpend: 8000 },
  { month: 7, revenue: 58000, expenses: 34000, customers: 215, adSpend: 7500 },
  { month: 8, revenue: 67000, expenses: 37000, customers: 250, adSpend: 9000 },
  { month: 9, revenue: 72000, expenses: 39000, customers: 270, adSpend: 9500 },
  { month: 10, revenue: 68000, expenses: 38000, customers: 255, adSpend: 8800 },
  { month: 11, revenue: 75000, expenses: 41000, customers: 285, adSpend: 10000 },
  { month: 12, revenue: 82000, expenses: 44000, customers: 310, adSpend: 11000 },
];

export const datasets: Dataset[] = [
  { id: 'iris', name: 'Iris Flower', description: 'Classic dataset with sepal and petal measurements from 3 iris species (30 samples)', columns: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'], data: irisData },
  { id: 'housing', name: 'Housing Prices', description: 'Residential property data with square footage, bedrooms, age, and sale price (20 samples)', columns: ['sqft', 'bedrooms', 'bathrooms', 'age', 'price'], data: housingData },
  { id: 'sales', name: 'Monthly Sales', description: 'Annual business performance data with revenue, expenses, customers, and ad spend (12 months)', columns: ['month', 'revenue', 'expenses', 'customers', 'adSpend'], data: salesData },
];
