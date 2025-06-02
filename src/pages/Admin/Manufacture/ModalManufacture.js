import { Form, Input, Button, Spin, notification } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import { useNavigate } from "react-router-dom";
import {
  createManufacture,
  updateManufacture,
} from "../../../Services/ManufactureServices";
function ModalManufacture(props) {
  const navigate = useNavigate();
  const { manufacture } = props;
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
    const response = manufacture
      ? await updateManufacture(manufacture.manufactureId, e)
      : await createManufacture(e);
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      manufacture ? form.setFieldsValue(e) : form.resetFields();
      dispatch(loading());
      openNotification();
    }, 2000);
    setTimeout(() => {
      setConfirmLoading(false);
      navigate("/admin/manufacture");
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
          initialValues={manufacture}
        >
          {manufacture ? (
            <>
              <Form.Item hidden label="Id" name="manufactureId" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Tên nhà sản xuất" name="name" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Mô tả" name="description" rules={rules}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  {manufacture ? "Edit" : "Create"}
                </Button>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item label="Tên nhà sản xuất" name="name" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Mô tả" name="description" rules={rules}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  {manufacture ? "Edit" : "Create"}
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Spin>
    </div>
  );
}

export default ModalManufacture;
