import { Form, Input, Button, Spin, Modal, Tabs } from "antd";
import Swal from "sweetalert2";
import { useState } from "react";
import { loginAPI, registerAPI } from "../../../Services/UserServices";
import { useNavigate } from "react-router-dom";
import {
  addDataUserLocalStorage,
  getRoleFromJWT,
} from "../../../utils/localStorageUtils";
import "./Login.scss";
function Login(props) {
  const { tabData } = props;
  const [formLogin] = Form.useForm();
  const [formRegister] = Form.useForm();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const rules = [
    {
      required: true,
      message: "Vui lòng nhập đầy đủ thông tin",
    },
  ];

  const showModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const loginSuccess = (messageSuccess) => {
    Swal.fire({
      title: messageSuccess,
      icon: "success",
    });
  };
  const loginFail = (messageFail) => {
    Swal.fire({
      title: messageFail,
      icon: "success",
    });
  };
  const handleRegister = async (e) => {
    try {
      const response = await registerAPI(e);
      setLoading(true);
      setIsModalOpen(false);
      setTimeout(() => {
        loginSuccess("Tạo tài khoản thành công");
        setLoading(false);
      }, 2000);
    } catch {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        loginFail("Tạo tài khoản thất bại");
      }, 2000);
    } finally {
      formRegister.resetFields();
    }
  };
  const handleLogin = async (e) => {
    try {
      const response = await loginAPI(e);
      setLoading(true);
      setTimeout(() => {
        setIsModalOpen(false);
        addDataUserLocalStorage(response);
        setLoading(false);
        loginSuccess("Đăng nhập thành công");
      }, 2000);
      setTimeout(() => {
        const role = getRoleFromJWT(response.jwtToken);
        if (role === "Writer") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      }, 3000);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        loginFail("Đăng nhập thất bại");
      }, 2000);
    } finally {
      formLogin.resetFields();
    }
  };
  console.log(tabData);
  return (
    <>
      <Button
        onClick={showModalOpen}
        className={!tabData ? `login__button` : `login__button register`}
      >
        {tabData ? "Đăng ký" : "Đăng nhập"}
      </Button>
      <Modal
        className="login"
        title={
          <p className="login__form__title">Đăng nhập hoặc tạo tài khoản</p>
        }
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Spin style={{ textAlign: "center" }} spinning={loading}>
          <Tabs
            style={{ width: "550px !important" }}
            defaultActiveKey={tabData ? "register" : "login"}
            items={[
              {
                label: "Đăng nhập",
                key: "login",
                children: (
                  <Form
                    form={formLogin}
                    className="login__form__container"
                    onFinish={(e) => handleLogin(e)}
                  >
                    <Form.Item label={null} name="username" rules={rules}>
                      <Input
                        className="login__form__item"
                        placeholder="Nhập tên đăng nhập..."
                      />
                    </Form.Item>
                    <Form.Item label={null} name="password" rules={rules}>
                      <Input.Password
                        className="login__form__item"
                        placeholder="Nhập mật khẩu..."
                      />
                    </Form.Item>
                    <Form.Item
                      className="container__action"
                      label={null}
                      rules={rules}
                    >
                      <Button
                        className="login__form__submit"
                        type="primary"
                        htmlType="submit"
                      >
                        Đăng nhập
                      </Button>
                    </Form.Item>
                  </Form>
                ),
              },
              {
                label: "Đăng ký",
                key: "register",
                children: (
                  <Form
                    form={formRegister}
                    className="login__form__container"
                    onFinish={(e) => handleRegister(e)}
                  >
                    <Form.Item label={null} name="username" rules={rules}>
                      <Input
                        className="login__form__item"
                        placeholder="Nhập tên đăng nhập..."
                      />
                    </Form.Item>
                    <Form.Item label={null} name="email" rules={rules}>
                      <Input
                        className="login__form__item"
                        placeholder="Nhập email..."
                      />
                    </Form.Item>
                    <Form.Item label={null} name="password" rules={rules}>
                      <Input.Password
                        className="login__form__item"
                        placeholder="Nhập mật khẩu..."
                      />
                    </Form.Item>
                    <Form.Item
                      label={null}
                      name="re-password"
                      rules={[
                        rules,
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Mật khẩu không khớp")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        className="login__form__item"
                        placeholder="Nhập lại mật khẩu..."
                      />
                    </Form.Item>
                    <Form.Item className="container__action" label={null}>
                      <Button
                        className="login__form__submit"
                        type="primary"
                        htmlType="submit"
                      >
                        TẠO TÀI KHOẢN
                      </Button>
                    </Form.Item>
                  </Form>
                ),
              },
            ]}
          />
        </Spin>
      </Modal>
    </>
  );
}

export default Login;
