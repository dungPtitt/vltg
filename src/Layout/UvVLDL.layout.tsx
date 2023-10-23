import styles from "@/Css/jobAbout.module.css";
import { renderPayrollMethods } from "@/constants/EditProfile.constant";
import { axiosSauDN } from "@/utils/axios.config";
import { convertDateDMY, convertNameToSlug } from "@/utils/generalFunction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
function UvVLDL() {
  const router = useRouter();
  const [showJob, setShowJob] = useState(-1);
  const [duLieuDaLuu, setDuLieuDaLuu] = useState<any>();
  useEffect(() => {
    axiosSauDN
      .post("/manageAccountCandidate/getViecLamDaLuu", {
        page: 1,
        pageSize: 30,
      })
      .then((res) => {
        setDuLieuDaLuu([...res.data.data.data]);
      })
      .catch((err) => console.log("error", err));
  }, []);
  const xoaViecLam = (id_viec: number) => {
    axiosSauDN
      .post("/manageAccountCandidate/deleteViecLamDaLuu", {
        id_viec: id_viec,
      })
      .then((res) => {
        toast.warning("Đã xóa thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setDuLieuDaLuu([
          ...duLieuDaLuu.filter((e: any) => e.id_viec != id_viec),
        ]);
      })
      .catch((err) =>
        toast.error("Có lỗi xảy ra thử lại sau!", {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
  };
  return (
    <div>
      <div className="p-4">
        <div className="font-bold mb-2.5 pb-2.5">Việc làm đã lưu</div>
        <table className="w-full">
          <thead className={styles.tb_head}>
            <tr>
              <th>STT</th>
              <th>Tên công việc</th>
              <th>Thời gian làm</th>
              <th>Lương</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.tb_body}>
            {duLieuDaLuu?.map((e: any, ind: number) => (
              <>
                <tr className={showJob ? styles.show_job : styles.hidden_job}>
                  <td>{ind + 1}</td>
                  <td>
                    <p>{e.vi_tri}</p>
                    <div
                      onClick={() =>
                        router.push(
                          `/${convertNameToSlug(e.vi_tri)}-${e.id_viec}.html`
                        )
                      }
                      className="text-blue-600 cursor-pointer"
                    >
                      (Xem chi tiết)
                    </div>
                  </td>
                  <td>
                    {convertDateDMY(e.fist_time)} đến{" "}
                    {convertDateDMY(e.last_time)}
                  </td>
                  <td className="text-red-500 px-5">
                    {e.muc_luong} VND/
                    {renderPayrollMethods[e.tra_luong]}
                  </td>
                  <td className="flex items-center justify-center h-full">
                    <button
                      onClick={() => xoaViecLam(e.id_viec)}
                      className={styles.btn_delete}
                    >
                      <img
                        className="mr-3"
                        src="/images/delete-bl.svg"
                        alt=""
                      />{" "}
                      Xóa
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <div>
          {duLieuDaLuu?.map((vieclam: any) => (
            <div
              key={vieclam.id_vieclam}
              className="flex justify-between mx-10"
            >
              <div
                onClick={() =>
                  setShowJob(vieclam.id_viec != showJob ? vieclam.id_viec : -1)
                }
                className="lg:hidden ml-4"
              >
                <div className="flex">
                  <img
                    className="mr-2"
                    src="/images/tichv-blue.svg"
                    alt="tichv"
                  />{" "}
                  {vieclam.vi_tri}
                </div>
                <div className="flex justify-center text-yellow-300 cursor-pointer">
                  <div
                    onClick={() =>
                      router.push(
                        `/${convertNameToSlug(vieclam.vi_tri)}-co${
                          vieclam.id_viec
                        }.html`
                      )
                    }
                  >
                    (Xem chi tiết)
                  </div>
                </div>
                <div
                  className={
                    showJob == vieclam.id_viec
                      ? styles.show_job
                      : styles.hidden_job
                  }
                >
                  <div>
                    <div className="flex">
                      <img
                        className="mr-2"
                        src="/images/time-xam.svg"
                        alt="/"
                      />
                      {convertDateDMY(vieclam.fist_time)} đến{" "}
                      {convertDateDMY(vieclam.last_time)}
                    </div>
                    <div className="flex">
                      <img
                        className="mr-2"
                        src="/images/money-xam.svg"
                        alt="/"
                      />
                      {vieclam.muc_luong} VND/{" "}
                      {renderPayrollMethods[vieclam.tra_luong]}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.delete_small}>
                <img src="/images/delete-wt.svg" alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default UvVLDL;
