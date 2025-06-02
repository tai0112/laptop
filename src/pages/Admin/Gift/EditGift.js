import { Button, Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import ModalGift from "./ModalGift";
function EditGift(props) {
  const [open, setOpen] = useState(false);
  const { gift } = props;
  useSelector((state) => state.loadingReducer);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} type="primary">
        Edit
      </Button>
      <Modal
        onCancel={handleCancel}
        open={open}
        title="Edit Manufacture"
        footer={null}
      >
        <ModalGift gift={gift} />
      </Modal>
    </>
  );
}

export default EditGift;
