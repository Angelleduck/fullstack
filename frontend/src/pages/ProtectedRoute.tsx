import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PropsWithChildren, useLayoutEffect } from "react";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { data, isPending } = useAuth();

  useLayoutEffect(() => {
    if (!data && !isPending) {
      navigate("/login", { replace: true });
    }
  }, [navigate, data, isPending]);

  if (data) {
    return children;
  }
}
