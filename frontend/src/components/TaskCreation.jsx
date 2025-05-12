import { Button, DatePicker, Form, Input, Modal, Select, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaPlusCircle, FaTag, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

const TaskCreation = ({ user, onTaskCreated, onClose, teamId }) => {
  const [form] = Form.useForm();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [pendingValues, setPendingValues] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3006/api/teams/${teamId}/members`
        );
        setTeamMembers(response.data);
      } catch (error) {
        toast.error("Không thể lấy danh sách thành viên nhóm", {
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
    fetchTeamMembers();
  }, [teamId]);

  const onFinish = (values) => {
    // Lưu giá trị biểu mẫu để hiển thị trong modal xác nhận
    setPendingValues(values);
    setIsConfirmModalVisible(true);
  };

  const handleConfirmCreate = async () => {
    setLoading(true);
    try {
      const values = pendingValues;
      const response = await axios.post(
        "http://localhost:3006/api/task-creation/create-and-assign",
        {
          title: values.title,
          description: values.description,
          deadline: values.deadline.toISOString(),
          status: values.status || "Cần Làm",
          priority: values.priority || "Trung Bình",
          startDate: values.startDate ? values.startDate.toISOString() : null,
          createdById: localStorage.getItem("userId"),
          assigneeIds: values.assignees,
          teamId: teamId,
          attachments: [],
        }
      );
      toast.success("Tạo công việc thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      if (onTaskCreated) {
        onTaskCreated(values.title, values.assignees);
      }
      form.resetFields();
      setIsConfirmModalVisible(false);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Không thể tạo công việc", {
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

  const handleCancelConfirm = () => {
    setIsConfirmModalVisible(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
        className="task-creation-form"
      >
        <Form.Item
          name="title"
          label={
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1a3c34",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaTag style={{ color: "#6e8efb", fontSize: "20px" }} /> Tiêu Đề
              Công Việc
            </span>
          }
          rules={[
            { required: true, message: "Vui lòng nhập tiêu đề công việc!" },
          ]}
        >
          <Input
            placeholder="Nhập tiêu đề công việc"
            style={{
              height: "48px",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
              padding: "0 15px",
              fontSize: "16px",
              transition: "all 0.3s",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
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
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              })
            }
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1a3c34",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaTag style={{ color: "#6e8efb", fontSize: "20px" }} /> Mô Tả
            </span>
          }
          style={{ gridColumn: "span 2" }}
        >
          <Input.TextArea
            placeholder="Nhập mô tả công việc"
            rows={4}
            style={{
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
              padding: "10px 15px",
              fontSize: "16px",
              transition: "all 0.3s",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              resize: "none",
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
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              })
            }
          />
        </Form.Item>

        <Form.Item
          name="deadline"
          label={
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1a3c34",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaCalendarAlt style={{ color: "#6e8efb", fontSize: "20px" }} />{" "}
              Hạn Chót
            </span>
          }
          rules={[{ required: true, message: "Vui lòng chọn hạn chót!" }]}
        >
          <DatePicker
            showTime
            placeholder="Chọn hạn chót"
            style={{
              width: "100%",
              height: "48px",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
              fontSize: "16px",
              transition: "all 0.3s",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
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
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              })
            }
          />
        </Form.Item>

        <Form.Item
          name="startDate"
          label={
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1a3c34",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaCalendarAlt style={{ color: "#6e8efb", fontSize: "20px" }} />{" "}
              Ngày Bắt Đầu
            </span>
          }
        >
          <DatePicker
            showTime
            placeholder="Chọn ngày bắt đầu"
            style={{
              width: "100%",
              height: "48px",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
              fontSize: "16px",
              transition: "all 0.3s",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
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
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              })
            }
          />
        </Form.Item>

        <Form.Item
          name="status"
          label={
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1a3c34",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaTag style={{ color: "#6e8efb", fontSize: "20px" }} /> Trạng
              Thái
            </span>
          }
          initialValue="Cần Làm"
        >
          <Select
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              height: "48px",
            }}
            dropdownStyle={{
              borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Select.Option value="Cần Làm">Cần Làm</Select.Option>
            <Select.Option value="Đang Thực Hiện">Đang Thực Hiện</Select.Option>
            <Select.Option value="Hoàn Thành">Hoàn Thành</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="priority"
          label={
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1a3c34",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaTag style={{ color: "#6e8efb", fontSize: "20px" }} /> Mức Ưu
              Tiên
            </span>
          }
          initialValue="Trung Bình"
        >
          <Select
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              height: "48px",
            }}
            dropdownStyle={{
              borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Select.Option value="Thấp">Thấp</Select.Option>
            <Select.Option value="Trung Bình">Trung Bình</Select.Option>
            <Select.Option value="Cao">Cao</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="assignees"
          label={
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1a3c34",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaUsers style={{ color: "#6e8efb", fontSize: "20px" }} /> Người
              Được Giao
            </span>
          }
          rules={[
            { required: true, message: "Vui lòng chọn người được giao!" },
          ]}
          style={{ gridColumn: "span 2" }}
        >
          <Select
            mode="multiple"
            placeholder="Chọn người được giao"
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              height: "48px",
            }}
            dropdownStyle={{
              borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            {teamMembers.map((member) => (
              <Select.Option key={member.id} value={member.id}>
                {member.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div
          style={{
            gridColumn: "span 2",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <Button
            onClick={onClose}
            style={{
              height: "48px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "1px solid #d9d9d9",
              transition: "all 0.3s",
            }}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
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
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaPlusCircle /> Tạo Công Việc
          </Button>
        </div>
      </Form>

      <Modal
        title={
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#1a3c34",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaPlusCircle style={{ color: "#6e8efb", fontSize: "22px" }} />
            Xác Nhận Tạo Công Việc
          </span>
        }
        visible={isConfirmModalVisible}
        onOk={handleConfirmCreate}
        onCancel={handleCancelConfirm}
        okText="Xác Nhận"
        cancelText="Hủy"
        centered
        okButtonProps={{
          style: {
            background: "linear-gradient(135deg, #6e8efb, #a777e3)",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(110, 142, 251, 0.4)",
            height: "40px",
          },
        }}
        cancelButtonProps={{
          style: {
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "1px solid #d9d9d9",
            height: "40px",
          },
        }}
      >
        <p
          style={{
            fontSize: "16px",
            color: "#1a3c34",
            marginBottom: "20px",
          }}
        >
          Bạn có chắc chắn muốn tạo công việc này không?
        </p>
        {pendingValues && (
          <div
            style={{
              padding: "15px",
              background: "#f9f9f9",
              borderRadius: "10px",
              border: "1px solid #e8e8e8",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#1a3c34",
                marginBottom: "10px",
              }}
            >
              <strong>Tiêu Đề:</strong> {pendingValues.title}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#1a3c34",
                marginBottom: "10px",
              }}
            >
              <strong>Mô Tả:</strong> {pendingValues.description || "Không có"}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#1a3c34",
                marginBottom: "10px",
              }}
            >
              <strong>Hạn Chót:</strong>{" "}
              {pendingValues.deadline.toLocaleString()}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#1a3c34",
                marginBottom: "10px",
              }}
            >
              <strong>Ngày Bắt Đầu:</strong>{" "}
              {pendingValues.startDate
                ? pendingValues.startDate.toLocaleString()
                : "Không có"}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#1a3c34",
                marginBottom: "10px",
              }}
            >
              <strong>Trạng Thái:</strong>{" "}
              <Tag
                color={
                  pendingValues.status === "Cần Làm"
                    ? "blue"
                    : pendingValues.status === "Đang Thực Hiện"
                    ? "orange"
                    : "green"
                }
              >
                {pendingValues.status || "Cần Làm"}
              </Tag>
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#1a3c34",
                marginBottom: "10px",
              }}
            >
              <strong>Mức Ưu Tiên:</strong>{" "}
              <Tag
                color={
                  pendingValues.priority === "Thấp"
                    ? "green"
                    : pendingValues.priority === "Trung Bình"
                    ? "orange"
                    : "red"
                }
              >
                {pendingValues.priority || "Trung Bình"}
              </Tag>
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#1a3c34",
                marginBottom: "10px",
              }}
            >
              <strong>Người Được Giao:</strong>{" "}
              {pendingValues.assignees
                .map((id) => teamMembers.find((m) => m.id === id)?.fullName)
                .join(", ")}
            </p>
          </div>
        )}
      </Modal>

      <style>
        {`
          .task-creation-form {
            padding: 0 !important;
          }
          .task-creation-form .ant-form-item {
            margin-bottom: 16px !important;
          }
          @media (max-width: 768px) {
            .task-creation-form {
              grid-template-columns: 1fr !important;
              gap: 15px !important;
            }
            .task-creation-form .ant-form-item-label > label {
              font-size: 16px !important;
            }
            .task-creation-form .ant-input,
            .task-creation-form .ant-select,
            .task-creation-form .ant-picker {
              height: 44px !important;
              font-size: 14px !important;
            }
            .task-creation-form .ant-btn {
              height: 44px !important;
              font-size: 14px !important;
            }
          }
          @media (max-width: 480px) {
            .task-creation-form .ant-form-item-label > label {
              font-size: 14px !important;
            }
            .task-creation-form .ant-input,
            .task-creation-form .ant-select,
            .task-creation-form .ant-picker {
              height: 40px !important;
              fontSize: 13px !important;
            }
            .task-creation-form .ant-btn {
              height: 40px !important;
              fontSize: 13px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TaskCreation;
