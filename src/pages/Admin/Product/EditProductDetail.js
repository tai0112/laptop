import { Button, Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import ModalProductDetail from "./ModalProductDetail";
function EditProductDetail(props) {
  const [open, setOpen] = useState(false);
  const { productDetail } = props;
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
        <ModalProductDetail productDetail={productDetail} />
      </Modal>
    </>
  );
}

export default EditProductDetail;
