"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, SelectProps, Space } from "antd";
import {
  createNewAnime,
  updateNewAnime,
  deleteNewAnime,
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
const options: SelectProps["options"] = [];

interface IProps {
  onCancel: any;
  animeParent: any;
  action: string;
  genres: any;
  // onToast: any;
}

export default function AddFormAnime(props: IProps) {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let { onCancel, animeParent, action, genres } = props;
  const options: SelectProps["options"] = [];
  const [form] = Form.useForm();
  useEffect(() => {
    // console.log("check action", animeParent);
    onReset();
    form.setFieldsValue(animeParent);
  }, [form, animeParent]);

  useEffect(() => {
    if (animeParent) setIsLoading(false);
  }, [animeParent]);

  const onFinish = async (values: any) => {
    // console.log(values);
    setIsLoading(true);
    if (action === "Add") {
      await createNewAnime(values)
        .then(() => {
          setIsLoading(false);
          onReset();
          toast.success("Create new anime success, please wait for seconds!");
        })
        .catch(() => {
          setIsLoading(false);

          toast.error("Create new anime failure, please try again!");
        });

      await onCancel();
    } else if (action === "Edit") {
      let id = animeParent.id;
      // console.log("check value", values);

      await updateNewAnime(values, id)
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
      let id = animeParent.id;
      await deleteNewAnime(id)
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
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  };

  {
    genres?.genres &&
      genres.genres.length > 0 &&
      genres.genres.map((item: any) => {
        options.push({
          value: item.id,
          label: capitalizeFirstLetter(item.genre),
        });
      });
  }

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
            <Form.Item
              name="title"
              label="Name Anime"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="des"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="duration" label="Duration">
              <Input />
            </Form.Item>
            <Form.Item
              name="videoUrl"
              label="VideoUrl "
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="thumbnailUrl"
              label="ThumbnailUrl"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="view" label="View">
              <Input />
            </Form.Item>
            <Form.Item name="rating" label="Rating">
              <Input />
            </Form.Item>
            {/* {animeParent?.password ? (
              ""
            ) : (
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input type="password" />
              </Form.Item>
            )} */}
            <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
              {/* <Select
                placeholder="Select a role"
                //   onChange={onGenderChange}
                allowClear
              >
                {genres?.genres &&
                  genres.genres.length > 0 &&
                  genres.genres.map((item: any) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {capitalizeFirstLetter(item.genre)}
                      </Option>
                    );
                  })}
               
              </Select> */}

              <Select
                mode="tags"
                style={{ width: "100%" }}
                onChange={handleChange}
                tokenSeparators={[","]}
                options={options}
              />
            </Form.Item>
            {/* <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.genres !== currentValues.genres
              }
            >
              
            </Form.Item> */}
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
