import styles from "@/Css/ntdProfile.module.css";
import btnStyles from "@/Css/button.module.css";
import { useEffect, useState } from "react";
import { axiosSauDN } from "@/utils/axios.config";
import { useRouter } from "next/navigation";
import {
  ExcelDownload,
  convertDateDMYcheo,
  convertNameToSlug,
  convertTimeHM,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { ToastContainer } from "react-toastify";
function NtdUVDL() {
  const router = useRouter();
  const [danhSachUV, setDanhSachUV] = useState<any>([]);
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCompany/ungVienDaLuu")
        .then((res) => setDanhSachUV([...res.data.data.data]));
    } catch (error) {
      console.log("first", error);
    }
  }, []);
  const xoaUv = (id: number, index: number) => {
    axiosSauDN
      .post("/manageAccountCompany/xoaUngVienDaLuu", { id_uv: id })
      .then((res) => {
        notifySuccess("Đã xóa thành công!");
        danhSachUV.splice(index, 1);
        setDanhSachUV([...danhSachUV]);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  const xuatFileExcel = () => {
    if (danhSachUV.length == 0) {
      notifyWarning("Không có dữ liệu để xuất file!");
    } else {
      let data = danhSachUV.map((uv: any) => [
        uv.uv_userName,
        uv.uv_address,
        `${uv.uv_phone ? uv.uv_phone : "******"}`,
        `${convertDateDMYcheo(uv.created_at)} ${convertTimeHM(uv.created_at)}`,
      ]);
      ExcelDownload(
        [["Tên ứng viên", "Địa chỉ", "Số điện thoại", "Ngày lưu"], ...data],
        `Ứng viên đã lưu ${convertDateDMYcheo(Date.now())}`
      );
    }
  };
  return (
    <div className={styles.block_ttd_new}>
      <div className={styles.title_detail}>Ứng viên đã lưu</div>
      <button className={btnStyles.btn_warning} onClick={xuatFileExcel}>
        <img className="mr-3" src="/images/excel-wt.svg" alt="excel" /> Xuất
        excel
      </button>
      <div className="w-full">
        <table className="w-full mt-3">
          <thead>
            <tr>
              <th>Tên ứng viên</th>
              <th> Địa chỉ</th>
              <th> Số điện thoại</th>
              <th> Ngày lưu</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {danhSachUV.length > 0 &&
              danhSachUV.map((data: any, index: number) => (
                <tr key={data.id}>
                  <td>
                    {data.uv_userName}{" "}
                    <span
                      className="text-blue-500 cursor-pointer block"
                      onClick={() =>
                        router.push(
                          `/ung-vien-${convertNameToSlug(data.userName)}-${
                            data.id_uv
                          }.html`
                        )
                      }
                    >
                      (Xem chi tiết)
                    </span>
                  </td>
                  <td>{data.uv_address}</td>
                  <td>{data.uv_phone ? data.uv_phone : "******"}</td>
                  <td>{convertDateDMYcheo(data.created_at)} </td>
                  <td>
                    <p className="flex justify-center">
                      <img
                        onClick={() => xoaUv(data.id_uv, index)}
                        className="cursor-pointer"
                        src="/images/delete-xam.svg"
                        alt="delete"
                      />
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {danhSachUV.length > 0 &&
          danhSachUV.map((data: any, index: number) => (
            <div className={styles.box_mb_content} key={data.id}>
              <div>
                <div className="font-semibold text-base text-sky-500">
                  {data.uv_userName}{" "}
                  <span
                    className="text-amber-400 ml-3 cursor-pointer"
                    onClick={() => router.push(`/ung-vien-${convertNameToSlug(data.uv_userName) }-ca${data.id_uv}.html`)}
                  >
                    (Xem chi tiết)
                  </span>
                </div>
                <div className="flex">
                  <img src="/images/map-wt.svg" alt="diachi" />{" "}
                  <span className="ml-2">{data.uv_address}</span>
                </div>
                <div className="flex">
                  <img src="/images/day-xam.svg" alt="time" />{" "}
                  <span className="ml-2">{data.uv_phone}******</span>
                </div>
                <div className="flex">
                  <img src="/images/birthday_new.svg" alt="time" />{" "}
                  <span className="ml-2">
                    {convertDateDMYcheo(data.created_at)}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  onClick={() => xoaUv(data.id_uv, index)}
                  className="cursor-pointer"
                  src="/images/delete-xam.svg"
                  alt="delete"
                />
              </div>
            </div>
          ))}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default NtdUVDL;
