"use client";
import Footer from "@/Components/Footer.component";
import JobCard from "@/Components/JobCard.component";
import SearchJob from "@/Components/SearchJob.component";
import Header from "@/Layout/Header.layout";
import { renderSchedules, schedules } from "@/constants/EditProfile.constant";
import { axiosTruocDN } from "@/utils/axios.config";
import { useEffect, useState } from "react";
import styles from "@/Css/homePage.module.css";
import Image from "next/image";

function PageHinhThucViecLam({ params }: any) {
  const { id } = params;
  const [duLieuViecLam, setDuLieuViecLam] = useState<any>([]);
  useEffect(() => {
    try {
      axiosTruocDN
        .post("/viecLam/thongKeDanhSachViecLam", { id_hinhthuc: id })
        .then((res) => setDuLieuViecLam([...res.data.data.data]));
    } catch (error) {
      console.log("errr", error);
    }
  }, []);
  return (
    <div className="flex flex-col items-center">
      <Header />
      <SearchJob />
      <div className="w-4/5 mt-4 mb-32">
        <h1 className={styles.hinh_thuc_cong_viec}>
          VIỆC LÀM {renderSchedules[id].toUpperCase()}
        </h1>
        <div className="w-full pt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {duLieuViecLam.length > 0 &&
            duLieuViecLam.map((job: any) => (
              <JobCard key={job.id_vieclam} job={job} />
            ))}
        </div>
      </div>
      <div className={styles.img_main}>
        <div className={styles.img_ct}>
          <p>
            Tải ngay app vieclamtheogio.vn trên điện thoại để trải nghiệm tốt
            nhất!
          </p>
          <div className={styles.btn_down_app}>
            <Image height={100} width={100}  src="/images/qr_vltg_new.png" alt="" />
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
      <Footer />
    </div>
  );
}

export default PageHinhThucViecLam;
