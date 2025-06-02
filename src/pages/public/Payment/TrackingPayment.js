import { Input, Space, Button, Table } from "antd";
import { useState, useEffect } from "react";
import { getPayments } from "../../../Services/PaymentServices";
import { formatVNDWithoutSymbol } from "../../../utils/formatText";
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
      console.log("record", record);
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
function TrackingPayment() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const { id } = userData || {};
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    userId: id,
  });
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await getPayments(params);
        setPayments(response);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [params]);
  const handleSearchPayment = (value) => {
    if (!value) {
      setParams({
        userId: id,
      });
    } else {
      setParams({
        ...params,
        paymentId: value,
      });
    }
  };
  console.log(payments);
  return (
    <>
      <div className="manage-payment__tracking">
        <div className="manage-payment__tracking-header">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              onChange={(e) => handleSearchPayment(e.target.value)}
              allowClear
              className="manage-payment__tracking-input"
              placeholder="Tìm kiếm theo mã hóa đơn"
            />
            <Button className="manage-payment__tracking-button">
              Tìm hóa đơn
            </Button>
          </Space.Compact>
        </div>
        <div className="manage-payment__tracking-content">
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
      </div>
    </>
  );
}

export default TrackingPayment;
