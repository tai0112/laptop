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
  InputNumber,
} from "antd";
// import DOMPurify from "dompurify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import "./Product.scss";
import { getGifts } from "../../../Services/GiftServices";
import {
  createProdcutDetail,
  updateProductDetail,
} from "../../../Services/ProductDetailServices";
import { useNavigate, useParams } from "react-router-dom";
function ModalProductDetail(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  console.log(productId);
  const [form] = Form.useForm();
  const { productDetail } = props;
  const [gifts, setGifts] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    const giftsFetch = async () => {
      const response = await getGifts();
      setGifts(response);
    };
    giftsFetch();
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
    const response = productDetail
      ? await updateProductDetail(productDetail.productDetailId, e)
      : await createProdcutDetail(e);
    setConfirmLoading(true);
    setTimeout(() => {
      !productDetail ? form.resetFields() : form.setFieldsValue(e);
      dispatch(loading());
      response ? openNotification() : failNotification();
      setConfirmLoading(false);
    }, 2000);
    navigate(`/admin/product/${productId}/`);
  };
  return (
    <div>
      {contextHolder}
      <Spin indicator={<LoadingOutlined />} spinning={confirmLoading}>
        <Form
          onFinish={handleSubmit}
          onFinishFailed={(error) => {
            console.log("Validation Failed:", error);
          }}
          form={form}
          layout="vertical"
          initialValues={{ ...productDetail, productId }}
        >
          <div className="product-detail__modal">
            <Row gutter={[16, 0]}>
              <Col span={24}>
                <Form.Item hidden label="Id" name="productId" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Dung lượng RAM" name="ram" rules={rules}>
                  <Select className="form-control" id="ram">
                    <Select.Option key={"8GB - DDR5"} value={8}>
                      8GB - DDR5
                    </Select.Option>
                    <Select.Option key={"16GB - DDR5"} value={16}>
                      16GB - DDR5
                    </Select.Option>
                    <Select.Option key={"32GB - DDR5"} value={32}>
                      32GB - DDR5
                    </Select.Option>
                    <Select.Option key={"64GB - DDR5"} value={64}>
                      64GB - DDR5
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Dung lượng bộ nhớ"
                  name="storage"
                  rules={rules}
                >
                  <Select className="form-control" id="storage">
                    <Select.Option key={"256 GB"} value={256}>
                      256 GB
                    </Select.Option>
                    <Select.Option key={"512 GB"} value={512}>
                      512 GB
                    </Select.Option>
                    <Select.Option key={"1 TB"} value={1000}>
                      1 TB
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Battery" name="battery" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="CPU" name="processor" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="GPU" name="graphicCard" rules={rules}>
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Form.Item name="giftId" noStyle>
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item label="Quà tặng kèm" name="giftId">
                    <Select className="form-control" id="giftId">
                      {gifts.length > 0 &&
                        gifts.map((item) => (
                          <Select.Option key={item.giftId} value={item.giftId}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Màu sắc" name="color" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Giảm giá" name="discount">
                  <InputNumber min={0} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số lượng" name="stockQuantity" rules={rules}>
                  <InputNumber min={0} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Cân nặng" name="weight">
                  <InputNumber min={0} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Màn hình" name="displaySize" rules={rules}>
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Mô tả cho sản phẩm"
                  name="description"
                  rules={rules}
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data={productDetail ? productDetail.description : ""}
                    onChange={(_, editor) => {
                      const data = editor.getData();
                      form.setFieldsValue({ description: data });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Giá" name="price" rules={rules}>
                  <InputNumber min={0} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="isActived"
                  valuePropName="checked"
                  label={null}
                >
                  <Checkbox>Active</Checkbox>
                </Form.Item>
              </Col>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  {productDetail ? "Edit" : "Create"}
                </Button>
              </Form.Item>
            </Row>
          </div>
        </Form>
      </Spin>
    </div>
  );
}

export default ModalProductDetail;
