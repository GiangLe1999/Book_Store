import RegisterForm from "@/components/auth-pages/register-form";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { path } from "@/constants";

interface Props {}

const SignupPage: NextPage<Props> = async () => {
  const session = await getServerSession(authOptions);
  if (session) return redirect(path.dashboard);

  return <RegisterForm />;
};

export const dynamic = "force-dynamic";

export default SignupPage;
