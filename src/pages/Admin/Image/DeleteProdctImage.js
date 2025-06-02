import { Button, message, Popconfirm, notification } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import { IoMdCloseCircle } from "react-icons/io";
import { deleteImage } from "../../../Services/ImageServices";
function DeleteProductImage(props) {
  const dispatch = useDispatch();
  const { image } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const handleDelete = async (productImage) => {
    const response = await deleteImage(productImage);
    response ? openNotification() : openErrorNotification();
  };
  const handleOk = (image) => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleDelete(image.productImageId);
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
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
    title: `Are you sure to delete image ${image.fileName}?`,
    onConfirm: () => handleOk(image),
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
        <Link
        className="product-image__delete"
          onClick={showPopconfirm}
        >
          <IoMdCloseCircle />
        </Link>
      </Popconfirm>
    </div>
  );
}

export default DeleteProductImage;
