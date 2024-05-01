"use client";
import React, { memo, useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, Select, SelectProps } from "antd";
import type { TableColumnsType } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiTrash, CiEdit } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { SearchProps } from "antd/es/input/Search";
import { IGenre, IRelease, ITheFirm, ILocale, IAnimeName } from "@/types/index";
import {
  createNewAnime,
  deleteAnime,
  deleteAnimeSelected,
  updateAnime,
} from "@/server-action/admin";
interface IAnime {
  title: string;
  animeJA: string;
  animeEN: string;
  animeVI: string;
  des: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  view: number;
  rating: number;
  genres: string[];
  firm: string;
  release: string;
  locale: string;
}

interface DataType {
  key: React.Key;
  id: string;
  title: string;
  des: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  view: number | string;
  rating: number | string;
  genres: IGenre[];
  firm: ITheFirm;
  release: IRelease;
  locale: ILocale;
  animeEN: IAnimeName;
  animeJA: IAnimeName;
  animeVI: IAnimeName;
  // userIds: string[];
}
interface IPaginate {
  total: number;
  pageSize: number;
  current: number;
}
interface IProps {
  animes: DataType[];

  paginateA: IPaginate;
  valueSearch: string | number;
  genres: IGenre[];
  firms: ITheFirm[];
  releases: IRelease[];
  locales: ILocale[];
}
type FieldType = {
  title: string;
  des: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  view: number | string;
  rating: number | string;
  genres: string[];
  firm: string;
  release: string;
  locale: string;
  animeJA: string;
  animeEN: string;
  animeVI: string;
};

const { Search } = Input;

function ManageAnime(props: IProps) {
  let { animes, paginateA, valueSearch, genres, firms, releases, locales } =
    props;
  // console.log(animes);

  const data: DataType[] = [];
  animes.map((item) => {
    data.push({
      key: item.id,
      id: item.id,
      title: item.title,
      des: item.des,
      duration: item.duration,
      videoUrl: item.videoUrl,
      thumbnailUrl: item.thumbnailUrl,
      view: item.view,
      rating: item.rating,
      genres: item.genres,
      firm: item.firm,
      release: item.release,
      locale: item.locale,
      animeEN: item.animeEN,
      animeJA: item.animeJA,
      animeVI: item.animeVI,
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

  const [isInputAnimeJA, setIsInputAnimeJA] = useState(false);
  const [isInputAnimeEN, setIsInputAnimeEN] = useState(false);

  const [isInputAnimeVI, setIsInputAnimeVI] = useState(false);
  const [isInputView, setIsInputView] = useState(false);
  const [isInputVideoUrl, setIsInputVideoUrl] = useState(false);
  const [isInputThumbnailUrl, setIsInputThumbnailUrl] = useState(false);
  const [isInputEpisode, setIsInputEpisode] = useState(false);
  const [animeId, setAnimeId] = useState<string>("");

  const [userId, setUserId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { Option } = Select;
  const [form] = Form.useForm();
  const optionsGenre: SelectProps["options"] = [];
  const optionsRelease: SelectProps["options"] = [];
  const optionsFirm: SelectProps["options"] = [];
  const optionsLocale: SelectProps["options"] = [];
  genres.map((item) => {
    optionsGenre.push({
      label: item.genre,
      value: item.id,
    });
  });
  firms.map((item) => {
    optionsFirm.push({
      label: item.name,
      value: item.id,
    });
  });
  releases.map((item) => {
    optionsRelease.push({
      label: item.year,
      value: item.id,
    });
  });
  locales.map((item) => {
    optionsLocale.push({
      label: item.locale,
      value: item.id,
    });
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnailUrl",
      render: (value: string, record: DataType, index: number) => {
        return <img src={`${value}`} alt="no-img" width={10} height={10} />;
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "View",
      dataIndex: "view",
    },
    {
      title: "Options",
      dataIndex: "id",
      align: "center",
      render: (value: string, record: DataType, index: number) => {
        return (
          <div className="text-black flex items-center gap-4 justify-center">
            {/* <>{console.log(value[index])}</> */}
            <button type="button" onClick={() => handleEditAnime(record)}>
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
    if (animes.length <= 0) {
      let page = params.get("page") || 2;
      router.replace(`${pathName}?page=${+(page as string) - 1}`);
    }
  }, [animes]);

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

  const handleDeleteUser = async (animeId: string) => {
    let confirmed = confirm("Are you sure ?");
    // console.log(animeId);

    if (confirmed) {
      let res = await deleteAnime(animeId);
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
    //   let res = await deleteNewUser(animeId);
    //   return;
    // }
    // return;
  };
  const handleDeleteUserSelected = async (animeIds: string[]) => {
    let confirmed = confirm("Are you sure ?");
    // console.log("check users", userIds);

    if (confirmed) {
      if (animeIds && animeIds.length > 0) {
        let res = await deleteAnimeSelected(animeIds);
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
  const handleEditAnime = async (anime: DataType) => {
    // let res = await getUser(user);
    // setUserId(user.id);
    // console.log("minh dz edit", anime);

    setIsEdit(true);
    setIsModalOpen(true);
    setAnimeId(anime.id);
    // optionsGenre: SelectProps["options"] = [];
    // optionsRelease: SelectProps["options"] = [];
    // optionsFirm: SelectProps["options"] = [];
    // optionsLocale: SelectProps["options"] = [];
    form.setFieldsValue({
      title: anime.title,
      des: anime.des,
      duration: anime.duration,
      animeEN: anime.animeEN.name,
      animeVI: anime.animeVI.name,
      animeJA: anime.animeJA.name,
      view: anime.view,
      videoUrl: anime.videoUrl,
      thumbnailUrl: anime.thumbnailUrl,
      rating: anime.rating,
      genres: anime.genres.map((item) => item.id),
      locale: anime.locale.id,

      firm: anime.firm.id,

      release: anime.release.id,

      // name: user.name,
      // email: user.email,
      // role: user.role,
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
  const handleChangeGenre = (value: string[]) => {
    // console.log(`selected ${value}`);
  };
  const handleChangeFirm = (value: string[]) => {
    // console.log(`selected ${value}`);
  };
  const handleChangeRelease = (value: string[]) => {
    // console.log(`selected ${value}`);
  };

  const handleChangeLocale = (value: string[]) => {
    // console.log(`selected ${value}`);
  };

  const handleInputChange = (e: any, name: string) => {
    const value = e.target.value;

    // Regular expression to allow only alphanumeric characters
    if (name === "animeJA") {
      // const alphanumericRegex = /^[a-zA-Z0-9]*$/;
      // Regular expression to match alphanumeric characters and Japanese characters
      const alphanumericRegex =
        /^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Script=Hiragana}ー0-9、。!！？?ー 　…【】「」『』［］｛｝（）＜＞＆＊＃＠％＋－＝～~〜｜＾：,；・・、・。・！・？]*$/u;

      if (alphanumericRegex.test(value)) {
        setInputValue(value);
        setIsInputAnimeJA(false);
      } else {
        // Display an alert or handle it in a way that suits your application
        setIsInputAnimeJA(true);
      }
    } else if (name === "animeEN") {
      const alphanumericRegex =
        /^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/−?]*$/;
      // const alphanumericRegex = /^[a-zA-Z0-9-.@]*$/;

      if (alphanumericRegex.test(value)) {
        setInputValue(value);
        setIsInputAnimeEN(false);
      } else {
        // Display an alert or handle it in a way that suits your application
        setIsInputAnimeEN(true);
      }
    } else if (name === "animeVI") {
      const alphanumericRegex =
        /^[a-zA-Z0-9ÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬĐÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ !@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'\",<\.>\/\−?]*$/;

      // const alphanumericRegex = /^[a-zA-Z0-9-.@]*$/;

      if (alphanumericRegex.test(value)) {
        setInputValue(value);
        setIsInputAnimeVI(false);
      } else {
        // Display an alert or handle it in a way that suits your application
        setIsInputAnimeVI(true);
      }
    } else if (name === "view") {
      const alphanumericRegex = /^(100|\d{1,2})*$/;
      // const alphanumericRegex = /^[a-zA-Z0-9-.@]*$/;

      if (alphanumericRegex.test(value)) {
        setInputValue(value);
        setIsInputView(false);
      } else {
        // Display an alert or handle it in a way that suits your application
        setIsInputView(true);
      }
    } else if (name === "episode") {
      const alphanumericRegex = /^(100|\d{1,2})*$/;
      // const alphanumericRegex = /^[a-zA-Z0-9-.@]*$/;

      if (alphanumericRegex.test(value)) {
        setInputValue(value);
        setIsInputEpisode(false);
      } else {
        // Display an alert or handle it in a way that suits your application
        setIsInputEpisode(true);
      }
    } else if (name === "videoUrl") {
      const alphanumericRegex = /^(https:\/\/.+)*$/;
      // const alphanumericRegex = /^[a-zA-Z0-9-.@]*$/;

      if (alphanumericRegex.test(value)) {
        setInputValue(value);
        setIsInputVideoUrl(false);
      } else {
        // Display an alert or handle it in a way that suits your application
        setIsInputVideoUrl(true);
      }
    } else if (name === "thumbnailUrl") {
      const alphanumericRegex = /^(https:\/\/.+)*$/;
      // const alphanumericRegex = /^[a-zA-Z0-9-.@]*$/;

      if (alphanumericRegex.test(value)) {
        setInputValue(value);
        setIsInputThumbnailUrl(false);
      } else {
        // Display an alert or handle it in a way that suits your application
        setIsInputThumbnailUrl(true);
      }
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const onFinish = async (values: IAnime) => {
    // console.log(values);
    if (
      isInputAnimeEN ||
      isInputAnimeJA ||
      isInputAnimeVI ||
      isInputEpisode ||
      isInputThumbnailUrl ||
      isInputVideoUrl ||
      isInputView
    ) {
      toast.error("Name or Email not true, please try again!");
      return;
    }

    if (isEdit) {
      // console.log("check edit", values);

      setLoadingModal(true);
      let res = await updateAnime(values, animeId);

      if (res?.errCode === 0) {
        toast.success("Update anime success!");
        setLoadingModal(false);
        setIsModalOpen(false);
        onReset();
        return;
      } else if (res?.errCode === 1) {
        toast.error("Old password is wrong, please try again!");
        setLoadingModal(false);
        return;
      }

      toast.error("Update anime failure, please try again!");
      setLoadingModal(false);

      onReset();
      return;
    }
    setLoadingModal(true);
    let res = await createNewAnime(values);

    if (res?.errCode !== 0) {
      toast.error("User existed, please try again!");
      setLoadingModal(false);
      // onReset();
      return;
    }
    toast.success("Create new user success!");
    setLoadingModal(false);
    // setIsModalOpen(false);
    // onReset();
    return;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    // console.log(value);

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

  const initialValues = {
    remember: true,
  };

  return (
    <div className="mt-8 px-4">
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
            Delete Anime Selected
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
          itemRender(page, type, element) {
            if (type === "prev") {
              return (
                <button
                  className="ant-pagination-item-link"
                  type="button"
                  tabIndex={-1}
                  disabled
                >
                  <span
                    role="img"
                    aria-label="left"
                    className="anticon anticon-left"
                  >
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
                  <span
                    role="img"
                    aria-label="right"
                    className="anticon anticon-right"
                  >
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
                      +paginateA.current === page
                        ? ""
                        : "text-black dark:text-white"
                    }  `}
                  >
                    {page}
                  </span>
                </a>
              );
            }
            return element;
          },
          onChange: (page) => handlePagination(page),
        }}
        loading={loading}
      />
      <Modal
        title={`${isEdit ? "Update User" : "New User"}`}
        open={isModalOpen}
        width={1000}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        centered
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 700 }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-full grid grid-cols-12 gap-4"
        >
          <Form.Item<FieldType>
            label="Name"
            name="title"
            rules={[
              { required: true, message: "Please input your anime name!" },
            ]}
            className="col-span-6"
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Japan Name"
            name="animeJA"
            rules={[
              {
                required: true,
                message: "Please input your anime japan name!",
              },
            ]}
            className={`relative ${
              isInputAnimeJA
                ? "before:absolute before:top-[3%] before:right-[3%] before:content-['+'] before:rotate-45 before:text-xl  before:text-red-500"
                : ""
            } col-span-6`}
          >
            <Input
              value={inputValue}
              onChange={(event: any) => handleInputChange(event, "animeJA")}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="English Name"
            name="animeEN"
            rules={[
              {
                required: true,
                message: "Please input your anime english name!",
              },
            ]}
            className={`relative ${
              isInputAnimeEN
                ? "before:absolute before:top-[3%] before:right-[3%] before:content-['+'] before:rotate-45 before:text-xl  before:text-red-500"
                : ""
            } col-span-6`}
          >
            <Input
              value={inputValue}
              onChange={(event: any) => handleInputChange(event, "animeEN")}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="VietNam Name"
            name="animeVI"
            rules={[
              {
                required: true,
                message: "Please input your anime vietnamese name!",
              },
            ]}
            className={`relative ${
              isInputAnimeVI
                ? "before:absolute before:top-[3%] before:right-[3%] before:content-['+'] before:rotate-45 before:text-xl  before:text-red-500"
                : ""
            } col-span-6`}
          >
            <Input
              value={inputValue}
              onChange={(event: any) => handleInputChange(event, "animeVI")}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Description"
            name="des"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
            className="col-span-6"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item<FieldType>
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please input your duration!" }]}
            className="col-span-6"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Video URL"
            name="videoUrl"
            rules={[
              { required: true, message: "Please input your anime link!" },
            ]}
            className={`relative ${
              isInputVideoUrl
                ? "before:absolute before:top-[3%] before:right-[3%] before:content-['+'] before:rotate-45 before:text-xl  before:text-red-500"
                : ""
            } col-span-6`}
          >
            <Input
              type="text"
              placeholder="https://www.youtube.com/embed/..."
              value={inputValue}
              onChange={(event: any) => handleInputChange(event, "videoUrl")}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Thumbnail URL"
            name="thumbnailUrl"
            rules={[
              { required: true, message: "Please input your thumbnail link!" },
            ]}
            className={`relative ${
              isInputThumbnailUrl
                ? "before:absolute before:top-[3%] before:right-[3%] before:content-['+'] before:rotate-45 before:text-xl  before:text-red-500"
                : ""
            } col-span-6`}
          >
            <Input
              type="text"
              placeholder="https://..."
              value={inputValue}
              onChange={(event: any) =>
                handleInputChange(event, "thumbnailUrl")
              }
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="View"
            name="view"
            rules={[{ required: true, message: "Please input your view!" }]}
            className={`relative ${
              isInputView
                ? "before:absolute before:top-[3%] before:right-[3%] before:content-['+'] before:rotate-45 before:text-xl  before:text-red-500"
                : ""
            } col-span-6`}
          >
            <Input
              value={inputValue}
              onChange={(event: any) => handleInputChange(event, "view")}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Episode"
            name="rating"
            rules={[
              { required: true, message: "Please input your anime episode!" },
            ]}
            className={`relative ${
              isInputEpisode
                ? "before:absolute before:top-[3%] before:right-[3%] before:content-['+'] before:rotate-45 before:text-xl  before:text-red-500"
                : ""
            } col-span-6`}
          >
            <Input
              value={inputValue}
              onChange={(event: any) => handleInputChange(event, "episode")}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Genre"
            name="genres"
            initialValue={[]}
            rules={[
              { required: true, message: "Please input your anime genre!" },
            ]}
            className="col-span-6"
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Select genre"
              onChange={handleChangeGenre}
              options={optionsGenre}
              // onChange={onGenderChange}
            ></Select>
          </Form.Item>
          <Form.Item<FieldType>
            initialValue={[]}
            label="The Firm"
            name="firm"
            rules={[
              { required: true, message: "Please input your anime firm!" },
            ]}
            className="col-span-6"
          >
            <Select
              allowClear
              placeholder="Select the Firm"
              onChange={handleChangeFirm}
              options={optionsFirm}
            ></Select>
          </Form.Item>
          <Form.Item<FieldType>
            initialValue={[]}
            label="Release"
            name="release"
            rules={[
              { required: true, message: "Please input your anime release!" },
            ]}
            className="col-span-6"
          >
            <Select
              allowClear
              placeholder="Select release"
              onChange={handleChangeRelease}
              options={optionsRelease}
            ></Select>
          </Form.Item>
          <Form.Item<FieldType>
            initialValue={[]}
            label="Locale"
            name="locale"
            rules={[
              { required: true, message: "Please input your anime locale!" },
            ]}
            className="col-span-6"
          >
            <Select
              allowClear
              placeholder="Select locale"
              onChange={handleChangeLocale}
              options={optionsLocale}
            ></Select>
          </Form.Item>

          <Form.Item
            // name="button"
            // wrapperCol={{ offset: 14, span: 16 }}
            className="col-span-12 w-full flex justify-end pe-[4%]"
          >
            <div className="flex gap-2">
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

export default memo(ManageAnime);
