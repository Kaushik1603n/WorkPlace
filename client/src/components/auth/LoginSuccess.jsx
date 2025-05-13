import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("access_token");

      if (!token) {
        return navigate("/login");
      }

      localStorage.setItem("access_token", token);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } catch (error) {
        console.error("user fetching error", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return <div>login......</div>;
}

export default LoginSuccess;
