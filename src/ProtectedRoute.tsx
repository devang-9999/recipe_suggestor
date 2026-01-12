import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const loggedInUser = useSelector(
    (state) => state.users.loggedInUser
  );

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
