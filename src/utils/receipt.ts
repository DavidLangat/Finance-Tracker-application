import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import type { Transaction } from "@/types";

export async function generateReceiptPdf(transaction: Transaction): Promise<void> {
  const html = `
  <html>
    <body style="font-family: -apple-system, Helvetica; padding: 24px;">
      <h2>Transaction Receipt</h2>
      <p><strong>Title:</strong> ${escapeHtml(transaction.title)}</p>
      <p><strong>Amount:</strong> ${transaction.currency} ${transaction.amount.toFixed(2)}</p>
      <p><strong>Date:</strong> ${new Date(transaction.date).toLocaleString()}</p>
      ${transaction.category ? `<p><strong>Category:</strong> ${escapeHtml(transaction.category)}</p>` : ""}
      ${transaction.description ? `<p><strong>Description:</strong> ${escapeHtml(transaction.description)}</p>` : ""}
    </body>
  </html>`;
  const { uri } = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, { mimeType: "application/pdf", dialogTitle: "Share Receipt" });
  }
}

function escapeHtml(input: string): string {
  return input.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}


