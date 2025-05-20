"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

function LoginMessage() {
  const param = useParams();
  const cabinId = param.cabinId;
  return (
    <div className="bg-primary-800 grid">
      <p className="self-center py-12 text-center text-xl">
        Please{" "}
        <Link
          href={`/login?redirect=/cabins/${cabinId}`}
          className="text-accent-500 underline"
        >
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
