import styles from "@/Css/homePage.module.css";
import UserPLVL from "./UserPLVL.component";
import AboutJob from "./JobCard.component";
import { useEffect, useState } from "react";
import { axiosTruocDN } from "@/utils/axios.config";

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
  return (
    <div className={styles.vllc}>
      <div>
        <div className="flex ml-5 items-center text-lg font-semibold my-3">
          <img className="mr-3" src="/images/vltglc.svg" alt="ico" />
          <h1> VIỆC LÀM THEO GIỜ LƯƠNG HẤP DẪN</h1>
        </div>
        <div className={styles.box_vltg_lc}>
          {duLieuVLLC.length > 0 &&
            duLieuVLLC.map((job: any, index: number) => (
              <AboutJob key={index} job={job} />
            ))}
        </div>
      </div>
      <UserPLVL />
    </div>
  );
}

export default Vllc;
