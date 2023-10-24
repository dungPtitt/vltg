import styles from "@/Css/homePage.module.css";
import Image from "next/image";
import Link from "next/link";

function BlockDownApp() {
  return (
    <div className={styles.inc_main}>
      <div className={styles.img_main}>
        <div className={styles.img_ct}>
          <p>
            Tải ngay app vieclamtheogio.vn trên điện thoại để trải nghiệm tốt
            nhất!
          </p>
          <div className={styles.btn_down_app}>
            <Image
              height={97}
              width={97}
              src="/images/qr_vltg_new.png"
              alt=""
            />
            <div>
              <button className={styles.btn_warning}>
                <Link
                  className="hover:underline"
                  href="https://apps.apple.com/vn/app/vi%E1%BB%87c-l%C3%A0m-theo-gi%E1%BB%9D-timviec365/id1615489458"
                  target="blank"
                >
                  Tải app trên Appstore
                </Link>
              </button>
              <button className={styles.btn_warning}>
                <Link
                  className="hover:underline"
                  href="https://play.google.com/store/apps/details?id=vn.timviec365.vieclamtheogio_vn"
                  target="blank"
                >
                  Tải app trên CHplay
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockDownApp;
