import styles from "@/Css/ntdProfile.module.css";
import btnStyles from "@/Css/button.module.css";
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { cityOption, districtOption } from "@/utils/vi_tri";
import { axiosSauDN, privateAxiosUpload } from "@/utils/axios.config";
import { notifySuccess, notifyWarning } from "@/utils/generalFunction";
import { ToastContainer } from "react-toastify";

function NtdUpdateProfile() {
  const [codeCity, setCodeCity] = useState(0);
  const [duLieuNTD, setDuLieuNTD] = useState<any>({});
  const [newAvatar, setNewAvatar] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  useEffect(() => {
    axiosSauDN
      .post("/manageAccountCompany/getInfoCompany")
      .then((res) => {
        setCodeCity(res.data.data.data.city);
        setDuLieuNTD(res.data.data.data);
        setNewAvatar(res.data.data.data.linkAvatar);
      })
      .catch((err) => console.log("UpdateProfileNTD", err));
  }, []);
  const handleChangeInput = (e: any) => {
    setDuLieuNTD({ ...duLieuNTD, [e.target.name]: e.target.value });
  };
  const handleChangePhoto = (e: any) => {
    setAvatar(e.target.files[0]);
    setNewAvatar(URL.createObjectURL(e.target.files[0]));
  };
  const handleUpdateInfor = () => {
   
    if (newAvatar != duLieuNTD.linkAvatar) {
      handleUpdateAvatar();
    }
    if (
      !duLieuNTD.userName ||
      !duLieuNTD.com_size ||
      !duLieuNTD.phone ||
      !duLieuNTD.city ||
      duLieuNTD.district < 66 ||
      !duLieuNTD.address ||
      !duLieuNTD.description ||
      !duLieuNTD.usc_name ||
      !duLieuNTD.usc_name_phone ||
      !duLieuNTD.usc_name_add ||
      !duLieuNTD.usc_name_email
    ) {
      notifyWarning("Vui lòng nhập đầy đủ thông tin!");
    } else {
      axiosSauDN
        .post("/manageAccountCompany/updateInfoCompany", duLieuNTD)
        .then((res) => notifySuccess("Cập nhập thông tin thành công !"))
        .catch((err) => console.log("UpdateProfileNTD", err));
    }
  };
  const handleUpdateAvatar = () => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    privateAxiosUpload
      .post("/manageAccountCompany/updateAvatarCompany", formData)
      .then((res) => notifySuccess("Thay đổi avatar thành công !"))
      .catch((err) => console.log("ChangeAvatar", err));
  };
  return (
    <div className={styles.ntd_update_profile}>
      <div className={styles.title}> Thông tin tài khoản</div>
      <div className={styles.update_tttk}>
        <div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              <span className="text-red-500">*</span>Email đăng nhập
            </label>
            <Input
              value={duLieuNTD?.email ? duLieuNTD?.email : duLieuNTD?.phoneTK}
              placeholder="Email đăng nhập"
              type="email"
              disabled
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              <span className="text-red-500">*</span>Mật khẩu
            </label>
            <Input placeholder="********" type="password" disabled />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <label htmlFor="updateAvatar">
            <div className="flex flex-col items-center text-sm font-semibold">
              <img
                className="mb-3 w-28 h-28 rounded-full"
                src={newAvatar ? newAvatar : "/images/no-avartar1.png"}
                alt=""
              />{" "}
              Cập nhập ảnh đại diện{" "}
            </div>
          </label>
          <input
            onChange={(e) => handleChangePhoto(e)}
            className="hidden"
            type="file"
            id="updateAvatar"
          />
        </div>
      </div>
      <div className={styles.update_ttct}>
        <div className={styles.title}> Thông tin công ty</div>
        <div className={styles.box_ttct_input}>
          {" "}
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Tên công ty (<span className="text-red-500">*</span>)
            </label>
            <Input
              value={duLieuNTD?.userName}
              className={styles.update_input}
              placeholder="Tên công ty"
              type="text"
              name="userName"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Quy mô công ty (<span className="text-red-500">*</span>)
            </label>
            <Input
              className={styles.update_input}
              value={duLieuNTD?.com_size}
              placeholder="Quy mô công ty"
              type="text"
              name="com_size"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Điện thoại cố định (<span className="text-red-500">*</span>)
            </label>
            <Input
              value={duLieuNTD?.phone}
              className={styles.update_input}
              placeholder="Điện thoại cố định"
              type="number"
              name="phone"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Tỉnh / thành phố (<span className="text-red-500">*</span>)
            </label>
            <Select
              className={styles.update_input}
              showSearch
              value={duLieuNTD.city}
              onChange={(e) => {
                setCodeCity(e);
                setDuLieuNTD({ ...duLieuNTD, city: e });
              }}
              placeholder="Chọn Tỉnh/  thành phố"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={cityOption}
            ></Select>
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Quận / Huyện (<span className="text-red-500">*</span>)
            </label>
            <Select
              className={styles.update_input}
              showSearch
              value={duLieuNTD?.district}
              onChange={(e) => setDuLieuNTD({ ...duLieuNTD, district: e })}
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
              options={districtOption
                .filter((e) => e.parent == codeCity)
                .map((district) => ({
                  label: district.label,
                  value: district.value,
                }))}
            ></Select>
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Địa chỉ công ty (<span className="text-red-500">*</span>)
            </label>
            <Input
              className={styles.update_input}
              placeholder="Địa chỉ công ty"
              value={duLieuNTD?.address}
              type="text"
              name="address"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Mã số thuế
            </label>
            <Input
              value={duLieuNTD?.usc_mst}
              className={styles.update_input}
              placeholder="Mã số thuế "
              type="text"
              name="usc_mst"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">Website</label>
            <Input
              className={styles.update_input}
              placeholder="Nhập Website"
              type="text"
              value={duLieuNTD?.usc_website}
              name="usc_website"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="mt-6 hidden lg:block">
            <label className="text-sm font-semibold block mb-2">
              Giới thiệu công ty (<span className="text-red-500">*</span>)
            </label>
            <TextArea
              style={{ width: "200%" }}
              placeholder="Công ty ...."
              rows={6}
              value={duLieuNTD?.description}
              name="description"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
        </div>
        <div className="mt-6 lg:hidden">
          <label className="text-sm font-semibold block mb-2">
            Giới thiệu công ty (<span className="text-red-500">*</span>)
          </label>
          <TextArea
            style={{ width: "200%" }}
            placeholder="Công ty ...."
            rows={6}
            value={duLieuNTD?.description}
          />
        </div>
      </div>
      <div className={styles.update_ttlh}>
        <div className={styles.title}>Thông tin liên hệ</div>
        <div className={styles.box_ttlt_input}>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Người liên hệ (<span className="text-red-500">*</span>)
            </label>
            <Input
              className={styles.update_input}
              placeholder="Người liên hệ"
              type="text"
              value={duLieuNTD?.usc_name}
              name="usc_name"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Số điện thoại liên hệ (<span className="text-red-500">*</span>)
            </label>
            <Input
              className={styles.update_input}
              placeholder="Số điện thoại"
              type="text"
              value={duLieuNTD?.usc_name_phone}
              name="usc_name_phone"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Địa chỉ liên hệ (<span className="text-red-500">*</span>)
            </label>
            <Input
              className={styles.update_input}
              placeholder="Địa chỉ liên hệ"
              type="text"
              value={duLieuNTD?.usc_name_add}
              name="usc_name_add"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm font-semibold block mb-2">
              Email liên hệ (<span className="text-red-500">*</span>)
            </label>
            <Input
              className={styles.update_input}
              placeholder="Email liên hệ"
              type="email"
              value={duLieuNTD?.usc_name_email}
              name="usc_name_email"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
        </div>
        <div className="flex justify-center w-full">
          <button onClick={handleUpdateInfor} className={btnStyles.btn_warning}>
            Cập nhập
          </button>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default NtdUpdateProfile;
