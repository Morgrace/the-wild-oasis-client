import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  return (
    <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
      Welcome, {session?.user?.name.split(" ").at(0)}
    </h2>
  );
}
