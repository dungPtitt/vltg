"use client";
import Footer from "@/Components/Footer.component";
import styles from "@/Css/auth.module.css";
import Header from "@/Layout/Header.layout";
import Image from "next/image";
import { useRouter } from "next/navigation";

function AuthPage() {
  const router = useRouter();
  return (
    <div>
      <Header />
      <div className={styles.auth}>
        <p className={styles.title_center}>
          Ứng việc tốt - Việc làm hay - Tuyển dụng nhanh chóng
        </p>
        <div className={styles.frame}>
          <div className={styles.frame_item}>
            <Image height={100} width={100} 
              className={styles.frame_item_img}
              src="/images/bg-lc-uc.png"
              alt="photo"
            />
            <div>
              <p>
                <Image height={100} width={100}  src="/images/tichv.svg" alt="tichv" />
                Linh hoạt giờ làm việc
              </p>
              <p>
                <Image height={100} width={100}  src="/images/tichv.svg" alt="tichv" />
                Đa dạng giờ làm việc
              </p>
              <p>
                <Image height={100} width={100}  src="/images/tichv.svg" alt="tichv" />
                Nhanh chóng có việc làm
              </p>
            </div>
            <div className={styles.btn_center}>
              <button
                onClick={() => router.push("/dang-nhap/ung-vien")}
                className={styles.btn_warning}
              >
                Đăng nhập ứng viên
              </button>
            </div>
          </div>
          <div className={styles.frame_item}>
            <Image height={100} width={100} 
              className={styles.frame_item_img}
              src="/images/lc-dn-ntd.svg"
              alt="photo"
            />
            <div>
              <p>
                <Image height={100} width={100}  src="/images/tichv.svg" alt="tichv" />
                Nguồn ứng viên dồi dào
              </p>
              <p>
                <Image height={100} width={100}  src="/images/tichv.svg" alt="tichv" />
                Đăng tin nhanh miễn phí
              </p>
              <p>
                <Image height={100} width={100}  src="/images/tichv.svg" alt="tichv" />
                Đa dạng kiểu ứng viên
              </p>
            </div>
            <div className={styles.btn_center}>
              <button
                className={styles.btn_warning}
                onClick={() => router.push("/dang-nhap/nha-tuyen-dung")}
              >
                Đăng nhập nhà tuyển dụng
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AuthPage;
