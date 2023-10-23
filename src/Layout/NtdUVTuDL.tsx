import styles from "@/Css/ntdProfile.module.css";
import {
  statusDiemLoc,
  dayOfTheWeek,
  timesOfDay,
  renderStatusDiemLoc,
} from "@/constants/EditProfile.constant";
import btnStyles from "@/Css/button.module.css";
import { Modal, Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { axiosSauDN } from "@/utils/axios.config";
import { useRouter } from "next/navigation";
import TextArea from "antd/es/input/TextArea";
import {
  ExcelDownload,
  convertDateDMYcheo,
  convertNameToSlug,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { ToastContainer } from "react-toastify";

function NtdUVTuDL() {
  const router = useRouter();
  const [danhSachUVTuDL, setDanhSachUVTuDL] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [ketQua, setKetQua] = useState<any>();
  const [pageSize, setPageSize] = useState(10);
  const [ghiChuMoi, setGhiChuMoi] = useState("");
  const [showModal, setShowModal] = useState(0);
  const [stt, setStt] = useState(0);
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCompany/ungVienTuDiemLoc", {
          page: page,
          pageSize: pageSize,
          ket_qua: ketQua,
        })
        .then((res) => {
          setDanhSachUVTuDL([...res.data.data.data]);
          setTotal(res.data.data.total);
          setDanhSachUVTuDL([...res.data.data.data]);
        });
    } catch (error) {
      console.log("err--------", error);
    }
  }, [page, ketQua]);
  const capNhapGhiChu = (index: number) => {
    axiosSauDN
      .post("/manageAccountCompany/updateGhiChuNtdXemUv", {
        stt: stt,
        ghi_chu: ghiChuMoi,
      })
      .then((res) => {
        danhSachUVTuDL.splice(index, 1, {
          ...danhSachUVTuDL[index],
          ghi_chu: ghiChuMoi,
        });
        setDanhSachUVTuDL([...danhSachUVTuDL]);
        notifySuccess("Cập nhập ghi chú thành công!");
        setShowModal(0);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  const capNhapTrangThai = (value: number, id: number, index: number) => {
    axiosSauDN
      .post("/manageAccountCompany/updateKetQuaNtdXemUv", {
        stt: id,
        ket_qua: value,
      })
      .then((res) => {
        danhSachUVTuDL.splice(index, 1, {
          ...danhSachUVTuDL[index],
          ket_qua: value,
        });
        setDanhSachUVTuDL([...danhSachUVTuDL]);
        notifySuccess("Cập nhập trạng thái thành công!");
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  const convertUvDay = (uv_day: string) => {
    if (uv_day) {
      const showDay: any = [];
      {
        dayOfTheWeek.forEach((day) => {
          timesOfDay.forEach((times) => {
            if (uv_day.includes(`${day.value}${times.value}`)) {
              showDay.push(`${times.label} ${day.label}`);
            }
          });
        });
      }
      return showDay.join(", ");
    } else {
      return "Chưa có thông tin";
    }
  };
  const xuatFileExcel = () => {
    if (danhSachUVTuDL.length == 0) {
      notifyWarning("Không có dữ liệu để xuất file!");
    } else {
      let data = danhSachUVTuDL.map((uv: any) => [
        uv.uv_userName,
        uv.uv_address,
        `${uv.uv_phone ? uv.uv_phone : "******"}`,
        convertUvDay(uv.uv_day),
        uv.ghi_chu,
        renderStatusDiemLoc[uv.ket_qua],
      ]);
      ExcelDownload(
        [
          [
            "Tên ứng viên",
            "Địa chỉ",
            "Số điện thoại",
            "Lịch làm",
            "Ghi chú",
            "Kết quả",
          ],
          ...data,
        ],
        `Ứng viên từ điểm lọc ${convertDateDMYcheo(Date.now())}`
      );
    }
  };

  return (
    <div className={styles.block_ttd_new}>
      <div className={styles.title_detail}>Ứng Viên Từ Điểm Lọc</div>
      <div className="flex items-center">
        <button
          onClick={xuatFileExcel}
          className={btnStyles.btn_warning + " mr-5"}
        >
          <img className="mr-3" src="/images/excel-wt.svg" alt="excel" /> Xuất
          excel
        </button>
        <Select
          onChange={(value: number) => setKetQua(value)}
          style={{ width: 280 }}
          defaultValue={0}
          options={[{ value: 0, label: "Tất cả" }, ...statusDiemLoc]}
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
              <th className="w-28"> Ghi chú</th>
              <th> Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {danhSachUVTuDL.length > 0 &&
              danhSachUVTuDL.map((uv: any, index: number) => (
                <tr key={index}>
                  <td>
                    {uv.uv_userName}{" "}
                    <span
                      onClick={() =>
                        router.push(
                          `/ung-vien-${convertNameToSlug(uv.uv_userName)}-ca${
                            uv.id_uv
                          }.html$`
                        )
                      }
                      className="cursor-pointer text-yellow-600 block"
                    >
                      (Xem chi tiết)
                    </span>
                  </td>
                  <td>{uv.uv_phone} </td>
                  <td className="text-blue-600">{uv.uv_address}</td>
                  <td>{convertUvDay(uv.uv_day)}</td>
                  <td>
                    <p
                      onClick={() => {
                        setStt(uv.stt),
                          setShowModal(uv.id_ungtuyen),
                          setGhiChuMoi(uv.ghi_chu);
                      }}
                      className="flex cursor-pointer flex-col items-center text-sky-600"
                    >
                      {" "}
                      Ghi chú
                      <img src="/images/note-blue.svg" alt="" />
                      <Modal
                        open={showModal == uv.id_ungtuyen}
                        footer={null}
                        onCancel={() => setShowModal(0)}
                      >
                        <div className="flex flex-col items-center">
                          <div className="font-semibold text-2xl">
                            Ghi chú dành cho nhà tuyển dụng
                          </div>
                          <TextArea
                            onChange={(e) =>
                              setGhiChuMoi(e.target.value.trim())
                            }
                            rows={6}
                            value={ghiChuMoi}
                            className="my-5 text-lg font-medium"
                          />
                          <button
                            onClick={() => {
                           
                              capNhapGhiChu(index);
                            }}
                            className={btnStyles.btn_primary}
                          >
                            {" "}
                            Lưu lại
                          </button>
                        </div>
                      </Modal>
                    </p>
                  </td>
                  <td>
                    <Select
                      onChange={(value) =>
                        capNhapTrangThai(value, uv.stt, index)
                      }
                      value={uv.ket_qua}
                      style={{ width: 120 }}
                      options={statusDiemLoc}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {danhSachUVTuDL.length > 0 &&
          danhSachUVTuDL.map((data: any, index: number) => (
            <div key={index} className={styles.box_mb_content}>
              <div>
                <div className="font-semibold text-base text-sky-500">
                  {data.uv_userName}
                  <span className="text-amber-400 ml-3">(Xem chi tiết)</span>
                </div>
                <div className="flex">
                  <div className="flex mr-6">
                    <img src="/images/map-wt.svg" alt="time" />{" "}
                    <span className="ml-2">{data.uv_address}</span>
                  </div>
                  <div className="flex mr-6">
                    <img src="/images/phone-wt.svg" alt="time" />{" "}
                    <span className="ml-2">{data.uv_phone}</span>
                  </div>
                  <div>
                    <div
                      className="flex "
                      onClick={() => {
                        setStt(data.stt),
                          setShowModal(data.id_ungtuyen),
                          setGhiChuMoi(data.ghi_chu);
                      }}
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
                          onClick={() => capNhapGhiChu(index)}
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
                  {convertUvDay(data.uv_day)}
                </div>
              </div>
              <div className={styles.conhan}>
                <Select
                  onChange={(value) => capNhapTrangThai(value, data.stt, index)}
                  value={data.ket_qua}
                  style={{ width: 120 }}
                  options={statusDiemLoc}
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

export default NtdUVTuDL;
