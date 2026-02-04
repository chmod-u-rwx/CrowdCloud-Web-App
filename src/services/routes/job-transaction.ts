import { api } from "@/api/axios";
import type { Transaction } from "@/types";

export async function createTransaction(
  data: Transaction
): Promise<Transaction> {
  const response = await api.post<Transaction>("/transactions/", data);
  return response.data;
}

export async function getTransaction(
  transaction_id: string
): Promise<Transaction> {
  const response = await api.get<Transaction>(`/transactions/${transaction_id}`);
  return response.data;
}

export async function getTransactionHistory(params?: {
  job_id?: string;
  start_time?: string;
  end_time?: string;
  limit?: number;
}): Promise<Transaction[]> {
  const response = await api.get<Transaction[]>("/transactions/history", { params });
  return response.data;
}

export async function getTransactionSummary(params?: {
  job_id?: string;
  start_time?: string;
  end_time?: string;
}): Promise<{
  total_expenses: number;
  paid_expenses: number;
  pending_expenses: number;
  earning_rate: number;
  average_earnings: number;
}> {
  const response = await api.get("/transactions/summary", { params });
  return response.data;
}