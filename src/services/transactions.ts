import { DEFAULT_API } from "./apiClient";
import type { Transaction, ExchangeTransaction } from "@/types";

export interface TransactionServiceProtocol {
  fetchRemote(): Promise<Transaction[]>;
  fetchExchangeTransactions(): Promise<ExchangeTransaction[]>;
}

export class TransactionService implements TransactionServiceProtocol {
  async fetchRemote(): Promise<Transaction[]> {
    const url = "https://collinm.free.beeceptor.com/transactions";
    // The endpoint returns exchange transactions; this method maps a handful to app Transactions for demo/seed
    const data = await this.fetchExchangeTransactions();
    return data.slice(0, 5).map((x) => ({
      id: x.id,
      title: `${x.targetCurrency} Rate`,
      amount: x.rate,
      currency: x.baseCurrency,
      date: new Date(x.date).toISOString(),
      category: "Exchange",
      description: `${x.baseCurrency}/${x.targetCurrency} via ${x.source} (${x.status})`,
      type: "expense",
    }));
  }

  async fetchExchangeTransactions(): Promise<ExchangeTransaction[]> {
    const url = "https://collinm.free.beeceptor.com/transactions";
    return await DEFAULT_API.get<ExchangeTransaction[]>(url);
  }
}

export const transactionService = new TransactionService();
