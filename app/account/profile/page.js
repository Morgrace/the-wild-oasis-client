import ProfileForm from "@/app/_components/ProfileForm";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Update profile",
};

export default function Page() {
  return (
    <div>
      <h2 className="text-accent-400 mb-4 text-2xl font-semibold">
        Update your guest profile
      </h2>
      <p className="text-primary-200 mb-8 text-lg">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <Suspense
        fallback={
          <div className="mb-8 flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <ProfileForm />
      </Suspense>
    </div>
  );
}
