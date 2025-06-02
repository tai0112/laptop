import { Select, Input, Form, Col, Row } from "antd";
import axios from "axios";
import "./Cart.scss";
import { useEffect, useState, useImperativeHandle } from "react";
const API_VN_ADDRESS = process.env.REACT_APP_BASE_ADDRESS;
function CartInfo({ ref }) {
  const [form] = Form.useForm();
  const [provinces, setProvince] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [wards, setWard] = useState([]);
  const [address, setAddress] = useState({});
  useEffect(() => {
    const setData = async () => {
      axios.get(API_VN_ADDRESS).then((response) => setProvince(response.data));
    };

    const localData = JSON.parse(localStorage.getItem("address") || "{}");

    if (localData) {
      form.setFieldsValue({
        name: localData.name || "",
        phone: localData.phone || "",
        provinces: localData.province || undefined,
        wards: localData.ward || undefined,
        districts: localData.district || undefined,
        street: localData.street || undefined,
      });
    }
    setData();
  }, []);
  useImperativeHandle(ref, () => ({
    async validateForm() {
      try {
        await form.validateFields();
        return true;
      } catch {
        return false;
      }
    },
  }));
  const handleChangeProvinces = async (data) => {
    axios.get(`${API_VN_ADDRESS}p/${data}/?depth=2`).then((response) => {
      setAddress({ ...address, province: response.data.name });
      setDistrict(response.data.districts);
      form.setFieldsValue({
        districts: "",
        wards: "",
        street: "",
      });
    });
    localStorage.setItem("address", JSON.stringify(address));
  };
  const handleChangeDistricts = async (data) => {
    axios.get(`${API_VN_ADDRESS}d/${data}/?depth=2`).then((response) => {
      setAddress({ ...address, district: response.data.name });
      setWard(response.data.wards);
      form.setFieldsValue({
        wards: "",
        street: "",
      });
    });
    localStorage.setItem("address", JSON.stringify(address));
  };
  const handleChangeWards = async (data) => {
    setAddress({ ...address, ward: data });
    localStorage.setItem("address", JSON.stringify(address));
  };
  const handleChangeAddress = (e) => {
    setAddress({ ...address, street: e.target.value });
    localStorage.setItem("address", JSON.stringify(address));
  };
  const handleChangeName = (e) => {
    setAddress({ ...address, name: e.target.value });
    localStorage.setItem("address", JSON.stringify(address));
  };
  const handleChangePhone = (e) => {
    setAddress({ ...address, phone: e.target.value });
    localStorage.setItem("address", JSON.stringify(address));
  };
  const handleChangeNote = (e) => {
    setAddress({ ...address, note: e.target.value });
    localStorage.setItem("address", JSON.stringify(address));
  };
  return (
    <>
      <p className="cart__info-heading">Thông tin mua hàng</p>
      <div>
        <Form validateTrigger="onChange" form={form} layout="vertical">
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true }]}
              >
                <Input onChange={(e) => handleChangeName(e)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input onChange={(e) => handleChangePhone(e)} />
              </Form.Item>
            </Col>
            <Row className="cart__info-location">
              <Col span={12}>
                <Form.Item
                  className="cart__info-location__item"
                  label="Chọn tỉnh thành"
                  name="provinces"
                  rules={[{ required: true }]}
                >
                  <Select
                    onChange={async (e) => await handleChangeProvinces(e)}
                    style={{ width: 244 }}
                  >
                    {provinces.map((province) => (
                      <Select.Option key={province.code} value={province.code}>
                        {province.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  className="cart__info-location__item"
                  label="Chọn quận huyện"
                  name="districts"
                  rules={[{ required: true }]}
                >
                  <Select
                    onChange={async (e) => await handleChangeDistricts(e)}
                    style={{ width: 244 }}
                  >
                    {districts.map((district) => (
                      <Select.Option key={district.code} value={district.code}>
                        {district.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="cart__info-location__item"
                  name="wards"
                  label="Chọn phường xã"
                  rules={[{ required: true }]}
                >
                  <Select
                    onChange={async (e) => await handleChangeWards(e)}
                    style={{ width: 244 }}
                  >
                    {wards.map((ward) => (
                      <Select.Option key={ward.code} value={ward.name}>
                        {ward.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="cart__info-location__item"
                  name="street"
                  label="Số nhà, tên đường"
                  rules={[{ required: true }]}
                >
                  <Input
                    style={{ width: "244px" }}
                    onChange={(e) => handleChangeAddress(e)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Col span={24}>
              <Form.Item style={{ marginTop: "16px" }} name="Note">
                <Input
                  placeholder="Ghi chú (nếu có)"
                  style={{ width: "100%" }}
                  onChange={(e) => handleChangeNote(e)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default CartInfo;
