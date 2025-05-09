import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <h1>Loading...</h1>
      <p className="text-xl text-primary-200">Fetching Data...</p>
    </div>
  );
}
