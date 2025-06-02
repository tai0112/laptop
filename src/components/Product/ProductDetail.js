import { GiProcessor } from "react-icons/gi";
import { FaMemory } from "react-icons/fa";
import { PiGraphicsCardLight } from "react-icons/pi";
import { MdSdStorage } from "react-icons/md";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { formatVNDWithoutSymbol } from "../../utils/formatText";
import "./Product.scss";
const { Paragraph } = Typography;
function ProductDetail(props) {
  const { product } = props;
  return (
    <>
      <Link to={`/product/detail/${product.productDetailId}`}>
        <div className="product__detail">
          <div className="product__detail__img">
            <img
              src={
                product.productImages.length > 0
                  ? product.productImages.find((image) => image.isMain)
                      ?.filePath || product.productImages[0].filePath
                  : ""
              }
              alt="Product Image"
            />
          </div>
          <div className="product__detail__description">
            <div className="product__detail__description-name">
              <Paragraph ellipsis={{ tooltip: `${product.product?.name}` }}>
                <span alt={product.product?.name}>{product.product?.name}</span>
              </Paragraph>
            </div>
            <div className="product__detail__description-config">
              <Paragraph style={{ margin: "0px" }} ellipsis>
                <span>
                  <GiProcessor className="product__detail__icon" />
                  {product.processor}
                </span>
                <br />
                <span>
                  <PiGraphicsCardLight className="product__detail__icon" />
                  {product.graphicCard}
                </span>
                <br />
                <span>
                  <FaMemory className="product__detail__icon" />
                  {product.ram}GB
                </span>
                <br />
                <span>
                  <MdSdStorage className="product__detail__icon" />
                  {product.storage}GB
                </span>
              </Paragraph>
            </div>
            <div className="product__detail__description-price">
              <p className="product__detail__description-price__original-price">
                <span className="price">
                  {formatVNDWithoutSymbol(product.price)}
                </span>
                ₫
              </p>
              <div
                className="prodcut__detail__description__discount"
                style={{ marginTop: "10px" }}
              >
                <p className="product__detail__description__discount-price">
                  <span className="price">
                    {formatVNDWithoutSymbol(
                      Math.round(
                        product.price - product.price * (product.discount / 100)
                      )
                    )}
                    ₫
                  </span>
                </p>
                <p className="product__detail__description__discount-percent">
                  {product.discount}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductDetail;
