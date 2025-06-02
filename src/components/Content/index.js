import Banner from "../Banner";
import SiderDefault from "../SiderDefault";
import "./Content.scss";
import { Row, Col } from "antd";
import ListProductSlide from "../Product/ListProductSlide";

function Content() {
  return (
    <>
      <div>
        <Row gutter={5}>
          {/* <Col span={4}>
            <SiderDefault />
          </Col> */}
          <Col span={24}>
            <Banner />
          </Col>
        </Row>
        <Row>
          <ListProductSlide />
        </Row>
      </div>
    </>
  );
}

export default Content;
