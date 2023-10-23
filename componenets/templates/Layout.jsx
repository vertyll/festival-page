import Header from "../organism/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
