import { Form, Input, Button, Spin, notification, Checkbox } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import { useNavigate } from "react-router-dom";
import { createGift, updateGift } from "../../../Services/GiftServices";
function ModalGift(props) {
  const navigate = useNavigate();
  const { gift } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.success({
      message: "Thành công",
      description: "Thao tác thành công",
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
    const response = gift
      ? await updateGift(gift.giftId, e)
      : await createGift(e);
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      gift ? form.setFieldsValue(e) : form.resetFields();
      dispatch(loading());
      openNotification();
    }, 2000);
    setTimeout(() => {
      setConfirmLoading(false);
      navigate("/admin/gift");
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
          name="editGift"
          initialValues={gift}
        >
          {gift && (
            <Form.Item hidden label="Id" name="giftId" rules={rules}>
              <Input />
            </Form.Item>
          )}
          <Form.Item label="Tên quà tặng" name="name" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="description" rules={rules}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="isActive" valuePropName="checked" label={null}>
            <Checkbox>Kích hoạt</Checkbox>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              {gift ? "Edit" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}

export default ModalGift;
