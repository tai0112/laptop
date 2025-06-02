import { Avatar, Layout } from "antd";
import { Col, Row } from "antd";
import MenuSiderAdmin from "../../components/MenuSiderAdmin";
import { UserOutlined } from "@ant-design/icons";
import "./LayoutAdmin.scss";
import { Outlet, useNavigate } from "react-router-dom";
import UserPopover from "../../components/CustomPopover/UserPopover";
import {
  getRoleFromJWT,
  removeDataUserLocalStorage,
} from "../../utils/localStorageUtils";
const { Header, Sider, Content } = Layout;
function LayoutAdmin() {
  const navigation = useNavigate();
  const role = getRoleFromJWT();
  if (role !== "Writer") {
    setTimeout(() => {
      removeDataUserLocalStorage();
      navigation("/login");
    }, 1000);
  }
  return (
    <>
      {role === "Writer" && (
        <Layout hasSider>
          <Sider className="sider" theme="light">
            <MenuSiderAdmin />
          </Sider>
          <Layout>
            <Header theme="light" className="header-admin">
              <Row justify="center">
                <Col className="header-admin__container" span={22}>
                  <div className="header-admin__left"></div>
                  <div className="header-admin__right">
                    <div className="header-admin__right__item">
                      <div className="header-admin__right__item__avatar">
                        <UserPopover>
                          <Avatar size={32} icon={<UserOutlined />} />
                        </UserPopover>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Header>
            <Row className="container-content" justify="center">
              <Col span={22}>
                <Content className="content-default">
                  <Outlet />
                </Content>
              </Col>
            </Row>
          </Layout>
        </Layout>
      )}
    </>
  );
}

export default LayoutAdmin;
