import { Button, message, Popconfirm, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loading } from "../../../action/loading";
import { deleteGift } from "../../../Services/GiftServices";
import { useNavigate } from "react-router-dom";
function DeleteGift(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gift } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const handleDelete = async (giftId) => {
    const response = await deleteGift(giftId);
    response ? openNotification() : openErrorNotification();
    setTimeout(() => {
      navigate("/admin/gift");
    }, 2000);
  };
  const handleOk = (gift) => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleDelete(gift.giftId);
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
      message: "Delete gift",
      description: "Gift deleted successfully",
      placement: "topRight",
    });
    setTimeout(() => {
      dispatch(loading(true));
    }, 2000);
  };
  const openErrorNotification = () => {
    api.error({
      message: "Delete gift",
      description: "Failed to delete gift",
      placement: "topRight",
    });
  };
  const propertiesPopconfirm = {
    title: `Are you sure to delete gift ${gift.name}?`,
    onConfirm: () => handleOk(gift),
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

export default DeleteGift;
