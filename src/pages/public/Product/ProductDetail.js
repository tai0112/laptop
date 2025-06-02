import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetailById } from "../../../Services/ProductDetailServices";
import { IoIosGift } from "react-icons/io";
import { Row, Col, Image, notification, Table, Spin } from "antd";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "./Product.scss";
import { formatVNDWithoutSymbol } from "../../../utils/formatText";
import { getDataUserLocalStorage } from "../../../utils/localStorageUtils";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../action/loading";
import * as cart from "../../../Services/CartServices";
const column = [
  {
    title: <span className="product-table__title">Ram</span>,
    dataIndex: "ram",
    key: "ram",
    render: (text, _) => <span>{text}GB</span>,
  },
  {
    title: <span className="product-table__title">Storage</span>,
    dataIndex: "storage",
    key: "storage",
    render: (text, _) => <span>{text}GB</span>,
  },
  {
    title: <span className="product-table__title">CPU</span>,
    dataIndex: "processor",
    key: "processor",
  },
  {
    title: <span className="product-table__title">Pin</span>,
    dataIndex: "battery",
    key: "battery",
  },
  {
    title: <span className="product-table__title">VGA</span>,
    dataIndex: "graphicCard",
    key: "graphicCard",
  },
  {
    title: <span className="product-table__title">Màu sắc</span>,
    dataIndex: "color",
    key: "color",
  },
  {
    title: <span className="product-table__title">Cân nặng</span>,
    dataIndex: "weight",
    key: "weight",
    render: (text, _) => <span>{text} kg</span>,
  },
  {
    title: <span className="product-table__title">Màn hình</span>,
    dataIndex: "displaySize",
    key: "displaySize",
  },
];
function ProductDetail() {
  const navigate = useNavigate();
  const data = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const loadingRedx = useSelector((state) => state.loadingReducer);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState([]);
  const openNotification = () => {
    api.success({
      message: "Thêm thành công sản phẩm vào giỏ hàng",
      placement: "topRight",
    });
  };
  const handleAddToCart = async () => {
    try {
      const userId = getDataUserLocalStorage().id;
      const productDetailId = product.productDetailId;
      const quantity = 1;
      const { cartId } = await cart.getCart({ userId });
      const response = await cart.addToCart({
        cartId,
        productDetailId,
        quantity,
      });
      if (response) {
        openNotification();
      }
      setLoading(true);
      setTimeout(() => {
        dispatch(action.loading());
        setLoading(false);
      }, 1000);
    } catch (ex) {
      Swal.fire({
        title: "Bạn cần đăng nhập để thêm vào giỏ hàng",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductDetailById(data.productDetailId);
      setProduct(response);
    };
    fetchProduct();
  }, [loadingRedx, loading]);
  return (
    <div>
      {contextHolder}
      <div className="product-detail__container content-default">
        <Row gutter={20}>
          <Col span={12}>
            <div className="product-detail__container-left">
              <Swiper
                className="product-detail__image"
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {product.productImages?.length > 0 &&
                  product.productImages?.map((item) => {
                    return (
                      <SwiperSlide>
                        <div className="product-detail__container-img">
                          <Image
                            style={{ width: "100%", height: "100%" }}
                            src={item.filePath}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
              <Swiper
                className="product-detail__image-list"
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={8}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {product.productImages?.length > 0 &&
                  product.productImages?.map((item) => {
                    return (
                      <SwiperSlide>
                        <Image width={48} height={48} src={item.filePath} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </Col>
          <Col span={12}>
            <div className="product-detail__container-right">
              <div className="product-detai__container-description">
                <h2 className="product-detail__container-name">
                  {product.product?.name} {product.sku}
                </h2>
                <div className="product-detail__container-review">
                  <Link to="">Xem đánh giá</Link>
                </div>
                <div className="product-detail__container-price">
                  <span className="product-detail__price-discount">
                    {formatVNDWithoutSymbol(
                      Math.round(
                        product.price - product.price * (product.discount / 100)
                      )
                    )}
                    ₫
                  </span>
                  <span className="product-detail__price-init">
                    {formatVNDWithoutSymbol(product.price)}₫
                  </span>
                  <span className="product__detail__description__discount-percent">
                    -{product.discount}%
                  </span>
                </div>
                <div className="product-detail__container-gift">
                  <div className="product-detail__container-gift__header">
                    <IoIosGift />
                    <span style={{ marginLeft: "5px" }}>
                      Quà tặng khuyến mãi
                    </span>
                  </div>
                  <div className="product-detail__container-gift__content">
                    <span>Tặng ngay 1 x Túi chống sốc trị giá 100.000₫</span>
                  </div>
                </div>
                <div className="add-to-cart">
                  {product.stockQuantity > 0 ? (
                    <Spin spinning={loading}>
                      <button
                        onClick={handleAddToCart}
                        className="product-detail__button button-primary"
                      >
                        <p
                          style={{
                            fontSize: "18px",
                            textTransform: "uppercase",
                            fontWeight: "600",
                          }}
                        >
                          Mua ngay
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            marginTop: 4,
                          }}
                        >
                          Giao tận nơi hoặc nhận tại cửa hàng
                        </p>
                      </button>
                    </Spin>
                  ) : (
                    <button className="product-detail__button button-secondary">
                      <p
                        style={{
                          fontSize: "18px",
                          textTransform: "uppercase",
                          fontWeight: "600",
                        }}
                      >
                        Hết hàng
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          marginTop: 4,
                        }}
                      >
                        Vui lòng chọn sản phẩm khác
                      </p>
                    </button>
                  )}
                </div>
                <div className="product-detail__warranty">
                  <p className="product-detail__warranty-item">
                    <FaCheck /> Bảo hành chính hãng 12 tháng.
                  </p>
                  <p className="product-detail__warranty-item">
                    <FaCheck /> Hỗ trợ đổi mới tỏng 7 ngày.
                  </p>
                  <p className="product-detail__warranty-item">
                    <FaCheck /> Windows bản quyền tích hợp.
                  </p>
                  <p className="product-detail__warranty-item">
                    <FaCheck /> Miễn phí giao hàng toàn quốc.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{ marginTop: "16px" }}
        className="product-detail__description content-default"
      >
        <h2 className="product-detail__description-title">
          Thông tin sản phẩm
        </h2>
        <Row>
          <Col span={24}>
            {/* <div className="product-detail__description-content">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div> */}
            <Table
              tableLayout="vertical"
              pagination={false}
              bordered
              rowKey={product.productDetailId}
              dataSource={[product]}
              columns={column}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProductDetail;
