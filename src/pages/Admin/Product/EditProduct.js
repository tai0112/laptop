import { Button, Modal } from "antd";
import { useState } from "react";
import ModalProduct from "./ModalProduct";
import { useSelector } from "react-redux";
function EditProduct(props) {
  const [open, setOpen] = useState(false);
  const { product } = props;
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
        title="Edit product"
        footer={null}
      >
        <ModalProduct product={product} />
      </Modal>
    </>
  );
}

export default EditProduct;
