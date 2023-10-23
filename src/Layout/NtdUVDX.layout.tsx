import styles from "@/Css/ntdProfile.module.css";
import { axiosSauDN } from "@/utils/axios.config";
import {
  convertDateDMY,
  convertNameToSlug,
  notifyError,
  notifySuccess,
} from "@/utils/generalFunction";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function NtdUVDX() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [duLieuUVDX, setDuLieuUVDX] = useState<any>([]);
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCompany/ungVienDaXem", {
          page: page,
          pageSize: pageSize,
        })
        .then((res) => {
          setTotal(res.data.data.total);
          setDuLieuUVDX([...res.data.data.data]);
        });
    } catch (error) {
      console.log("NTDUVDX", error);
    }
  }, []);
  const xoaUngVien = (xm_id: number, index: number) => {
    try {
      axiosSauDN
        .post("/manageAccountCompany/ungVienDaXem", { id: xm_id })
        .then((res) => {
          duLieuUVDX.splice(index, 1);
          setDuLieuUVDX([...duLieuUVDX]);
          notifySuccess("Xóa thành công!");
        });
    } catch (error) {
      notifyError("Vui lòng thử lại sau!");
    }
  };
  return (
    <div className={styles.block_ttd_new}>
      <div className={styles.title_detail}>Ứng viên đã xem</div>
      <div className="w-full">
        <table className="w-full mt-3">
          <thead>
            <tr>
              <th>Tên ứng viên</th>
              <th> Ngày sinh</th>
              <th> Địa chỉ</th>
              <th> Ngày xem</th>
              <th> Xóa </th>
            </tr>
          </thead>
          <tbody>
            {duLieuUVDX.length > 0 &&
              duLieuUVDX.map((data: any, index: number) => (
                <tr key={data.xm_id}>
                  <td>
                    {data.uv_userName}{" "}
                    <span
                      onClick={() => router.push(`/ung-vien-${convertNameToSlug(data.uv_userName) }-ca${data.xm_id_uv}.html`)}
                      className="block text-yellow-500 cursor-pointer"
                    >
                      (Xem chi tiết)
                    </span>
                  </td>
                  <td>{convertDateDMY(data.uv_birthday * 1000)} </td>
                  <td>{data.uv_address}</td>
                  <td>{convertDateDMY(data.xm_time_created * 1000)} </td>
                  <td>
                    <div className="flex justify-center">
                      <img
                        onClick={() => xoaUngVien(data.xm_id, index)}
                        className="cursor-pointer"
                        src="/images/delete-xam.svg"
                        alt="delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className={styles.box_mb_content}>
          {duLieuUVDX.length > 0 &&
            duLieuUVDX.map((data: any, index: number) => (
              <div key={data.xm_time_created}>
                <div>
                  <div className="font-semibold text-base text-sky-500">
                    {data.uv_userName}{" "}
                    <span className="text-amber-400 ml-3">(Xem chi tiết)</span>
                  </div>
                  <div className="flex">
                    <img src="/images/map-wt.svg" alt="time" />{" "}
                    <span className="ml-2">{data.uv_address}</span>
                  </div>
                  <div className="flex">
                    <img src="/images/day-xam.svg" alt="time" />{" "}
                    <span className="ml-2">
                      {convertDateDMY(data.xm_time_created * 1000)}
                    </span>
                  </div>
                  <div className="flex">
                    <img src="/images/birthday_new.svg" alt="time" />{" "}
                    <span className="ml-2">
                      {convertDateDMY(data.uv_birthday * 1000)}
                    </span>
                  </div>
                </div>
                <div className={styles.conhan}>
                  <img
                    onClick={() => xoaUngVien(data.xm_id, index)}
                    className="mr-3"
                    src="/images/delete-xam.svg"
                    alt="delete"
                  />
                </div>
              </div>
            ))}
        </div>
        <Pagination
          total={total}
          showQuickJumper
          showSizeChanger
          onChange={(current, newPageSize) => {
            if (newPageSize != pageSize) {
              setPage(1);
              setPageSize(newPageSize);
            } else {
              setPage(current);
            }
          }}
        />
      </div>
    </div>
  );
}

export default NtdUVDX;
