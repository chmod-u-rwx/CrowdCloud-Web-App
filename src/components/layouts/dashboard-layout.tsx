import Header from "@/features/borrower-dashboard/components/Header";
import JobExpenses from "@/features/borrower-dashboard/components/JobExpenses";
import JobSummary from "@/features/borrower-dashboard/components/JobSummary";
import Stats from "@/features/borrower-dashboard/components/Stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Header />
      <Stats />

      {/* Main Content */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="summary" className="text-sm">
            Job Summary
          </TabsTrigger>
          <TabsTrigger value="expenses" className="text-sm">
            Expenses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-2">
          <JobSummary />
        </TabsContent>
        <TabsContent value="expenses" className="mt-2">
          <JobExpenses />
        </TabsContent>
      </Tabs>
    </div>
  );
}
