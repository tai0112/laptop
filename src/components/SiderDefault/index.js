import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { MdLaptop } from "react-icons/md";
import { getCategories } from "../../Services/CategoryServices";
import { IoIosArrowForward } from "react-icons/io";
import thang_04_layout_web_05 from "../../assets/images/thang_04_layout_web_05.webp";
import "./SiderDefault.scss";
function SiderDefault() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);
  return (
    <>
      <div className="sider-default">
        <div className="slider-default__list">
          {categories.length > 0 &&
            categories.map((item) => {
              return (
                <div
                  className="sider-default__list__item"
                  key={item.categoryId}
                >
                  <MdLaptop />
                  <span>{item.name}</span>
                  <IoIosArrowForward />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SiderDefault;
