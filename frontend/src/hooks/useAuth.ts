import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiAuth";

export default function useAuth() {
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
  });

  return { data, isPending };
}
