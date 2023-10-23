"use client";
import styles from "@/Css/ntdProfile.module.css";
import { axiosSauDN } from "@/utils/axios.config";
import { convertDateDMY, convertNameToSlug } from "@/utils/generalFunction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NtdNewJob from "./NtdNewJob.layout";
function NtdTongTin({ setShowOption }: any) {
  const router = useRouter();
  const [idEdit, setIdEdit] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [recall, setRecall] = useState(false);
  const [duLieuCongViec, setDuLieuCongViec] = useState<any>([]);
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCompany/danhSachTinDaDang")
        .then((res) => setDuLieuCongViec([...res.data.data.data]));
   
    } catch (error) {
      console.log("error-------" + error);
    }
  }, [recall]);
  return (
    <div>
      {" "}
      {showEdit ? (
        <NtdNewJob idEdit={idEdit} setShowEdit={setShowEdit} />
      ) : (
        <div className={styles.block_ttd_new}>
          <div className={styles.title_detail}>Tổng số tin đã đăng</div>
          <div className="w-full">
            <table className="w-full mt-3">
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th> Thời gian</th>
                  <th> Trạng thái</th>
                  <th> Hạn nộp</th>
                  <th> Giải pháp</th>
                  <th> Hành động</th>
                </tr>
              </thead>
              <tbody>
                {duLieuCongViec.length > 0 &&
                  duLieuCongViec.map((cv: any) => (
                    <tr key={cv._id}>
                      <td>
                        {cv.vi_tri}{" "}
                        <span
                          onClick={() =>
                            router.push(`/${convertNameToSlug(cv.vi_tri)}-co${cv.id_vieclam}.html`)
                          }
                          className="text-blue-500 cursor-pointer block"
                        >
                          (Xem chi tiết)
                        </span>
                      </td>
                      <td>
                        {convertDateDMY(cv.fist_time)}
                        <span className="mx-2">đến</span>{" "}
                        {convertDateDMY(cv.last_time)}
                      </td>
                      <td>
                        {Date.now() < cv.time_td * 1000 ? (
                          <span className="text-blue-500">Đã đăng</span>
                        ) : (
                          <span className="text-red-500">Hết hạn</span>
                        )}
                      </td>
                      <td>{convertDateDMY(cv.time_td * 1000)}</td>
                      <td className="text-sky-500">Giải pháp</td>
                      <td>
                        <div className={styles.conhan}>
                          <img
                            onClick={() => setRecall(!recall)}
                            className="mr-3 cursor-pointer"
                            src="/images/refresh-den.svg"
                            alt="time"
                          />
                          <img
                            onClick={() => {
                              setIdEdit(cv.id_vieclam);
                              setShowEdit(true);
                            }}
                            className="ml-3 cursor-pointer"
                            src="/images/pen-den.svg"
                            alt="down"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className={styles.box_mb_content}>
              <div>
                <div className="font-semibold text-base text-sky-500">
                  Test{" "}
                  <span className="text-amber-400 ml-3">(Xem chi tiết)</span>
                </div>
                <div className="flex">
                  <img src="/images/time-xam.svg" alt="time" />{" "}
                  <span className="ml-2">14/09/2023 đến 08/10/2023</span>
                </div>
                <div>
                  <p className="font-semibold text-base ">
                    Hạn nộp: <span className="font-normal">14/09/2023</span>
                  </p>
                  <p>
                    <img src="/images/tich-xanh.svg" alt="" /> Đã đăng
                  </p>
                </div>
                <div className="text-sky-500"> Xem giải pháp tuyển dụng</div>
              </div>
              <div className={styles.conhan}>
                <img
                  className="mr-3"
                  src="/images/refresh-den.svg"
                  alt="time"
                />
                <img className="ml-3" src="/images/pen-den.svg" alt="down" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NtdTongTin;
