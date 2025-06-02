import { Button, Modal } from "antd";
import { useState } from "react";
import ModalCategory from "./ModalCategory";
import { useSelector } from "react-redux";
function EditCategory(props) {
  const [open, setOpen] = useState(false);
  const { category } = props;
  useSelector((state) => state.loadingReducer);
  const handleOpen = () => {
    console.log(category);
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
        title="Edit Category"
        footer={null}
      >
        <ModalCategory category={category} />
      </Modal>
    </>
  );
}

export default EditCategory;
