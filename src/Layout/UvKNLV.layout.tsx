import EditExp from "@/Components/EditExp.component";
import styles from "@/Css/uvProfile.module.css";
import { axiosSauDN } from "@/utils/axios.config";
import {
  convertDateDMY,
  notifyError,
  notifySuccess,
} from "@/utils/generalFunction";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function UvKNLV() {
  const [showEdit, setShowEdit] = useState(-10);
  const [kiNangLamViec, setKiNangLamViec] = useState<any>([]);
  const [showDetail, setShowDetail] = useState(-10);
  const [recall, setRecall] = useState(true);
  useEffect(() => {
    axiosSauDN
      .post("/manageAccountCandidate/getKinhNghiemLamViec")
      .then((res) => setKiNangLamViec([...res.data.data.data]))
      .catch((error) => console.log(error));
  }, []);
  const xoaKiNang = (id: number, index: number) => {
    axiosSauDN
      .post("/manageAccountCandidate/deleteKinhNghiemLamViec", {
        id_knlv: id,
      })
      .then((res) => {
        kiNangLamViec.splice(index, 1);
        setKiNangLamViec([...kiNangLamViec]);
        notifySuccess("Xóa thành công!");
      })
      .catch((err) => {
        notifyError("Vui lòng thử lại sau!");
      });
  };
  return (
    <div>
      {showEdit == -1 ? (
        <div className={styles.add_knlv_box}>
          <EditExp
            recall={recall}
            setRecall={setRecall}
            kiNangLamViec={kiNangLamViec}
            setKiNangLamViec={setKiNangLamViec}
            setShowEdit={setShowEdit}
          />
        </div>
      ) : (
        <div className={styles.show_knlv}>
          <div className="mb-5">
            <button onClick={() => setShowEdit(-1)} className={styles.add_btn}>
              <img className="mr-2" src="/images/sum-black.svg" alt="" />
              Thêm
            </button>
          </div>
          {kiNangLamViec.length > 0 &&
            kiNangLamViec.map((exp: any, ind: number) => (
              <div key={ind}>
                <div className="mb-5">
                  {showEdit == ind ? (
                    <div>
                      <EditExp
                        kiNangLamViec={kiNangLamViec}
                        setKiNangLamViec={setKiNangLamViec}
                        kinhNghiem={exp}
                        setShowEdit={setShowEdit}
                      />
                    </div>
                  ) : (
                    <div className={styles.show_exp}>
                      <div>
                        <div className="flex items-center cursor-pointer">
                          <img
                            onClick={() =>
                              setShowDetail(showDetail == ind ? -1 : ind)
                            }
                            src="/images/tichv-blue.svg"
                            alt="delete"
                          />
                          <p className="text-sm font-bold text-cyan-700	leading-4 ml-5">
                            {exp.cty_name}
                          </p>
                        </div>
                        <div className="flex">
                          <div
                            onClick={() => setShowEdit(ind)}
                            className="leading-4 font-bold text-cyan-700 w-7 h-7 rounded-full bg-gray-300 flex item-center justify-center cursor-pointer"
                          >
                            <Image
                              height={15}
                              width={15}
                              src="/images/pen.svg"
                              alt="pen"
                            />
                          </div>
                          <div
                            onClick={() => xoaKiNang(exp.id_knlv, ind)}
                            className="ml-5 leading-4 font-bold text-cyan-700 w-7 h-7 rounded-full bg-red-400 flex item-center justify-center cursor-pointer"
                          >
                            <Image
                              height={15}
                              width={15}
                              src="/images/delete-wt.svg"
                              alt="delete"
                            />
                          </div>
                        </div>
                      </div>
                      {showDetail == ind && (
                        <div className={styles.exp_detail}>
                          <p>
                            <span className="text-cyan-700 font-bold">
                              {" "}
                              Thời gian từ:{" "}
                            </span>{" "}
                            {convertDateDMY(exp.time_fist)}
                            <span className="text-cyan-700 font-bold ml-6">
                              Đến:{" "}
                            </span>
                            {convertDateDMY(exp.time_end)}
                          </p>
                          <p>
                            <span className="text-cyan-700 font-bold">
                              Chức danh:{" "}
                            </span>
                            {exp.chuc_danh}
                          </p>
                          <p>{exp.mota}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default UvKNLV;
