"use client";
import styles from "@/Css/uvProfile.module.css";
import EditExp from "./EditExp.component";
import { useState } from "react";
import { convertDateDMY, notifyError, notifySuccess } from "@/utils/generalFunction";
import { axiosSauDN } from "@/utils/axios.config";
import { ToastContainer } from "react-toastify";

function ExpDetail({ kinhNghiem }: any) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const xoaKiNang = () => {
    axiosSauDN
      .post("/manageAccountCandidate/deleteKinhNghiemLamViec", {
        id_knlv: kinhNghiem.id_knlv,
      })
      .then((res) => notifySuccess("Xóa thành công!"))
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  return (
    <div className="mb-5">
      {showEdit ? (
        <div>
          <EditExp kinhNghiem={kinhNghiem} setShowEdit={setShowEdit} />
        </div>
      ) : (
        <div className={styles.show_exp}>
          <div>
            <div className="flex items-center">
              <img
                onClick={() => setShowDetail(!showDetail)}
                src="/images/tichv-blue.svg"
                alt="delete"
              />
              <p className="text-sm font-bold text-cyan-700	leading-4 ml-5">
                {kinhNghiem.cty_name}
              </p>
            </div>
            <div className="flex">
              <div
                onClick={() => setShowEdit(true)}
                className="leading-4 font-bold text-cyan-700 w-5 h-4 rounded-full bg-gray-300 flex item-center justify-center"
              >
                <img src="/images/pen.svg" alt="pen" />
              </div>
              <div
                onClick={xoaKiNang}
                className="ml-5 leading-4 font-bold text-cyan-700 w-5 h-4 rounded-full bg-red-400 flex item-center justify-center"
              >
                <img src="/images/delete-wt.svg" alt="delete" />
              </div>
            </div>
          </div>
          {showDetail && (
            <div className={styles.exp_detail}>
              <p>
                <span className="text-cyan-700 font-bold"> Thời gian từ: </span>{" "}
                {convertDateDMY(kinhNghiem.time_fist)}
                <span className="text-cyan-700 font-bold ml-6">Đến: </span>
                {convertDateDMY(kinhNghiem.time_end)}
              </p>
              <p>
                <span className="text-cyan-700 font-bold">Chức danh: </span>
                {kinhNghiem.chuc_danh}
              </p>
              <p>{kinhNghiem.mota}</p>
            </div>
          )}
        </div>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default ExpDetail;
