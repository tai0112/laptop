import { useParams, Link } from "react-router-dom";
import { Table, Space, Tag, Card, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductById } from "../../../Services/ProductServices";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import { GiCpu } from "react-icons/gi";
import { PiGraphicsCardFill } from "react-icons/pi";
import { FaMemory } from "react-icons/fa";
import { MdSdStorage } from "react-icons/md";
import { getProductDetailByProductId } from "../../../Services/ProductDetailServices";
import ProductDetailTable from "./ProductDetailTable";
function DetailProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const reload = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await getProductDetailByProductId(productId);
      setProductDetails(response);
    };
    const fetchProduct = async () => {
      const response = await getProductById(productId);
      setProduct(response);
    };
    console.log(productDetails);

    fetchProductDetails();
    fetchProduct();
  }, [reload]);
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
      render: (_, record) => record.category?.name || "N/A",
    },
    {
      title: "Manufacture",
      key: "manufacture",
      render: (_, record) => record.manufacture?.name || "N/A",
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
        return new Date(text).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
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
      {product && (
        <Table
          bordered
          dataSource={product ? [product] : []}
          rowKey="productId"
          columns={columns}
        />
      )}
      <ProductDetailTable />
      {/* <div className="product-details">
        <span>Danh sách cấu hình chi tiết của {product.name}</span>
        <Row gutter={[10, 10]}>
          {productDetails.length > 0 &&
            productDetails.map((item) => {
              return (
                <Col span={6} key={item.productDetailId}>
                  <Card
                    className="product-details__item"
                    size={"small"}
                    title={item.product?.name}
                  >
                    <p className="product-details__item--detail">
                      <FaMemory className="icon-config" />
                        {item.ram}GB
                    </p>
                    <p className="product-details__item--detail">
                      <GiCpu className="icon-config" /> {item.processor}
                    </p>
                    <p className="product-details__item--detail">
                      <MdSdStorage className="icon-config" /> {item.storage}GB
                    </p>
                    <p className="product-details__item--detail">
                      <PiGraphicsCardFill className="icon-config" />
                      {item.graphicCard}
                    </p>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div> */}
    </>
  );
}

export default DetailProduct;
