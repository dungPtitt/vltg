"use client";
import styles from "@/Css/ntdProfile.module.css";

import { DatePicker, Input, Select, TimePicker } from "antd";
import btnStyles from "@/Css/button.module.css";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

import {
  literacy,
  schedules,
  gender,
  job,
  position,
  payrollMethods,
  dayOfTheWeek,
} from "@/constants/EditProfile.constant";

import { quan_huyen, tinh_thanh } from "@/utils/vi_tri";
import dayjs from "dayjs";
import {
  convertDateYMD,
  convertTimeHM,
  ngayHomNay,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { axiosSauDN, axiosTruocDN } from "@/utils/axios.config";
import { TypeAdminWorkShifts, TypeOptionSalary } from "@/Styles/AdminType";
function Admin_TTD_TM({ dataEdit, setShowEdit }: any) {
  const [codeCity, setCodeCity] = useState(0);
  const [salaryLevel, setSalaryLevel] = useState(1);
  const [jobId, setJobId] = useState<any>(dataEdit?.id_vieclam);
  const [optionSalary, setOptionSalary] = useState<TypeOptionSalary>({
    ht_luong: dataEdit?.ht_luong ? dataEdit.ht_luong : 1,
    luong: dataEdit?.luong,
    luong_fist: dataEdit?.luong_fist,
    luong_end: dataEdit?.luong_end,
  });
  const [duLieuMoi, setDuLieuMoi] = useState<any>({
    id_ntd: dataEdit?.id_ntd,
    vi_tri: dataEdit?.vi_tri,
    so_luong: dataEdit?.so_luong,
    nganh_nghe: Number(dataEdit?.nganh_nghe),
    cap_bac: dataEdit?.cap_bac,
    dia_diem: dataEdit?.dia_diem,
    quan_huyen: dataEdit?.quan_huyen,
    hinh_thuc: dataEdit?.hinh_thuc,
    tra_luong: dataEdit?.tra_luong,
    hoc_van: dataEdit?.hoc_van,
    gender: dataEdit?.gender,
    mo_ta: dataEdit?.mo_ta,
    yeu_cau: dataEdit?.yeu_cau,
    quyen_loi: dataEdit?.quyen_loi,
    ho_so: dataEdit?.ho_so,
    time_td: dataEdit?.time_td,
    fist_time: dataEdit?.fist_time,
    last_time: dataEdit?.last_time,
    name_lh: dataEdit?.name_lh,
    phone_lh: dataEdit?.phone_lh,
    address_lh: dataEdit?.address_lh,
    email_lh: dataEdit?.email_lh,
  });
  const [lichTuyenDung, setLichTuyenDung] = useState<TypeAdminWorkShifts[]>([
    { day: [], ca_fist: "", ca_last: "" },
  ]);
  useEffect(() => {
    dataEdit &&
      axiosTruocDN
        .post("/viecLam/chiTietViecLamTruocDN", {
          id_vieclam: dataEdit.id_vieclam,
        })
        .then((res) => {
          setOptionSalary({
            ht_luong: Number(res.data.data.data[0].ht_luong),
            luong: Number(res.data.data.data[0].muc_luong),
            luong_fist: Number(res.data.data.data[0].luong_fist),
            luong_end: Number(res.data.data.data[0].luong_end),
          });
          handleLichTuyenDung(res.data.data.data[0].CaLamViec);
        })
        .catch((err) => notifyError(err.response.data.error.message));
  }, []);
  const handleLichTuyenDung = (datas: any) => {

    const convertData: TypeAdminWorkShifts[] = [];
    if (datas.length > 0) {
      datas.forEach((data: any, index: number) => {
        convertData.push({
          ...data,
          day: data.day
            .split(",")
            .map((item: string) => Number(item.trim()) - (index + 1) * 10),
        });
      });
    }

    setLichTuyenDung([...convertData]);
  };

  const themNgayVaoCaLam = (value: number, index: number) => {
    const indexDay = lichTuyenDung[index]?.day.findIndex(
      (d: number) => d == value
    );
    if (indexDay != -1) {
      lichTuyenDung[index]?.day.splice(indexDay, 1);
    } else {
      lichTuyenDung[index].day.push(value);
      lichTuyenDung[index].day.sort((a: number, b: number) => a - b);
    }
    setLichTuyenDung([...lichTuyenDung]);
  };
  const handleDuLieuMoi = (e: any) => {
    setDuLieuMoi({ ...duLieuMoi, [e.target.name]: e.target.value });
  };
  const handleDeleteCa = (index: number) => {
    lichTuyenDung.splice(index, 1);
    setLichTuyenDung([...lichTuyenDung]);
  };
  const convertDate = (value: any, name: any) => {
    setDuLieuMoi({ ...duLieuMoi, [name]: convertDateYMD(value) });
  };
  const handleGuiData = () => {
    for (const key in duLieuMoi) {
      if (!duLieuMoi[key]) {
        notifyWarning(`Vui lòng nhập ${key}`);
        return;
      }
    }
    if (optionSalary.ht_luong == 1) {
      if (!optionSalary.luong) {
        notifyWarning("Vui lòng nhập mức lương!");
        return;
      }
    } else {
      if (!optionSalary.luong_fist || !optionSalary.luong_end) {
        notifyWarning("Vui lòng nhập khoảng lương!");
        return;
      }
    }
    for (let i = 0; i < lichTuyenDung.length; i++) {
      if (
        lichTuyenDung[i].day.length == 0 ||
        !lichTuyenDung[i].ca_fist ||
        !lichTuyenDung[i].ca_last
      ) {
        notifyWarning(`Vui lòng nhập đầy đủ thông tin ca ${i + 1}`);
        return;
      }
    }
    // lichTuyenDung.forEach((ca: any, index: number) => {});
    if (dataEdit?.id_ntd) {
      axiosSauDN
        .post("/admin/updateTin", {
          ...duLieuMoi,
          ...optionSalary,
          list_ca: lichTuyenDung,
          id_vieclam: jobId,
        })
        .then((res) => notifySuccess("Update Tin tuyển dụng thành công!"))
        .catch((err) => {
          console.log("updateTInnnn", err.response.data);
          notifyError(err.response.data.error.message);
        });
    } else {
      axiosSauDN
        .post("/admin/createTin", {
          ...duLieuMoi,
          ...optionSalary,

          list_ca: lichTuyenDung,
        })
        .then((res) => notifySuccess("Tạo mới Tin tuyển dụng thành công!"))
        .catch(
          (err) =>
            console.log(
              "Admin tạo mới tin",
              err
            ) 
        );
    }
  };
  return (
    <div>
      <div className="text-center w-1/2">
        Những ô dấu sao (<span className="text-red-500">*</span>) là bắt buộc
        phải nhập
      </div>
      <div className="flex flex-col w-1/2 items-end">
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> ID công ty:{" "}
          <Input
            value={duLieuMoi.id_ntd}
            name="id_ntd"
            placeholder="ID công ty"
            onChange={(e) => handleDuLieuMoi(e)}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Vị trí cần tuyển:{" "}
          <Input
            name="vi_tri"
            value={duLieuMoi.vi_tri}
            onChange={(e) => handleDuLieuMoi(e)}
            style={{ width: 500, marginLeft: "20px" }}
            placeholder="Vị trí cần tuyển"
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Số lượng cần tuyển:{" "}
          <Input
            name="so_luong"
            value={duLieuMoi.so_luong}
            type="number"
            placeholder="Số lượng cần tuyển"
            onChange={(e) => handleDuLieuMoi(e)}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Chọn ngành nghề:{" "}
          <Select
            value={Number(duLieuMoi.nganh_nghe)}
            placeholder="Chọn ngành nghề"
            onChange={(e) => setDuLieuMoi({ ...duLieuMoi, nganh_nghe: e })}
            style={{ width: 500, marginLeft: "20px" }}
            options={job}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Chọn cấp bậc:{" "}
          <Select
            value={duLieuMoi.cap_bac}
            placeholder="Chọn cấp bậc"
            onChange={(e) => setDuLieuMoi({ ...duLieuMoi, cap_bac: e })}
            style={{ width: 500, marginLeft: "20px" }}
            options={position}
          />
        </div>
        <div className="flex items-center mt-3">
          Thời gian thử việc:{" "}
          <Input
            value={duLieuMoi.thoi_gian}
            placeholder="Thời gian thử việc"
            style={{ width: 500, marginLeft: "20px" }}
            name="thoi_gian"
            onChange={(e) => handleDuLieuMoi(e)}
          />
        </div>
        <div className="flex items-center mt-3">
          Hoa hồng:{" "}
          <Input
            value={duLieuMoi.hoa_hong}
            name="hoa_hong"
            placeholder="Hoa hồng"
            onChange={(e) => handleDuLieuMoi(e)}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span>Chọn tỉnh thành:{" "}
          <Select
            style={{ width: 500, marginLeft: "20px" }}
            showSearch
            value={duLieuMoi.dia_diem}
            onChange={(e) => {
              setDuLieuMoi({ ...duLieuMoi, dia_diem: e });
              setCodeCity(e);
            }}
            placeholder="Chọn tỉnh thành"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={tinh_thanh.map((city) => ({
              label: city.cit_name,
              value: city.cit_id,
            }))}
          ></Select>
        </div>
        <div className="flex items-center mt-3">
          Chọn quận huyện:{" "}
          <Select
            style={{ width: 500, marginLeft: "20px" }}
            value={duLieuMoi.quan_huyen}
            showSearch
            onChange={(e) => setDuLieuMoi({ ...duLieuMoi, quan_huyen: e })}
            placeholder="Chọn quận huyện"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={quan_huyen
              .filter((e) => e.cit_parent == codeCity)
              .map((city) => ({
                label: city.cit_name,
                value: city.cit_id,
              }))}
          ></Select>
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Hình thức làm việc:{" "}
          <Select
            value={duLieuMoi.hinh_thuc}
            onChange={(e) => setDuLieuMoi({ ...duLieuMoi, hinh_thuc: e })}
            placeholder="Chọn hình thức làm việc"
            style={{ width: 500, marginLeft: "20px" }}
            options={schedules}
          />
        </div>
        <div style={{ width: 500 }} className="mt-2  ">
          <label className="text-sm font-semibold">
            <span className="text-red-500">*</span> Mức lương
          </label>
          <span>
            <button
              onClick={() => {
                setSalaryLevel(1);
                setOptionSalary({ ...optionSalary, ht_luong: 1 });
              }}
              className={
                styles.btn_luong + (salaryLevel === 1 && ` ${styles.active}`)
              }
            >
              {" "}
              Cố định
            </button>
            <button
              onClick={() => {
                setSalaryLevel(2);
                setOptionSalary({ ...optionSalary, ht_luong: 2 });
              }}
              className={
                styles.btn_luong + (salaryLevel === 2 && ` ${styles.active}`)
              }
            >
              {" "}
              Ước lượng
            </button>
          </span>
          {salaryLevel === 1 ? (
            <div className="flex">
              <Input
                value={optionSalary.luong}
                className="w-1/2 mr-5"
                placeholder="VD: 25000"
                type="number"
                name="luong"
                required
                onChange={(e) =>
                  setOptionSalary({
                    ...optionSalary,
                    luong: Number(e.target.value),
                  })
                }
              />
              <Select
                value={duLieuMoi.tra_luong}
                className="w-1/4"
                defaultValue={1}
                options={payrollMethods}
                onChange={(e) => setDuLieuMoi({ ...duLieuMoi, tra_luong: e })}
              ></Select>
            </div>
          ) : (
            <div className="flex">
              <Input
                value={optionSalary.luong_fist}
                required
                className="w-1/4 mr-3"
                placeholder="VD: 15000"
                type="number"
                onChange={(e) =>
                  setOptionSalary({
                    ...optionSalary,
                    luong_fist: Number(e.target.value),
                  })
                }
                name="luong_fist"
              />{" "}
              -
              <Input
                value={optionSalary.luong_end}
                required
                className="w-1/4 mx-3"
                placeholder="VD: 30000"
                type="number"
                onChange={(e) =>
                  setOptionSalary({
                    ...optionSalary,
                    luong_end: Number(e.target.value),
                  })
                }
                name="luong_end"
              />
              <Select
                value={duLieuMoi.tra_luong}
                className="w-1/3"
                defaultValue={1}
                options={payrollMethods}
                onChange={(e) => setDuLieuMoi({ ...duLieuMoi, tra_luong: e })}
              ></Select>
            </div>
          )}
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Học vấn:{" "}
          <Select
            value={duLieuMoi.hoc_van}
            onChange={(e) => setDuLieuMoi({ ...duLieuMoi, hoc_van: e })}
            placeholder="Chọn học vấn"
            style={{ width: 500, marginLeft: "20px" }}
            options={literacy}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Giới tính{" "}
          <Select
            value={duLieuMoi.gender}
            onChange={(e) => setDuLieuMoi({ ...duLieuMoi, gender: e })}
            placeholder="Chọn giới tính"
            defaultValue={1}
            style={{ width: 200, marginLeft: "20px", marginRight: "300px" }}
            options={gender}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Mô tả công việc:{" "}
          <TextArea
            value={duLieuMoi.mo_ta}
            name="mo_ta"
            placeholder="Mô tả công việc..."
            onChange={(e) => handleDuLieuMoi(e)}
            rows={5}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Yêu cầu:{" "}
          <TextArea
            value={duLieuMoi.yeu_cau}
            placeholder="Yêu cầu công việc..."
            name="yeu_cau"
            onChange={(e) => handleDuLieuMoi(e)}
            rows={5}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Quyền lợi:{" "}
          <TextArea
            value={duLieuMoi.quyen_loi}
            placeholder="Quyền lợi..."
            name="quyen_loi"
            onChange={(e) => handleDuLieuMoi(e)}
            rows={5}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Hồ sơ:{" "}
          <TextArea
            value={duLieuMoi.ho_so}
            placeholder="Hồ sơ bao gồm..."
            name="ho_so"
            onChange={(e) => handleDuLieuMoi(e)}
            rows={5}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>

        <div className={styles.llv}>
          <div className={styles.title}> Lịch làm việc</div>
          <div className="mt-6 flex items-center">
            <label className="text-sm font-semibold mr-12">Hạn nộp:</label>
            <DatePicker
              // value={duLieuMoi.fist_time}
              // value={duLieuMoi.time_td}
              name="fist_time"
              onChange={(e) => convertDate(e, "time_td")}
              className="w-48 ml-3"
              defaultValue={dayjs(ngayHomNay(), "DD/MM/YYYY")}
              format={["DD/MM/YYYY"]}
            />
          </div>
          <div className="flex items-center justify-between ">
            <div className="text-sm font-semibold mt-6"> Thời gian:</div>
            {/* Từ */}
            <div className="mt-6 flex items-center">
              <label className="text-sm font-semibold mr-1.5">Từ:</label>
              <DatePicker
                // value={duLieuMoi.fist_time}
                name="fist_time"
                onChange={(e) => convertDate(e, "fist_time")}
                className="w-48 ml-5 "
                defaultValue={dayjs(ngayHomNay(), "DD/MM/YYYY")}
                format={["DD/MM/YYYY"]}
              />
            </div>
            {/* Den */}
            <div className="mt-6">
              <label className="text-sm font-semibold">Đến:</label>
              <DatePicker
                // value={duLieuMoi.last_time}
                onChange={(e) => convertDate(e, "last_time")}
                name="last_time"
                className="w-48 ml-3"
                defaultValue={dayjs(ngayHomNay(), "DD/MM/YYYY")}
                format={["DD/MM/YYYY"]}
              />
            </div>
          </div>
          {/* Ca lam viec */}
          {lichTuyenDung.map((lich: any, indexSL: any) => (
            <div key={indexSL}>
              <div className="flex items-center justify-between ">
                <div className=" flex text-sm font-semibold mt-6 pr-3">
                  <img className="mx-5 " src="/images/cham.svg" alt="cham" /> Ca{" "}
                  {indexSL + 1}:
                </div>
                <div className="mt-6 flex items-center">
                  <label className="text-sm font-semibold ">Từ:</label>
                  <TimePicker
                    onChange={(e: any) => {
                      lichTuyenDung[indexSL].ca_fist = convertTimeHM(e);
                      setLichTuyenDung([...lichTuyenDung]);
                    }}
                    // value={lich.ca_fist}
                    className="w-48 ml-3"
                    defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                  />
                </div>
                <div className="mt-6 flex">
                  <label className="text-sm font-semibold ml-3">Đến:</label>
                  <TimePicker
                    onChange={(e: any) => {
                      lichTuyenDung[indexSL].ca_last = convertTimeHM(e);
                      setLichTuyenDung([...lichTuyenDung]);
                    }}
                    // value={lich.ca_last}
                    className="w-48 ml-3"
                    defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                  />
                  {indexSL !== 0 && (
                    <div
                      className="cursor-pointer"
                      onClick={() => handleDeleteCa(indexSL)}
                    >
                      <img
                        className="mt-1 ml-3"
                        src="/images/delete-xam.svg"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-7 mt-4">
                {dayOfTheWeek.map((thu, index) => (
                  <button
                    onClick={() => themNgayVaoCaLam(thu.value, indexSL)}
                    key={index}
                    className={`${
                      lichTuyenDung[indexSL]?.day.includes(thu.value)
                        ? `bg-yellow-400`
                        : `bg-slate-200`
                    } mb-2 cursor-pointer w-4/5 text-center`}
                  >
                    {thu.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-3">
            <button
              onClick={() => {
                lichTuyenDung.push({ day: [], ca_fist: "", ca_last: "" });
                setLichTuyenDung([...lichTuyenDung]);
              }}
              className={styles.btn_add}
            >
              <img className="mr-2" src="/images/sum-black.svg" alt="sum" />{" "}
              Thêm ca làm việc
            </button>
          </div>
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Tên liên hệ:{" "}
          <Input
            value={duLieuMoi.name_lh}
            name="name_lh"
            onChange={(e) => handleDuLieuMoi(e)}
            style={{ width: 500, marginLeft: "20px" }}
            placeholder="Tên liên hệ"
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Số điện thoại liên hệ:{" "}
          <Input
            value={duLieuMoi.phone_lh}
            name="phone_lh"
            type="number"
            onChange={(e) => handleDuLieuMoi(e)}
            style={{ width: 500, marginLeft: "20px" }}
            placeholder="Số điện thoại liên hệ"
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Địa chỉ liên hệ:{" "}
          <Input
            value={duLieuMoi.address_lh}
            name="address_lh"
            onChange={(e) => handleDuLieuMoi(e)}
            style={{ width: 500, marginLeft: "20px" }}
            placeholder="Địa chỉ liên hệ"
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Email liên hệ:{" "}
          <Input
            value={duLieuMoi.email_lh}
            name="email_lh"
            onChange={(e) => handleDuLieuMoi(e)}
            style={{ width: 500, marginLeft: "20px" }}
            placeholder="Email liên hệ"
          />
        </div>
        <div className="flex items-center my-6 justify-center w-2/3">
          <div
            onClick={handleGuiData}
            className={btnStyles.btn_update + " mr-5"}
          >
            {" "}
            {dataEdit ? `Cập nhập` : `Thêm mới`}
          </div>
          <div className={btnStyles.btn_redo}> Làm lại</div>
          {dataEdit && (
            <button
              className={`border border-slate-600 px-3 py-1 bg-red-500 ml-5 rounded-md text-white hover:bg-yellow-500`}
              onClick={() => setShowEdit(false)}
            >
              Hủy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin_TTD_TM;
