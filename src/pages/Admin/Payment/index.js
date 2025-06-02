import { DatePicker, Table } from "antd";
import { useEffect, useState } from "react";
import { getPayments } from "../../../Services/PaymentServices";
import { formatDateToYyyyMmDd } from "../../../utils/formatDate";
import { formatVNDWithoutSymbol } from "../../../utils/formatText";
import "./Payment.scss";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const column = [
  {
    title: "Mã hóa đơn",
    dataIndex: "paymentId",
    key: "paymentId",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => {
      const date = new Date(text);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    title: "Địa chỉ nhận hàng",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Số điện thoại nhận hàng",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Trạng thái",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    render: (text) => {
      return (
        <span
          style={{
            color: text === "Paid" ? "green" : "red",
          }}
        >
          {text === "Paid" ? "Đã thanh toán" : "Chưa thanh toán"}
        </span>
      );
    },
  },
  {
    title: "Tổng tiền",
    key: "totalPrice",
    render: (_, record) => {
      var totalPrice = record.paymentDetails.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      return (
        <span style={{ color: "var(--primary-color)" }}>
          {formatVNDWithoutSymbol(totalPrice)}₫
        </span>
      );
    },
  },
];

function Payment() {
  const [payments, setPayments] = useState({});
  const [dateSearch, setDateSearch] = useState();
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      const fetchPayment = async () => {
        const response = await getPayments({
          date,
          endDate,
        });
        setPayments(response);
      };
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        fetchPayment();
      }, 1000);
    } catch (ex) {
      console.log(ex);
    }
  }, [date, endDate]);
  return (
    <>
      <div className="payment-header">
        <div className="payment-search">
          <RangePicker
            style={{ width: "314px" }}
            placeholder={["Chọn ngày bắt đầu", "Chọn ngày kết thúc"]}
            defaultValue={[dayjs(), dayjs()]}
            onChange={(e) => {
              setDate(
                e &&
                  formatDateToYyyyMmDd(
                    `${e[0].year()}-${e[0].month() + 1}-${e[0].date()}`
                  )
              );
              setEndDate(
                e &&
                  formatDateToYyyyMmDd(
                    `${e[1].year()}-${e[1].month() + 1}-${e[1].date()}`
                  )
              );
            }}
          />
        </div>
        <div className="payment-total-revenue">
          <span className="payment-total-revenue__number">
            <p className="payment-total-revenue__number-title">
              Tổng danh thu:
            </p>
            <p className="payment-total-revenue__number-total">
              {formatVNDWithoutSymbol(payments.total)}₫
            </p>
          </span>
        </div>
      </div>
      <div className="payment-content">
        <Table
          bordered
          expandable={{
            expandedRowRender: (record) => (
              <Table
                key={record.paymentId}
                bordered
                columns={[
                  {
                    title: "Tên sản phẩm",
                    dataIndex: "productName",
                    key: "productName",
                    render: (_, item) => {
                      return <span>{item.productDetail.product.name}</span>;
                    },
                  },
                  {
                    title: "Ram(GB)",
                    dataIndex: "Ram",
                    key: "ram",
                    render: (_, item) => {
                      return <span>{item.productDetail.ram}</span>;
                    },
                  },
                  {
                    title: "CPU",
                    dataIndex: "Cpu",
                    key: "Cpu",
                    render: (_, item) => {
                      return <span>{item.productDetail.processor}</span>;
                    },
                  },
                  {
                    title: "GPU",
                    dataIndex: "GPU",
                    key: "GPU",
                    render: (_, item) => {
                      return <span>{item.productDetail.graphicCard}</span>;
                    },
                  },
                  {
                    title: "Bộ nhớ(GB)",
                    dataIndex: "storage",
                    key: "storage",
                    render: (_, item) => {
                      return <span>{item.productDetail.storage}</span>;
                    },
                  },
                  {
                    title: "Số lượng",
                    dataIndex: "quantity",
                    key: "quantity",
                  },
                  {
                    title: "Giá",
                    dataIndex: "price",
                    key: "price",
                    render: (text) => formatVNDWithoutSymbol(text) + "₫",
                  },
                ]}
                dataSource={record.paymentDetails}
                pagination={false}
              />
            ),
          }}
          columns={column}
          dataSource={payments.payments}
          loading={loading}
          rowKey="paymentId"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </>
  );
}

export default Payment;
