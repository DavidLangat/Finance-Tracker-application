import { DEFAULT_API } from "./apiClient";
import type { ExchangeRate } from "@/types";

export interface CurrencyServiceProtocol {
  fetchRates(): Promise<ExchangeRate[]>;
}

export class CurrencyService implements CurrencyServiceProtocol {
  async fetchRates(): Promise<ExchangeRate[]> {
    const url = "https://collinm.free.beeceptor.com/exchangeRtes";
    const payload = await DEFAULT_API.get<{
      base: string;
      date: string;
      pairs: { pair: string; rate: number }[];
    }>(url);

    const nameByCode: Record<string, string> = {
      USD: "United States Dollar",
      EUR: "Euro",
      GBP: "Great British Pound",
      UGX: "Uganda Shilling",
      TZS: "Tanzania Shilling",
      ZAR: "South Africa Rand",
      INR: "Indian Rupee",
      CNY: "China Yuan",
      JPY: "Japanese Yen",
    };

    // Map API pairs => UI friendly objects with simple buy/sell spread
    const result: ExchangeRate[] = payload.pairs.map(({ pair, rate }) => {
      const code = pair.split("/")[1] ?? pair; // e.g., KES/USD -> USD
      // create a tiny spread so Buy < Sell; use 0.5% around mid-rate
      const spread = Math.max(rate * 0.005, 0.01);
      return {
        code,
        name: nameByCode[code] ?? code,
        buy: roundTo(rate - spread),
        sell: roundTo(rate + spread),
      };
    });

    return result;
  }
}

function roundTo(n: number, dp = 2): number {
  const m = 10 ** dp;
  return Math.round(n * m) / m;
}

export const currencyService = new CurrencyService();


