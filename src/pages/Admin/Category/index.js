import Breadcrumb from "../../../components/Breadcumb";
import "./Category.scss";
import { Button } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
function Category() {
  const location = useLocation();
  const path = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <Breadcrumb />
      <Button type="primary" className="category__create">
        {path.find((x) => x === "create") ? (
          <Link to="/admin/category/">Back</Link>
        ) : (
          <Link to="/admin/category/create">Create Category</Link>
        )}
      </Button>
      <Outlet />
    </>
  );
}

export default Category;
// This component is responsible for rendering the Category page in the admin section of the application. It currently returns a simple div with the text "Category".
