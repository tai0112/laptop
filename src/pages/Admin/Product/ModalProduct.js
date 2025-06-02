import {
  Form,
  Input,
  Button,
  Spin,
  notification,
  Row,
  Col,
  Select,
  Checkbox,
} from "antd";
import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import {
  createProduct,
  updateProduct,
} from "../../../Services/ProductServices";
import { getCategories } from "../../../Services/CategoryServices";
import { getManufacture } from "../../../Services/ManufactureServices";
import "./Product.scss";
import { useNavigate } from "react-router-dom";
function ModalProduct(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { product } = props;
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    const categories = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    const manufacturers = async () => {
      const response = await getManufacture();
      setManufacturers(response);
    };

    manufacturers();
    categories();
  }, []);
  const openNotification = () => {
    api.success({
      message: "Thành công",
      description: "Thao tác thành công",
      placement: "topRight",
    });
  };
  const failNotification = () => {
    api.error({
      message: "Thất bại",
      description: "Thao tác thất bại",
      placement: "topRight",
    });
  };
  const rules = [
    {
      required: true,
      message: "Vui lòng nhập đầy đủ thông tin",
    },
  ];
  const handleSubmit = async (e) => {
    setConfirmLoading(true);
    const response = product
      ? await updateProduct(product.productId, e)
      : await createProduct(e);
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      !product ? form.resetFields() : form.setFieldsValue(e);
      dispatch(loading());
      response ? openNotification() : failNotification();
    }, 2000);
    setTimeout(() => {
      navigate("/admin/product");
    }, 3000);
  };
  return (
    <div>
      {contextHolder}
      <Spin indicator={<LoadingOutlined />} spinning={confirmLoading}>
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
          name="editRoom"
          initialValues={product}
        >
          <Row gutter={[16, 0]}>
            {product && (
              <Form.Item hidden label="Id" name="categoryId" rules={rules}>
                <Input />
              </Form.Item>
            )}
            <Col span={24}>
              <Form.Item label="Tên sản phẩm" name="name" rules={rules}>
                <Input placeholder="Nhập vào tên sản phẩm..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <label htmlFor="categoryId">Danh mục</label>
                <Form.Item name="categoryId" noStyle rules={rules}>
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item name="categoryId" noStyle rules={rules}>
                  <Select
                    placeholder="Chọn danh mục sản phẩm"
                    className="form-control"
                  >
                    {categories.map((item) => (
                      <option key={item.categoryId} value={item.categoryId}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <label htmlFor="manufactureId">Nhà sản xuất</label>
                <Form.Item name="manufactureId" noStyle rules={rules}>
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item name="manufactureId" noStyle rules={rules}>
                  <Select
                    placeholder="Chọn nhà sản xuất sản phẩm"
                    className="form-control"
                  >
                    {manufacturers.map((item) => (
                      <Select.Option
                        key={item.manufactureId}
                        value={item.manufactureId}
                      >
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mô tả cho sản phẩm"
                name="description"
                rules={rules}
              >
                <Input.TextArea placeholder="Mô tả..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="isActive" valuePropName="checked" label={null}>
                <Checkbox>Kích hoạt</Checkbox>
              </Form.Item>
            </Col>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                {product ? "Edit" : "Create"}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Spin>
    </div>
  );
}

export default ModalProduct;
