import Spinner from "../_components/Spinner";

export default function Loader() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-primary-200 text-xl">Loading cabin data</p>
    </div>
  );
}
