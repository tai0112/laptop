import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Breadcumb.scss";
function Breadcrumb() {
  const location = useLocation();
  const path = location.pathname.split("/").filter((x) => x);
  return (
    <ul className="breadcumb" style={{ display: "flex", listStyle: "none" }}>
      <li>
        <Link to="/">Home</Link>
      </li>
      {path.map((value, index) => {
        const to = `/${path.slice(0, index + 1).join("/")}`;
        return (
          <li key={to} style={{ marginLeft: 8 }}>
            / <Link to={to}>{value}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Breadcrumb;
// This component is responsible for rendering the breadcrumb navigation in the application. It takes an array of items and generates a list of links based on the provided items.
