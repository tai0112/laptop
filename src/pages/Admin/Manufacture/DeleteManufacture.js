import { Button, message, Popconfirm, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import { deleteManufacture } from "../../../Services/ManufactureServices";
import { useNavigate } from "react-router-dom";
function DeleteManufacture(props) {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { manufacture } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const handleDelete = async (manufactureId) => {
    const response = await deleteManufacture(manufactureId);
    response ? openNotification() : openErrorNotification();
    setTimeout(() => {
      navigate("/admin/manufacture");
    }, 2000);
  };
  const handleOk = (manufacture) => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleDelete(manufacture.manufactureId);
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
      message: "Delete manufacture",
      description: "manufacture deleted successfully",
      placement: "topRight",
    });
    setTimeout(() => {
      dispatch(loading(true));
    }, 2000);
  };
  const openErrorNotification = () => {
    api.error({
      message: "Delete manufacture",
      description: "Failed to delete manufacture",
      placement: "topRight",
    });
  };
  const propertiesPopconfirm = {
    title: `Are you sure to delete manufacture ${manufacture.name}?`,
    onConfirm: () => handleOk(manufacture),
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

export default DeleteManufacture;
