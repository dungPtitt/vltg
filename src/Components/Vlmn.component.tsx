import styles from "@/Css/homePage.module.css";
import JobCard from "./JobCard.component";
import React, { useEffect, useState } from "react";
import { axiosTruocDN } from "@/utils/axios.config";
import { usePathname, useRouter } from "next/navigation";
import { HeadListJob } from "@/constants/Head.constant";
function Vlmn({ check }: any) {
  const router = useRouter();
  const pathName = usePathname();
  const [vietLamMoiNhat, setViecLamMoiNhat] = useState([]);
  useEffect(() => {
    try {
      axiosTruocDN
        .post("/viecLam/timKiemViecLam")
        .then((res) => setViecLamMoiNhat(res.data.data.data));
    } catch (error) {
      console.log("Vlmn", error);
    }
  }, []);

  return (
    <div className={styles.vltg}>
      {check && <HeadListJob url={pathName} />}
      <h1 className="text-lg font-semibold ml-10">TÌM VIỆC LÀM THEO GIỜ</h1>
      <div>
        <div className="flex ml-5 items-center text-lg font-semibold my-3">
          <img
            className="mr-2"
            src="https://vieclamtheogio.timviec365.vn/images/ico-vltg.svg"
            alt="ico"
          />
          <h2> VIỆC LÀM THEO GIỜ MỚI NHẤT</h2>
        </div>
        <div className={styles.box_vltg_latest}>
          {vietLamMoiNhat.map((job, ind) => (
            <JobCard key={ind} job={job} />
          ))}
        </div>
        <div
          onClick={() => router.push("/viec-lam-theo-gio.html")}
          className={styles.show_all}
        >
          Xem tất cả tin tuyển dụng
        </div>
      </div>
    </div>
  );
}

export default Vlmn;
