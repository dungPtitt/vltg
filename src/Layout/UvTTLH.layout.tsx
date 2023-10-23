import styles from "@/Css/uvProfile.module.css";
import { useEffect, useState } from "react";
import { DatePicker, Input, Select } from "antd";
import { tinh_thanh, quan_huyen } from "@/utils/vi_tri";
import { axiosSauDN, privateAxiosUpload } from "@/utils/axios.config";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import {
  convertDateDMY,
  convertDateYMD,
  convertTimeStamp,
  convertTimestampToDatePicker,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import dayjs from "dayjs";
import Loading from "@/Components/Loading";

function UvTTLH() {
  const [codeCity, setCodeCity] = useState<string | number>("");
  const [showEdit, setShowEdit] = useState(false);
  const [showBtnEdit, setShowBtnEdit] = useState(false);
  const [duLieuNguoiDung, setDuLieuNguoiDung] = useState<any>();
  const [duLieuMoi, setDuLieuMoi] = useState<any>();
  const [newAvatar, setNewAvatar] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCandidate/getInfoCandidate")
        .then((res) => {
          setDuLieuNguoiDung({ ...res.data.data.data });
          setDuLieuMoi({ ...res.data.data.data });
          setCodeCity(res.data.data.data.city);
          setNewAvatar(res.data.data.data.linkAvatar);
        });
    } catch (error) {
      console.log("UvTTLH", error);
    }
  }, []);
  const handleEditInfor = (e: any) => {
    setDuLieuMoi({ ...duLieuMoi, [e.target.name]: e.target.value });
  };
  const handleUpDateInfor = () => {
    if (newAvatar != duLieuNguoiDung.linkAvatar) {
      handleUpdateAvatar();
    }
    if (
      !duLieuMoi.userName ||
      !duLieuMoi.phone ||
      !duLieuMoi.email ||
      !duLieuMoi.address
    ) {
      notifyWarning("Vui lòng nhập đủ thông tin!");
    } else {
      axiosSauDN
        .post("/manageAccountCandidate/updateInfoCandidate", duLieuMoi)
        .then((res) => notifySuccess("Cập nhập thông tin thành công!!"))
        .catch((err) => console.log("UvTTLH",err));
    }
  };
  const handleChangPhoto = (e: any) => {
    setAvatar(e.target.files[0]);
    setNewAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdateAvatar = () => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    privateAxiosUpload
      .post("/manageAccountCandidate/updateAvatarCandidate", formData)
      .then((res) => notifySuccess("Thay đổi avatar thành công !"))
      .catch((err) => console.log("ChangeAvatar", err));
  };


  if (!duLieuNguoiDung) {
    return <Loading />;
  }
  return (
    <div className={styles.uv_ttlh}>
      {showEdit ? (
        <div className={styles.edit_TTLH}>
          <div className={styles.edit_block1}>
            <div>
              <div className="mt-5">
                <label className=" flex justify-between">
                  <p className="text-sm font-semibold">
                    <span className="text-red-500">*</span> Họ và tên
                  </p>{" "}
                  <p>
                    Thông tin bắt buộc <span className="text-red-500">(*)</span>
                  </p>
                </label>
                <Input
                  value={duLieuMoi.userName}
                  style={{ width: "100%" }}
                  placeholder="Nhập họ và tên"
                  type="text"
                  name="useName"
                  onChange={(e) => handleEditInfor(e)}
                />
              </div>
              <div className="mt-6">
                <label className="text-sm font-semibold">
                  <span className="text-red-500">*</span> Địa chỉ Email
                </label>
                <Input
                  placeholder="Nhập Email"
                  type="email"
                  name="email"
                  value={duLieuMoi.email}
                  onChange={(e) => handleEditInfor(e)}
                />
              </div>
              <div className="mt-6">
                <label className="text-sm font-semibold">
                  <span className="text-red-500">*</span> Số điện thoại
                </label>
                <Input
                  placeholder="Nhập số điện thoại"
                  type="number"
                  value={duLieuMoi.phone}
                  onChange={(e) => handleEditInfor(e)}
                  name="phone"
                />
              </div>
            </div>
            <div>
              <label htmlFor="choiceAvatar">
                <div className="w-28 h-28 rounded-full lg:w-56 lg:h-56">
                  <img
                    className="w-full h-full rounded-full  object-cover"
                    src={
                      newAvatar
                        ? newAvatar
                        : duLieuNguoiDung.linkAvatar
                        ? duLieuNguoiDung.linkAvatar
                        : "/images/no-avartar1.png"
                    }
                    alt="Tải ảnh lên"
                  />
                </div>
              </label>
              <input
                onChange={(e) => handleChangPhoto(e)}
                className="hidden"
                id="choiceAvatar"
                type="file"
              />
              <div>Tải ảnh lên</div>
            </div>
          </div>
          <div className={styles.edit_block2}>
            <div className="mt-6">
              <label className="text-sm font-semibold block">
                <span className="text-red-500">*</span> Ngày sinh
              </label>
              <DatePicker
                className="w-full"
                defaultValue={dayjs(
                  convertTimestampToDatePicker(duLieuMoi.birthday),
                  "DD/MM/YYYY"
                )}
                format={"DD/MM/YYYY"}
                onChange={(e) =>
                  setDuLieuMoi({ ...duLieuMoi, birthday: convertDateYMD(e) })
                }
                name="birthday"
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold block">
                <span className="text-red-500">*</span> Tình trạng hôn nhân
              </label>
              <Select
                value={duLieuMoi.married}
                style={{ width: "100%" }}
                onChange={(e) => setDuLieuMoi({ ...duLieuMoi, married: e })}
                options={[
                  { value: 0, label: "Độc thân" },
                  { value: 1, label: "Đã kết hôn" },
                ]}
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold block">
                <span className="text-red-500">*</span> Tỉnh/ thành phố
              </label>
              <Select
                value={duLieuMoi.city}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setCodeCity(e);
                  setDuLieuMoi({ ...duLieuMoi, city: e });
                }}
                options={tinh_thanh.map((city) => ({
                  value: city.cit_id,
                  label: city.cit_name,
                }))}
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold block ">
                <span className="text-red-500">*</span> Quận huyện
              </label>
              <Select
                className="w-auto"
                value={duLieuMoi.district}
                style={{ width: "100%" }}
                onChange={(e) => setDuLieuMoi({ ...duLieuMoi, district: e })}
                options={quan_huyen
                  .filter((district) => district.cit_parent == codeCity)
                  .map((city) => ({
                    value: city.cit_id,
                    label: city.cit_name,
                  }))}
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold">
                <span className="text-red-500">*</span> Địa chỉ
              </label>
              <Input
                placeholder="Nhập địa chỉ"
                type="text"
                name="address"
                value={duLieuMoi.address}
                onChange={(e) => handleEditInfor(e)}
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold block">
                <span className="text-red-500">*</span> Giới tính
              </label>
              <Select
                value={duLieuMoi.gender}
                style={{ width: "100%" }}
                onChange={(e) => setDuLieuMoi({ ...duLieuMoi, gender: e })}
                options={[
                  { value: 0, label: "Nam" },
                  { value: 1, label: "Nữ" },
                  { value: 2, label: "Khác" },
                ]}
              />
            </div>
          </div>
          <div className={styles.box_btn}>
            <button
              onClick={handleUpDateInfor}
              className={styles.btn_outline_primary + " w-40"}
            >
              Lưu{" "}
            </button>
            <button
              onClick={() => setShowEdit(false)}
              className={styles.btn_outline_primary + " w-40"}
            >
              Không lưu{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full lg:flex">
          <div className={styles.ttlh_lf}>
            <button
              onClick={() => setShowEdit(true)}
              className={styles.btn_edit + " mb-6 pt-3 flex md:hidden"}
            >
              <img className="mr-2.5 " src="/images/pen.svg" alt="pen" /> Sửa
            </button>
            <Image
              width={200}
              height={200}
              src={
                duLieuNguoiDung.linkAvatar
                  ? duLieuNguoiDung.linkAvatar
                  : "/images/no-avartar1.png"
              }
              alt="avtar"
            />
            <div className="pt-4 hidden md:block">
              {" "}
              {duLieuNguoiDung.userName}{" "}
            </div>
          </div>
          <div className={styles.ttlh_rg}>
            <div className={styles.ttlh_box_items}>
              <p className="font-bold mb-2.5">
                Họ và tên:{" "}
                <span className="font-normal">{duLieuNguoiDung.userName}</span>
              </p>
              <p className="font-bold mb-2.5">
                Số điện thoại:{" "}
                <span className="font-normal">{duLieuNguoiDung.phone}</span>
              </p>
              <p className="font-bold mb-2.5">
                Ngày sinh:
                <span className="font-normal">
                  {duLieuMoi.birthday
                    ? convertDateDMY(duLieuMoi.birthday * 1000)
                    : ""}
                </span>
              </p>
              <p className="font-bold mb-2.5">
                Địa chỉ Email:{" "}
                <span className="font-normal">{duLieuNguoiDung.email}</span>
              </p>
              <p className="font-bold mb-2.5">
                Địa chỉ{" "}
                <span className="font-normal">{duLieuNguoiDung.address}</span>
              </p>
            </div>
            <div className={styles.ttlh_box_items}>
              <p className="font-bold mb-2.5">
                Giới tính:{" "}
                <span className="font-normal">
                  {duLieuNguoiDung.gender == 1 ? "Nam" : "Nữ"}
                </span>
              </p>
              <p className="font-bold mb-2.5">
                Hôn nhân:{" "}
                <span className="font-normal">
                  {duLieuNguoiDung.married == 1 ? "Độc thân" : "Đã kết hôn"}
                </span>
              </p>
              <p className="font-bold mb-2.5">
                Tỉnh thành:{" "}
                <span className="font-normal">
                  {tinh_thanh[duLieuNguoiDung.city].cit_name}
                </span>
              </p>
              <p className="font-bold mb-2.5">
                Quận huyện:{" "}
                <span className="font-normal">
                  {" "}
                  {quan_huyen[duLieuNguoiDung.district - 66]?.cit_name}
                </span>
              </p>
            </div>
            <div className="hidden flex-col items-end  md:block md:flex">
              <div
                onClick={() => setShowBtnEdit(!showBtnEdit)}
                className="rounded-full bg-slate-300 flex w-7 h-7 p-2"
              >
                <img src="/images/3chamngang.svg" alt="" />
              </div>{" "}
              {showBtnEdit && (
                <button
                  onClick={() => setShowEdit(true)}
                  className={styles.btn_edit + " mb-6 pt-3 flex"}
                >
                  <img className="mr-2.5 " src="/images/pen.svg" alt="pen" />{" "}
                  Sửa
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default UvTTLH;
