import { useParams } from "react-router-dom";
import ModalProductDetail from "./ModalProductDetail";

function CreateProductDetail() {
  const {productId} = useParams();
  console.log(productId);
  return (
    <div>
      <ModalProductDetail />
    </div>
  );
}

export default CreateProductDetail;