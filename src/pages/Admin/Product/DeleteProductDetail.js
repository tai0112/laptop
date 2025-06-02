import { Button, message, Popconfirm, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import { useNavigate } from "react-router-dom";
import { deleteProductDetail } from "../../../Services/ProductDetailServices";
function DeleteProductDetail(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetail } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const handleDelete = async (productDetailId) => {
    const response = await deleteProductDetail(productDetailId);
    response ? openNotification() : openErrorNotification();
    setTimeout(() => {
      navigate(`/admin/product/${productDetail.productId}`);
    }, 2000);
  };
  const handleOk = (productDetail) => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleDelete(productDetail.productDetailId);
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
    setTimeout(() => {
      dispatch(loading(true));
    }, 2000);
  };
  const propertiesPopconfirm = {
    title: `Are you sure to delete product ${productDetail.productDetailId}?`,
    onConfirm: () => handleOk(productDetail),
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

export default DeleteProductDetail;
