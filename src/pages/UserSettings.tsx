import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserHeader from "@/components/UserSetting/UserHeader";
import UserProfile from "@/components/UserSetting/UserProfile";

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
      </Tabs>
    </div>
  )
}
