import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./MenuSiderAdmin.scss";
import { LuFactory } from "react-icons/lu";
import { MdDiscount, MdCategory, MdOutlinePayments } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import { ShoppingCartOutlined, ProductOutlined } from "@ant-design/icons";
const items = [
  {
    key: "Category",
    label: <Link to="/admin/category">Loại sản phẩm</Link>,
    icon: <MdCategory />,
  },
  {
    key: "Product",
    label: <Link to="/admin/product">Sản phẩm</Link>,
    icon: <ProductOutlined />,
  },
  {
    key: "Manufacturer",
    label: <Link to="/admin/manufacture">Hãng phân phối</Link>,
    icon: <LuFactory />,
  },
  {
    key: "DiscountCode",
    label: <Link to="/admin/discountCode">Mã giảm giá</Link>,
    icon: <MdDiscount />,
  },
  {
    key: "Gift",
    label: <Link to="/admin/gift">Quà tặng kèm</Link>,
    icon: <FaGift />,
  },
  {
    key: "Payment",
    label: <Link to="/admin/payment">Hóa đơn</Link>,
    icon: <MdOutlinePayments />,
  },
];
function MenuSiderAdmin(props) {
  const { collapsed } = props;
  return (
    <div className="menuSiderAdmin">
      <div className="menuSiderAdmin__logo">
        <Link className="menuSiderAdmin__logo__link" to="/admin">
          <ShoppingCartOutlined />
          {!collapsed && (
            <span className="menuSiderAdmin__logo__text">Logo</span>
          )}
        </Link>
      </div>
      <Menu className="menuSiderAdmin__menu" defaultOpenKeys={["Category"]} items={items} />
    </div>
  );
}

export default MenuSiderAdmin;
