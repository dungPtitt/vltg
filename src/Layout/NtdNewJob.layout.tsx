import styles from "@/Css/ntdProfile.module.css";
import btnStyles from "@/Css/button.module.css";
import { DatePicker, Input, Radio, Select, TimePicker } from "antd";

import {
  literacy,
  schedules,
  job,
  position,
  payrollMethods,
  tagCv,
  dayOfTheWeek,
} from "@/constants/EditProfile.constant";
import { tinh_thanh, quan_huyen } from "@/utils/vi_tri";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import {
  ngayHomNay,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { axiosSauDN, axiosTruocDN } from "@/utils/axios.config";
import { TypeAdminWorkShifts } from "@/Styles/AdminType";
import { ToastContainer } from "react-toastify";
import { error } from "console";
function NtdNewJob({ idEdit, setShowEdit }: any) {
  const [codeCity, setCodeCity] = useState(1);
  const [salaryLevel, setSalaryLevel] = useState(1);
  const [lichTuyenDung, setLichTuyenDung] = useState<TypeAdminWorkShifts[]>([
    { day: [], ca_start_time: "", ca_end_time: "" },
  ]);
  const [tinMoi, setTinMoi] = useState<any>({
    ht_luong: 1,
    tra_luong: 1,
  });
  useEffect(() => {
    if (idEdit) {
      axiosTruocDN
        .post("/viecLam/chiTietViecLamTruocDN", { id_vieclam: idEdit })
        .then((res) => {
          setTinMoi({
            ...res.data.data.data[0],
            luong: res.data.data.data[0].muc_luong,
          });
          setCodeCity(res.data.data.data[0].dia_diem);
          convertWorkShift(res.data.data.data[0].CaLamViec);
        })
        .catch((err) => {
          notifyError("Vui lòng thử lại sau!");
          setShowEdit(false);
        });
    }
  }, [idEdit]);
  const convertWorkShift = (datas: any) => {
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
  const convertDate = (value: any, name: any) => {
    let convert = "";
    const time = new Date(value);
    convert = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    setTinMoi({ ...tinMoi, [name]: convert });
  };
  const handleDeleteCa = (index: number) => {
    lichTuyenDung.splice(index, 1);
    setLichTuyenDung([...lichTuyenDung]);
  };
  const handleTinMoi = (e: any) => {
    setTinMoi({ ...tinMoi, [e.target.name]: e.target.value });
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
  const handleReset = () => {
    setLichTuyenDung([{ day: [], ca_start_time: "", ca_end_time: "" }]);
    setTinMoi({ ht_luong: 1, tra_luong: 1 });
    setSalaryLevel(1);
  };
  const handleDangTin = () => {
    try {
      if (
        !tinMoi.vi_tri ||
        !tinMoi.nganh_nghe ||
        !tinMoi.dia_diem ||
        !tinMoi.quan_huyen ||
        !tinMoi.cap_bac ||
        !tinMoi.hinh_thuc ||
        !tinMoi.so_luong ||
        !tinMoi.hoc_van ||
        !tinMoi.time_td ||
        !tinMoi.mo_ta ||
        !tinMoi.yeu_cau ||
        !tinMoi.gender ||
        !tinMoi.quyen_loi ||
        !tinMoi.ho_so ||
        !tinMoi.name_lh ||
        !tinMoi.address_lh ||
        !tinMoi.phone_lh ||
        !tinMoi.email_lh
      ) {
        notifyWarning("Vui lòng nhập đầy đủ Thông tin việc làm!");
      } else if (
        (tinMoi.ht_luong == 1 && !tinMoi.luong) ||
        (tinMoi.ht_luong == 2 && (!tinMoi.luong_fist || !tinMoi.luong_end))
      ) {
        notifyWarning("Nhập đầy đủ thông tin lương");
      } else {
        for (let i = 0; i < lichTuyenDung.length; i++) {
          if (
            lichTuyenDung[i].day.length == 0 ||
            !lichTuyenDung[i].ca_end_time ||
            !lichTuyenDung[i].ca_start_time
          ) {
            notifyWarning(`Nhập đầy đủ thông tin ca ${i + 1}`);
            return;
          }
        }
        if (!idEdit) {
          axiosSauDN
            .post("/manageAccountCompany/dangTin", {
              ...tinMoi,
              list_ca: [...lichTuyenDung],
            })
            .then((res) => notifySuccess("Đăng tin thành công!"))

            .catch((error) =>
              {
                console.log("error>>>",)
                if (error.response.status == 410) {
                  notifyError("Có thể tiêu đề tin đã bị trùng. Vui lòng thử lại hoặc báo cho Admin!");
                } else if (error.response.status == 400) {
                  notifyError("thoi gian tuyen dun phai lon hon thoi gian hien tai");
                } else {
                  notifyError("Vui lòng nhập đầy đủ thông tin!");
                }
              }
            );
        } else {
          axiosSauDN
            .post("/manageAccountCompany/suaTin", {
              ...tinMoi,
              list_ca: [...lichTuyenDung],
            })
            .then((res) => {
              notifySuccess("Sửa tin thành công!");
              setTimeout(() => {
                setShowEdit(false);
              }, 2000);
            })
            .catch((error) => notifyError(error.data.error));
        }
      }
    } catch (error: any) {
      notifyError(error.data.error);
    }
  };
  {console.log("lichTuyenDung::", lichTuyenDung)}
  return (
    <div className={styles.ntd_new_job}>
      {/* Thông tin việc làm */}
      <div className={styles.ttvl}>
        <div className={styles.title}>Thông Tin Việc Làm</div>
        <div className={styles.box_job_infor}>
          {/* tieu de */}
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Tiêu đề tin đăng
            </label>
            <Input
              value={tinMoi.vi_tri}
              onChange={(e) => handleTinMoi(e)}
              placeholder="VD: Đầu bếp"
              name="vi_tri"
              type="text"
              required
            />
          </div>
          {/* nganh nghe */}
          <div className="mt-6">
            <label className="block text-sm font-semibold">
              <span className="text-red-500">*</span> Ngành nghề
            </label>
            <Select
              value={tinMoi.nganh_nghe && Number(tinMoi.nganh_nghe)}
              onChange={(e: any) => setTinMoi({ ...tinMoi, nganh_nghe: e })}
              style={{ width: "100%" }}
              showSearch
              placeholder="Chọn nghề nghiệp"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLocaleLowerCase()
                  .includes(input.toLocaleLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[...job, ...tagCv]}
            ></Select>
          </div>
          {/* tinh thanh */}
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Tỉnh thành làm việc
            </label>
            <Select
              value={tinMoi.dia_diem}
              style={{ width: "100%" }}
              showSearch
              onChange={(e) => {
                setCodeCity(e);
                setTinMoi({ ...tinMoi, dia_diem: e });
              }}
              placeholder="Chọn Tỉnh thành"
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
          {/* quan huyen */}
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Quận huyện làm việc
            </label>
            <Select
              value={tinMoi.quan_huyen}
              style={{ width: "100%" }}
              showSearch
              onChange={(e) => setTinMoi({ ...tinMoi, quan_huyen: e })}
              placeholder="Chọn nghề nghiệp"
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
          {/* cap bac */}
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Cấp bậc
            </label>
            <Select
              value={tinMoi.cap_bac}
              style={{ width: "100%" }}
              showSearch
              onChange={(e) => setTinMoi({ ...tinMoi, cap_bac: e })}
              placeholder="Chọn nghề nghiệp"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={position}
            ></Select>
          </div>
          {/* hinh thuc */}
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Hình thức làm việc
            </label>
            <Select
              value={tinMoi.hinh_thuc}
              style={{ width: "100%" }}
              showSearch
              onChange={(e) => setTinMoi({ ...tinMoi, hinh_thuc: e })}
              placeholder="Chọn hình thức làm việc"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={schedules}
            ></Select>
          </div>
          {/* thoi gian thu viec */}
          <div className="mt-6">
            <label className="text-sm font-semibold">Thời gian thử việc</label>
            <Input
              value={tinMoi.thoi_gian}
              placeholder="VD: 1 tuần hoặc 1 tháng"
              type="text"
              name="thoi_gian"
              onChange={(e) => handleTinMoi(e)}
            />
          </div>
          {/* muc luong */}
          <div className="mt-2">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Mức lương
            </label>
            <span>
              <button
                onClick={() => {
                  setSalaryLevel(1);
                  setTinMoi({ ...tinMoi, ht_luong: 1 });
                }}
                className={
                  styles.btn_luong +
                  (salaryLevel === 1 ? ` ${styles.active}` : " ")
                }
              >
                {" "}
                Cố định
              </button>
              <button
                onClick={() => {
                  setSalaryLevel(2);
                  setTinMoi({ ...tinMoi, ht_luong: 2 });
                }}
                className={
                  styles.btn_luong +
                  (salaryLevel === 2 ? ` ${styles.active}` : " ")
                }
              >
                {" "}
                Ước lượng
              </button>
            </span>
            {salaryLevel === 1 ? (
              <div className="flex">
                <Input
                  value={idEdit ? tinMoi.muc_luong : tinMoi.luong}
                  className="w-1/2 mr-5"
                  placeholder="VD: 25000"
                  type="number"
                  name="luong"
                  required
                  onChange={(e) => handleTinMoi(e)}
                />
                <Select
                  value={tinMoi.tra_luong}
                  className="w-1/4"
                  options={payrollMethods}
                  onChange={(e) => setTinMoi({ ...tinMoi, tra_luong: e })}
                ></Select>
              </div>
            ) : (
              <div className="flex">
                <Input
                  value={tinMoi.luong_fist}
                  required
                  className="w-1/4 mr-3"
                  placeholder="VD: 15000"
                  type="number"
                  onChange={(e) => handleTinMoi(e)}
                  name="luong_fist"
                />{" "}
                -
                <Input
                  value={tinMoi.luong_end}
                  required
                  className="w-1/4 mx-3"
                  placeholder="VD: 30000"
                  type="number"
                  onChange={(e) => handleTinMoi(e)}
                  name="luong_end"
                />
                <Select
                  value={tinMoi.tra_luong}
                  className="w-1/3"
                  options={payrollMethods}
                  onChange={(e) => setTinMoi({ ...tinMoi, tra_luong: e })}
                ></Select>
              </div>
            )}
          </div>
          {/* hoa hong */}
          <div className="mt-6">
            <label className="text-sm font-semibold">Hoa hồng nếu có</label>
            <Input
              value={tinMoi.hoa_hong}
              placeholder="VD: Từ 12 đến 15%"
              type="text"
              name="hoa_hong"
              onChange={(e) => handleTinMoi(e)}
            />
          </div>
          {/* so luong can tuyen */}
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Số lượng cần tuyển
            </label>
            <Input
              value={tinMoi.so_luong}
              required
              placeholder="VD: 10"
              type="number"
              name="so_luong"
              onChange={(e) => handleTinMoi(e)}
            />
          </div>
          {/* hoc van */}
          <div className="mt-6">
            <label className="block text-sm font-semibold">
              <span className="text-red-500">*</span> Trình độ học vấn
            </label>
            <Select
              value={tinMoi.hoc_van}
              className="w-full"
              placeholder="Chọn trình độ học vấn"
              onChange={(e) => setTinMoi({ ...tinMoi, hoc_van: e })}
              options={literacy}
            />
          </div>
          {/* han td */}
          <div className="mt-6">
            <label className=" block text-sm font-semibold">
              <span className="text-red-500">*</span> Hạn tuyển dụng
            </label>
            <DatePicker
              // value={convertDateDMYcheo(tinMoi.time_td*100) }
              name="time_td"
              onChange={(e) => convertDate(e, "time_td")}
              className="w-full"
              defaultValue={dayjs(ngayHomNay(), "DD/MM/YYYY")}
              format={["DD/MM/YYYY"]}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Nơi làm việc
            </label>
            <Input
              value={tinMoi.address}
              onChange={(e) => handleTinMoi(e)}
              placeholder="VD: Số 1, Nguyễn Trãi, Thanh Xuân, Hà Nội"
              name="address"
              type="text"
              required
            />
          </div>
        </div>
        
      </div>
      {/* Lịch làm việc */}
      <div className={styles.llv}>
        <div className={styles.title}> Lịch làm việc</div>
        <div className="flex items-center justify-between mr-24">
          <div className="text-sm font-semibold mt-6"> Thời gian:</div>
          {/* Từ */}
          <div className="mt-6 flex items-center">
            <label className="text-sm font-semibold">Từ::</label>
            <DatePicker
              // value={convertTimeStamp(tinMoi.fist_time)}
              name="fist_time"
              onChange={(e) => convertDate(e, "fist_time")}
              className="w-48 ml-3"
              defaultValue={dayjs(ngayHomNay(), "DD/MM/YYYY")}
              format={["DD/MM/YYYY"]}
            />
          </div>
          {/* Den */}
          <div className="mt-6">
            <label className="text-sm font-semibold">Đến:</label>
            <DatePicker
              // value={tinMoi.last_time}
              onChange={(e) => convertDate(e, "last_time")}
              name="last_time"
              className="w-48 ml-3"
              defaultValue={dayjs(ngayHomNay(), "DD/MM/YYYY")}
              format={["DD/MM/YYYY"]}
            />
          </div>
        </div>
        {/* Ca lam viec */}
        {lichTuyenDung.map((e: any, indexSL: any) => (
          <div key={indexSL}>
            <div className="flex items-center justify-between mr-24">
              <div className=" flex text-sm font-semibold mt-6">
                <img className="mx-5" src="/images/cham.svg" alt="cham" /> Ca{" "}
                {indexSL + 1}:
              </div>
              <div className="mt-6 flex items-center">
                <label className="text-sm font-semibold">Từ:</label>
                <TimePicker
                  onChange={(e: any) => {
                    lichTuyenDung[indexSL].ca_start_time = new Date(e).toString();
                    setLichTuyenDung([...lichTuyenDung]);
                  }}
                  className="w-48 ml-3"
                  value={dayjs(`${lichTuyenDung[indexSL].ca_start_time}:00`, "HH:mm:ss")}
                  defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                />
              </div>
              <div className="mt-6 flex">
                <label className="text-sm font-semibold">Đến:</label>
                <TimePicker
                  onChange={(e: any) => {
                    lichTuyenDung[indexSL].ca_end_time = new Date(e).toString();
                    setLichTuyenDung([...lichTuyenDung]);
                  }}
                  className="w-48 ml-3"
                  value={dayjs(`${lichTuyenDung[indexSL].ca_end_time}:00`, "HH:mm:ss")}
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
              lichTuyenDung.push({ day: [], ca_start_time: "", ca_end_time: "" });
              setLichTuyenDung([...lichTuyenDung]);
            }}
            className={styles.btn_add}
          >
            <img className="mr-2" src="/images/sum-black.svg" alt="sum" /> Thêm
            ca làm việc
          </button>
        </div>
      </div>
      {/* Mô tả công việc */}
      <div>
        <div className={styles.title}> Mô tả công việc</div>
        <div className="mt-6">
          <label className=" block text-sm font-semibold">
            <span className="text-red-500">*</span> Mô tả công việc
          </label>
          <TextArea
            value={tinMoi.mo_ta}
            required
            placeholder="Mô tả công việc"
            rows={8}
            name="mo_ta"
            onChange={(e) => handleTinMoi(e)}
          />
        </div>
      </div>
      {/* Yêu cầu công việc */}
      <div>
        <div className="mt-3">
          <div className={styles.title}> Yêu cầu công việc</div>
          <div className="mt-6">
            <label className=" block text-sm font-semibold">
              <span className="text-red-500">*</span> Giới tính
            </label>
            <Radio.Group onChange={(e) => handleTinMoi(e)} name="gender">
              <Radio value={1}>Nam</Radio>
              <Radio value={2}>Nữ</Radio>
              <Radio value={3}>Không yêu cầu</Radio>
            </Radio.Group>
          </div>
          <div className="mt-6">
            <label className=" block text-sm font-semibold">
              <span className="text-red-500">*</span> Yêu cầu công việc
            </label>
            <TextArea
              value={tinMoi.yeu_cau}
              required
              placeholder="Yêu cầu công việc"
              rows={8}
              name="yeu_cau"
              onChange={(e) => handleTinMoi(e)}
            />
          </div>
        </div>
      </div>
      {/* Quyền lợi được hưởng */}
      <div className="mt-3">
        <div className={styles.title}> Quyền lợi được hưởng</div>
        <div className="mt-6">
          <label className=" block text-sm font-semibold">
            <span className="text-red-500">*</span> Quyền lợi được hưởng
          </label>
          <TextArea
            value={tinMoi.quyen_loi}
            required
            placeholder="Quyền lợi được hưởng"
            rows={8}
            name="quyen_loi"
            onChange={(e) => handleTinMoi(e)}
          />
        </div>
      </div>
      {/* Hồ sơ bao gồm */}
      <div className="mt-3">
        <div className={styles.title}> Hồ sơ</div>
        <div className="mt-6">
          <label className=" block text-sm font-semibold">
            <span className="text-red-500">*</span> Hồ sơ
          </label>
          <TextArea
            value={tinMoi.ho_so}
            required
            placeholder="Hồ sơ bao gồm"
            rows={8}
            name="ho_so"
            onChange={(e) => handleTinMoi(e)}
          />
        </div>
      </div>
      <div className="mt-3">
        <div className={styles.title}> Thông tin liên hệ</div>

        <div className="grid-cols-2 gap-x-4 md:grid ">
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Tên người liên hệ
            </label>
            <Input
              value={tinMoi.name_lh}
              required
              placeholder="Tên Người Liên Hệ"
              type="text"
              name="name_lh"
              onChange={(e) => handleTinMoi(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Địa chỉ liên hệ
            </label>
            <Input
              value={tinMoi.address_lh}
              required
              placeholder="Địa chỉ liên hệ"
              type="text"
              name="address_lh"
              onChange={(e) => handleTinMoi(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Số điện thoại liên hệ
            </label>
            <Input
              value={tinMoi.phone_lh}
              required
              placeholder="VD: 0386796898"
              type="number"
              name="phone_lh"
              onChange={(e) => handleTinMoi(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span> Email liên hệ
            </label>
            <Input
              value={tinMoi.email_lh}
              required
              placeholder="VD: dinhmanh123@gmail.com"
              type="email"
              name="email_lh"
              onChange={(e) => handleTinMoi(e)}
            />
          </div>
        </div>
      </div>
      <div className={styles.box_btn}>
        {idEdit ? (
          <div>
            <button
              onClick={handleDangTin}
              className={btnStyles.btn_primary + " w-40"}
            >
              Cập nhập{" "}
            </button>
            <button
              onClick={() => setShowEdit(false)}
              className={
                btnStyles.btn_outline_primary + " hover:bg-red-500 ml-5 w-40"
              }
            >
              {" "}
              Hủy cập nhập
            </button>
          </div>
        ) : (
          <button
            onClick={handleDangTin}
            className={btnStyles.btn_primary + " w-40"}
          >
            Đăng tin{" "}
          </button>
        )}

        <button
          onClick={handleReset}
          className={btnStyles.btn_outline_primary + " w-40"}
        >
          Nhập lại
        </button>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default NtdNewJob;
