import { formatVNDWithoutSymbol } from "../../utils/formatText";
import { Typography } from "antd";
const { Text } = Typography;
function ProductSearchToolTip(props) {
  const { product } = props;
  return (
    <>
      {product.length > 0 &&
        product.map((item) => (
          <a href={"/product/detail/" + item.productDetailId}>
            <div className="product-tooltip__item">
              <div className="product-tooltip__left">
                <Text
                  style={{ width: 324 }}
                  ellipsis={{ tooltip: "I am ellipsis now!" }}
                  className="product-tooltip__name"
                >
                  {item.product.name} {item.sku}
                </Text>
                <div className="product-tooltip__price">
                  <p className="product-tooltip__price-main">
                    {formatVNDWithoutSymbol(item.price)}₫
                  </p>
                  <p className="product-tooltip__price-init">
                    {formatVNDWithoutSymbol(item.price)}₫
                  </p>
                </div>
              </div>
              <div className="product-tooltip__right">
                <img
                  width={38}
                  height={38}
                  src={
                    item.productImages.length > 0
                      ? item.productImages.find((image) => image.isMain)
                          ?.filePath || item.productImages[0].filePath
                      : ""
                  }
                  alt="Product Image"
                />
              </div>
            </div>
          </a>
        ))}
    </>
  );
}

export default ProductSearchToolTip;
