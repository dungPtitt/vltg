import styles from "@/Css/login.module.css";
function LoginCpn() {
  return (
    <div className={styles.right}>
      <div className={styles.logo}>
        {" "}
        <img src="/images/logo.png" />
      </div>
      <div className={styles.box_login}>
        <p className={styles.title}>ĐĂNG NHẬP TÀI KHOẢN ỨNG VIÊN</p>
        <div className={styles.login_inp}>
          <img src="/images/ico-user.svg" />
          <input type="email" placeholder="Nhập địa chỉ email" />
        </div>
        <div className={styles.login_inp}>
          <img src="/images/lock.svg" />
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
      </div>
      <button className={styles.btn_login}>Đăng nhập</button>
      <div className="mt-4 ">
        <p className="text-blue-500 text-base">Quên mật khẩu ?</p>
        <p>
          Bạn chưa có tài khoản?{" "}
          <span className="text-blue-600">ĐĂNG KÝ NGAY</span>
        </p>
      </div>
    </div>
  );
}

export default LoginCpn;
