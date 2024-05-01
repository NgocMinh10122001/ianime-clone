import Login from "./Login";

export default function page(props: any) {
  const { searchParams } = props;
  const error = searchParams?.error;
  return (
    <>
      <Login errorLogin={error ? true : false} />
    </>
  );
}
