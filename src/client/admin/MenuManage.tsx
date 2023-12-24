"use client";
import React, { memo, useState } from "react";
import { GithubOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    label: (
      <Link href="/admin/manage-user" rel="noopener noreferrer">
        Manage User
      </Link>
    ),
    key: "user",
    icon: <UserOutlined />,
  },
  {
    label: (
      <Link href="/admin/manage-anime" rel="noopener noreferrer">
        Manage Anime
      </Link>
    ),
    key: "anime",
    icon: <GithubOutlined />,
  },
  {
    label: (
      <Link href="/layout/home" rel="noopener noreferrer">
        Back to home page
      </Link>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },

  //   {
  //     label: (
  //       <Link href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //         Navigation Four - Link
  //       </Link>
  //     ),
  //     key: "alipay",
  //   },
];

const MenuManage: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default memo(MenuManage);
