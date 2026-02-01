import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthLogo from "@/components/utils/AuthLogo";
import GlowBackground from "@/components/utils/GlowBackground";
import { LoginForm } from "@/features/auth/components/login-form";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen">
      <GlowBackground />
      <main className="flex-1 md:flex justify-center items-center z-4 py-12">
        {/* Logo */}
        <div className="w-full mx-auto flex items-center justify-center ml-60">
          <AuthLogo />
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="flex flex-col lg:w-5xl w-full">
              <Card className="w-full max-w-xl mx-auto border-primary-two">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-3xl font-bold font-rubik">
                    Welcome back
                  </CardTitle>
                  <CardDescription>
                    Log in to your CrowdCloud account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <LoginForm />
                </CardContent>
                <CardFooter className="flex justify-center">
                  <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-primary-two underline-offset-4 hover:underline"
                    >
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};