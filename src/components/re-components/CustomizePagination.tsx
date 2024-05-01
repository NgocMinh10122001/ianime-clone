import React from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

interface IProps {
  current: number;
  totalPage: number;
  pageSize: number;
  onChangePage: any;
}

function CustomizePagination(props: IProps) {
  const { current, totalPage, pageSize, onChangePage } = props;

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return (
        <button
          className="ant-pagination-item-link"
          type="button"
          tabIndex={-1}
          disabled
        >
          <span role="img" aria-label="left" className="anticon anticon-left">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="left"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              className="dark:fill-white"
            >
              <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
            </svg>
          </span>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button
          className="ant-pagination-item-link"
          type="button"
          tabIndex={-1}
          disabled
        >
          <span role="img" aria-label="right" className="anticon anticon-right">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="right"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              className="dark:fill-white"
            >
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
            </svg>
          </span>
        </button>
      );
    }
    if (type === "page") {
      return (
        <a>
          <span
            className={`${
              +current === _ ? "" : "text-black dark:text-white"
            }  `}
          >
            {_}
          </span>
        </a>
      );
    }
    return originalElement;
  };
  return (
    <Pagination
      itemRender={itemRender}
      current={current}
      total={totalPage}
      pageSize={pageSize}
      onChange={(page, pageSize) => onChangePage(page, pageSize)}
    />
  );
}

export default CustomizePagination;
