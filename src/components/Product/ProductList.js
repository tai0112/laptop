import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getProductDetails } from "../../Services/ProductDetailServices";
import { Row, Col, Select, Spin } from "antd";
import ProductDetail from "./ProductDetail";
import { getManufacture } from "../../Services/ManufactureServices";
function ProductList() {
  const data = useParams();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [manufacturers, setManufacturers] = useState([]);
  const [params, setParams] = useState({
    q,
    sortBy: "default",
    category: data.category,
  });
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchManufacturers();
      fetchProduct();
      setLoading(false);
    }, 1500);
    const fetchProduct = async () => {
      const respponse = await getProductDetails(params);
      setProducts(respponse);
    };
    const fetchManufacturers = async () => {
      const response = await getManufacture();
      setManufacturers(response);
    };
  }, [params]);
  const handleChangeManufacturers = (value) => {
    if (value) {
      setParams({ ...params, manufacturer: value });
    } else {
      const { manufacturer, ...rest } = params;
      setParams(rest);
    }
  };
  const handleChangeRam = (value) => {
    if (value) {
      setParams({ ...params, ram: value });
    } else {
      const { ram, ...rest } = params;
      setParams(rest);
    }
  };
  const handleChangeSsd = (value) => {
    if (value) {
      setParams({ ...params, ssd: value });
    } else {
      const { ssd, ...rest } = params;
      setParams(rest);
    }
  };
  const handleChangeSort = (value) => {
    if (value) {
      setParams({ ...params, sortBy: value });
    } else {
      const { sort, ...rest } = params;
      setParams(rest);
    }
  };
  return (
    <div className="product__list content-default">
      <div className="product__list-search">
        <Select
          onChange={(e) => handleChangeSort(e)}
          defaultValue={"default"}
          style={{ minWidth: "150px" }}
        >
          <Select.Option value="default">Mặc định</Select.Option>
          <Select.Option value="price-asc">Giá: Thấp đến Cao</Select.Option>
          <Select.Option value="price-desc">Giá: Cao đến Thấp</Select.Option>
          <Select.Option value="name-asc">Tên: A đến Z</Select.Option>
          <Select.Option value="name-desc">Tên: Z đến A</Select.Option>
        </Select>
        <Select
          onChange={(e) => handleChangeRam(e)}
          defaultValue={""}
          style={{ marginLeft: "10px", width: "120px" }}
        >
          <Select.Option value="">RAM</Select.Option>
          <Select.Option value="4">4GB</Select.Option>
          <Select.Option value="6">6GB</Select.Option>
          <Select.Option value="8">8GB</Select.Option>
          <Select.Option value="16">16GB</Select.Option>
          <Select.Option value="32">32GB</Select.Option>
          <Select.Option value="64">64GB</Select.Option>
        </Select>
        <Select
          onChange={(e) => handleChangeSsd(e)}
          defaultValue={""}
          style={{ marginLeft: "10px", width: "120px" }}
        >
          <Select.Option value="">SSD</Select.Option>
          <Select.Option value="128">128GB</Select.Option>
          <Select.Option value="256">256GB</Select.Option>
          <Select.Option value="512">512GB</Select.Option>
          <Select.Option value="1000">1TB</Select.Option>
        </Select>
        <Select
          onChange={(e) => handleChangeManufacturers(e)}
          defaultValue={""}
          style={{ marginLeft: "10px", minWidth: "120px" }}
        >
          <Select.Option value="">Nhà sản xuất</Select.Option>
          {manufacturers.length > 0 &&
            manufacturers.map((item) => {
              return (
                <Select.Option key={item.id} value={item.name}>
                  {item.name}
                </Select.Option>
              );
            })}
        </Select>
      </div>
      <Spin spinning={loading} size="large" className="product__list-loading">
        <Row gutter={[10, 10]}>
          {products.length > 0 ? (
            products?.map((item) => {
              return (
                <Col className="five-cols-col">
                  <ProductDetail product={item} />
                </Col>
              );
            })
          ) : (
            <span className="product__list-empty">
              Không tìm thấy sản phẩm phù hợp
            </span>
          )}
        </Row>
      </Spin>
    </div>
  );
}

export default ProductList;
