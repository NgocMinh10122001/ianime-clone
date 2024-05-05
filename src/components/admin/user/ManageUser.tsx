"use client";
import React, { memo, useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, Select } from "antd";
import type { TableColumnsType } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiTrash, CiEdit } from "react-icons/ci";
import {
  createNewUser,
  deleteUser,
  deleteUserSelected,
  updateUser,
} from "@/server-action/index";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { SearchProps } from "antd/es/input/Search";

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  role: string;
}
interface IPaginate {
  total: number;
  pageSize: number;
  current: number;
}
interface IProps {
  users: DataType[];

  paginateA: IPaginate;
  valueSearch: string | number;
}
type FieldType = {
  oldPassword: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

const { Search } = Input;

function ManageUser(props: IProps) {
  let { users, paginateA, valueSearch } = props;
  // console.log(total);

  const data: DataType[] = [];
  users.map((item) => {
    data.push({
      key: item.id,
      id: item.id,
      name: item.name,
      email: item.email,
      role: item.role,
    });
  });
  const router = useRouter();
  const pathName = usePathname();
  const params = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isInputSpecial, setIsInputSpecial] = useState(false);
  const [isInputEmail, setIsInputEmail] = useState(false);
  const [userId, setUserId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { Option } = Select;
  const [form] = Form.useForm();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Options",
      dataIndex: "id",
      align: "center",
      render: (value: string, record: DataType, index: number) => {
        return (
          <div className="text-neutral-900 flex items-center gap-4 justify-center">
            {/* <>{console.log(value[index])}</> */}
            <button type="button" onClick={() => handleEditUser(record)}>
              <CiEdit size={20} className={"text-yellow-500"} />
            </button>
            <button type="button" onClick={() => handleDeleteUser(value)}>
              <CiTrash size={20} className={"text-red-500"} />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(false);
    if (users.length <= 0) {
      let page = params.get("page") || 2;
      router.replace(`${pathName}?page=${+(page as string) - 1}`);
    }
  }, [users]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    let arraySelected: string[] = newSelectedRowKeys.map((item) =>
      String(item)
    );

    setSelectedRowKeys(arraySelected);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleDeleteUser = async (userId: string) => {
    let confirmed = confirm("Are you sure ?");
    if (confirmed) {
      let res = await deleteUser(userId);
      console.log(res);
      if (res && res.errCode === 0) {
        toast.success("Delete Success, Please Refresh Again!");
        return;
      }
      toast.error("Delete Failure, Please Refresh Or Try Again!");
      return;
    }
    return;

    // if (userIds && userIds.length > 0) {
    //   let res = await deleteNewUser(userIds);
    //   return;
    // }
    // return;
  };
  const handleDeleteUserSelected = async (userIds: string[]) => {
    let confirmed = confirm("Are you sure ?");
    if (confirmed) {
      if (userIds && userIds.length > 0) {
        let res = await deleteUserSelected(userIds);
        if (res && res.errCode === 0) {
          toast.success("Delete Success, Please Refresh Again!");
          return;
        }
      }
      toast.error("Delete Failure, Please Refresh Or Try Again!");
      return;
    }
    return;
  };
  const handleEditUser = async (user: DataType) => {
    // let res = await getUser(user);
    setUserId(user.id);
    setIsEdit(true);
    setIsModalOpen(true);

    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    // console.log(res?.data);
    // if(res)
  };

  const handleOk = () => {
    setLoadingModal(true);
    setTimeout(() => {
      setLoadingModal(false);
      setIsModalOpen(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    onReset();
  };

  const handlePagination = (page: string | number) => {
    // let page = params.get("page") || 2;
    let search = params.get("search");
    if (search) {
      router.replace(`${pathName}?page=${page}&&search=${search}`);
      setLoading(true);
      return;
    }
    router.replace(`${pathName}?page=${page}`);
    setLoading(true);
  };

  const handleInputChange = (e: any, name: string) => {
    const value = e.target.value;

    // Regular expression to allow only alphanumeric characters
    if (name === "name") {
      const alphanumericRegex = /^[a-zA-Z0-9]*$/;

      if (alphanumericRegex.test(value)) {
        setInputValue(value);
        setIsInputSpecial(false);
      } else {
        // Display an alert or handle it in a way that suits your application
        setIsInputSpecial(true);
      }
    } else {
      const alphanumericRegex = /^[a-zA-Z0-9-.@]*$/;

      if (alphanumericRegex.test(value)) {
        setInputValue(value);
        setIsInputEmail(false);
      } else {
        // Display an alert or handle it in a way that suits your application
        setIsInputEmail(true);
      }
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const onFinish = async (values: {
    name: string;
    oldPassword: string;
    password: string;
    email: string;
    role: string;
  }) => {
    // console.log(values);
    if (isInputSpecial || isInputEmail) {
      toast.error("Name or Email not true, please try again!");
      return;
    }

    if (isEdit) {
      setLoadingModal(true);
      let res = await updateUser(values, userId);

      if (res?.errCode === 0) {
        toast.success("Update user success!");
        setLoadingModal(false);
        setIsModalOpen(false);
        onReset();
        return;
      } else if (res?.errCode === 1) {
        toast.error("Old password is wrong, please try again!");
        setLoadingModal(false);
        return;
      }

      toast.error("Update user failure, please try again!");
      setLoadingModal(false);
      // onReset();
      return;
    }
    setLoadingModal(true);
    let res = await createNewUser(values);

    if (res?.errCode !== 0) {
      toast.error("User existed, please try again!");
      setLoadingModal(false);
      // onReset();
      return;
    }
    toast.success("Create new user success!");
    setLoadingModal(false);
    setIsModalOpen(false);
    onReset();
    return;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    let page = params.get("page");
    if (value === "") {
      router.replace(`${pathName}`);
      return;
    }
    router.replace(`${pathName}?search=${value}`);
    return;
  };

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className=" px-4">
      <div
        style={{ marginBottom: 16 }}
        className="flex justify-between flex-wrap gap-4"
      >
        <div className="flex items-center  gap-4">
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
            style={{ border: `${hasSelected ? "#fff" : "none"}` }}
          >
            Reload
          </Button>

          <Button
            type="default"
            disabled={!hasSelected}
            style={{ border: `${hasSelected ? "#fff" : "none"}` }}
            onClick={() => handleDeleteUserSelected(selectedRowKeys)}
          >
            Delete User Selected
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {/* <>{console.log(valueSearch)}</> */}
          <Search
            defaultValue={valueSearch || ""}
            placeholder="find user ..."
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            // onClick={start}
            // disabled={!hasSelected}
            // loading={loading}

            className={"bg-blue-500 "}
            onClick={showModal}
          >
            Add
          </Button>
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          ...paginateA,
          onChange: (page) => handlePagination(page),
        }}
        loading={loading}
      />
      <Modal
        title={`${isEdit ? "Update User" : "New User"}`}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 700 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
            className={`relative ${
              isInputSpecial
                ? "before:absolute before:top-[3%] before:right-[3%] before:content-['+'] before:rotate-45 before:text-xl  before:text-red-500"
                : ""
            }`}
          >
            <Input
              value={inputValue}
              onChange={(event: any) => handleInputChange(event, "name")}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
            className={`relative ${
              isInputEmail
                ? "before:absolute before:top-[3%] before:right-[3%] before:content-['+'] before:rotate-45 before:text-xl  before:text-red-500"
                : ""
            }`}
          >
            <Input
              type="email"
              onChange={(event: any) => handleInputChange(event, "email")}
            />
          </Form.Item>

          {isEdit ? (
            <Form.Item<FieldType>
              label="Old Password"
              name="oldPassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          ) : (
            ""
          )}
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Role"
            name="role"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select role"
              // onChange={onGenderChange}
              allowClear
            >
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item name="button" wrapperCol={{ offset: 14, span: 16 }}>
            <div>
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="ms-1 bg-blue-500"
                loading={loadingModal}
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default memo(ManageUser);
