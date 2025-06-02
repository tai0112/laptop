import { FaRegCheckCircle } from "react-icons/fa";
import "./Payment.scss";
function PaySuccess() {
  setTimeout(() => {
    window.location.href = "/";
  }, 5000);
  return (
    <>
      <div className="pay-success">
        <FaRegCheckCircle className="pay-success__icon" />
        <div className="pay-success__message">
          <h1>Thanh toán thành công hóa đơn</h1>
          <p>Cảm ơn bạn đã mua hàng, đơn hàng của bạn đã được thanh toán.</p>
        </div>
      </div>
    </>
  );
}

export default PaySuccess;
