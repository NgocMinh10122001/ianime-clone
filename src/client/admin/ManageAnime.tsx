"use client";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Modal, Table, Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import Paginate from "../../components/pagination/Paginate";
import type { ColumnsType } from "antd/es/table";
import { User } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddForm from "./form/AddForm";
import { toast, ToastContainer } from "react-toastify";
import loading from "@/app/admin/manage-anime/loading";
import AddFormAnime from "./form/AddFormAnime";
// import { useSession } from "next-auth/react";

interface ICurrent {
  current: any;
  pageSize: any;
  total: any;
}
interface IAnime {
  id: string;
  title: string;
  des: string;
  duration: string | null;
  videoUrl: string;
  thumbnailUrl: string;
  view: number | null;
  rating: number | null;
  genreIds: [];
}
interface Igenre {
  id: string;
  genre: string;
}

interface Ititle {
  title: string;
  des: string;
  duration: string | null;
}
interface IAnimeProps {
  animes: IAnime[] | [];
  meta: ICurrent;
  genres: Igenre[];
  title: Ititle;
}

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

const { Search } = Input;

export default function ManageAnime(props: IAnimeProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  let [anime, setAnime] = useState({});
  let [action, setAction] = useState("");
  let [isFetching, setIsFetching] = useState<boolean>(false);
  let [isPaginate, setIsPaginate] = useState<boolean>(true);
  let { animes, meta, title, genres } = props;
  // let listUsers = props.animes;

  let [animeL, setAnimeL] = useState(animes);
  // console.log(usersL);
  // const { data: session } = useSession({ required: true });
  // console.log("data", session);
  useEffect(() => {
    setAnimeL(animes);
  }, [animes]);
  useEffect(() => {
    if (animes) setIsFetching(false);
  }, [animes]);
  // let { current, pageSize, totalPage } = meta;
  // console.log("check user", page);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handleEditUser = (anime: any) => {
    anime.genre = anime.genres.map((item: any) => {
      return { label: capitalizeFirstLetter(item.genre), value: item.id };
    });
    // console.log("check user", anime);
    setAnime(anime);
    setAction("Edit");
    showModal();
  };

  const handleDeleteUser = (anime: any) => {
    setAnime(anime);
    setAction("Delete");
    showModal();
  };

  const columns: ColumnsType<IAnime> = [
    {
      title: `${title.title}`,
      dataIndex: "title",
      // key: "name",
    },
    {
      title: `${title.des}`,
      dataIndex: "des",
      // key: "age",
    },
    {
      title: `${title.duration}`,
      dataIndex: "duration",
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

  const onChange = (pagination: any, filters: any, sorter: any) => {
    // console.log("hcekc", pagination);

    if (pagination && pagination.current) {
      // console.log("chekc search param", pathname);
      const params = new URLSearchParams(searchParams);
      // console.log("check url param1", params);
      params.set("page", pagination.current);
      // console.log("check url param2", params);
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
    // console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleAddNewUser = () => {
    setAnime({});
    setAction("Add");
    showModal();
  };

  const handleSearchInput = (value: string, event: any, source: any) => {
    console.log(value);
    // console.log(source.source);

    if (source.source === "input") {
      let animesCopy = [...animes];
      animesCopy = animesCopy.filter((item) => {
        if (item.title.toLowerCase().includes(value.toLowerCase())) {
          return item;
        }
      });
      meta.total = animesCopy.length;
      console.log(animesCopy);
      setAnimeL(animesCopy);
      setIsFetching(true);
      setIsPaginate(false);

      setTimeout(() => {
        setIsFetching(false);
      }, 300);
    } else if (source.source === "clear") {
      // console.log("hceck", listUsers);

      setAnimeL(animes);
      meta.total = animes.length;
      setIsPaginate(true);
    } else {
      setAnimeL(animes);
      setIsPaginate(true);
    }
  };

  return (
    <>
      <div className=" grid  grid-cols-12   justify-between px-3">
        {/* <>{console.log("check meta", usersL)}</> */}
        <Search
          placeholder="input search loading default"
          loading={false}
          allowClear
          onSearch={(value, event, source) => {
            handleSearchInput(value, event, source);
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
        dataSource={animeL}
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
                // onChange: (page, pageSize) => {
                //   console.log(page);
                // },
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
        // scroll={{ y: 240 }}
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
      {/* <div className="flex justify-end pt-4">
        <Paginate />
      </div> */}
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <AddFormAnime
          onCancel={handleCancel}
          animeParent={anime}
          action={action}
          genres={genres}
          // onToast={onToast}
          // onRefesh={onChange}
        />
      </Modal>
      <ToastContainer autoClose={3000} />
    </>
  );
}
