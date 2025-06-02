import { Popover } from "antd";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  getDataUserLocalStorage,
  getRoleFromJWT,
  removeDataUserLocalStorage,
} from "../../utils/localStorageUtils";
import {
  MdHelpOutline,
  MdOutlineAdminPanelSettings,
  MdOutlineWavingHand,
} from "react-icons/md";
import { LuClipboard } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./CustomPopver.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Login from "../../pages/public/Login/Login";
import { useState } from "react";
const UserPopover = ({ children }) => {
  const [roles] = useState(getRoleFromJWT());
  const dataUser = getDataUserLocalStorage();
  const navigate = useNavigate();
  const hanldeLogOut = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn đăng xuất không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đăng xuất",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Đăng xuất thành công",
          icon: "success",
        });
        setTimeout(() => {
          removeDataUserLocalStorage();
          window.location.reload();
        }, 1000);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  };
  const popoverWithLogin = (
    <div className="popover__user__content">
      <div className="popover__user__container-item with-login">
        <p className="popover__user__item with-login">
          <AiOutlineShoppingCart />
          <Link to="/cart">Giỏ hàng của tôi</Link>
        </p>
        <p className="popover__user__item with-login">
          <LuClipboard />
          <Link to="/manage-payment">Đơn hàng của tôi</Link>
        </p>
        {roles === "Writer" && (
          <p className="popover__user__item with-login">
            <MdOutlineAdminPanelSettings />
            <Link to="/admin">Quản lý</Link>
          </p>
        )}
      </div>
      <div>
        <p onClick={hanldeLogOut} className="popover__user__item with-login">
          <IoLogOutOutline />
          <Link>Đăng xuất</Link>
        </p>
      </div>
    </div>
  );
  const popoverWithoutLogin = (
    <div className="popover__user__content">
      <div className="popover__user__container-item">
        <Login className="popover__user-button" />
        <Login tabData={"register"} />
      </div>
      <div>
        <p onClick={hanldeLogOut} className="popover__user__item">
          <MdHelpOutline />
          <Link>Trợ giúp</Link>
        </p>
      </div>
    </div>
  );
  return (
    <>
      <Popover
        className="popover"
        placement="bottomRight"
        content={dataUser ? popoverWithLogin : popoverWithoutLogin}
        title={
          dataUser ? (
            <span>
              <MdOutlineWavingHand />
              Xin chào, {dataUser.userName}
            </span>
          ) : (
            <span>
              <MdOutlineWavingHand />
              Xin chào, vui lòng đăng nhập
            </span>
          )
        }
      >
        {children}
      </Popover>
    </>
  );
};

export default UserPopover;
