import styles from "@/Css/uvProfile.module.css";
import { axiosSauDN } from "@/utils/axios.config";
import { notifyError, notifySuccess } from "@/utils/generalFunction";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
function UvKNBT({ kn }: any) {
  const [showEdit, setShowEdit] = useState(false);
  const [showBtnEdit, setShowBtnEdit] = useState(false);
  const [kyNangMoi, setKyNangMoi] = useState<string>("");
  const [kyNang, setKyNang] = useState<string>();
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCandidate/getCongViecMongMuon")
        .then((res) => {
          setKyNang(res.data.data.data.ky_nang);
          setKyNangMoi(res.data.data.data.ky_nang);
        });
    } catch (error) {
      console.log("UvKNBT",error);
    }
  }, []);
  const updateKyNang = () => {
    try {
      axiosSauDN
        .post("/manageAccountCandidate/updateKyNangBanThan", {
          ky_nang: kyNangMoi,
        })
        .then((res) => {
          setShowEdit(false);
          notifySuccess("Cập nhập thành công!");
          setKyNang(kyNangMoi);
        });
    } catch (error) {
      notifyError("Vui lòng thử lại sau!");
    }
  };

  return (
    <div className={styles.uv_knbt}>
      {showEdit ? (
        <div className={styles.edit_knbt}>
          <div>
            <TextArea
              rows={6}
              value={kyNangMoi}
              placeholder="Mô tả ngắn gọn về kỹ năng bản thân"
              onChange={(e) => setKyNangMoi(e.target.value)}
            />
          </div>
          <div className={styles.box_btn}>
            <button
              onClick={updateKyNang}
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
        <div className={styles.show_knbt}>
          <div>{kyNang}</div>
          <div className="hidden flex-col items-end ml-4 md:block md:flex">
            <div
              onClick={() => setShowBtnEdit(!showBtnEdit)}
              className="rounded-full bg-slate-300 mb-4 flex w-7 h-7 p-2"
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
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default UvKNBT;
