import { Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TaskList = ({ user, onRefresh, teamId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const role = user?.role;

        let url = `http://localhost:3006/api/tasks?teamId=${teamId}`;
        if (role === "Member") {
          url += `&userId=${userId}`;
        }

        const response = await axios.get(url);
        setTasks(response.data);
      } catch (error) {
        toast.error("Không thể lấy danh sách công việc", {
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

    if (user && teamId) {
      fetchTasks();
    }
  }, [user, onRefresh, teamId]);

  const columns = [
    {
      title: "Tiêu Đề",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <span
          style={{ fontWeight: "bold", color: "#1a3c34", fontSize: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <span style={{ color: "#555", fontSize: "14px" }}>
          {text || "Không có mô tả"}
        </span>
      ),
    },
    {
      title: "Người Tạo",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (createdBy) => (
        <span style={{ color: "#1a3c34", fontSize: "14px" }}>
          {createdBy ? createdBy.fullName : "Không có"}
        </span>
      ),
    },
    {
      title: "Người Được Giao",
      dataIndex: "assignees",
      key: "assignees",
      render: (assignees) => (
        <span style={{ color: "#555", fontSize: "14px" }}>
          {assignees.map((assignee) => assignee.fullName).join(", ")}
        </span>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Cần Làm"
              ? "blue"
              : status === "Đang Thực Hiện"
              ? "orange"
              : "green"
          }
          style={{
            fontWeight: "bold",
            borderRadius: "5px",
            padding: "5px 10px",
            fontSize: "14px",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Mức Ưu Tiên",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag
          color={
            priority === "Thấp"
              ? "green"
              : priority === "Trung Bình"
              ? "orange"
              : "red"
          }
          style={{
            fontWeight: "bold",
            borderRadius: "5px",
            padding: "5px 10px",
            fontSize: "14px",
          }}
        >
          {priority}
        </Tag>
      ),
    },
    {
      title: "Hạn Chót",
      dataIndex: "deadline",
      key: "deadline",
      render: (deadline) => (
        <span style={{ color: "#888", fontSize: "14px" }}>
          {new Date(deadline).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px",
        background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
        borderRadius: "15px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        loading={loading}
        style={{
          background: "white",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />

      <style>
        {`
          .table-row-light {
            background-color: #fafafa;
          }
          .table-row-dark {
            background-color: #ffffff;
          }
          .ant-table-thead > tr > th {
            background: linear-gradient(135deg, #f5f7fa, #e6e9f0) !important;
            color: #1a3c34 !important;
            font-size: 16px !important;
            font-weight: bold !important;
            padding: 16px !important;
            border-bottom: 2px solid #d9d9d9 !important;
          }
          .ant-table-tbody > tr > td {
            padding: 14px !important;
            font-size: 14px !important;
            border-bottom: 1px solid #f0f0f0 !important;
          }
          .ant-table-tbody > tr:hover > td {
            background: #f5f7fa !important;
          }
          @media (max-width: 768px) {
            .ant-table-thead > tr > th {
              font-size: 14px !important;
              padding: 12px !important;
            }
            .ant-table-tbody > tr > td {
              font-size: 12px !important;
              padding: 10px !important;
            }
          }
          @media (max-width: 480px) {
            .ant-table-thead > tr > th {
              font-size: 12px !important;
              padding: 8px !important;
            }
            .ant-table-tbody > tr > td {
              font-size: 11px !important;
              padding: 8px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TaskList;
