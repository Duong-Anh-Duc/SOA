import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  const validateUser = async () => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      console.log("No token found in localStorage");
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3006/api/validate/user",
        { token }
      );
      console.log("Validate user response:", response.data);
      if (response.data.isValid) {
        setIsAuthenticated(true);
        setUser(response.data.user);

        const userId = localStorage.getItem("userId");
        const teamsResponse = await axios.get(
          `http://localhost:3006/api/teams/by-member/${userId}`
        );
        setTeams(teamsResponse.data);
      } else {
        setIsAuthenticated(false);
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Validate user error:", error.message);
      setIsAuthenticated(false);
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async (userId, token) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);

    // Gọi validateUser ngay sau khi đăng nhập
    await validateUser();
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setUser(null);
    setTeams([]);
  };

  useEffect(() => {
    // Chỉ chạy validateUser khi component mount lần đầu
    validateUser();
  }, []); // Xóa isAuthenticated khỏi dependency array

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout, teams }}
    >
      {children}
    </AuthContext.Provider>
  );
};
