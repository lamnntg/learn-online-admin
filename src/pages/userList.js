import { Space, Table, Tag, Button, Dropdown, Menu, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import {
  DownOutlined,
  UserOutlined,
  DeleteOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { Option } = Select;
const { confirm } = Modal;

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tmpRoles, setTmpRoles] = useState([]);

  const [userSelected, setUserSelected] = useState({
    name: "",
    tags: [],
  });

  const showConfirm = (content, action) => {
    confirm({
      title: "Xác nhận thao tác",
      icon: <ExclamationCircleOutlined />,
      content: content,
      onOk() {
        if (action == "delete") {
          userService
            .deleteUser(userSelected.key)
            .then((res) => {
              setUsers(users.filter((user) => user.key !== userSelected.key));
              setUserSelected({
                name: "",
                tags: [],
              });
            })
            .catch((err) => {});
        }
        if (action == "block") {
          userService
            .updateRoles({ id: userSelected.key, roles: [] })
            .then((res) => {
              setUserSelected({
                name: "",
                tags: [],
              });
              let userChange = users.find(
                (user) => user.key === userSelected.key
              );
              userChange.tags = [];
              setUsers([...users]);
            });
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      showModal();
    }

    if (e.key === "2") {
      showConfirm(`Xác nhận chặn tài khoản: ${userSelected.name}`, "block");
    }

    if (e.key === "3") {
      showConfirm(`Xác nhận xóa tài khoản: ${userSelected.name}`, "delete");
    }
  };

  const handleClickDropDown = (user) => {
    setUserSelected(user);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "Cấp quyền",
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: "Block tài khoản",
          key: "2",
          icon: <WarningOutlined />,
        },
        {
          danger: true,
          label: "Xóa tài khoản",
          key: "3",
          icon: <DeleteOutlined />,
        },
      ]}
    />
  );

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Quyền hạn",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.length != 0 ? (
            tags.map((tag) => {
              let color = "green";

              if (tag === "admin") {
                color = "volcano";
              }

              if (tag === "moderator") {
                color = "geekblue";
              }

              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })
          ) : (
            <Tag color="red">Block</Tag>
          )}
        </>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            overlay={menu}
            onClick={() => {
              handleClickDropDown(record);
            }}
          >
            <Button>
              <Space>
                Thao tác
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await userService
      .updateRoles({ id: userSelected.key, roles: tmpRoles })
      .then((res) => {
        setIsModalVisible(false);
        setTmpRoles([]);
        setUserSelected({
          name: "",
          tags: [],
        });
        let userChange = users.find((user) => user.key === userSelected.key);
        userChange.tags = tmpRoles;
        setUsers([...users]);
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    userService
      .getAllUser()
      .then((result) => {
        let dataHandled = [];
        result.data.users.forEach((user) => {
          dataHandled.push({
            key: user._id,
            name: user.name,
            username: user.username,
            address: user.address,
            phone: user.phone,
            tags: user.roles.map((role) => role.name),
          });
        });
        setUsers(dataHandled);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (value) => {
    setTmpRoles(value);
  };

  return (
    <>
      <h2 className="text-center py-1">Danh sách người dùng</h2>
      <Table columns={columns} dataSource={users} />
      <Modal
        title={`Cấp quyền cho người dùng: ${userSelected.name}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="Chọn quyền cho người dùng"
          defaultValue={userSelected.tags}
          onChange={handleChange}
          optionLabelProp="label"
        >
          <Option value="admin" label="admin">
            <div className="demo-option-label-item">Quản trị (Admin)</div>
          </Option>
          <Option value="moderator" label="moderator">
            <div className="demo-option-label-item">Quản lý (Moderator)</div>
          </Option>
          <Option value="user" label="user">
            <div className="demo-option-label-item">Người dùng (User)</div>
          </Option>
        </Select>
      </Modal>
    </>
  );
}
