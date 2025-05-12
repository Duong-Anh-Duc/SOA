import { Button, Card, List, Modal } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import {
  FaPlus,
  FaTasks,
  FaUserFriends,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import TaskCreation from "./TaskCreation";

const TeamSelection = ({ onSelectTeam }) => {
  const { teams, user, loading } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleCreateTask = async (team) => {
    try {
      const userId = localStorage.getItem("userId");
      const validationResponse = await axios.get(
        `http://localhost:3006/api/validate/admin?userId=${userId}&teamId=${team.id}`
      );
      if (validationResponse.data.isValid) {
        setSelectedTeamId(team.id);
        setIsModalVisible(true);
      } else {
        toast.error("Bạn không có quyền quản trị viên trong nhóm này!", {
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
      toast.error("Không thể xác thực quyền quản trị viên", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedTeamId(null);
  };

  const handleTaskCreated = (taskTitle, assigneeIds) => {
    const userId = localStorage.getItem("userId");
    if (assigneeIds.includes(parseInt(userId))) {
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
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
        background: "linear-gradient(145deg, #e3f2fd, #bbdefb)",
        minHeight: "calc(100vh - 64px)",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hiệu ứng nền động */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "200px",
          height: "200px",
          background: "rgba(110, 142, 251, 0.2)",
          borderRadius: "50%",
          animation: "float 8s infinite ease-in-out",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          right: "-30px",
          width: "250px",
          height: "250px",
          background: "rgba(167, 119, 227, 0.2)",
          borderRadius: "50%",
          animation: "float 10s infinite ease-in-out",
          zIndex: 0,
        }}
      />

      <div
        style={{
          marginBottom: "40px",
          padding: "0 10px",
          zIndex: 1,
          position: "relative",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#1a3c34",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: 0,
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
            animation: "fadeInDown 0.8s ease-in-out",
          }}
        >
          <FaUsers style={{ color: "#6e8efb", fontSize: "40px" }} />
          Chọn Nhóm Của Bạn
        </h2>
      </div>

      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid #6e8efb",
              borderTop: "5px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          />
        </div>
      ) : !user ? (
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            background: "rgba(255, 255, 167, 119, 227, 0.7)",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            animation: "fadeIn 0.5s ease-in-out",
            backdropFilter: "blur(5px)",
          }}
        >
          <p
            style={{
              color: "#888",
              fontSize: "18px",
              fontStyle: "italic",
              margin: 0,
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            Vui lòng đăng nhập để xem danh sách nhóm.
          </p>
        </div>
      ) : teams.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            animation: "fadeIn 0.5s ease-in-out",
            backdropFilter: "blur(5px)",
          }}
        >
          <p
            style={{
              color: "#888",
              fontSize: "18px",
              fontStyle: "italic",
              margin: 0,
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            Bạn không phải là thành viên của bất kỳ nhóm nào.
          </p>
        </div>
      ) : (
        <>
          <List
            grid={{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4 }}
            dataSource={teams}
            renderItem={(team) => (
              <List.Item style={{ animation: "fadeInUp 0.5s ease-in-out" }}>
                <Card
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    background: "linear-gradient(135deg, #ffffff, #e8f0fe)",
                    transition: "all 0.4s ease",
                    border: "none",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(110, 142, 251, 0.3)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #f5faff, #dfebff)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(0, 0, 0, 0.15)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #ffffff, #e8f0fe)";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "100px",
                      background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                      opacity: 0.25,
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                      clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      padding: "25px",
                      textAlign: "center",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "600",
                        color: "#1a3c34",
                        marginBottom: "12px",
                        marginTop: "20px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.05)",
                      }}
                      title={team.name}
                    >
                      {team.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#4a5568",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        fontWeight: "500",
                      }}
                    >
                      <FaUserShield
                        style={{ color: "#6e8efb", fontSize: "16px" }}
                      />
                      Quản Lý:{" "}
                      <span style={{ color: "#2d3748" }}>
                        {team.admin.fullName}
                      </span>
                    </p>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#4a5568",
                        marginBottom: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        fontWeight: "500",
                      }}
                    >
                      <FaUserFriends
                        style={{ color: "#6e8efb", fontSize: "16px" }}
                      />
                      Thành Viên:{" "}
                      <span style={{ color: "#2d3748" }}>
                        {team.members.length}
                      </span>
                    </p>
                    <Button
                      type="primary"
                      onClick={() => handleCreateTask(team)}
                      style={{
                        borderRadius: "25px",
                        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                        border: "none",
                        fontSize: "13px",
                        fontWeight: "600",
                        boxShadow: "0 4px 12px rgba(110, 142, 251, 0.4)",
                        transition: "all 0.3s ease",
                        padding: "8px 16px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <FaPlus /> Tạo và Giao Việc
                    </Button>
                  </div>
                </Card>
              </List.Item>
            )}
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
              teamId={selectedTeamId}
            />
          </Modal>
        </>
      )}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
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
              transform: translateY(-15px);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 768px) {
            .ant-list-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            h2 {
              font-size: 28px !important;
            }
            h2 svg {
              font-size: 32px !important;
            }
          }

          @media (max-width: 480px) {
            .ant-list-grid {
              grid-template-columns: 1fr !important;
            }
            h2 {
              font-size: 24px !important;
            }
            h2 svg {
              font-size: 28px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TeamSelection;
