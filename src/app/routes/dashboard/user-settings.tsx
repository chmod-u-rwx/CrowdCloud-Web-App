import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingSetting } from "@/features/user-settings/components/billing-settings";
import AccountProfile from "@/features/user-settings/components/account-profile";
import UserHeader from "@/features/user-settings/components/header";
import UserProfile from "@/features/user-settings/components/user-profile";

export default function UserSettings() {
  return (
    <div className="space-y-6">
      <UserHeader />

      {/* Main Content */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 w-1/2">
          <TabsTrigger value="profile" className="text-sm">
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="text-sm">
            Account
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-sm">
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-2">
          <UserProfile />
        </TabsContent>

        <TabsContent value="account" className="mt-2">
          <AccountProfile />
        </TabsContent>

        <TabsContent value="billing" className="mt-2">
          <BillingSetting />
        </TabsContent>
      </Tabs>
    </div>
  )
}
