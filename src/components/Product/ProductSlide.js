import { useEffect, useState } from "react";
import { getProductDetails } from "../../Services/ProductDetailServices";
import { Swiper, SwiperSlide } from "swiper/react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import ProductDetail from "./ProductDetail";
function ProductSlide(props) {
  const { category } = props;
  const navPrev = `.swiper-button-prev-${category.categoryId}`;
  const navNext = `.swiper-button-next-${category.categoryId}`;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const respponse = await getProductDetails({
        category: category.name,
      });
      setProducts(respponse);
    };
    fetchProduct();
  }, []);
  return (
    <>
      {products.length > 0 && (
        <div className="product__slider">
          <div className="product__slider-navigation">
            <p className="product__slider-navigation__name">{category.name}</p>
            <Link
              to={`/product/` + category.name}
              className="product__slider-navigation__all"
            >
              Xem tất cả
            </Link>
          </div>
          <Swiper
            effect="slide"
            autoplay={{
              delay: 3000 + Math.floor(Math.random() * 2000),
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={{
              nextEl: navNext,
              prevEl: navPrev,
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={5}
            slidesPerView={5}
          >
            <div className={`swiper-button-next ${navNext.slice(1)}`}>
              <RiArrowRightSLine />
            </div>
            <div className={`swiper-button-prev ${navPrev.slice(1)}`}>
              <RiArrowLeftSLine />
            </div>
            {products.map((item, index) => {
              return (
                <SwiperSlide>
                  <ProductDetail key={index} product={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
}

export default ProductSlide;
