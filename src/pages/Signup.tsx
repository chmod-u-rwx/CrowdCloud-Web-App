import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Tabs,
  TabsContent,
  TabsList, 
  TabsTrigger
} from "@/components/ui/tabs";
import AuthLogo from "@/components/utils/AuthLogo";
import GlowBackground from "@/components/utils/GlowBackground";
import { IndividualSignupForm } from "@/components/SignUpPage/IndividualSignupForm";
import { CompanySignupForm } from "@/components/SignUpPage/CompanySignupForm";

export const Signup = () => {
  const [activeTab, setActiveTab] = useState("individual");

  return (
    <div className="flex flex-col min-h-screen">
      <GlowBackground />
      <main className="flex-1 md:flex justify-center items-center z-4 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="flex flex-col lg:w-5xl w-full">
              <Card className="w-full max-w-xl mx-auto border-primary-two">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-3xl font-bold font-rubik">
                    Create an account
                  </CardTitle>
                  <CardDescription>
                    Join CrowdCloud and start borrowing resource power.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="individual" className="text-xs">
                        Sign up as Individual
                      </TabsTrigger>
                      <TabsTrigger value="company" className="text-xs">
                        Sign up under Company
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="individual" className="mt-2">
                      <IndividualSignupForm />
                    </TabsContent>
                    <TabsContent value="company" className="mt-2">
                      <CompanySignupForm />
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary-two underline-offset-4 hover:underline"
                    >
                      Log in
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        {/* Logo */}
        <div className="w-full mx-auto flex items-center justify-center mr-60">
          <AuthLogo />
        </div>
      </main>
    </div>
  );
};
