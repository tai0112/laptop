import { useState } from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import ImageProductDetail from "./ImageProductDetail";
import "./Image.scss";
function ModalImage(props) {
  const { productDetail } = props;
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Link onClick={handleOpen} className="product-image__adjust">
        Chi tiết
      </Link>
      <Modal open={open} onCancel={handleCancel} footer={null}>
        <div style={{ width: "1000px !important"}}>
          <ImageProductDetail productDetail={productDetail} />
        </div>
      </Modal>
    </>
  );
}

export default ModalImage;
