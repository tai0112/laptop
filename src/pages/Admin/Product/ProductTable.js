import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as reducer from "../../../action/loading";
import {
  Table,
  Space,
  Row,
  Col,
  Input,
  Spin,
  Tag,
  Button,
  Select,
  Form,
  Tooltip,
} from "antd";
import "./Product.scss";
import { Link } from "react-router-dom";
import { TfiReload } from "react-icons/tfi";
import { getProducts } from "../../../Services/ProductServices";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
function ProductTable() {
  useSelector((state) => state.loadingReducer);
  const dispatch = useDispatch();
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const reload = useSelector((state) => state.loadingReducer);
  const handleSearch = (e) => {
    setParams({
      ...params,
      search: e.search,
      active: e.active,
    });
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getProducts(params).then((res) => {
        setProduct(res);
      });
      setLoading(false);
    }, 500);
  }, [reload, params]);
  const columns = [
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const link = `/admin/product/${record.productId}`;
        return (
          <Link to={link} className="table-manufacture__name">
            {text}
          </Link>
        );
      },
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => record.category.name,
    },
    {
      title: "Manufacture",
      key: "manufacture",
      render: (_, record) => record.manufacture.name,
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return new Date(text).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      title: "Actived at",
      dataIndex: "activedAt",
      key: "activedAt",
      width: 150,
      render: (text) => {
        if (text == null) {
          return "Chưa kích hoạt";
        } else {
          return new Date(text).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
      },
    },
    {
      title: "Update at",
      dataIndex: "updateAt",
      key: "updateAt",
      witdh: 100,
      render: (text) => {
        if (text == null) {
          return "Chưa cập nhật";
        } else {
          return new Date(text).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
      },
    },
    {
      title: "Product detail count",
      dataIndex: "productDetails",
      render: (_, record) => <span>{record.productDetails?.length}</span>,
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
          <Space key={record.productId}>
            <EditProduct product={record} />
            <DeleteProduct product={record} />
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <Row>
        <Col className="search" span={24}>
          <Form onFinish={(e) => handleSearch(e)} layout="inline">
            <Form.Item name="search">
              <Input allowClear placeholder="Tìm kiếm..." />
            </Form.Item>
            <Form.Item name="active" label="Trạng thái" initialValue={""}>
              <Select
                className="search__select-active"
                options={[
                  { value: "", label: "Toàn bộ" },
                  { value: true, label: "Đã kích hoạt" },
                  { value: false, label: "Chưa kích hoạt" },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="search__btn" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
          <div className="search__infor">
            <Tooltip title="Refresh">
              <Link
                className="search__refresh"
                onClick={() => dispatch(reducer.loading())}
              >
                <TfiReload />
              </Link>
            </Tooltip>
            <div className="search__infor--text">
              <span>
                Tìm thấy <strong>{products.length}</strong> sản phẩm
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Table
          pagination={{
            pageSize: 5
          }}
          bordered
          dataSource={products}
          rowKey="productId"
          columns={columns}
        />
      </Spin>
    </>
  );
}

export default ProductTable;
