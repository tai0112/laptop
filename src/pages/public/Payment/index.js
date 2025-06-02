import { Tabs } from "antd";
import TrackingPayment from "./TrackingPayment";
import User from "../../user";

function ManagePayment() {
  const items = [
    {
      key: "1",
      label: "Thông tin tài khoản",
      children: <User />,
    },
    {
      key: "2",
      label: "Quản lý đơn hàng",
      children: <TrackingPayment />,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} tabPosition="left" />
    </>
  );
}
export default ManagePayment;
