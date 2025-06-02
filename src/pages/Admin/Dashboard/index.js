import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { BiSolidCategory } from "react-icons/bi";
import Breadcrumb from "../../../components/Breadcumb";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryTable from "../Category/CategoryTable";
import { getCategories } from "../../../Services/CategoryServices";
import { getManufacture } from "../../../Services/ManufactureServices";
import { getProductDetails } from "../../../Services/ProductDetailServices";
import { getPayments } from "../../../Services/PaymentServices";
import { getCurrentDate } from "../../../utils/formatDate";

function Dashboard() {
  const location = useLocation();
  const path = location.pathname.split("/").filter((x) => x);
  const reload = useSelector((state) => state.loadingReducer);
  const [categories, setCategories] = useState([]);
  const [manufactures, setManufactures] = useState([]);
  const [product, setProduct] = useState([]);
  const [payment, setPayment] = useState([]);
  const dateNow = getCurrentDate();
  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories();
      setCategories(categories);

      const manufactures = await getManufacture();
      setManufactures(manufactures);

      const productDetails = await getProductDetails();
      setProduct(productDetails);

      const payments = await getPayments({ date: dateNow, endDate: dateNow });
      setPayment(payments);
    };
    fetchData();
  }, [reload]);
  return (
    <div>
      <Breadcrumb items={path} />
      <h1>Dashboard</h1>
      <div className="general">
        <Row gutter={[12, 12]}>
          <Col xl={12} sm={12}>
            <div className="general__item general__category">
              <div className="general__header">
                <BiSolidCategory />
                <p className="general__title">Tổng loại sản phẩm</p>
              </div>
              <div className="general__info">
                <span className="general__count">{categories.length}</span>
              </div>
            </div>
          </Col>
          <Col xl={12} sm={12}>
            <div className="general__item general__manufacture">
              <div className="general__header">
                <BiSolidCategory />
                <p className="general__title">Tổng nhà phân phối</p>
              </div>
              <div className="general__info">
                <span className="general__count">{manufactures.length}</span>
              </div>
            </div>
          </Col>
          <Col xl={12} sm={12}>
            <div className="general__item general__product">
              <div className="general__header">
                <BiSolidCategory />
                <p className="general__title">Tổng sản phẩm</p>
              </div>
              <div className="general__info">
                <span className="general__count">{product.length}</span>
              </div>
            </div>
          </Col>
          <Col xl={12} sm={12}>
            <div className="general__item general__payment">
              <div className="general__header">
                <BiSolidCategory />
                <p className="general__title">Hóa đơn hôm nay</p>
              </div>
              <div className="general__info">
                <span className="general__count">
                  {payment.payments.length}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;
