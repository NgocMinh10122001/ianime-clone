"use client";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table, Input } from "antd";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { User } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddForm from "./form/AddForm";
import { ToastContainer } from "react-toastify";
import useDarkMode from "@/components/useDarkMode";

interface ICurrent {
  current: any;
  pageSize: any;
  total: any;
}
interface Iprops {
  users: User[] | [];
  meta: ICurrent;
}

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

const { Search } = Input;

export default function Dashboard(props: Iprops) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  let [user, setUser] = useState({});
  let [action, setAction] = useState("");
  let [isFetching, setIsFetching] = useState<boolean>(false);
  let [isPaginate, setIsPaginate] = useState<boolean>(true);
  let { users, meta } = props;

  let [usersL, setUsersL] = useState(users);

  useEffect(() => {
    setUsersL(users);
  }, [users]);
  useEffect(() => {
    if (users) setIsFetching(false);
  }, [users]);

  const handleEditUser = (user: any) => {
    // console.log("check user", user);
    setUser(user);
    setAction("Edit");
    showModal();
  };

  const handleDeleteUser = (user: any) => {
    setUser(user);
    setAction("Delete");
    showModal();
  };

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      // key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      // key: "age",
    },
    {
      title: "Options",
      align: "center",
      render: (text, record, index) => {
        return (
          <div className="flex items-center gap-4 sm:gap-8 justify-center">
            <EditOutlined
              className="cursor-pointer text-yellow-500"
              onClick={
                // showModal
                () => handleEditUser(record)
              }
              // onOk={ handleOk}
            />
            <DeleteOutlined
              className="cursor-pointer text-red-500"
              onClick={() => handleDeleteUser(record)}
            />
          </div>
        );
      },
    },
  ];

  const onChange = (pagination: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pagination.current);
      replace(`${pathname}?${params.toString()}`);
      setIsFetching(true);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAddNewUser = () => {
    setUser({});
    setAction("Add");
    showModal();
  };

  const handleSearchInput = (value: string, source: any) => {
    if (source.source === "input") {
      let usersCopy = [...users];
      usersCopy = usersCopy.filter((item) => {
        if (item.name.toLowerCase().includes(value.toLowerCase())) {
          return item;
        }
      });
      meta.total = usersCopy.length;
      setUsersL(usersCopy);
      setIsFetching(true);
      setIsPaginate(false);

      setTimeout(() => {
        setIsFetching(false);
      }, 300);
    } else if (source.source === "clear") {
      setUsersL(users);
      meta.total = users.length;
      setIsPaginate(true);
    } else {
      setUsersL(users);
      setIsPaginate(true);
    }
  };

  return (
    <>
      <div className=" grid  grid-cols-12 justify-between px-3">
        <Search
          placeholder="input search loading default"
          loading={false}
          allowClear
          onSearch={(value, source) => {
            handleSearchInput(value, source);
          }}
          className="mt-4 mb-2 col-start-1 sm:col-span-2 col-span-4"
        />
        <Button
          type="primary"
          className="flex items-center mt-4 mb-2 sm:mb-2 bg-blue-600 col-start-10 sm:col-start-12  col-span-3 sm:col-span-1 "
          onClick={handleAddNewUser}
        >
          <PlusCircleOutlined />
          <span>New User</span>
        </Button>
      </div>
      <Table
        loading={isFetching ? true : false}
        rowKey="id"
        className=" "
        bordered
        dataSource={usersL}
        columns={columns}
        pagination={
          isPaginate
            ? {
                ...meta,

                showTotal: (total, range) => {
                  return (
                    <div>
                      {range[0]} - {range[1]} tren {total} trang
                    </div>
                  );
                },
              }
            : {
                pageSize: 6,
                showTotal: (total, range) => {
                  return (
                    <div>
                      {range[0]} - {range[1]} tren {total} trang
                    </div>
                  );
                },
              }
        }
        onChange={
          isPaginate
            ? onChange
            : () => {
                setIsFetching(true);
                setTimeout(() => {
                  setIsFetching(false);
                }, 300);
              }
        }
      />

      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <AddForm
          onCancel={handleCancel}
          userParent={user}
          action={action}
          // onToast={onToast}
          // onRefesh={onChange}
        />
      </Modal>
      <ToastContainer autoClose={3000} />
    </>
  );
}
