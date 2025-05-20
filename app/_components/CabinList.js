import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";
async function CabinList({ filter }) {
  const cabins = await getCabins();
  if (!cabins.length) return null;

  const filters = {
    small(cabins) {
      return cabins.filter((cabin) => cabin.maxCapacity <= 2);
    },
    medium(cabins) {
      return cabins.filter(
        (cabin) => cabin.maxCapacity >= 3 && cabin.maxCapacity <= 6,
      );
    },
    large(cabins) {
      return cabins.filter((cabin) => cabin.maxCapacity > 6);
    },
  };
  const displayCabin = filters[filter]?.(cabins) || cabins;
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayCabin.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
