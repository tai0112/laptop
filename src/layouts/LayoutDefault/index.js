import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import "./LayoutDefault.scss";
function LayoutDefault() {
  return (
    <>
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

export default LayoutDefault;
