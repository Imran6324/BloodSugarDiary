import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
export default function LogRoute({ children }) {
  const { currentUser } = useAuth()
  return !currentUser ? children : <Navigate to="/" replace />;
}
