import { useState, useEffect, useRef } from "react";
import { Steps, Button, Divider, Spin } from "antd";
import "./Cart.scss";
import CartInfo from "./CartInfo";
import CartContainer from "./CartContainer";
import { formatVNDWithoutSymbol } from "../../../utils/formatText";
import * as cart from "../../../Services/CartServices";
import { getDataUserLocalStorage } from "../../../utils/localStorageUtils";
import { useSelector } from "react-redux";
import { IoCartSharp } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { MdPaid } from "react-icons/md";
import CartPayment from "./CartPayment";
import { Link } from "react-router-dom";
function Cart() {
  const cartInfoRef = useRef();
  const steps = [
    {
      title: <span className="step__title">Giỏ hàng</span>,
      content: <CartContainer />,
      icon: (
        <div className="step__icon-container">
          <IoCartSharp className="step__icon" />
        </div>
      ),
    },
    {
      title: <span className="step__title">Thông tin đặt hàng</span>,
      content: <CartInfo ref={cartInfoRef} />,
      icon: (
        <div className="step__icon-container">
          <FaAddressCard className="step__icon" />
        </div>
      ),
    },
    {
      title: <span className="step__title">Thanh toán</span>,
      content: <CartPayment />,
      icon: (
        <div className="step__icon-container">
          <MdOutlinePayment className="step__icon" />
        </div>
      ),
    },
  ];
  const address = JSON.parse(localStorage.getItem("address")) || {};
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [carts, setCarts] = useState([]);
  const loadingState = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const fetchData = async () => {
      const userId = getDataUserLocalStorage().id;
      const response = await cart.getCart({ userId });
      const total = response.cartDetails.reduce((acc, item) => {
        return (
          acc +
          (item.productDetail.price -
            (item.productDetail.price * item.productDetail.discount) / 100) *
            item.quantity
        );
      }, 0);
      setTotal(total);
      setCarts(response.cartDetails);
    };
    fetchData();
  }, [loadingState]);
  const handlePayCart = async () => {
    const userId = getDataUserLocalStorage().id;
    const { cartId } = await cart.getCart({ userId });
    try {
      const response = await cart.payCart({
        cartId,
        phone: address.phone,
        name: address.name,
        address: `${address.street},${address.ward},${address.district},${address.province}`,
      });
      window.location.replace(response.payment);
    } catch (error) {
      console.error("Error during payment:", error);
      return;
    }
  };
  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return (
        acc +
        (item.productDetail.price -
          (item.productDetail.price * item.productDetail.discount) / 100) *
          item.quantity
      );
    }, 0);
    setTotal(total);
  }, [loadingState]);
  const next = async () => {
    if (current === 1) {
      const valid = await cartInfoRef.current?.validateForm();
      if (!valid) return; // ⛔ Không hợp lệ thì không next
    }
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Spin spinning={loading} tip="Đang tải...">
        {!loading && (
          <div className="cart__container">
            {current > 0 && (
              <p className="cart__prev" style={{ margin: "0 8px" }} onClick={() => prev()}>
                Trở lại
              </p>
            )}
            {carts.length > 0 ? (
              <>
                <Steps
                  labelPlacement="vertical"
                  className="cart__step"
                  current={current}
                  items={steps}
                />
                <div>{steps[current].content}</div>
                <Divider />
                <div className="cart__container-total">
                  <strong>Tổng tiền:</strong>
                  <div>{formatVNDWithoutSymbol(total)}₫</div>
                </div>
                <div style={{ marginTop: 24 }}>
                  {current < steps.length - 1 ? (
                    <div className="cart__container-checkout">
                      <button onClick={next} className="button-primary">
                        ĐẶT HÀNG NGAY
                      </button>
                    </div>
                  ) : (
                    <div className="cart__container-checkout">
                      <button
                        onClick={handlePayCart}
                        className="button-primary"
                      >
                        ĐẶT HÀNG NGAY
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="cart__container-empty">
                <h2 className="cart__container-empty__item">
                  <FaCartPlus style={{ marginRight: "8px" }} /> Giỏ hàng của bạn
                  đang trống
                </h2>
                <p className="cart__container-empty__item">
                  Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.
                </p>
                <Link className="cart__container-empty__item" to="/">
                  Tiếp tục mua sắm
                </Link>
              </div>
            )}
          </div>
        )}
      </Spin>
    </>
  );
}

export default Cart;
