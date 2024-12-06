"use client";
import styles from "@/Css/ntdProfile.module.css";
import { axiosSauDN } from "@/utils/axios.config";
import { convertDateDMY, convertNameToSlug } from "@/utils/generalFunction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function NtdQLC() {
  const [duLieuQLC, setDuLieuQLC] = useState<any>({});
  const router = useRouter();
  const now = Date.now();
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCompany/quanLyChung")
        .then((res) => setDuLieuQLC({ ...res.data.data }));
    } catch (error) {
      console.log("errr", error);
    }
  }, []);

  return (
    <div className="mt-4 w-full">
      {/* TKTD */}
      <div className={styles.block_tktd}>
        <div className={styles.title_detail}>
          Thống Kê Tin Đăng
          <div className={styles.tangtoctk}>Tăng tốc tuyển dụng</div>{" "}
        </div>
        {/* Content */}
        <div className="w-full">
          <div className="lg:w-3/4">
            <div className={styles.frame_tktd}>
              <div>
                <div className={styles.hsut}>
                  <div>
                    <div className={styles.item_nd}>Hồ sơ ứng tuyển</div>
                    <div className={styles.gach}></div>
                  </div>
                  <div className={styles.so}>
                    {" "}
                    {duLieuQLC?.info ? duLieuQLC?.info?.totalHoSoUngTuyen : 0}
                  </div>
                </div>
                <div className={styles.hsld}>
                  <div>
                    <div className={styles.item_label}>Hồ sơ lọc điểm</div>
                    <div className={styles.gach}></div>
                  </div>
                  <div className={styles.so}>
                    {" "}
                    {duLieuQLC?.info ? duLieuQLC?.info?.totalLocDiem : 0}
                  </div>
                </div>
                <div className={styles.cvguv}>
                  <div>
                    <div className={styles.item_label}>
                      Tổng số việc làm
                    </div>
                    <div className={styles.gach}></div>
                  </div>

                  <div className={styles.so}>
                    {" "}
                    {duLieuQLC?.info
                      ? duLieuQLC?.info?.totalViecLam
                      : 0}
                  </div>
                </div>
                <div className={styles.tttd}>Tăng tốc tuyển dụng</div>
              </div>
            </div>
            <div className={styles.tkct}>
              <div className="w-1/2">
                {/* <p className="mb-4">
                  Việc làm sắp hết hạn:{" "}
                  <span>
                    {duLieuQLC?.info ? duLieuQLC?.info?.vlSapHetHan : 0}
                  </span>
                </p> */}
                <p className="mb-4">
                  Việc làm hết hạn:{" "}
                  <span>{duLieuQLC?.info ? duLieuQLC?.info?.vlHetHan : 0}</span>
                </p>
                <p className="mb-4">
                  Việc làm còn lại:{" "}
                  <span>{duLieuQLC?.info ? duLieuQLC?.info?.vlConHan : 0}</span>
                </p>
              </div>
              <div className="w-1/2">
                
                <p className="mb-4">
                  Số tin đăng trong ngày:{" "}
                  <span>
                    {duLieuQLC?.info ? duLieuQLC?.info?.vlTrongNgay : 0}
                  </span>
                </p>
                <p className="mb-4">
                  Điểm đọc hồ sơ:{" "}
                  <span>
                    {duLieuQLC?.info ? duLieuQLC?.info?.diemDocFree : 0}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden items-center w-1/4 justify-center lg:block lg:flex">
            <div className="w-40 h-40">
              <img src="/images/maybay.png" alt="" />
            </div>
            <div className={styles.tangtoctk}> Tăng tốc tuyển dụng</div>
          </div>
        </div>
      </div>
      {/* Danh sach tin tuyen dung moi nhat */}
      <div className={styles.block_ttd_new}>
        <div className={styles.title_detail}>
          Danh Sách Tin Tuyển Dụng Mới Nhất
        </div>
        <div>
          <table className="w-full mt-3">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th> Thời gian làm việc</th>
                <th> Hạn nộp</th>
                <th> Lượt ứng tuyển</th>
                <th> Quản lý</th>
              </tr>
            </thead>
            <tbody>
              {duLieuQLC.viecLamMoiNhat?.length > 0 &&
                duLieuQLC.viecLamMoiNhat.map((job: any) => (
                  <tr key={job.id_vieclam}>
                    <td>
                      {job.vi_tri}
                      <span
                        className="text-yellow-500 cursor-pointer block"
                        onClick={() =>
                          router.push(
                            `/${convertNameToSlug(job.vi_tri)}-${
                              job.id_vieclam
                            }.html`
                          )
                        }
                      >
                        (Xem chi tiết)
                      </span>
                    </td>
                    <td>
                      {convertDateDMY(job.fist_time)} đến{" "}
                      {convertDateDMY(job.last_time)}
                    </td>
                    <td>{convertDateDMY(job.time_td * 1000)}</td>
                    <td>{job.totalUnnTuyen}</td>
                    <td>
                      <div className={styles.conhan}>
                        <img
                          className="mr-3"
                          src="/images/time-blue.svg"
                          alt="time"
                        />
                        <span
                          className={`${now > job.time_td*1000 && "text-red-500"}`}
                        >
                          {now < job.time_td*1000 ? "Còn hạn" : "Hết hạn"}
                        </span>

                        <img
                          className="ml-3"
                          src="/images/down-blue.svg"
                          alt="down"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {duLieuQLC.viecLamMoiNhat?.length > 0 &&
            duLieuQLC.viecLamMoiNhat.map((job: any) => (
              <div key={job.id_vieclam} className={styles.box_mb_content}>
                <div>
                  <div className="font-semibold text-base text-sky-500">
                    {job.vi_tri}{" "}
                    <span
                      onClick={() =>
                        router.push(
                          `/${convertNameToSlug(job.vi_tri)}-${
                            job.id_vieclam
                          }.html`
                        )
                      }
                      className="text-amber-400 ml-3"
                    >
                      (Xem chi tiết)
                    </span>
                  </div>
                  <div className="flex">
                    <img src="/images/time-xam.svg" alt="time" />{" "}
                    <span className="ml-2">
                      {convertDateDMY(job.fist_time)} đến{" "}
                      {convertDateDMY(job.last_time)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-base ">
                      Hạn nộp:{" "}
                      <span className="font-normal">
                        {convertDateDMY(job.time_td * 1000)}
                      </span>
                    </p>
                    <p className="font-semibold text-base ">
                      Lượt ứng tuyển:{" "}
                      <span className="font-normal">{job.totalUnnTuyen}</span>
                    </p>
                  </div>
                </div>
                <div className={styles.conhan}>
                  <img
                    className="mr-3"
                    src="/images/time-blue.svg"
                    alt="time"
                  />
                  <span
                    className={`${now > job.time_td * 1000 && "text-red-500"}`}
                  >
                    {now < job.time_td * 1000 ? "Còn hạn" : "Hết hạn"}
                  </span>

                  <img
                    className="ml-3"
                    src="/images/down-blue.svg"
                    alt="down"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Hồ sơ ứng tuyển mới nhất */}
      <div className={styles.block_ut_new}>
        <div className={styles.title_detail}>Hồ Sơ Ứng Tuyển Mới Nhất</div>
        <div>
          <table className="w-full mt-3">
            <thead>
              <tr>
                <th>STT</th>
                <th> Ứng Viên</th>
                <th> Vị trí ứng tuyển</th>
                <th> Ngày nộp</th>
              </tr>
            </thead>
            <tbody>
              {duLieuQLC.hoSoUngTuyen?.length > 0 &&
                duLieuQLC.hoSoUngTuyen.map((hoso: any, index: number) => (
                  <tr key={hoso.id_ungtuyen}>
                    <td>{index + 1}</td>
                    <td
                      onClick={() =>
                        router.push(
                          `/ung-vien-${convertNameToSlug(hoso.uv_name)}-ca${
                            hoso.uv_id
                          }.html`
                        )
                      }
                      className="text-sky-500 cursor-pointer"
                    >
                      {hoso.uv_name}
                    </td>
                    <td
                      onClick={() =>
                        router.push(
                          `/${convertNameToSlug(hoso.vl_vitri)}-${
                            hoso.vl_id
                          }.html`
                        )
                      }
                      className="text-sky-500 cursor-pointer"
                    >
                      {hoso.vl_vitri}
                    </td>
                    <td>{convertDateDMY(hoso.created_at)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NtdQLC;
