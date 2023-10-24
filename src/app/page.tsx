"use client";
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
import BlockDownApp from "@/Components/BlockDownApp";

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
          <h2 className={styles.main_why_title}>
            Lý do nên lựa chọn tìm việc theo giờ tại
            vieclamtheogio.timviec365.vn
          </h2>
          <div className={styles.box_why}>
            <div className={styles.why_list}>
              <Image height={342} width={342} src="/images/ff1.png" alt="/" />
              <div className={styles.why_content}>
                <h3 className={styles.why_title}>Thu Nhập Cao</h3>
                <p>
                  Việc làm theo giờ 365 giúp bạn lựa chọn công việc có thu nhập
                  cao, phù hợp với giờ giấc, năng lực bản thân.
                </p>
              </div>
            </div>

            <div className={styles.why_list}>
              <Image height={342} width={342} src="/images/ff2.png" alt="/" />
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
              <Image height={342} width={342} src="/images/ff3.png" alt="" />
              <div className={styles.why_content}>
                <h3 className={styles.why_title}>Linh hoạt về giờ làm việc</h3>
                <p>
                  Giờ làm việc linh hoạt, giúp bạn tùy chọn ca làm phù hợp với
                  bản thân. Ứng tuyển nhanh chóng chỉ trong vài giây.
                </p>
              </div>
            </div>

            <div className={styles.why_list}>
              <Image height={342} width={342} src="/images/ff4.png" alt="" />
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
        <BlockDownApp />
        <div className="bg-white w-full px-44 py-12">
          <TuKhoaCongViecLQ />
          <DiaDiemLQ />
        </div>

        <BlockCVDep />
        <Footer />
      </div>
    </>
  );
}
