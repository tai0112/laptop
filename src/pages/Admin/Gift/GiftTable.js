import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Table, Space, Row, Col, Input, Spin, Tag } from "antd";
import { Link } from "react-router-dom";
import { getGifts } from "../../../Services/GiftServices";
import DeleteGift from "./DeleteGift";
import EditGift from "./EditGift";
function GiftTable() {
  useSelector((state) => state.loadingReducer);
  const [gifts, setGift] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = (value) => {
    setSearch(value);
  };
  const reload = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getGifts({ search }).then((res) => {
        setGift(res);
      });
      setLoading(false);
    }, 1000);
  }, [reload, search]);
  const columns = [
    {
      title: "Gift name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const link = `/admin/gift/${record.giftId}`;
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
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, record) =>
        record.isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space key={record.giftId}>
            <EditGift gift={record} />
            <DeleteGift gift={record} />
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
        <Table bordered dataSource={gifts} rowKey="giftId" columns={columns} />
      </Spin>
    </>
  );
}

export default GiftTable;
