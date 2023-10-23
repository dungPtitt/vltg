"use client";
import HomePage from "@/Page";
import React, { useState, useEffect } from "react";
import Header from "@/Layout/Header.layout";
import styles from "@/Css/homePage.module.css";
import Vlmn from "@/Components/Vlmn.component";
import Vllc from "@/Components/Vllc.component";
import Footer from "@/Components/Footer.component";
import SearchJob from "@/Components/SearchJob.component";

import TuKhoaCongViecLQ from "@/Components/TuKhoaCongViecLQ";
import BlockTVLTG from "@/Components/BlockTVLTG";
import DiaDiemLQ from "@/Components/DiaDiemLQ";
import BlockCVDep from "@/Components/BlockCVDep";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HeadHomePage, HeadListJob } from "../constants/Head.constant";

export default function Home() {
  const router = useRouter();
  const [HOST, setHOST] = useState<any>();
  useEffect(() => {
    // Code xử lý sau khi trang đã load xong
    const linkElement: any = document.querySelector("link[rel='stylesheet']");
    if (linkElement && linkElement.media !== "all") {
      linkElement.media = "all";
    }
  }, []);
  return (
    <>
      <HeadHomePage />
      <div className={styles.home_page}>
        <Header />
        <SearchJob />
        <Vlmn check={false} />
        <Vllc />
        <BlockTVLTG />
        <div className={styles.main_why}>
          <h2 className="text-blue-500 text-2xl font-bold mb-9 text-center">
            Lý do nên lựa chọn tìm việc theo giờ tại
            vieclamtheogio.timviec365.vn
          </h2>
          <div className={styles.box_why}>
            <div className={styles.why_list}>
              <Image height={250} width={250} src="/images/ff1.png" alt="/" />
              <div className={styles.why_content}>
                <h3 className={styles.why_title}>Thu Nhập Cao</h3>
                <p>
                  Việc làm theo giờ 365 giúp bạn lựa chọn công việc có thu nhập
                  cao, phù hợp với giờ giấc, năng lực bản thân.
                </p>
              </div>
            </div>

            <div className={styles.why_list}>
              <Image height={250} width={250} src="/images/ff2.png" alt="/" />
              <div className={styles.why_content}>
                <h3 className={styles.why_title}>Uy tín</h3>
                <p>
                  Các nhà tuyển dụng trên Việc làm theo giờ 365 uy tín, trên
                  khắp các tỉnh thành tại Việt Nam. Mang đến những tin tuyển
                  dụng chất lượng nhất.
                </p>
              </div>
            </div>

            <div className={styles.why_list}>
              <Image height={250} width={250} src="/images/ff3.png" alt="" />
              <div className={styles.why_content}>
                <h3 className={styles.why_title}>Linh hoạt về giờ làm việc</h3>
                <p>
                  Giờ làm việc linh hoạt, giúp bạn tùy chọn ca làm phù hợp với
                  bản thân. Ứng tuyển nhanh chóng chỉ trong vài giây.
                </p>
              </div>
            </div>

            <div className={styles.why_list}>
              <Image height={250} width={250} src="/images/ff4.png" alt="" />
              <div className={styles.why_content}>
                <h3 className={styles.why_title}>Chăm sóc khách hàng 24/7</h3>
                <p>
                  Đội ngũ tư vấn hỗ trợ nhiệt tình, giải đáp mọi thắc mắc của
                  người tìm việc theo giờ. Hỗ trợ bạn tìm được công việc ưng ý
                  nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.inc_main}>
          <div className={styles.img_main}>
            <div className={styles.img_ct}>
              <p>
                Tải ngay app vieclamtheogio.vn trên điện thoại để trải nghiệm
                tốt nhất!
              </p>
              <div className={styles.btn_down_app}>
                <Image
                  height={250}
                  width={250}
                  src="/images/qr_vltg_new.png"
                  alt=""
                />
                <div>
                  <button className={styles.btn_warning}>
                    {" "}
                    <a href="#"></a>Tải app trên Appstore
                  </button>
                  <button className={styles.btn_warning}>
                    <a href="#"></a>Tải app trên CHplay
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.key_word}>
            <TuKhoaCongViecLQ />
            <DiaDiemLQ />
          </div>
          <BlockCVDep />
        </div>
        <Footer />
      </div>
    </>
  );
}
