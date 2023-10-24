import styles from "@/Css/homePage.module.css";
import Image from "next/image";
import Link from "next/link";

function BlockTVLTG() {
  return (
    <div className={styles.img_main1}>
      <div className={styles.img_main1_content}>
        <p className={styles.main1_content_m}>Tìm việc làm theo giờ </p>
        <p className={styles.main1_content_xl}>ĐƠN GIẢN, DỄ DÀNG</p>
        <p className={styles.main1_content_s}>
          Chủ động ứng tuyển công việc theo
          <span>
            <Image
              height={20}
              width={20}
              src="https://vieclamtheogio.timviec365.vn/images/day.svg"
              alt="day"
            />
            Ngày
            <Image
              height={20}
              width={20}
              src="https://vieclamtheogio.timviec365.vn/images/gio.svg"
              alt="time"
            />
            Giờ
          </span>
        </p>

        <p className={styles.main1_content_l}>
          PHÙ HỢP{" "}
          <button className={styles.btn_warning}>
            <Link href="https://timviec365.vn/dang-ky.html">
              Đăng ký tìm việc theo giờ ngay
            </Link>{" "}
          </button>
        </p>
      </div>
    </div>
  );
}

export default BlockTVLTG;
