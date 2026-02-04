import { api } from "@/api/axios";
import { Navigate, useLocation } from "react-router";
import { paths } from "@/config/paths";
import type { 
  LoginCredentials,
  User,
  UserAuth,
  UserCreate
} from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

export async function signupUser(data: UserCreate): Promise<User> {
  const response = await api.post<User>("/users/signup", data);
  return response.data;
}

export async function loginUser(data: LoginCredentials): Promise<UserAuth> {
  const response = await api.post<UserAuth>("/users/login", data);
  return response.data;
}

export async function getUser(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}

const userQueryKey = ["user"];

export const useUser = () =>
  useQuery({
    queryKey: userQueryKey,
    queryFn: getUser,
  });

export const ProtectedRoute = (
  { children }: { children: React.ReactNode }
) => {
  const { data: user, isLoading, isError } = useUser();
  const location = useLocation();

  if (isLoading) return <Spinner />

  if(!user || isError) {
    return(
      <Navigate to={
        paths.auth.login.getHref(location.pathname)
      } replace />
    );
  }

  return children;
}