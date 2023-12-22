"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import {
  createNewUser,
  updateNewUser,
  deleteNewUser,
} from "@/server-action/index";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "@prisma/client";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IProps {
  onCancel: any;
  userParent: any;
  action: string;
  // onToast: any;
}

export default function AddForm(props: IProps) {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let { onCancel, userParent, action } = props;
  // console.log("check parent", action, userParent);

  const [form] = Form.useForm();
  useEffect(() => {
    // console.log("check action", userParent);
    onReset();
    form.setFieldsValue(userParent);
  }, [form, userParent]);

  useEffect(() => {
    if (userParent) setIsLoading(false);
  }, [userParent]);

  const onFinish = async (values: any) => {
    // console.log(values);
    setIsLoading(true);
    if (action === "Add") {
      await createNewUser(values)
        .then(() => {
          setIsLoading(false);
          onReset();
          toast.success("Create new user success, please wait for seconds!");
        })
        .catch(() => {
          setIsLoading(false);

          toast.error("Create new user failure, please try again!");
        });

      await onCancel();
    } else if (action === "Edit") {
      let id = userParent.id;
      // console.log("check valuw2", values);

      await updateNewUser(values, id)
        .then(() => {
          setIsLoading(false);

          onReset();
          // onToast("success", "Update user success!");
          toast.success("Update user success, please wait for seconds!");
        })
        .catch(() => {
          setIsLoading(false);

          toast.error("Update user failure, please try again!");
        });

      await onCancel();
    } else {
      let id = userParent.id;
      await deleteNewUser(id)
        .then(() => {
          setIsLoading(false);

          onReset();
          // onToast("success", "Update user success!");
          toast.success("Delete user success, please wait for seconds!");
        })
        .catch(() => {
          setIsLoading(false);

          toast.error("Delete user failure, please try again!");
        });

      await onCancel();
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    // onReset();

    onCancel();
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        {action === "Delete" ? (
          <div className="mb-4">Do you want delete this?</div>
        ) : (
          <>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input type="email" />
            </Form.Item>
            {userParent?.password ? (
              ""
            ) : (
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input type="password" />
              </Form.Item>
            )}
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <Select
                placeholder="Select a role"
                //   onChange={onGenderChange}
                allowClear
              >
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
                {/* <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option> */}
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.role !== currentValues.role
              }
            >
              {/* {({ getFieldValue }) =>
          getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        } */}
            </Form.Item>
          </>
        )}

        <Form.Item {...tailLayout}>
          <Space>
            <Button
              loading={isLoading ? true : false}
              type="primary"
              htmlType="submit"
              className="bg-blue-500 text-white hover:bg-blue-700"
            >
              {(action === "Add" && "Add") ||
                (action === "Edit" && "Update") ||
                (action === "Delete" && "Delete")}
            </Button>
            {action === "Add" ? (
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            ) : (
              ""
            )}
            <Button htmlType="button" onClick={handleCancel}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
      {/* <ToastContainer autoClose={3000} /> */}
    </>
  );
}
