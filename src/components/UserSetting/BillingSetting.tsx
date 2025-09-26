import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Save } from "lucide-react";
import { Button } from "../ui/button";

export const BillingSetting = () => {
  const [billingLimit, setBillingLimit] = useState<boolean>(false);

  return (
    <Card className="border-0 shadow backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Billing Settings</CardTitle>
        <CardDescription>
          Manage your billing preferences and spending limits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Billing Limit</Label>
              <p className="text-sm text-secondary-foreground">
                Set a monthly spending limit to control your expenses
              </p>
            </div>
            <Switch 
              checked={billingLimit}
              onCheckedChange={(checked) => setBillingLimit(checked)}
            />
          </div>

          {billingLimit && (
            <div className="space-y-2">
              <Label htmlFor="billingLimit">Monthly Billing Limit (₱)</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-primary-two" />
                <Input 
                  id="billingLimit"
                  type="number"
                  value={50000}
                  className="pl-10"
                  placeholder="Enter billing limit"
                  min={0}
                  step={1000}
                />
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Current Month Usage</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-input rounded-lg border border-primary">
            <div className="text-2xl font-bold">₱45,800</div>
            <div className="text-sm">Total Spent</div>
          </div>

          <div className="p-4 bg-input rounded-lg border border-primary">
            <div className="text-2xl font-bold">₱45,800</div>
            <div className="text-sm">Remaining Budget</div>
          </div>

          <div className="p-4 bg-input rounded-lg border border-primary">
            <div className="text-2xl font-bold">30.9%</div>
            <div className="text-sm">Budget Used</div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Billing Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
