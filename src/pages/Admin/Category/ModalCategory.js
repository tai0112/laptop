import { Form, Input, Button, Spin, notification } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import { useNavigate } from "react-router-dom";
import {
  createCategory,
  updateCategory,
} from "../../../Services/CategoryServices";
function ModalCategory(props) {
  const navigate = useNavigate();
  const { category } = props;
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
    const response = category
      ? await updateCategory(category.categoryId, e)
      : await createCategory(e);
    console.log(response);
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      !category ? form.resetFields() : form.setFieldsValue(e);
      dispatch(loading());
      openNotification();
    }, 2000);
    setTimeout(() => {
      setConfirmLoading(false);
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
          initialValues={category}
        >
          {category ? (
            <>
              <Form.Item hidden label="Id" name="categoryId" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Tên danh mục" name="name" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Mô tả" name="description" rules={rules}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  {category ? "Edit" : "Create"}
                </Button>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item label="Tên danh mục" name="name" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Mô tả" name="description" rules={rules}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  {category ? "Edit" : "Create"}
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Spin>
    </div>
  );
}

export default ModalCategory;
