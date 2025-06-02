import {
  createImage,
  getImagesByProductDetailId,
  updateImage,
} from "../../../Services/ImageServices";
import { Row, Col, Image, Upload, message, Button, Spin, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DeleteProductImage from "./DeleteProdctImage";
import { UploadOutlined } from "@ant-design/icons";
import * as page from "../../../action/loading";
function ImageProductDetail(props) {
  const { productDetail } = props;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.loadingReducer);
  const propsUpload = {
    name: "file",
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productDetailId", productDetail.productDetailId);
      try {
        const response = await createImage(formData);
        onSuccess(response.data);
      } catch (error) {
        onError(error); // tell Ant Design it failed
      } finally {
        dispatch(page.loading());
      }
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} upload failed`);
      }
    },
  };
  useEffect(() => {
    const fetchImages = async (productDetailId) => {
      const response = await getImagesByProductDetailId(productDetailId);
      setImages(response);
    };
    setLoading(true);
    setTimeout(() => {
      fetchImages(productDetail.productDetailId);
      setImages(images);
      setLoading(false);
    }, 1000);
  }, [reload]);
  return (
    <Spin spinning={loading}>
      <Row className="product-image-container" gutter={[16, 16]}>
        <Col span={24}>
          <Upload
            showUploadList={false}
            style={{ textAlign: "left" }}
            {...propsUpload}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Col>
        <Col span={24}>
          <Row>
            {images.length > 0 &&
              images.map((image) => (
                <Col span={6} key={image.productImageId}>
                  <Image
                    className="product-image__image"
                    src={image.filePath}
                    alt="product image"
                  />
                  <Checkbox
                    className="product-image__checkbox"
                    checked={image.isMain}
                    onChange={async (e) => {
                      const isMain = e.target.checked;
                      console.log("isMain", isMain);
                      const response = await updateImage(image.productImageId, {
                        isMain,
                      });
                      dispatch(page.loading());
                    }}
                  />
                  <DeleteProductImage image={image} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Spin>
  );
}

export default ImageProductDetail;
