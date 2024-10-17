import styles from "@/Css/homePage.module.css";
import UserPLVL from "./UserPLVL.component";
import { useEffect, useState } from "react";
import { axiosTruocDN } from "@/utils/axios.config";
import JobCard2 from "./JobCard2";

function Vllc() {
  const [duLieuVLLC, setDuLieuVLLC] = useState<any>([]);
  useEffect(() => {
    try {
      axiosTruocDN
        .post("/viecLam/trangChu")
        .then((res) => setDuLieuVLLC([...res.data.data.viecLamHapDan]));
    } catch (error) {
      console.log("errr", error);
    }
  }, []);
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
      </div>
      <UserPLVL />
    </div>
  );
}

export default Vllc;
