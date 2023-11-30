import React from "react";

function Category() {
  return (
    <div className="category__container pt-8 ">
      <div className="border-6 dark:border-white  border-black rounded-lg w-24 sm:w-60"></div>
      <div className="category__title  text-[var(--text-black)] dark:text-[var(--text-white)] font-bold uppercase text-3xl sm:text-4xl tracking-wide pb-8 pt-5  ">
        Thể loại
      </div>
      <div className="category__content grid grid-cols-2 gap-2 sm:grid-cols-5">
        <div className="cate__img bg-[url('/anime.webp')] bg-cover bg-center bg-no-repeat w-296 sm:w-268 h-228 sm:h-206 relative rounded-md sm:hover:scale-105 sm:hover:cursor-pointer duration-300">
          <div className=" bg-gradient-to-b from-transparent to-black opacity-95 absolute top-0 bottom-0 left-0 right-0 rounded-md"></div>
          <div className="cate__title absolute left-2 bottom-2">
            <div className="title text-lg font-medium text-[var(--text-white)]">
              Dark Skin <span>(163)</span>
            </div>
            <div className="des text-xs text-[var(--text-white)]">
              Cô gái da đen, da rắm nắng... cũng có sức cuốn hút riêng đó
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
