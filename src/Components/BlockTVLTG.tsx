import styles from "@/Css/homePage.module.css";
import Image from "next/image";

function BlockTVLTG() {
  return ( <div className={styles.img_main1}>
    <div className={styles.img_main1_content}>
      <p className={styles.main1_content_m}>Tìm việc làm theo giờ </p>
      <p className={styles.main1_content_xl}>ĐƠN GIẢN, DỄ DÀNG</p>
      <p className={styles.main1_content_s}>
        Chủ động ứng tuyển công việc theo
        <span>
          <Image height={200} width={200}
            src="https://vieclamtheogio.timviec365.vn/images/day.svg"
            alt="day"
          />
          Ngày
          <Image height={200} width={200}
            src="https://vieclamtheogio.timviec365.vn/images/gio.svg"
            alt="time"
          />
          Giờ
        </span>
      </p>

      <p className={styles.main1_content_l}>
        PHÙ HỢP{" "}
        <button className={styles.btn_warning}>
          {" "}
          Đăng ký tìm việc theo giờ ngay
        </button>
      </p>
    </div>
  </div> );
}

export default BlockTVLTG;