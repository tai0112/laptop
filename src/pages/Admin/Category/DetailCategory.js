import { useParams } from "react-router-dom";
import { Table, Space } from "antd";
import { useEffect, useState } from "react";
import { getCategoryById } from "../../../Services/CategoryServices";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
function DetailCategory() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({});
  useEffect(() => {
    getCategoryById(categoryId).then((res) => {
      setCategory(res);
    });
  }, []);
  const columns = [
    {
      title: "Category ID",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space key={record.categoryId}>
            <EditCategory category={record} />
            <DeleteCategory category={record} />
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        bordered
        dataSource={category ? [category] : []}
        rowKey="categoryId"
        columns={columns}
      />
    </div>
  );
}

export default DetailCategory;
