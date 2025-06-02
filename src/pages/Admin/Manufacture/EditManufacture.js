import { Button, Modal } from "antd";
import { useState } from "react";
import ModalManufacture from "./ModalManufacture";
import { useSelector } from "react-redux";
function EditManufacture(props) {
  const [open, setOpen] = useState(false);
  const { manufacture } = props;
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
        <ModalManufacture manufacture={manufacture} />
      </Modal>
    </>
  );
}

export default EditManufacture;
