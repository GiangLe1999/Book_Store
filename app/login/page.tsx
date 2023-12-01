import LoginForm from "@/components/auth-pages/login-form";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { path } from "@/constants";

const LoginPage: NextPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) return redirect(path.dashboard);

  return <LoginForm />;
};

export const dynamic = "force-dynamic";

export default LoginPage;
