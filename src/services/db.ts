import * as SQLite from "expo-sqlite";
import type { Transaction } from "@/types";

const DB_NAME = "finance.db";
const db = SQLite.openDatabaseSync?.(DB_NAME) ?? SQLite.openDatabase(DB_NAME);

export async function initDatabase(): Promise<void> {
  await runAsync(
    `CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT,
      description TEXT,
      type TEXT
    );`
  );
}

export async function insertTransaction(item: Transaction): Promise<void> {
  await runAsync(
    `INSERT OR REPLACE INTO transactions (id, title, amount, currency, date, category, description, type)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      item.id,
      item.title,
      item.amount,
      item.currency,
      item.date,
      item.category ?? null,
      item.description ?? null,
      item.type ?? null,
    ]
  );
}

export async function listTransactions(query?: string): Promise<Transaction[]> {
  const q = query?.trim();
  const where = q ? `WHERE title LIKE ? OR category LIKE ? OR description LIKE ?` : "";
  const params = q ? [like(q), like(q), like(q)] : [];
  const results = await getAllAsync<Transaction>(
    `SELECT * FROM transactions ${where} ORDER BY date DESC LIMIT 50;`,
    params
  );
  return results;
}

function like(value: string): string {
  return `%${value}%`;
}

function runAsync(sql: string, params: unknown[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params as never,
        () => resolve(),
        (_tx, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
}

function getAllAsync<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params as never,
        (_tx, result) => {
          const rows: T[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            rows.push(result.rows.item(i));
          }
          resolve(rows);
        },
        (_tx, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
}


