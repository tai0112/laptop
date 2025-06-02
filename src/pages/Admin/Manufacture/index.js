import { Outlet } from "react-router-dom";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./Manufacture.scss";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcumb";
function Manufacture() {
  const location = useLocation();
  const path = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <Breadcrumb />
      <Button type="primary" className="manufacture__create">
        {path.find((x) => x === "create") ? (
          <Link to="/admin/category/">Back</Link>
        ) : (
          <Link to="/admin/manufacture/create">Create Manufacture</Link>
        )}
      </Button>
      <Outlet />
    </>
  );
}

export default Manufacture;
