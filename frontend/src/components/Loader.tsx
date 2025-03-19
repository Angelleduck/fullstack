import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="h-[calc(100vh-48px)] flex items-center justify-center">
      <LoaderCircle
        size={140}
        className="text-blue-400 font-bold animate-spin"
      />
    </div>
  );
}
