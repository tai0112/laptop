import { Button, message, Popconfirm, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../Services/ProductServices";
function DeleteProduct(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const handleDelete = async (productId) => {
    const response = await deleteProduct(productId);
    response ? openNotification() : openErrorNotification();
    setTimeout(() => {
      navigate("/admin/product");
    }, 2000);
  };
  const handleOk = (product) => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleDelete(product.productId);
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
      message: "Delete product",
      description: "product deleted successfully",
      placement: "topRight",
    });
    setTimeout(() => {
      dispatch(loading(true));
    }, 2000);
  };
  const openErrorNotification = () => {
    api.error({
      message: "Delete product",
      description: "Failed to delete product",
      placement: "topRight",
    });
  };
  const propertiesPopconfirm = {
    title: `Are you sure to delete product ${product.name}?`,
    onConfirm: () => handleOk(product),
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

export default DeleteProduct;
