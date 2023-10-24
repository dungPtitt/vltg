import styles from "@/Css/homePage.module.css";
import {
  renderProfession,
  renderSchedules,
} from "@/constants/EditProfile.constant";
import { basePath } from "@/constants/Head.constant";
import { axiosTruocDN } from "@/utils/axios.config";
import { convertNameToSlug } from "@/utils/generalFunction";
import { cityOption } from "@/utils/vi_tri";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function UserPLVL() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  useEffect(() => {
    axiosTruocDN
      .post("/viecLam/thongKeViecLam")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log("plvl", err));
  }, []);

  return (
    <div className={styles.plvl}>
      <div>
        <div className={styles.plvl_title}>
          <Image width={36} height={36} src="/images/lvl.svg" alt="lvl" />
          <h2>LOẠI HÌNH VIỆC LÀM</h2>
        </div>
        <div>
          {data?.totalHinhThuc?.map((quantity: any, index: any) => (
            <div key={index} className={styles.list_viec}>
              <Link
                href={`${basePath}/viec-lam-${convertNameToSlug(
                  renderSchedules[index + 1]
                )}-${index + 1}.html`}
              >
                {renderSchedules[index + 1]}{" "}
                <span className={styles.salary}>({quantity})</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className={styles.plvl_title}>
          <Image width={36} height={36} src="/images/lvl.svg" alt="lvl" />
          <h2>TÌM VIỆC THEO GIỜ THEO NGÀNH NGHỀ</h2>
        </div>
        <div>
          {data?.totaNganhNghe?.map((nn: any) => (
            <Link
              href={`${basePath}/viec-lam-${convertNameToSlug(
                renderProfession[nn.jc_id]
              )}-theo-gio-${nn.jc_id}.html`}
              key={nn.jc_id}
              className={styles.list_viec}
            >
              <div>
                {renderProfession[nn.jc_id]}
                <span className={styles.salary}> ({nn.total})</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <div className={styles.plvl_title}>
          <Image width={36} height={36} src="/images/lvl.svg" alt="lvl" />
          <h2>TÌM VIỆC THEO TỈNH THÀNH</h2>
        </div>
        <div>
          {data?.totaTinhThanh?.map((tt: any) => (
            <div key={tt.cit_id} className={styles.list_viec}>
              <Link
                href={`${basePath}/viec-lam-theo-gio-tai-${convertNameToSlug(
                  cityOption[Number(tt.cit_id) - 1].label
                )}-${tt.cit_id}.html`}
              >
                {tt.cit_name}{" "}
                <span className={styles.salary}> ({tt.total})</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPLVL;
