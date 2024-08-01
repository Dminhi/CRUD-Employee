import { Button, Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Elm St",
      email: "jane@example.com",
    },
  ]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleAdd = () => {
    if (name && address && email) {
      const newEmployee = { id: employees.length + 1, name, address, email };
      setEmployees([...employees, newEmployee]);
      setName("");
      setAddress("");
      setEmail("");
    } else {
      alert("Please fill out all fields");
    }
  };

  const handleRemove = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsEditModalVisible(true);
  };

  const handleUpdate = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === editingEmployee.id ? editingEmployee : employee
      )
    );
    setIsEditModalVisible(false);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleEdit(record)} type="default">
            Edit
          </Button>
          <Button onClick={() => handleRemove(record.id)} type="primary" danger>
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Employee Registration Form</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="space-y-4 flex gap-8">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex space-x-4 mt-4">
            <Button onClick={handleAdd} type="primary" className="flex-1">
              Add
            </Button>
            <Button
              onClick={() => {
                setName("");
                setAddress("");
                setEmail("");
              }}
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">List of Employees</h2>
      <Table
        dataSource={employees}
        columns={columns}
        rowKey="id"
        className="shadow-lg"
      />

      <Modal
        title="Edit Employee"
        visible={isEditModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={editingEmployee?.name}
              onChange={(e) =>
                setEditingEmployee({
                  ...editingEmployee,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              value={editingEmployee?.address}
              onChange={(e) =>
                setEditingEmployee({
                  ...editingEmployee,
                  address: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={editingEmployee?.email}
              onChange={(e) =>
                setEditingEmployee({
                  ...editingEmployee,
                  email: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeForm;
