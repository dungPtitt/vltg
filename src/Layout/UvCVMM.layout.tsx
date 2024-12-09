"use client";
import styles from "@/Css/uvProfile.module.css";
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import {
  job,
  position,
  salaryLevel,
  schedules,
  renderSchedules,
  renderPosition,
  renderSalaryLevel,
  renderProfession,
} from "@/constants/EditProfile.constant";
import { tinh_thanh } from "@/utils/vi_tri";
import { ToastContainer, toast } from "react-toastify";
import { axiosSauDN } from "@/utils/axios.config";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
function UvCVMM() {
  const [showEdit, setShowEdit] = useState(false);
  const [showBtnEdit, setShowBtnEdit] = useState(false);
  const [jobValues, setJobValues] = useState([]);
  const [adressValues, setAdressValues] = useState([]);
  const [duLieuCVMM, setDuLieuCVMM] = useState({
    _id: "65128ead976c468e29aae073",
    id_uv_cvmm: 710702,
    cong_viec: "keo",
    dia_diem: "1, 23",
    hinh_thuc: 1,
    ky_nang: null,
    lever: "1",
    luong: 2,
    nganh_nghe: "12, 13, 15",
  });
  const [duLieuMoi, setDuLieuMoi] = useState<any>({
    cong_viec: "",
    cap_bac: 1,
    hinh_thuc: 1,
    luong: 1,
  });
  useEffect(() => {
    axiosSauDN
      .post("/manageAccountCandidate/getCongViecMongMuon")
      .then((res) => {
        setDuLieuMoi(res.data.data.data);
        setDuLieuCVMM(res.data.data.data);
      })
      .catch((err) => console.log("UvCVMM", err));
  }, []);
  const handleChangeJob = (selected: any) => {
    // Kiểm tra số lượng mục đã chọn và giới hạn nó
    if (selected.length <= 3) {
      setJobValues(selected);
    }
  };
  const handleChangeAddress = (selected: any) => {
    // Kiểm tra số lượng mục đã chọn và giới hạn nó
    if (selected.length <= 3) {
      setAdressValues(selected);
    }
  };
  const capNhapCongViec = () => {
    if (jobValues.length == 0) {
      notifyWarning("Vui lòng chọn ít nhất 1 ngành nghề!");
    } else if (adressValues.length == 0) {
      notifyWarning("Vui lòng chọn ít nhất 1 địa điểm!");
    } else if (duLieuMoi.cong_viec.length == 0) {
      notifyWarning("Vui lòng nhập công việc mong muốn!");
    } else {
      axiosSauDN
        .post("/manageAccountCandidate/updateCongViecMongMuon", {
          ...duLieuMoi,
          dia_diem: adressValues,
          nganh_nghe: jobValues,
        })
        .then((res) => {
          notifySuccess("Cập nhập thành công!");
          setDuLieuCVMM({ ...res.data.data.uvCvmm });
          setShowEdit(false);
        })
        .catch((err) => {
          notifyError("Đã có lỗi xảy ra vui lòng thử lại sau!");
        });
    }
  };
  return (
    <div>
      {showEdit ? (
        <div className={styles.edit_cvmm}>
          <div className={styles.edit_box}>
            {/* Ngành nghề */}
            <div className="mt-6">
              <label className="text-sm font-semibold">
                <span className="text-red-500">*</span>Ngành nghề
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Chọn tối đa 3 doanh mục"
                options={job}
                onChange={handleChangeJob}
                value={jobValues}
              />
            </div>
            {/* Công việc */}
            <div className="mt-6">
              <label className="text-sm font-semibold">
                <span className="text-red-500">*</span> Công việc
              </label>
              <Input
                placeholder="Nhập công việc mong muốn"
                type="text"
                value={duLieuMoi?.cong_viec}
                onChange={(e) =>
                  setDuLieuMoi({
                    ...duLieuMoi,
                    cong_viec: e.target.value,
                  })
                }
              />
            </div>
            {/* Cấp bậc */}
            <div className="mt-6">
              <label className="text-sm font-semibold">
                <span className="text-red-500">*</span>Cấp bậc mong muốn
              </label>
              <Select
                allowClear
                // defaultValue={1}
                value={duLieuMoi?.cap_bac}
                style={{ width: "100%" }}
                placeholder="Chọn cấp bậc mong muốn"
                options={position}
                onChange={(e) => setDuLieuMoi({ ...duLieuMoi, cap_bac: e })}
              />
            </div>
            {/* Hình thức */}
            <div className="mt-6">
              <label className="text-sm font-semibold">
                <span className="text-red-500">*</span>Hình thức
              </label>
              <Select
                allowClear
                // defaultValue={1}
                value={duLieuMoi?.hinh_thuc}
                style={{ width: "100%" }}
                placeholder="Chọn hình thức"
                options={schedules}
                onChange={(e) => setDuLieuMoi({ ...duLieuMoi, hinh_thuc: e })}
              />
            </div>
            {/* Địa điểm */}
            <div className="mt-6">
              <label className="text-sm font-semibold">
                <span className="text-red-500">*</span>Địa điểm
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Chọn tối đa 3 doanh mục"
                options={[
                  ...tinh_thanh.map((city) => ({
                    value: city.cit_id,
                    label: city.cit_name,
                  })),
                ]}
                onChange={handleChangeAddress}
                value={adressValues}
              />
            </div>
            {/* Mức lương */}
            <div className="mt-6">
              <label className="text-sm font-semibold">
                <span className="text-red-500">*</span>Mức lương
              </label>
              <Select
                allowClear
                // defaultValue={1}
                value={duLieuMoi?.luong}
                style={{ width: "100%" }}
                placeholder="Chọn mức lương"
                options={salaryLevel}
                onChange={(e) => setDuLieuMoi({ ...duLieuMoi, luong: e })}
              />
            </div>
          </div>
          <div className={styles.box_btn}>
            <button
              onClick={capNhapCongViec}
              className={styles.btn_outline_primary + " w-40"}
            >
              Lưu{" "}
            </button>
            <button
              onClick={() => setShowEdit(false)}
              className={styles.btn_outline_primary + " w-40"}
            >
              Không lưu{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.show_infor}>
          <div className={styles.uv_cvmm}>
            <button
              onClick={() => setShowEdit(true)}
              className={styles.btn_edit + " mb-6 pt-3 flex md:hidden"}
            >
              <img className="mr-2.5 " src="/images/pen.svg" alt="pen" /> Sửa
            </button>
            <div>
              <p className="font-bold mb-2.5">
                Công việc:{" "}
                <span className="font-normal">{duLieuCVMM?.cong_viec}</span>
              </p>
            </div>
            <div>
              <p className="font-bold mb-2.5">
                Ngành nghề:{" "}
                {duLieuCVMM?.nganh_nghe?.split(",").map((nn) => (
                  <span key={nn} className={styles.btn_primary}>
                    {renderProfession[Number(nn)]}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p className="font-bold mb-2.5">
                Cấp bậc mong muốn:{" "}
                <span className="font-normal">
                  {renderPosition[duLieuCVMM?.lever]}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold mb-2.5">
                Hình thức:{" "}
                <span className="font-normal">
                  {renderSchedules[duLieuCVMM?.hinh_thuc]}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold mb-2.5">
                Địa điểm mong muốn:{" "}
                {duLieuCVMM?.dia_diem?.split(",").map((dd) => (
                  <span key={dd} className={styles.btn_primary}>
                    {tinh_thanh.find((tt) => tt.cit_id == Number(dd))?.cit_name}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p className="font-bold mb-2.5">
                Mức lương:{" "}
                <span className="font-normal">
                  {renderSalaryLevel[duLieuCVMM?.luong]}
                </span>
              </p>
            </div>
          </div>
          <div className="hidden flex-col items-end  md:block md:flex">
            <div
              onClick={() => setShowBtnEdit(!showBtnEdit)}
              className="rounded-full mb-3 bg-slate-300 flex w-7 h-7 p-2"
            >
              <img src="/images/3chamngang.svg" alt="" />
            </div>{" "}
            {showBtnEdit && (
              <button
                onClick={() => setShowEdit(true)}
                className={styles.btn_edit + " mb-6 pt-3 flex"}
              >
                <img className="mr-2.5 " src="/images/pen.svg" alt="pen" /> Sửa
              </button>
            )}
          </div>
        </div>
      )}
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default UvCVMM;
