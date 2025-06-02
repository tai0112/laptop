import { Space, Table, Input, Col, Row, Spin } from "antd";
import { Link } from "react-router-dom";
import DeleteCategory from "./DeleteCategory";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./Category.scss";
import EditCategory from "./EditCategory";
import { getCategories } from "../../../Services/CategoryServices";
function CategoryTable() {
  useSelector((state) => state.loadingReducer);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = (value) => {
    setSearch(value);
  };
  const reload = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getCategories({search}).then((res) => {
        setCategories(res);
      });
      setLoading(false);
    }, 1000);
  }, [reload, search]);
  const columns = [
    {
      title: "Category name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const link = `/admin/category/${record.categoryId}`;
        return (
          <Link to={link} className="table-category__name">
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
          <Space key={record.categoryId}>
            <EditCategory category={record} />
            <DeleteCategory category={record} />
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
            placeholder="Search category"
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
          dataSource={categories}
          rowKey="categoryId"
          columns={columns}
        />
      </Spin>
    </>
  );
}

export default CategoryTable;
