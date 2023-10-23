import styles from "@/Css/ntdProfile.module.css";
import {
  cvStatus,
  dayOfTheWeek,
  renderCvStatus,
  timesOfDay,
} from "@/constants/EditProfile.constant";
import btnStyles from "@/Css/button.module.css";
import { Modal, Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { axiosSauDN } from "@/utils/axios.config";
import { useRouter } from "next/navigation";
import TextArea from "antd/es/input/TextArea";
import {
  ExcelDownload,
  convertAllTimeToHM,
  convertDateDMYcheo,
  convertTimeHM,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { ToastContainer } from "react-toastify";
function NtdUVMUT() {
  const router = useRouter();
  const [duLieuUVMUT, setDuLieuUVMUT] = useState<any>([]);
  const [duLieuShow, setDuLieuShow] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [ghiChuMoi, setGhiChuMoi] = useState("");
  const [showModal, setShowModal] = useState(0);
  const [statusCV, setStatusCV] = useState<any>();
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCompany/ungVienMoiUngTuyen", {
          page: page,
          pageSize: 6,
          status: statusCV,
        })
        .then((res) => {
          setDuLieuUVMUT([...res.data.data.data]);
          setTotal(res.data.data.total);
          setDuLieuShow([...res.data.data.data]);
        });
    } catch (error) {
      console.log("err--------", error);
    }
  }, [page, statusCV]);
  const capNhapGhiChu = (id_viec: number, id_uv: number, index: number) => {
    axiosSauDN
      .post("/manageAccountCompany/updateGhiChuUngTuyen", {
        id_viec: id_viec,
        id_uv: id_uv,
        ghi_chu: ghiChuMoi,
      })
      .then((res) => {
        duLieuUVMUT.splice(index, 1, {
          ...duLieuUVMUT[index],
          UngTuyen: [
            ...duLieuUVMUT[index].UngTuyen.splice(0, 1, {
              ...duLieuUVMUT[index].UngTuyen[0],
              ghi_chu: ghiChuMoi,
            }),
          ],
        });
        setDuLieuUVMUT([...duLieuUVMUT]);
        notifySuccess("Cập nhập ghi chú thành công!");
        setShowModal(0);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  const capNhapTrangThai = (
    value: number,
    id_viec: number,
    id_uv: number,
    index: number
  ) => {
    axiosSauDN
      .post("/manageAccountCompany/updateStatusUngTuyen", {
        id_viec: id_viec,
        id_uv: id_uv,
        status: value,
      })
      .then((res) => {
        duLieuUVMUT.splice(index, 1, {
          ...duLieuUVMUT[index],
          UngTuyen: [
            ...duLieuUVMUT[index].UngTuyen.splice(0, 1, {
              ...duLieuUVMUT[index].UngTuyen[0],
              status: value,
            }),
          ],
        });
        setDuLieuUVMUT([...duLieuUVMUT]);
        notifySuccess("Cập nhập trạng thái thành công!");
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };

  const convertUngTuyen = (UngTuyen: any) => {
    let result = "";
    UngTuyen.forEach(
      (data: any) =>
        (result += `Giờ làm: ${convertAllTimeToHM(data.gio_lam)}
    Thứ: ${data.day},`)
    );
    return result;
  };
  const xuatFileExcel = () => {
    if (duLieuUVMUT.length == 0) {
      notifyWarning("Không có dữ liệu để xuất file!");
    } else {
      let data = duLieuUVMUT.map((uv: any) => [
        uv.uv_userName,
        `${uv.uv_phone ? uv.uv_phone : "******"}`,
        uv.vl_vitri,
        convertUngTuyen(uv.UngTuyen),
        uv.UngTuyen[0].ghi_chu,
        renderCvStatus[uv.UngTuyen[0].status],
      ]);
      ExcelDownload(
        [
          [
            "Tên ứng viên",
            "Số điện thoại",
            "Vị trí",
            "Lịch làm",
            "Ghi chú",
            "Kết quả",
          ],
          ...data,
        ],
        `Ứng viên đã ứng tuyển ${convertDateDMYcheo(Date.now())}`
      );
    }
  };
  return (
    <div className={styles.block_ttd_new}>
      <div className={styles.title_detail}>Ứng Viên Đã Ứng Tuyển</div>
      <div className="flex items-center">
        <button
          onClick={xuatFileExcel}
          className={btnStyles.btn_warning + " mr-5"}
        >
          <img className="mr-3" src="/images/excel-wt.svg" alt="excel" /> Xuất
          excel
        </button>
        <Select
          onChange={(value: number) => setStatusCV(value)}
          style={{ width: 280 }}
          value={statusCV}
          defaultValue={1}
          options={[{ value: 0, label: "Tất cả" }, ...cvStatus]}
        />
      </div>

      <div className="w-full">
        <table className="w-full mt-3">
          <thead>
            <tr>
              <th>Tên ứng viên</th>
              <th> Số điện thoại</th>
              <th> Vị trí</th>
              <th> Lịch làm</th>
              <th> Ghi chú</th>
              <th> Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {duLieuShow.length > 0 &&
              duLieuShow.map((uv: any, index: number) => (
                <tr key={index}>
                  <td>
                    {uv.uv_userName}{" "}
                    <span
                      onClick={() => router.push(`/ung-vien/`)}
                      className="cursor-pointer text-yellow-600 block"
                    >
                      (Xem chi tiết)
                    </span>
                  </td>
                  <td>{uv.uv_phone} </td>
                  <td className="text-blue-600">{uv.vl_vitri}</td>
                  <td>
                    {uv.UngTuyen?.map((data: any, index1: number) => (
                      <p key={index1} className={styles.frame_ca}>
                        <p className="text-blue-600 mb-3">
                          {" "}
                          Ca {index1 + 1}: {data.gio_lam}
                        </p>
                        <p className="flex justify-center flex-wrap">
                          {dayOfTheWeek.map((dayw) => (
                            <span
                              key={dayw.label}
                              className={
                                data.day?.includes(dayw.value)
                                  ? "bg-blue-300 text-white"
                                  : "bg-gray-200	"
                              }
                            >
                              T{dayw.value}
                            </span>
                          ))}
                        </p>
                      </p>
                    ))}
                  </td>
                  <td>
                    <p
                      onClick={() => {
                        setShowModal(uv.UngTuyen[0].id_ungtuyen),
                          setGhiChuMoi(uv.UngTuyen[0].ghi_chu);
                      }}
                      className="flex cursor-pointer flex-col items-center text-sky-600"
                    >
                      {" "}
                      Ghi chú
                      <img src="/images/note-blue.svg" alt="" />
                    </p>
                    <Modal
                      open={showModal == uv.UngTuyen[0].id_ungtuyen}
                      footer={null}
                      onCancel={() => setShowModal(0)}
                    >
                      <div className="flex flex-col items-center">
                        <div className="font-semibold text-2xl">
                          Ghi chú dành cho nhà tuyển dụng
                        </div>
                        <TextArea
                          onChange={(e) => setGhiChuMoi(e.target.value)}
                          rows={6}
                          value={ghiChuMoi}
                          className="my-5 text-lg font-medium"
                        />
                        <button
                          onClick={() =>
                            capNhapGhiChu(uv.id_vieclam, uv.uv_id, index)
                          }
                          className={btnStyles.btn_primary}
                        >
                          {" "}
                          Lưu lại
                        </button>
                      </div>
                    </Modal>
                  </td>
                  <td>
                    <Select
                      onChange={(value) =>
                        capNhapTrangThai(value, uv.id_vieclam, uv.uv_id, index)
                      }
                      value={uv.UngTuyen[0].status}
                      style={{ width: 120 }}
                      options={cvStatus}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {duLieuShow.length > 0 &&
          duLieuShow.map((data: any, index: number) => (
            <div key={index} className={styles.box_mb_content}>
              <div>
                <div className="font-semibold text-base text-sky-500">
                  {data.uv_userName}
                  <span className="text-amber-400 ml-3">(Xem chi tiết)</span>
                </div>
                <div className="flex">
                  <div className="flex mr-6">
                    <img src="/images/map-wt.svg" alt="time" />{" "}
                    <span className="ml-2">{data.vl_vitri}</span>
                  </div>
                  <div className="flex mr-6">
                    <img src="/images/phone-wt.svg" alt="time" />{" "}
                    <span className="ml-2">{data.uv_phone}</span>
                  </div>
                  <div>
                    <div
                      className="flex "
                      onClick={() => setShowModal(data.id_ungtuyen)}
                    >
                      <img src="/images/note-blue.svg" alt="time" />{" "}
                      <span className="ml-2 text-sky-600">Ghi chú</span>
                    </div>

                    <Modal
                      open={showModal == data.id_ungtuyen}
                      footer={null}
                      onCancel={() => setShowModal(0)}
                    >
                      <div className="flex flex-col items-center">
                        <div className="font-semibold text-2xl">
                          Ghi chú dành cho nhà tuyển dụng
                        </div>
                        <TextArea
                          onChange={(e) => setGhiChuMoi(e.target.value)}
                          rows={6}
                          value={ghiChuMoi}
                          className="my-5 text-lg font-medium"
                        />
                        <button
                          onClick={() =>
                            capNhapGhiChu(
                              data.UngTuyen[0].iv_viec,
                              data.UngTuyen[0].id_uv,
                              index
                            )
                          }
                          className={btnStyles.btn_primary}
                        >
                          {" "}
                          Lưu lại
                        </button>
                      </div>
                    </Modal>
                  </div>
                </div>

                <div className={styles.frame_ca}>
                  <p className="text-blue-600 m-3"> Ca 1: 21:28 - 09:28</p>
                  <p className="flex justify-center flex-wrap">
                    <span className="">T2</span>
                    <span className="active">T3</span>
                    <span className="">T4</span>
                    <span className="">T5</span>
                    <span className="">T6</span>
                    <span className="">T7</span>
                    <span className="">CN</span>
                  </p>
                </div>
              </div>
              <div className={styles.conhan}>
                <Select
                  onChange={(value) =>
                    capNhapTrangThai(value, data.id_vieclam, data.uv_id, index)
                  }
                  defaultValue={data.status}
                  style={{ width: 120 }}
                  options={cvStatus}
                />
              </div>
            </div>
          ))}
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
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default NtdUVMUT;
