import styles from "@/Css/homePage.module.css";
import {
  renderProfession,
  renderSchedules,
} from "@/constants/EditProfile.constant";
import { axiosSauDN, axiosTruocDN } from "@/utils/axios.config";
import { convertNameToSlug } from "@/utils/generalFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function NTDTKUV() {
  const router = useRouter();
  const [data, setData] = useState<any>({
    result: true,
    message: "Thong ke ung vien theo hinh thuc, nganh nghe, tinh thanh",
    totalHinhThuc: [2, 0, 0],
    totaNganhNghe: [
      {
        _id: "650cf9f004e1a0064dd9f34e",
        jc_id: 1,
        jc_name: "bán hàng",
        total: 0,
      },
      {
        _id: "650cf9f004e1a0064dd9f34c",
        jc_id: 2,
        jc_name: "phục vụ - tạp vụ",
        total: 3,
      },
      {
        _id: "650cf9f004e1a0064dd9f34a",
        jc_id: 3,
        jc_name: "xây dựng - công trình",
        total: 1,
      },
      {
        _id: "650cf9f004e1a0064dd9f348",
        jc_id: 4,
        jc_name: "vận chuyển - bốc vác",
        total: 1,
      },
      {
        _id: "650cf9f004e1a0064dd9f346",
        jc_id: 5,
        jc_name: "nấu ăn - đầu bếp",
        total: 0,
      },
      {
        _id: "650cf9f004e1a0064dd9f343",
        jc_id: 6,
        jc_name: "hành chính",
        total: 0,
      },
      {
        _id: "650cf9f004e1a0064dd9f341",
        jc_id: 7,
        jc_name: "giao hàng",
        total: 0,
      },
      {
        _id: "650cf9f004e1a0064dd9f33f",
        jc_id: 8,
        jc_name: "nhà hàng - khách sạn",
        total: 0,
      },
      {
        _id: "650cf9f004e1a0064dd9f33d",
        jc_id: 9,
        jc_name: "tổ chức sự kiện",
        total: 0,
      },
      {
        _id: "650cf9f004e1a0064dd9f33a",
        jc_id: 10,
        jc_name: "kho bãi",
        total: 0,
      },
    ],
    totaTinhThanh: [
      {
        _id: 1,
        name: "Hà Nội",
        total: 3,
      },
      {
        _id: 2,
        name: "Hải Phòng",
        total: 2,
      },
      {
        _id: 3,
        name: "Bắc Giang",
        total: 1,
      },
      {
        _id: 4,
        name: "Bắc Kạn",
        total: 1,
      },
      {
        _id: 23,
        name: "Tuyên Quang",
        total: 1,
      },
    ],
  });
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  }, []);
  useEffect(() => {
    axiosSauDN
      .post("/manageAccountCompany/thongKeUngVien")
      .then((res) => {
        setData(res.data.data);
        console.log("plvl::", res.data.data);
      })
      .catch((err) => console.log("plvl", err));
  }, []);
  return (
    <div className={styles.plvl}>
      <div className="mt-5">
        <div className={styles.plvl_title}>
          {/* <img
            src="https://vieclamtheogio.timviec365.vn/images/lvl.svg"
            alt="lvl"
          /> */}
          <h2>ỨNG VIÊN THEO GIỜ</h2>
        </div>
        <div>
          {data?.totalHinhThuc?.map((quantity: any, index: any) => (
            <div key={index} className={styles.list_viec}>
              <div>
                <Link
                  href={`/ung-vien-${convertNameToSlug(
                    renderSchedules[index + 1]
                  )}-theo-gio-i${index + 1}.html`}
                >
                  {renderSchedules[index + 1]}{" "}
                  <span className={styles.salary}>({quantity})</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className={styles.plvl_title}>
          {/* <img
            src="https://vieclamtheogio.timviec365.vn/images/lvl.svg"
            alt="lvl"
          /> */}
          <h2>TÌM ỨNG VIÊN THEO GIỜ THEO NGÀNH NGHỀ</h2>
        </div>
        <div>
          {data?.totaNganhNghe?.map((nn: any) => (
            <div key={nn.jc_id} className={styles.list_viec}>
              <div>
                <Link
                  href={`/ung-vien-${convertNameToSlug(
                    renderProfession[nn.jc_id]
                  )}-theo-gio-u${nn.jc_id}t0.html`}
                ></Link>
                {renderProfession[nn.jc_id]}
                <span className={styles.salary}> ({nn.total})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className={styles.plvl_title}>
          {/* <img
            src="https://vieclamtheogio.timviec365.vn/images/lvl.svg"
            alt="lvl"
          /> */}
          <h2>TÌM ỨNG VIÊN THEO TỈNH THÀNH</h2>
        </div>
        <div>
          {data?.totaTinhThanh?.map((tt: any) => (
            <div key={tt.cit_id} className={styles.list_viec}>
              <div>
                <Link
                  href={`/ung-vien-theo-gio-tai-${convertNameToSlug(
                    tt.name
                  )}-u0c${tt._id}.html`}
                ></Link>
                {tt.name} <span className={styles.salary}> ({tt.total})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NTDTKUV;
