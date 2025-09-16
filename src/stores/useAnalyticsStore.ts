import type { Requests, TimePeriod } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CostRates {
  cpu_core_cost_per_second: number;
  ram_gb_cost_per_second: number;
}

interface AnalyticsStateStore {
  costRates: CostRates | null;
  setCostRates: (rates: CostRates) => void;
  requests: Requests[];
  setRequests: (requests: Requests[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  selectedPeriod: TimePeriod;
  setSelectedPeriod: (period: TimePeriod) => void;
}

const analyticsStoreLogic = persist<AnalyticsStateStore>(
  (set) => ({
    costRates: null,
    setCostRates: (rates) => set({ costRates: rates }),

    requests: [],
    setRequests: (requests) => set({ requests }),

    loading: false,
    setLoading: (loading) => set({ loading }),

    selectedPeriod: "daily" as TimePeriod,
    setSelectedPeriod: (period) => set({ selectedPeriod: period })
  }),
  {
    name: "analytics-storage"
  }
);

export const useAnalyticsStore = create<AnalyticsStateStore>()(
  analyticsStoreLogic
);