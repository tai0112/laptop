import "./RequireLogin.scss";
function RequireLogin() {
  return (
    <>
      <div className="require-login">
        <div className="require-login__message">
          <h1>Vui lòng đăng nhập</h1>
          <p>Bạn cần đăng nhập để sử dụng chức năng này.</p>
        </div>
      </div>
    </>
  );
}

export default RequireLogin;
