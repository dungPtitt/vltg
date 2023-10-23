import ArrDay from "@/Components/ArrDay.component";
import styles from "@/Css/uvProfile.module.css";
import { axiosSauDN } from "@/utils/axios.config";
import { useState, useEffect } from "react";
function UvBCTDL() {
  const [showEdit, setShowEdit] = useState(false);
  const [arrDay, setArrDay] = useState<number[]>([]);
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCandidate/getInfoCandidate")
        .then((res) => setArrDay([...res.data.data.data.uv_day.split(",")]));
    } catch (error) {
      console.log("errr", error);
    }
  }, []);
  return (
    <div>
      {showEdit ? (
        <div>
          <ArrDay
            setArrDay={setArrDay}
            arrDay={arrDay}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
          />
        </div>
      ) : (
        <div>
          <div style={{ pointerEvents: "none" }}>
            <ArrDay arrDay={arrDay} />
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={() => setShowEdit(true)}
              className={styles.btn_primary + " w-32 	"}
            >
              Sửa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UvBCTDL;
