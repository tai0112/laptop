import { useEffect, useRef, useState } from "react";
import { InputNumber, Spin } from "antd";
import { getDataUserLocalStorage } from "../../../utils/localStorageUtils";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { formatVNDWithoutSymbol } from "../../../utils/formatText";
import * as cart from "../../../Services/CartServices";
import * as load from "../../../action/loading";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.scss";
function CartContainer() {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState([]);
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loadingReducer);
  const handleIncreaseQuantity = async (productData) => {
    const userId = getDataUserLocalStorage().id;
    const productDetailId = productData.productDetailId;
    const quantity = 1;
    const { cartId } = await cart.getCart({ userId });
    const response = await cart.addToCart({
      cartId,
      productDetailId,
      quantity,
    });
    setLoading(true);
    dispatch(load.loading());
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  const handleDecreaseQuantity = async (productData) => {
    const { cartDetailId } = productData;
    const quantity = 1;
    const response = await cart.decreaseQuantity({
      cartDetailId,
      quantity,
    });
    setLoading(true);
    dispatch(load.loading());
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  const handleRemoveItem = async (productData) => {
    const { cartDetailId } = productData;
    console.log("cartDetailId:", cartDetailId);
    const response = await cart.deleteCartDetail(cartDetailId);
    dispatch(load.loading());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  useEffect(() => {
    const fetchData = async () => {
      const userId = getDataUserLocalStorage().id;
      const response = await cart.getCart({ userId });
      setCarts(response.cartDetails);
    };
    fetchData();
  }, [loading]);
  return (
    <>
      <Spin spinning={loading}>
        <div className="cart__container-list">
          {carts.length > 0 &&
            carts.map((item) => (
              <div className="cart__container-item">
                <div className="cart__container-item__image">
                  <img
                    src={
                      item.productDetail.productImages.find(
                        (item) => item.isMain
                      ).filePath
                    }
                  />
                  <div
                    onClick={async () => await handleRemoveItem(item)}
                    className="cart__container-item__remove"
                  >
                    <FaTrashCan /> Xóa
                  </div>
                </div>
                <div className="cart__container-item__description">
                  <p>{item.productDetail.product.name}</p>
                </div>
                <div className="cart__container-item__price">
                  <p className="cart__container-item__price-before-discount">
                    {formatVNDWithoutSymbol(
                      item.productDetail.price -
                        item.productDetail.price *
                          (item.productDetail.discount / 100)
                    )}
                    ₫
                  </p>
                  <p className="cart__container-item__price-after-discount">
                    {formatVNDWithoutSymbol(item.productDetail.price)}₫
                  </p>
                  <div className="cart__container__quantity">
                    <InputNumber
                      readOnly
                      ref={ref}
                      addonAfter={
                        <FaPlus
                          onClick={() => {
                            handleIncreaseQuantity(item);
                          }}
                        />
                      }
                      addonBefore={
                        <FiMinus onClick={() => handleDecreaseQuantity(item)} />
                      }
                      min={1}
                      value={item.quantity}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Spin>
    </>
  );
}

export default CartContainer;
