export type CurrencyCode = "KES" | "USD" | "EUR" | "GBP" | "UGX" | "TZS" | "RWF" | "ZAR" | string;

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  currency: CurrencyCode;
  date: string; // ISO string
  category?: string;
  description?: string;
  type?: "income" | "expense";
}

export interface ExchangeRate {
  code: CurrencyCode;
  name: string;
  buy: number;
  sell: number;
  flagUrl?: string;
}

export interface ExchangeTransaction {
  id: string;
  date: string; // YYYY-MM-DD
  baseCurrency: CurrencyCode;
  targetCurrency: CurrencyCode;
  rate: number;
  source: string;
  status: "Success" | "Failed" | "Pending" | string;
}
