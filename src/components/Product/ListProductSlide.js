import { useState, useEffect } from "react";
import ProductSlide from "./ProductSlide";
import { getCategories } from "../../Services/CategoryServices";

function ListProductSlide() {
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategories();
      setCategory(response);
    };
    fetchData();
  }, []);

  return (
    <>
      {categories.length > 0 &&
        categories.map((item) => (
          <ProductSlide key={item.categoryId} category={item} />
        ))}
    </>
  );
}

export default ListProductSlide;
