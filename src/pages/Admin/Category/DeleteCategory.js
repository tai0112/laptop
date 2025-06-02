import { Button, message, Popconfirm, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import { deleteCategory } from "../../../Services/CategoryServices";
function DeleteCategory(props) {
  const dispatch = useDispatch();
  const { category } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const handleDelete = async (categoryId) => {
    const response = await deleteCategory(categoryId);
    response ? openNotification() : openErrorNotification();
  };
  const handleOk = (category) => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleDelete(category.categoryId);
      setOpen(false);
      setConfirmLoading(false);
    }, 1500);
  };
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    message.info("Delete cancelled");
    setOpen(false);
  };
  const openNotification = () => {
    api.success({
      message: "Delete Category",
      description: "Category deleted successfully",
      placement: "topRight",
    });
    setTimeout(() => {
      dispatch(loading(true));
    }, 2000);
  };
  const openErrorNotification = () => {
    api.error({
      message: "Delete Category",
      description: "Failed to delete category",
      placement: "topRight",
    });
  };
  const propertiesPopconfirm = {
    title: `Are you sure to delete category ${category.name}?`,
    onConfirm: () => handleOk(category),
    open: open,
    okButtonProps: { loading: confirmLoading },
    onCancel: handleCancel,
    okText: "Yes",
    cancelText: "No",
  };
  return (
    <div>
      {contextHolder}
      <Popconfirm {...propertiesPopconfirm}>
        <Button onClick={showPopconfirm} danger type="primary">
          Delete
        </Button>
      </Popconfirm>
    </div>
  );
}

export default DeleteCategory;
