import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/apiPosts";

export default function usePosts() {
  const { data, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: Infinity,
  });

  return { data, isPending };
}
