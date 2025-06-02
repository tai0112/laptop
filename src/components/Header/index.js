import "./Header.scss";
import { Input, Spin } from "antd";
import { TbHeadphones } from "react-icons/tb";
import { FiClipboard } from "react-icons/fi";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getDataUserLocalStorage } from "../../utils/localStorageUtils";
import UserPopover from "../CustomPopover/UserPopover";
import CategoryPopover from "../CustomPopover/CategoryPopover";
import { getCart } from "../../Services/CartServices";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductDetails } from "../../Services/ProductDetailServices";
import ProductSearchToolTip from "../Product/ProductSearchToolTip";
const { Search } = Input;
function Header() {
  const userLogin = getDataUserLocalStorage();
  const loadingRedux = useSelector((state) => state.loadingReducer);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCart({ userId: userLogin.id });
      setCartCount(response.cartDetails.length);
    };
    if (userLogin) {
      fetchData();
    }
  }, [loadingRedux]);
  const handleSearch = async (e) => {
    const searchQuery = e.trim();
    if (searchQuery !== "") {
      setLoading(true);
      try {
        const response = await getProductDetails({
          q: searchQuery,
        });
        setTimeout(() => {
          setSearchResults(response);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };
  const handleSearchButton = async (e) => {
    const searchQuery = e.trim();
    window.location.href = `/product?q=${searchQuery}`;
  };
  const hanleBlur = (e) => {
    setSearchResults([]);
    e.value = "";
  };
  return (
    <>
      <div className="header">
        <div className="header__row">
          <div className="header__item-bgc">
            <Link className="header__item-link" to="/">
              Trang chủ
            </Link>
          </div>
          <CategoryPopover>
            <div className="header__item-bgc">
              <FaBars style={{ marginRight: "4px" }} />
              <span className="header__item__text">Danh mục</span>
            </div>
          </CategoryPopover>
          <div className="header__search">
            <Search
              className="header__search__input"
              placeholder="Bạn cần tìm gì?"
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={(e) => handleSearch(e.target.value)}
              onBlur={(e) => hanleBlur(e)}
              onSearch={(e) => handleSearchButton(e)}
              enterButton
            />
            <div className="header__tooltip">
              <Spin spinning={loading}>
                <ProductSearchToolTip product={searchResults} />
              </Spin>
            </div>
          </div>
          <div className="header__item">
            <div className="header__item__icon">
              <TbHeadphones />
            </div>
            <div className="header__item__text">
              <p>Hotline</p>
              <p>1900.5301</p>
            </div>
          </div>
          <div className="header__item">
            <div className="header__item__icon">
              <IoLocationOutline />
            </div>
            <div className="header__item__text">
              <p>Hệ thống</p>
              <p>Showroom</p>
            </div>
          </div>
          <div className="header__item">
            <div className="header__item__icon">
              <FiClipboard />
            </div>
            <Link to="/manage-payment">
              <div className="header__item__text">
                <p>Tra cứu</p>
                <p>Đơn hàng</p>
              </div>
            </Link>
          </div>
          <div className="header__item">
            <Link to="/cart">
              <div className="header__item__icon">
                <PiShoppingCartSimpleBold />
                {userLogin && (
                  <span className="header__item__cart-count">{cartCount}</span>
                )}
              </div>
              <div className="header__item__text">
                <p>Giỏ</p>
                <p>hàng</p>
              </div>
            </Link>
          </div>
          <UserPopover>
            <div className="header__item-bgc">
              <div className="header__item__icon">
                <LuUser />
              </div>
              <div className="header__item__text">
                {userLogin ? (
                  <>
                    <p>Xin chào</p>
                    <p>{userLogin.userName}</p>
                  </>
                ) : (
                  <>
                    <p>Đăng</p>
                    <p>nhập</p>
                  </>
                )}
              </div>
            </div>
          </UserPopover>
        </div>
      </div>
    </>
  );
}

export default Header;
