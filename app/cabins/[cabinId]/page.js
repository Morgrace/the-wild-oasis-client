import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}
// converting to static page;
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: cabin.id.toString() }));

  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  const { id, name, maxCapacity, image, description } = cabin;

  return (
    <div className="mx-auto mt-8 max-w-max">
      <div className="border-primary-800 mb-24 grid grid-cols-[3fr_4fr] gap-20 border px-10 py-3">
        <div className="relative -translate-x-3 scale-[1.15]">
          <Image
            fill
            quality={80}
            className="object-cover"
            src={image}
            alt={`Cabin ${name}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div>
          <h3 className="text-accent-100 bg-primary-950 mb-5 w-[150%] translate-x-[-254px] p-6 pb-1 text-7xl font-black">
            Cabin {name}
          </h3>

          <p className="text-primary-300 mb-10 text-lg">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="mb-7 flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <UsersIcon className="text-primary-600 h-5 w-5" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MapPinIcon className="text-primary-600 h-5 w-5" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <EyeSlashIcon className="text-primary-600 h-5 w-5" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Suspense key={id} fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
