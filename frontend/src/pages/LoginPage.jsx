import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaLock, FaSignInAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login, loading: authLoading } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3006/api/users/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response.data.message === "Đăng nhập thành công") {
        login(response.data.userId, response.data.token);
        message.success("Đăng nhập thành công!");
        navigate("/", { replace: true });
      } else {
        throw new Error("Phản hồi không hợp lệ từ server");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.1)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          top: "10%",
          left: "10%",
          animation: "float 6s infinite ease-in-out",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
          bottom: "15%",
          right: "15%",
          animation: "float 8s infinite ease-in-out",
          zIndex: 0,
        }}
      />
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "40px 30px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          maxWidth: "400px",
          width: "100%",
          zIndex: 2,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#1a3c34",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <FaSignInAlt style={{ color: "#6e8efb", fontSize: "30px" }} />
            Chào Mừng Trở Lại
          </h2>
          <p style={{ color: "#888", fontSize: "14px" }}>
            Vui lòng đăng nhập vào tài khoản của bạn
          </p>
        </div>
        <Form name="login" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
            ]}
          >
            <Input
              prefix={<FaUser style={{ color: "#888", marginRight: "8px" }} />}
              placeholder="Email"
              style={{
                height: "45px",
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
                padding: "0 15px",
                fontSize: "16px",
                transition: "all 0.3s",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              onFocus={(e) =>
                (e.target.style = {
                  ...e.target.style,
                  borderColor: "#6e8efb",
                  boxShadow: "0 0 0 2px rgba(110, 142, 251, 0.2)",
                })
              }
              onBlur={(e) =>
                (e.target.style = {
                  ...e.target.style,
                  borderColor: "#d9d9d9",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            ]}
          >
            <Input.Password
              prefix={<FaLock style={{ color: "#888", marginRight: "8px" }} />}
              placeholder="Mật Khẩu"
              style={{
                height: "45px",
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
                padding: "0 15px",
                fontSize: "16px",
                transition: "all 0.3s",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              onFocus={(e) =>
                (e.target.style = {
                  ...e.target.style,
                  borderColor: "#6e8efb",
                  boxShadow: "0 0 0 2px rgba(110, 142, 251, 0.2)",
                })
              }
              onBlur={(e) =>
                (e.target.style = {
                  ...e.target.style,
                  borderColor: "#d9d9d9",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: "100%",
                height: "45px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                border: "none",
                fontSize: "16px",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(110, 142, 251, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FaSignInAlt /> Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
