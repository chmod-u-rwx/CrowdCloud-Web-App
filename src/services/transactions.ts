import { 
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { 
  createTransaction,
  getTransaction,
  getTransactionHistory,
  getTransactionSummary
} from "@/services/routes/job-transaction";

// Create Transactions (Mutation)
export function useCreateTransactions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-history"] });
      queryClient.invalidateQueries({ queryKey: ["transaction-summary"] });
    },
  });
}

// Get Transaction by ID
export function useTransaction(transaction_id: string) {
  return useQuery({
    queryKey: ["transaction", transaction_id],
    queryFn: () => getTransaction(transaction_id),
    enabled: !!transaction_id,
  });
}

// Get Transaction History
export function useTransactionHistory(params?: {
  job_id?: string;
  start_time?: string;
  end_time?: string;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["transaction-history", params],
    queryFn: () => getTransactionHistory(params),
    staleTime: 1000 * 60 * 5,
  });
}

// Get Transaction Summary
export function useTransactionSummary(params?: {
  job_id?: string;
  start_time?: string;
  end_time?: string;
}) {
  return useQuery({
    queryKey: ["transaction-summary", params],
    queryFn: () => getTransactionSummary(params),
  });
}