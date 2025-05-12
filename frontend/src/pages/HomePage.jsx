import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Layout,
  List,
  Menu,
  Modal,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FaBell, FaCheck, FaPlus, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TaskCreation from "../components/TaskCreation";
import TaskList from "../components/TaskList";
import TeamSelection from "../components/TeamSelection";
import { AuthContext } from "../context/AuthContext";

const { Header, Content } = Layout;

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleTaskCreated = (taskTitle, assigneeIds) => {
    const userId = localStorage.getItem("userId");
    if (assigneeIds.includes(parseInt(userId))) {
      const newNotification = {
        id: Date.now(),
        message: `Bạn đã được giao một công việc mới: ${taskTitle}`,
        timestamp: new Date().toLocaleString(),
        isRead: false,
      };
      setNotifications((prev) => [newNotification, ...prev].slice(0, 5));
      toast.info(`Bạn đã được giao một công việc mới: ${taskTitle}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    setRefreshKey((prev) => prev + 1);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleViewNotification = (notification) => {
    setSelectedNotification(notification);
    markAsRead(notification.id);
  };

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  const handleBackToTeamSelection = () => {
    setSelectedTeam(null);
  };

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const notificationMenu = (
    <div
      style={{
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        width: "360px",
        maxHeight: "400px",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px",
          marginBottom: "10px",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#1a3c34",
            margin: 0,
          }}
        >
          Thông Báo
        </h3>
        {notifications.length > 0 && (
          <Button
            type="link"
            onClick={markAllAsRead}
            style={{
              color: "#6e8efb",
              fontSize: "14px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FaCheck /> Đánh Dấu Tất Cả Là Đã Đọc
          </Button>
        )}
      </div>
      {notifications.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#888",
            fontSize: "14px",
            margin: 0,
          }}
        >
          Không có thông báo
        </p>
      ) : (
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "10px",
                borderBottom: "1px solid #f0f0f0",
                transition: "background 0.3s",
                background: item.isRead ? "#f9f9f9" : "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = item.isRead
                  ? "#f0f0f0"
                  : "#f5f7fa")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = item.isRead
                  ? "#f9f9f9"
                  : "#fff")
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar icon={<FaTasks style={{ color: "#6e8efb" }} />} />
                }
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: item.isRead ? "#888" : "#1a3c34",
                        fontSize: "14px",
                        fontWeight: item.isRead ? "normal" : "bold",
                        cursor: "pointer",
                      }}
                      onClick={() => handleViewNotification(item)}
                    >
                      {item.message}
                    </span>
                    {!item.isRead && (
                      <Button
                        type="link"
                        onClick={() => markAsRead(item.id)}
                        style={{
                          color: "#6e8efb",
                          fontSize: "12px",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <FaCheck /> Đánh Dấu Là Đã Đọc
                      </Button>
                    )}
                  </div>
                }
                description={
                  <span style={{ color: "#888", fontSize: "12px" }}>
                    {item.timestamp}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      }}
    >
      <Header
        style={{
          background: "linear-gradient(90deg, #6e8efb, #a777e3)",
          padding: "0 20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          position: "fixed",
          width: "100%",
          zIndex: 10,
          height: "64px",
          lineHeight: "64px",
        }}
      >
        <div
          style={{
            float: "left",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaTasks style={{ color: "white", fontSize: "28px" }} />
          Phân Công Công Việc
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            float: "right",
            background: "transparent",
            lineHeight: "64px",
          }}
        >
          <Menu.Item key="notifications">
            <Dropdown overlay={notificationMenu} trigger={["click"]}>
              <Badge count={unreadCount} style={{ backgroundColor: "#ff4d4f" }}>
                <FaBell
                  style={{
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              </Badge>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="user">
            <span
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Chào mừng, {user ? user.fullName : "Khách"}
            </span>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button
              type="link"
              onClick={handleLogout}
              style={{
                color: "white",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaSignOutAlt /> Đăng Xuất
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="container"
        style={{
          padding: "80px 20px 20px",
          margin: "0 auto",
          minHeight: "calc(100vh - 64px)",
          background: "transparent",
          maxWidth: "1400px",
        }}
      >
        <div style={{ animation: "fadeIn 0.5s ease-in-out" }}>
          {selectedTeam ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#1a3c34",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <FaTasks style={{ color: "#6e8efb", fontSize: "30px" }} />
                  Danh Sách Công Việc - {selectedTeam.name}
                </h2>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    onClick={handleBackToTeamSelection}
                    style={{
                      height: "48px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      border: "1px solid #d9d9d9",
                      transition: "all 0.3s",
                    }}
                  >
                    Quay Lại Nhóm
                  </Button>
                  <Button
                    type="primary"
                    onClick={showModal}
                    style={{
                      height: "48px",
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
                      padding: "0 20px",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <FaPlus /> Thêm Công Việc
                  </Button>
                </div>
              </div>
              <TaskList
                user={user}
                onRefresh={refreshKey}
                teamId={selectedTeam.id}
              />
              <Modal
                title={
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#1a3c34",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaTasks style={{ color: "#6e8efb", fontSize: "26px" }} />
                    Tạo Công Việc Mới
                  </span>
                }
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                width={800}
                bodyStyle={{
                  padding: "20px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
                }}
                centered
              >
                <TaskCreation
                  user={user}
                  onTaskCreated={handleTaskCreated}
                  onClose={handleModalClose}
                  teamId={selectedTeam.id}
                />
              </Modal>
            </>
          ) : (
            <TeamSelection onSelectTeam={handleSelectTeam} />
          )}
          <Modal
            title={
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1a3c34",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaBell style={{ color: "#6e8efb", fontSize: "26px" }} />
                Chi Tiết Thông Báo
              </span>
            }
            visible={!!selectedNotification}
            onCancel={() => setSelectedNotification(null)}
            footer={null}
            width={500}
            bodyStyle={{
              padding: "20px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
            }}
            centered
          >
            {selectedNotification && (
              <div style={{ padding: "10px" }}>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#1a3c34",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Thông Điệp:</strong> {selectedNotification.message}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#888",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Thời Gian:</strong> {selectedNotification.timestamp}
                </p>
              </div>
            )}
          </Modal>
        </div>
        <style>
          {`
              @media (max-width: 768px) {
                .container {
                  padding: 80px 15px 15px !important;
                }
                .container h2 {
                  font-size: 24px !important;
                }
                .container h2 svg {
                  font-size: 26px !important;
                }
                .ant-btn {
                  height: 44px !important;
                  font-size: 14px !important;
                  padding: 0 15px !important;
                }
              }
              @media (max-width: 480px) {
                .container {
                  padding: 80px 10px 10px !important;
                }
                .container h2 {
                  font-size: 20px !important;
                }
                .container h2 svg {
                  font-size: 22px !important;
                }
                .ant-btn {
                  height: 40px !important;
                  font-size: 13px !important;
                  padding: 0 10px !important;
                }
              }
            `}
        </style>
      </Content>
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
          `}
      </style>
    </Layout>
  );
};

export default HomePage;
