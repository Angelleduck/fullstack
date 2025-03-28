import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";

export function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/", { replace: true });
    },
  });

  return { login, isPending, isError };
}
