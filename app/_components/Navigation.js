import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 flex items-center gap-2 transition-colors"
          >
            {session && (
              <Image
                src={session?.user?.image}
                alt="profile"
                width="40"
                height="40"
                className="rounded-full"
              />
            )}
            <span>Guest area</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
