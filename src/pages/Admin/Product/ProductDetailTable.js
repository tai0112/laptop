import { Link, useParams } from "react-router-dom";
import { Table, Space, Tag, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalProductImage from "../Image/ModalImage";
import { getProductDetailByProductId } from "../../../Services/ProductDetailServices";
import "./Product.scss";
import DeleteProductDetail from "./DeleteProductDetail";
import EditProductDetail from "./EditProductDetail";
const columns = [
  {
    title: "Product detail id",
    dataIndex: "productDetailId",
    key: "productDetailId",
    fixed: "left",
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
    title: "Sku",
    dataIndex: "sku",
    key: "sku",
    fixed: "left",
  },
  {
    title: "Processor",
    key: "processor",
    dataIndex: "processor",
  },
  {
    title: "Ram",
    key: "ram",
    width: 100,
    render: (_, record) => <span>{record?.ram}GB</span>,
  },
  {
    title: "Storage",
    key: "storage",
    width: 100,
    render: (_, record) => <span>{record?.storage}GB</span>,
  },
  {
    title: "Battery",
    key: "battery",
    width: 150,
    dataIndex: "battery",
  },
  {
    title: "Color",
    key: "color",
    width: 200,
    dataIndex: "color",
  },
  {
    title: "Display",
    key: "displaySize",
    dataIndex: "displaySize",
  },
  {
    title: "Graphic card",
    key: "graphicCard",
    dataIndex: "graphicCard",
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
    render: (text) => {
      return new Date(text).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(text);
    },
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    width: 100,
    render: (text) => {
      return text ? `${text}%` : "0%";
    },
  },
  {
    title: "Price after discount",
    width: 200,
    render: (_, record) => {
      const priceAfterDiscount =
        record.price - record.price * (record.discount / 100);
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(priceAfterDiscount);
    },
  },
  {
    title: "Active",
    dataIndex: "isActived",
    key: "isActive",
    render: (_, record) =>
      record.isActived ? (
        <Tag color="green">Active</Tag>
      ) : (
        <Tag color="red">Inactive</Tag>
      ),
  },
  {
    title: "Product image",
    width: 150,
    key: "productImages",
    render: (_, record) => {
      return <ModalProductImage productDetail={record} />;
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => {
      return (
        <Space key={record.productId}>
          <EditProductDetail productDetail={record} />
          <DeleteProductDetail productDetail={record} />
        </Space>
      );
    },
  },
];
function ProductDetailTable() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const reload = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    const fetchProductDetails = async (id) => {
      const response = await getProductDetailByProductId(id);
      setProductDetails(response);
    };
    setLoading(true);
    fetchProductDetails(productId);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [reload, productId]);

  return (
    <>
      <div className="product-details__container">
        <p className="product-details__title">Danh sách cấu hình chi tiết</p>
        <Link to={`/admin/product/${productId}/createProductDetail`}>
          Thêm cấu hình chi tiết
        </Link>
        <Spin spinning={loading} size="large">
          {productDetails.length > 0 && (
            <Table
              bordered
              dataSource={productDetails}
              rowKey="productDetailId"
              columns={columns}
              scroll={{ x: "max-content", y: 100 * 5 }}
            />
          )}
        </Spin>
      </div>
    </>
  );
}

export default ProductDetailTable;
