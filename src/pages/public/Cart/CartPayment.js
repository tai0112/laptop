function CartPayment() {
  const data = JSON.parse(localStorage.getItem("address")) || {};
  return (
    <div className="cart-payment">
      <h2>Thông tin đặt hàng</h2>
      <div className="cart-payment__info">
        {data.name && (
          <table>
            <tbody>
              <tr className="cart-payment__info-row">
                <td className="cart-payment__info-label">Họ và tên</td>
                <td>{data.name}</td>
              </tr>
              <tr className="cart-payment__info-row">
                <td className="cart-payment__info-label">Số điện thoại</td>
                <td>{data.phone}</td>
              </tr>
              <tr className="cart-payment__info-row">
                <td className="cart-payment__info-label">Địa chỉ</td>
                <td>
                  {data.street}, {data.ward}, {data.district}, {data.province}
                </td>
              </tr>
              <tr className="cart-payment__info-row">
                <td className="cart-payment__info-label">Ghi chú</td>
                <td>{data.note ? data.note : "Không có ghi chú"}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {/* Payment form or options would go here */}
    </div>
  );
}

export default CartPayment;
