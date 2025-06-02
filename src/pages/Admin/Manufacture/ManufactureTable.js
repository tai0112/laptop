import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Table, Space, Row, Col, Input, Spin } from "antd";
import { Link } from "react-router-dom";
import EditManufacture from "./EditManufacture";
import  DeleteManufacture  from "./DeleteManufacture";
import { getManufacture } from "../../../Services/ManufactureServices";
function ManufactureTable() {
  useSelector((state) => state.loadingReducer);
  const [manufacture, setManufacture] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = (value) => {
    setSearch(value);
  };
  const reload = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getManufacture({ search }).then((res) => {
        setManufacture(res);
      });
      setLoading(false);
    }, 1000);
  }, [reload, search]);
  const columns = [
    {
      title: "manufacture name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const link = `/admin/manufacture/${record.manufactureId}`;
        return (
          <Link to={link} className="table-manufacture__name">
            {text}
          </Link>
        );
      },
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
    <>
      <Row>
        <Col span={8}>
          <Input.Search
            className="search"
            onSearch={handleSearch}
            placeholder="Search manufacture"
            allowClear
            enterButton="Search"
            size="large"
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Table
          bordered
          dataSource={manufacture}
          rowKey="manufactureId"
          columns={columns}
        />
      </Spin>
    </>
  );
}

export default ManufactureTable;
