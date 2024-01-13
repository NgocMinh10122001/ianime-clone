"use client";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table, Input } from "antd";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
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
interface IFirm {
  id: string;
  name: string;
}
interface IRelease {
  id: string;
  year: string;
}
interface ILocale {
  id: string;
  locale: string;
  des: string;
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
  firms: IFirm[];
  releases: IRelease[];
  locales: ILocale[];
}

const { Search } = Input;

export default function ManageAnime(props: IAnimeProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  let [anime, setAnime] = useState({});
  let [action, setAction] = useState("");
  let [isFetching, setIsFetching] = useState<boolean>(false);
  let [isPaginate, setIsPaginate] = useState<boolean>(true);
  let { animes, meta, title, genres, firms, releases, locales } = props;
  // console.log(locales);

  let [animeL, setAnimeL] = useState(animes);

  useEffect(() => {
    setAnimeL(animes);
  }, [animes]);
  useEffect(() => {
    if (animes) setIsFetching(false);
  }, [animes]);

  const handleEditUser = (anime: any) => {
    // console.log("check anime", anime);

    anime.genre = anime.genres.map((item: any) => {
      return { label: item.genre, value: item.id };
    });

    anime.firms = [{ ...anime.firm }].map((item: any) => {
      return { label: item.name, value: item.id };
    });
    anime.releases = [{ ...anime.release }].map((item: any) => {
      return {
        label: item.year as string,
        value: item.id,
      };
    });
    anime.locales = [{ ...anime.locale }].map((item: any) => {
      return { label: item.des, value: item.id };
    });
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
      render: (record) => {
        return (
          <div className="flex items-center gap-4 sm:gap-8 justify-center">
            <EditOutlined
              className="cursor-pointer text-yellow-500"
              onClick={() => handleEditUser(record)}
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
          firms={firms}
          releases={releases}
          locales={locales}
          // onToast={onToast}
          // onRefesh={onChange}
        />
      </Modal>
      <ToastContainer autoClose={3000} />
    </>
  );
}
