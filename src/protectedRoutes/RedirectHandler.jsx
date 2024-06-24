import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectHandler = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "user") {
        navigate("/user-dashboard");
      }
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return null;
};

export default RedirectHandler;
