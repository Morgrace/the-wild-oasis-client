import Image from "next/image";
import { signInAction } from "../_lib/action";

function SignInButton({ redirectPath }) {
  return (
    <form action={signInAction}>
      <input type="hidden" name="provider" value="google" />
      <input type="hidden" name="redirectPath" value={redirectPath} />
      <button className="border-primary-300 flex items-center gap-6 border px-10 py-4 text-lg font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
