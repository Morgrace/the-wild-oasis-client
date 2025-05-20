import { redirect } from "next/navigation";

import SignInButton from "../_components/SignInButton";
import { auth } from "../_lib/auth";
export const metadata = { title: "login" };
export default async function Page({ searchParams }) {
  const session = await auth();
  if (session) redirect("/");
  const searchParam = await searchParams;
  const redirectPath = searchParam.redirect;
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h2 className="text-3xl font-semibold">Sign in to Continue</h2>
      <SignInButton redirectPath={redirectPath} />
    </div>
  );
}
