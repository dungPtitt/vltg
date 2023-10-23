import styles from "@/Css/uvProfile.module.css";
function Supporter() {
  return (
    <div className={styles.supporter_container}>
      <div className={styles.supporter_text + " lg:hidden"}>
        <p>Hỗ trợ tư vấn viên</p>
      </div>
      <div className={styles.supporter_rg}>
        <img src="/images/avt5.png" alt="" />
        <div className={styles.supporter_text + " hidden lg:block"}>
          Chuyên viên hỗ trợ tư vấn dành cho ứng viên
        </div>
        <div className={styles.supporter_text}>Ms Thùy Trang</div>
        <div className={styles.supporter_contact}>
          {" "}
          SĐT : 0387419277 - Zalo : 0904528730{" "}
        </div>
        <div className={styles.supporter_contact}>
          Email{" "}
          <span className="underline"> thuytrang.timviec365.vn@gmail.com </span>
        </div>
      </div>
    </div>
  );
}

export default Supporter;
