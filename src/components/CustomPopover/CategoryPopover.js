import { Popover } from "antd";
import { useEffect, useState } from "react";
import { getCategories } from "../../Services/CategoryServices";
const CategoryPopover = ({ children }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    fetchCategory();
  }, []);
  const content = (
    <div className="popover__category__content">
      <div className="popover__category__content__list">
        {categories.length > 0 &&
          categories.map((item) => {
            return (
              <a href={`/product/${item.name}`} key={item.categoryId}>
                <div className="popover__category__content__list-item">
                  {item.name}
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
  return (
    <>
      <Popover
        className="popover__category"
        placement="bottom"
        content={content}
      >
        {children}
      </Popover>
    </>
  );
};

export default CategoryPopover;
