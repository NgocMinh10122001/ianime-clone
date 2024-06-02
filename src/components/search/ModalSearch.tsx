"use client";
import { Modal } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback } from "react";

function ModalSearch(props: any) {
  let {
    isModalOpen,
    handleCancel,
    handleOk,
    modalProps,
    titleModal,
    // page,
    // genre,
    // firm,
    // release,
  } = props;
  let router = useRouter();
  let pathName = usePathname();
  let param = useSearchParams();
  let params = new URLSearchParams(param);

  let genre = params.get("genre");
  let firm = params.get("firm");
  let release = params.get("release");
  let page = params.get("page");
  let name = params.get("name");

  // console.log(params.get("firm"));

  const demand = useCallback(
    (
      name: string,
      orderby: string,
      order: string,
      genre: string,
      firm: string,
      release: string,
      page: string | number
    ) => {
      router.replace(
        `${pathName}?name=${name}&&orderby=${orderby}&&order=${order}&&genre=${genre}&&firm=${firm}&&release=${release}&&page=${page}`
      );
    },
    [router, pathName]
  );

  const handleDemand = useCallback(
    (item: any) => {
      if (item.genre) {
        demand(
          name || "",
          "meta_value_max",
          "desc",
          item.genre,
          firm || "",
          release || "",
          page || "1"
        );
      } else if (item.name) {
        demand(
          name || "",
          "meta_value_max",
          "desc",
          genre || "",
          item.name,
          release || "",
          page || "1"
        );
      } else if (item.year) {
        demand(
          name || "",
          "meta_value_max",
          "desc",
          genre || "",
          firm || "",
          item.year,
          page || "1"
        );
      }
    },
    [demand, genre, firm, release, page]
  );

  const handleRefresh = useCallback(
    (title: string) => {
      if (title === "genre") {
        demand(
          name || "",
          "meta_value_max",
          "desc",
          "",
          firm || "",
          release || "",
          page || "1"
        );
      } else if (title === "firm") {
        demand(
          name || "",
          "meta_value_max",
          "desc",
          genre || "",
          "",
          release || "",
          page || "1"
        );
      } else if (title === "release") {
        demand(
          name || "",
          "meta_value_max",
          "desc",
          genre || "",
          firm || "",
          "",
          page || "1"
        );
      }
    },
    [demand, genre, firm, release, page]
  );

  return (
    <div>
      <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
        <p className="text-2xl font-bold py-2 uppercase">
          {(titleModal === "genre" && "thể loại") ||
            (titleModal === "firm" && "hãng") ||
            (titleModal === "release" && "năm phát hành")}
        </p>
        <p className="pb-6">
          Chọn phim muốn xem theo một (hoặc nhiều) {titleModal} dưới đây:
        </p>
        <div className="flex gap-3 flex-wrap">
          {modalProps?.length > 0 &&
            modalProps.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="py-2 px-3 w-fit text-[#FFC312] border border-[#FFC312]  hover:bg-neutral-900 duration-200 ease-in rounded-2xl cursor-pointer"
                  style={{
                    backgroundColor: `${
                      (item.genre === genre && "#FFC312") ||
                      (item.name === firm && "#FFC312") ||
                      (item.year?.toString() === release && "#FFC312")
                    }`,
                    color: `${
                      (item.genre === genre && "#fff") ||
                      (item.name === firm && "#fff") ||
                      (item.year?.toString() === release && "#fff")
                    }`,
                  }}
                  onClick={() => handleDemand(item)}
                >
                  {(item.genre && item.genre) ||
                    (item.name && item.name) ||
                    (item.year && item.year)}
                </div>
              );
            })}
        </div>
        <div className="flex justify-end gap-3 pt-6">
          <button
            className="p-2 px-4 text-black text-base font-medium bg-yellow-500 dark:bg-var(--navbar-color)  dark:border-none rounded-md hover:bg-yellow-400 cursor-pointer duration-200"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            // onClick={apply}
            className="p-2 px-4 text-black text-base font-medium bg-blue-500  dark:bg-var(--navbar-color)   dark:border-none rounded-md hover:bg-blue-400 cursor-pointer duration-200"
            onClick={() => handleRefresh(titleModal)}
          >
            Refresh
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default memo(ModalSearch);
