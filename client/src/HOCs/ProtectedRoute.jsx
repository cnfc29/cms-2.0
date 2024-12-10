import { Navigate } from "react-router-dom";
import { ROUTER } from "../router.config";

export default function ProtectedRoute({
  isAllowed,
  redirectPath = ROUTER.signIn,
  children,
}) {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;

  return children;
}
