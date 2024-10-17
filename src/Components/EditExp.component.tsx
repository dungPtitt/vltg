import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import styles from "@/Css/uvProfile.module.css";
import TextArea from "antd/es/input/TextArea";
import {
  convertDateYMD,
  convertTimestampToDatePicker,
  ngayHomNay,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { useEffect, useState } from "react";
import { axiosSauDN } from "@/utils/axios.config";
import { ToastContainer } from "react-toastify";
function EditExp({
  kinhNghiem,
  setShowEdit,
  kiNangLamViec,
  setKiNangLamViec,
  recall,
  setRecall,
}: any) {
  const [duLieuKinhNghiem, setDuLieuKinhNghiem] = useState<any>({
    chucdanh: "",
    cty: "",
    id_knlv: -1,
    id_uv_knlv: -1,
    mota: "",
    time_end: convertDateYMD(dayjs()),
    time_fist: "",
    _id: "",
  });
  console.log("duLieuKinhNghiem:::", duLieuKinhNghiem);
  useEffect(() => {
    if (kinhNghiem?.id_knlv) {
      setDuLieuKinhNghiem({
        ...kinhNghiem,
        chucdanh: kinhNghiem.chuc_danh,
        cty: kinhNghiem.cty_name,
      });
    }
  }, []);

  const taoMoiKinhNghiem = () => {
    console.log("duLieuKinhNghiem>>", duLieuKinhNghiem);
    if (
      !duLieuKinhNghiem.chucdanh ||
      !duLieuKinhNghiem.cty ||
      !duLieuKinhNghiem.mota ||
      !duLieuKinhNghiem.time_fist ||
      !duLieuKinhNghiem.time_end
    ) {
      notifyWarning("Vui lòng nhập đủ thông tin!");
      return;
    }
    axiosSauDN
      .post("/manageAccountCandidate/createKinhNghiemLamViec", duLieuKinhNghiem)
      .then((res) => {
        setRecall(!recall);
        notifySuccess("Thêm mới thành công!");
        // console.log("res.data.data.data::", res.data.data.data);
        setKiNangLamViec([...kiNangLamViec, res.data.data.data]);
        setShowEdit(-10);
        
      })
      .catch((err) => {
        console.log("EditEXP", err);
        if (err.response.status == 410) {
          notifyWarning(err.response.data.error.message);
          return;
        }
        notifyError("Thêm mới không thành công. Vui lòng thử lại!");
      });

    // console.log('response:', response)
  };
  const updateKinhNghiem = () => {
    axiosSauDN
      .post("/manageAccountCandidate/updateKinhNghiemLamViec", duLieuKinhNghiem)
      .then((res) => {
        const indexUpdate = kiNangLamViec.findIndex(
          (kn: any) => kn.id_knlv == duLieuKinhNghiem.id_knlv
        );

        kiNangLamViec.splice(indexUpdate, 1, duLieuKinhNghiem);
        setKiNangLamViec([...kiNangLamViec]);
        notifySuccess("Cập nhập thành công!");
        setShowEdit(-10);
      })
      .catch((err) =>
        notifyError("Cập nhập không thành công. Vui lòng thử lại!")
      );
  };
  const convertDate = (value: any, name: any) => {
    let convert = "";
    const time = new Date(value);
    convert = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    setDuLieuKinhNghiem({ ...duLieuKinhNghiem, [name]: convert });
  };
  return (
    <div>
      <div className="mt-6">
        <label className="text-sm font-semibold">
          <span className="text-red-500">*</span>Chức danh/ Vị trí
        </label>
        <Input
          value={duLieuKinhNghiem.chucdanh}
          placeholder="Nhập chức danh"
          type="text"
          onChange={(e) =>
            setDuLieuKinhNghiem({
              ...duLieuKinhNghiem,
              chucdanh: e.target.value,
            })
          }
        />
      </div>
      <div className={styles.box_choice_day}>
        <div className="mt-6">
          <label className="text-sm font-semibold block">
            <span className="text-red-500">*</span>Từ
          </label>
          <DatePicker
              name="time_fist"
              onChange={(e) => convertDate(e, 'time_fist')}
              className="w-full"
              // defaultValue={dayjs(ngayHomNay(), "DD/MM/YYYY")}
            format={["DD/MM/YYYY"]}
            disabledDate={(current) => 
              !current || // Vô hiệu hóa các ngày không hợp lệ
              (duLieuKinhNghiem.time_end && current.isAfter(duLieuKinhNghiem.time_end, 'day')) // Vô hiệu hóa các ngày trước time_fist
            }
          />
        </div>
        <div className="mt-6 ">
          <label className="text-sm font-semibold block">
            <span className="text-red-500">*</span>Đến
          </label>
          <DatePicker
              name="time_end"
              onChange={(e) => convertDate(e, 'time_end')}
              className="w-full"
            defaultValue={dayjs()}
            format={["DD/MM/YYYY"]}
            disabledDate={(current) => current && current > dayjs().endOf('day')}
            />
        </div>
      </div>
      <div className="mt-6">
        <label className="text-sm font-semibold">
          <span className="text-red-500">*</span>Công ty
        </label>
        <Input
          value={duLieuKinhNghiem.cty}
          placeholder="Nhập tên công ty"
          type="text"
          onChange={(e) =>
            setDuLieuKinhNghiem({
              ...duLieuKinhNghiem,
              cty: e.target.value,
            })
          }
        />
      </div>
      <div className="mt-6">
        <label className="text-sm font-semibold">
          <span className="text-red-500">*</span>Mô tả công việc
        </label>
        <TextArea
          value={duLieuKinhNghiem.mota}
          onChange={(e) =>
            setDuLieuKinhNghiem({
              ...duLieuKinhNghiem,
              mota: e.target.value,
            })
          }
          rows={6}
          placeholder="Mô tả công việc như là nhiệm vụ, trách nhiệm, thành tích đạt được..."
        />
      </div>
      <div className={styles.box_btn}>
        <button
          onClick={
            duLieuKinhNghiem.id_knlv == -1 ? taoMoiKinhNghiem : updateKinhNghiem
          }
          className={styles.btn_outline_primary + " w-40"}
        >
          Lưu{" "}
        </button>
        <button
          onClick={() => setShowEdit(-10)}
          className={styles.btn_outline_primary + " w-40"}
        >
          Không lưu{" "}
        </button>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default EditExp;
