import Breadcrumb from "../../../components/Breadcumb";
import "./Product.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
function Product() {
  const location = useLocation();
  const path = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <Breadcrumb />
      <Button type="primary" className="manufacture__create">
        {path.find((x) => x === "create") ? (
          <Link to="/admin/product/">Back</Link>
        ) : (
          <Link to="/admin/product/create">Create Product</Link>
        )}
      </Button>
      <Outlet />
    </>
  );
}

export default Product;
