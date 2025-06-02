import { Outlet } from "react-router-dom";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcumb";
import { useLocation } from "react-router-dom";

function Gift() {
  const location = useLocation();
  const path = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <Breadcrumb />
      <Button type="primary" className="manufacture__create">
        {path.find((x) => x === "create") ? (
          <Link to="/admin/gift/">Back</Link>
        ) : (
          <Link to="/admin/gift/create">Create Gift</Link>
        )}
      </Button>
      <Outlet />
    </>
  );
}

export default Gift;
