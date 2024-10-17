"use client";
import Footer from "@/Components/Footer.component";
import Header from "@/Layout/Header.layout";
import btnStyles from "@/Css/button.module.css";
import { useEffect, useState } from "react";
import { axiosSauDN } from "@/utils/axios.config";
import { Checkbox, DatePicker, Input, Select } from "antd";
import {
  timesOfDay,
  gender,
  profession,
  dayOfTheWeek,
} from "@/constants/EditProfile.constant";
import { cityOption, quan_huyen } from "@/utils/vi_tri";
import {
  convertDateYMD,
  convertTimestampToDatePicker,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import Image from "next/image";
import Loading from "@/Components/Loading";
function UpdateInformation() {
  const router = useRouter();
  const [thongTinUV, setThongTinUV] = useState<any>({});
  const [congViecMM, setCongViecMM] = useState<any>({});
  const [codeCity, setCodeCity] = useState<string | number>("");
  const [jobValues, setJobValues] = useState<any>([]);
  const [adressValues, setAdressValues] = useState<any>([]);
  const [buoiLam, setBuoiLam] = useState<any>([]);
  const [accept, setAccept] = useState(false);
  useEffect(() => {
    axiosSauDN
      .post("/manageAccountCandidate/getInfoCandidate")
      .then((res) => {
        setCodeCity(res.data.data.data.city);
        handleDataTTUV(res.data.data.data);
        handleDataCVMM(res.data.data.uvCvmm);
      })
      .catch((err) => console.log("EditTTUV", err));
  }, []);
  const handleDataTTUV = (datas: any) => {
    setThongTinUV(datas);
    setBuoiLam([
      ...datas.uv_day
        .trim()
        .split(",")
        .map((e: any) => Number(e)),
    ]);
  };
  const handleChangeJob = (selected: any) => {
    // Kiểm tra số lượng mục đã chọn và giới hạn nó
    if (selected.length <= 3) {
      setJobValues(selected);
    }
  };
  const handleChangeAddress = (selected: any) => {
    // Kiểm tra số lượng mục đã chọn và giới hạn nó
    if (selected.length <= 3) {
      setAdressValues(selected);
    }
  };
  const handleDataCVMM = (datas: any) => {
    setCongViecMM(datas);
    setAdressValues([
      ...datas.dia_diem
        .trim()
        .split(",")
        .map((e: any) => Number(e)),
    ]);
    setJobValues([
      ...datas.nganh_nghe
        .trim()
        .split(",")
        .map((e: any) => Number(e)),
    ]);
  };
  const handleChooseDay = (value: string) => {
    const indexValue = buoiLam.findIndex((b: any) => b == Number(value));
    if (indexValue == -1) {
      buoiLam.push(Number(value));
      setBuoiLam([...buoiLam.sort((a: number, b: number) => a - b)]);
    } else {
      buoiLam.splice(indexValue, 1);
      setBuoiLam([...buoiLam]);
    }
  };
  const handleUpdateInfor = () => {
    if (!accept) {
      return notifyWarning("Vui lòng đồng ý chính sách của timviec365.vn");
    }
    if (adressValues.length === 0) {
      return notifyWarning("Vui lòng chọn ít nhất 1 địa điểm!");
    }
    if (jobValues.length === 0) {
      return notifyWarning("Vui lòng chọn ít nhất 1ngành nghề!");
    }
    if (buoiLam.length === 0) {
      return notifyWarning("Vui lòng chọn ít nhất 1 buổi có thể đi làm!");
    }
    if (
      !thongTinUV.email ||
      !thongTinUV.gender ||
      !thongTinUV.birthday ||
      !thongTinUV.city ||
      !thongTinUV.district ||
      !congViecMM.cong_viec
    ) {
      return notifyWarning("Vui lòng nhập đầy đủ thông tin!");
    }
    axiosSauDN
      .post("/manageAccountCandidate/updateInfo", {
        ...thongTinUV,
        cong_viec: congViecMM.cong_viec,
        nganh_nghe: jobValues,
        dia_diem: adressValues,
        day: buoiLam,
      })
      .then((res) => {
        notifySuccess("Cập nhập thành công!");
        setTimeout(() => {
          router.push("/ung-vien");
        }, 2000);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  if (!thongTinUV._id) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="hidden lg:block">
          <Image
            height={693}
            width={972}
            src="/images/Frame-1321315411.png"
            alt="photo"
          />
        </div>
        <div className="m-10 w-full lg:w-3/5 ">
          <div className="text-center font-bold text-2xl">
            CẬP NHẬP THÔNG TIN
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold">
              Email<span className="text-red-500">*</span>
            </label>
            <Input
              value={thongTinUV.emailContact}
              onChange={(e) =>
                setThongTinUV({ ...thongTinUV, email: e.target.value })
              }
              placeholder="Nhập Email"
              type="text"
              name="email"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-5">
            <div className="mt-6">
              <label className="text-sm font-semibold block">
                <span className="text-red-500">*</span> Giới tính
              </label>
              <Select
                value={thongTinUV.gender}
                onChange={(e) => setThongTinUV({ ...thongTinUV, gender: e })}
                style={{ width: "100%" }}
                options={gender}
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold block">
                <span className="text-red-500">*</span> Ngày sinh
              </label>
              <DatePicker
                className="w-full"
                placeholder="Ngày sinh"
                value={convertTimestampToDatePicker(thongTinUV.birthday * 1000)}
                format={"DD/MM/YYYY"}
                name="birthday"
                onChange={(e) =>
                  setThongTinUV({ ...thongTinUV, birthday: convertDateYMD(e) })
                }
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold block">
                <span className="text-red-500">*</span> Tỉnh/ thành phố
              </label>
              <Select
                value={thongTinUV.city}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setCodeCity(e);
                  setThongTinUV({ ...thongTinUV, city: e, district: null });
                }}
                options={cityOption}
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold block ">
                <span className="text-red-500">*</span> Quận huyện
              </label>
              <Select
                className="w-auto"
                style={{ width: "100%" }}
                value={thongTinUV.district}
                onChange={(e) => setThongTinUV({ ...thongTinUV, district: e })}
                options={quan_huyen
                  .filter((district) => district.cit_parent == codeCity)
                  .map((dis) => ({
                    value: dis.cit_id,
                    label: dis.cit_name,
                  }))}
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold">
                <span className="text-red-500">*</span> Công việc mong muốn
              </label>
              <Input
                value={congViecMM.cong_viec}
                onChange={(e) =>
                  setCongViecMM({
                    ...congViecMM,
                    cong_viec: e.target.value,
                  })
                }
                placeholder="Nhập công việc mong muốn"
                type="text"
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold">
                <span className="text-red-500">*</span>Địa điểm
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Chọn tối đa 3 doanh mục"
                options={cityOption}
                onChange={handleChangeAddress}
                value={adressValues}
              />
            </div>
          </div>
          <div className="mt-6 wi">
            <label className="text-sm font-semibold">
              <span className="text-red-500">*</span>Ngành nghề mong muốn
            </label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Chọn tối đa 3 doanh mục"
              options={profession}
              onChange={handleChangeJob}
              value={jobValues}
            />
          </div>
          <div className="grid grid-cols-7 mt-5">
            {dayOfTheWeek?.map((ngay, index) => (
              <div key={index}>
                <div className="border w-full py-2 text-center bg-blue-500 text-white">
                  {ngay.label}
                </div>
                {timesOfDay.map((times) => (
                  <div
                    key={times.label}
                    onClick={() => {
                      handleChooseDay(`${ngay.value}${times.value}`);
                    }}
                    className={`${
                      buoiLam.findIndex(
                        (b: any) => b == Number(`${ngay.value}${times.value}`)
                      ) != -1 && `bg-sky-200 text-blue-900`
                    } py-2 cursor-pointer text-center border`}
                  >
                    {times.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center my-5">
            <div className="mb-5">
              <Checkbox
                className="mr-2"
                value={accept}
                onClick={() => setAccept(!accept)}
              />{" "}
              Tôi chấp nhận các{" "}
              <span className="mx-1"> quy định chính sách</span> của
              timviec365.vn
            </div>
            <div>
              <button
                onClick={handleUpdateInfor}
                className={btnStyles.btn_primary}
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default UpdateInformation;
