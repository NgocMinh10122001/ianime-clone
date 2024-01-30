import FreshLoad from "@/components/home/FreshLoad";

interface INestProps {
  limit: number;
  genre: string;
  title: string;
}
export default async function page() {
  let nestProps = [
    {
      limit: 12,
      genre: "new",
      title: "Mới tải lên",
    },
    {
      limit: 12,
      genre: "comedy",
      title: "Hài hước",
    },
    {
      limit: 12,
      genre: "romance",
      title: "Tình cảm",
    },
    {
      limit: 12,
      genre: "commingsoon",
      title: "Sắp phát sóng",
    },
  ];
  return (
    <div className="w-full h-fit">
      {nestProps &&
        nestProps.length > 0 &&
        nestProps.map((item: INestProps, index: number) => {
          return (
            <FreshLoad
              key={index + 1}
              limit={item.limit}
              genre={item.genre}
              title={item.title}
            />
          );
        })}
    </div>
  );
}
