import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={user?.role === "instructor" ? "/instructor" : "/student"} replace />;
};

export default Index;
