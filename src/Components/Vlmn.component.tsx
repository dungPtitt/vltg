import styles from "@/Css/homePage.module.css";
import JobCard from "./JobCard.component";
import React, { useEffect, useState } from "react";
import { axiosTruocDN } from "@/utils/axios.config";
import { usePathname, useRouter } from "next/navigation";
import { HeadListJob } from "@/constants/Head.constant";
import Link from "next/link";
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Vlmn({ check }: any) {
  const router = useRouter();
  const pathName = usePathname();
  const [vietLamMoiNhat, setViecLamMoiNhat] = useState([]);
  const [fullPath, setFullPath] = useState<any>("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6); // Set page size
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      axiosTruocDN
        .post("/viecLam/trangChu", {page, pageSize})
        .then((res) => {
          setViecLamMoiNhat(res?.data?.data?.viecLamMoiNhat);
          let total = res?.data?.data?.total1;
          let numberPage = Math.ceil(total / pageSize);
          setTotal(numberPage);
          // console.log("ViecLamMoiNhat", res?.data?.data?.total);
        });
    } catch (error) {
      console.log("Vlmn", error);
    }
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  }, [page, pageSize]);

  return (
    <div className={styles.vltg}>
      {check && <HeadListJob fullPath={fullPath} url={pathName} />}
      <h1 className="text-xl font-semibold ">TÌM VIỆC LÀM THEO GIỜ</h1>
      <div className="w-full">
        <div>
          <div className="flex mx-5 items-center text-lg font-semibold py-3 border-b border-blue-700 ">
            <img className="mr-2" src="/images/ico-vltg.svg" alt="ico" />
            <h2> VIỆC LÀM THEO GIỜ MỚI NHẤT</h2>
          </div>
        </div>

        <div
          className="p-1 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3" /* {styles.box_vltg_latest} */
        >
          {vietLamMoiNhat.map((job, ind) => (
            <JobCard key={ind} job={job} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-4 mb-5" style={{}}>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="disabled:opacity-50"
          >
            <img className="mr-2.5" src="/images/arrow-l.svg" alt="arrow-left" style={{width: '30px', height: '30px'}}/>
          </button>
          <span style={{marginRight: '10px'}}>
            {page} / {total} {"trang"}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, total))}
            disabled={page === total}
            className="disabled:opacity-50"
          >
            <img className="mr-2.5" src="/images/arrow-r.svg" alt="next" style={{width: '30px', height: '30px'}}/>
          </button>
        </div>
        {!check && (
          <div className="flex justify-end">
            {/* <Link href={`/viec-lam-theo-gio.html`} className={styles.show_all}>
              Xem tất cả tin tuyển dụng{" >>"}
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Vlmn;
