import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../Services/UserServices";

function User() {
  const [name, setName] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { userName, email, id } = userData;
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleUpdateUser = async () => {
    const params = {
      id: id,
      userName: name,
    };
    try {
      const response = await updateUserAPI(params);
      if (response) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...userData, userName: name })
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <>
      <div className="user-info">
        <table>
          <tbody>
            <tr>
              <td>Tên người dùng</td>
              <td>
                <Input
                  onChange={(e) => handleChangeName(e)}
                  style={{ width: "200px" }}
                  defaultValue={userName}
                />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email || "Chưa cập nhật"}</td>
            </tr>
          </tbody>
          <tr>
            <td colSpan="2">
              <Button onClick={handleUpdateUser} className="btn btn-primary">
                Cập nhật
              </Button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default User;
