import styles from "@/Css/homePage.module.css";
import UserPLVL from "./UserPLVL.component";
import { useEffect, useState } from "react";
import { axiosTruocDN } from "@/utils/axios.config";
import JobCard2 from "./JobCard2";

function Vllc() {
  const [duLieuVLLC, setDuLieuVLLC] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6); // Set page size
  const [total, setTotal] = useState(0);
  useEffect(() => {
    try {
      axiosTruocDN
        .post("/viecLam/trangChu", {page, pageSize})
        .then((res) => {
          // console.log("ViecLamHapDan", res?.data);
          setDuLieuVLLC([...res.data.data.viecLamHapDan]);
          let total = res?.data?.data?.total2;
          let numberPage = Math.ceil(total / pageSize);
          setTotal(numberPage);
        });
    } catch (error) {
      console.log("errr", error);
    }
  }, [page, pageSize]);
  // console.log("duLieuVLLC>>", duLieuVLLC);
  return (
    <div className={styles.vllc + " mt-10 "}>
      <div className="w-full">
        <div className="flex mx-5 items-center text-lg font-semibold py-3 border-b border-blue-700 ">
          <img className="mr-3" src="/images/vltglc.svg" alt="ico" />
          <h1> VIỆC LÀM THEO GIỜ LƯƠNG HẤP DẪN</h1>
        </div>
        <div className={styles.box_vltg_lc}>
          {duLieuVLLC.length > 0 &&
            duLieuVLLC.map((job: any, index: number) => (
              <div
                className={`${
                  index < duLieuVLLC.length - 1 && styles.underline
                }`}
              >
                <JobCard2 key={index} job={job} />
              </div>
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
      </div>
      <UserPLVL />
    </div>
  );
}

export default Vllc;
