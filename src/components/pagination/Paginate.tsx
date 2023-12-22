"use client";
import React from "react";
import { Pagination } from "antd";

const Paginate: React.FC = () => <Pagination defaultCurrent={6} total={500} />;

export default Paginate;
