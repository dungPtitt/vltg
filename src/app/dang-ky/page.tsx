"use client";
import styles from "@/Css/login.module.css";

import Image from "next/image";
function RegisterPage() {
  return (
    <div className={styles.register_container}>
      <div className={styles.left}>
        <div className={styles.img_logo}>
          <Image height={100} width={100} alt="/"  src="/images/logo.svg" />
        </div>
        <div className={styles.txt}>
          Tìm việc làm theo giờ hiệu quả về di động của bạn và sẵn sàng nhận
          việc ngay hôm nay!
        </div>
        <div className={styles.txt_mb}>Ký tài khoản ứng viên</div>
        <div className={styles.box_btn_download}>
          <button className={styles.btn_download}>
            {" "}
            <Image height={100} width={100} 
              src="https://vieclamtheogio.timviec365.vn/images/playstore.png"
              alt="/"
            />
            Download for Android
          </button>
          <button className={styles.btn_download}>
            {" "}
            <Image height={100} width={100} 
              src="https://vieclamtheogio.timviec365.vn/images/appstore.png"
              alt="/"
            />
            Download for IOS
          </button>
        </div>
      </div>
      <div className="w-screen mt-8">
        {/* <RegisterNtd /> */}
      </div>
    </div>
  );
}

export default RegisterPage;
