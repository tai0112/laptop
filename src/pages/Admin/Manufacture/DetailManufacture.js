import { useParams } from "react-router-dom";
import { Table, Space } from "antd";
import { useEffect, useState } from "react";
import { getManufactureById } from "../../../Services/ManufactureServices";
import EditManufacture from "./EditManufacture";
import DeleteManufacture from "./DeleteManufacture";
function DetailManufacture() {
  const { manufactureId } = useParams();
  const [manufacture, setManufacture] = useState({});
  useEffect(() => {
    getManufactureById(manufactureId).then((res) => {
      setManufacture(res);
    });
  }, []);
  const columns = [
    {
      title: "Manufacture ID",
      dataIndex: "manufactureId",
      key: "manufactureId",
    },
    {
      title: "Manufacture Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space key={record.manufactureId}>
            <EditManufacture manufacture={record} />
            <DeleteManufacture manufacture={record} />
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        bordered
        dataSource={manufacture ? [manufacture] : []}
        rowKey="manufactureId"
        columns={columns}
      />
    </div>
  );
}

export default DetailManufacture;
