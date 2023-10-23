import styles from "@/Css/login.module.css";
import { timesOfDay, dayOfTheWeek } from "@/constants/EditProfile.constant";
import { axiosSauDN } from "@/utils/axios.config";
import { notifyError, notifySuccess } from "@/utils/generalFunction";
import { useState, useEffect } from "react";
import stylesUV from "@/Css/uvProfile.module.css";

function ArrDay({ arrDay, showEdit, setShowEdit, setArrDay }: any) {
  const [buoiLam, setBuoiLam] = useState<any>(arrDay);

  useEffect(() => {
    if (arrDay?.length > 0) {
      setBuoiLam([...arrDay]);
    }
  }, [arrDay]);
  const handleClick = (value: string) => {
    const indexValue = buoiLam.findIndex((b: any) => b == Number(value));
    if (indexValue == -1) {
      setBuoiLam([...buoiLam, value]);
    } else {
      buoiLam.splice(indexValue, 1);
      setBuoiLam([...buoiLam]);
    }
  };
  const updateBCTDL = () => {
    axiosSauDN
      .post("/manageAccountCandidate/updateBuoiCoTheDiLam", { day: buoiLam })
      .then((res) => {
        showEdit && (setShowEdit(false), setArrDay([...buoiLam]));
        notifySuccess("Cập nhập thành công!");
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  return (
    <div>
      <div className="grid grid-cols-7">
        {dayOfTheWeek?.map((ngay, index) => (
          <div key={index}>
            <div className=" w-4/5 mb-2 text-center">{ngay.label}</div>
            {timesOfDay.map((buoi) => (
              <div
                key={buoi.label}
                onClick={() => {
                  handleClick(`${ngay.value}${buoi.value}`);
                }}
                className={`${
                  buoiLam?.findIndex(
                    (b: any) => b == Number(`${ngay.value}${buoi.value}`)
                  ) != -1 && styles.mark
                } mb-2 cursor-pointer w-4/5 bg-slate-200 text-center`}
              >
                {buoi.label}
              </div>
            ))}
          </div>
        ))}
      </div>{" "}
      {showEdit && (
        <div className={stylesUV.box_btn}>
          <button
            onClick={updateBCTDL}
            className={stylesUV.btn_outline_primary + " w-40"}
          >
            Lưu{" "}
          </button>
          <button
            onClick={() => setShowEdit(false)}
            className={stylesUV.btn_outline_primary + " w-40"}
          >
            Không lưu{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default ArrDay;
