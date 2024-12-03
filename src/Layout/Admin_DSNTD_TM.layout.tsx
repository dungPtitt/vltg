"use client";
import { Input, Radio, Select } from "antd";
import btnStyles from "@/Css/button.module.css";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { quan_huyen, tinh_thanh } from "@/utils/vi_tri";
import { notifySuccess, notifyWarning } from "@/utils/generalFunction";
import { ToastContainer } from "react-toastify";
import { axiosSauDN } from "@/utils/axios.config";

function Adm_DSNTD_TM({dataEdit, setShowEdit}: any) {
  const [codeCity, setCodeCity] = useState(0);
  const [duLieuMoi, setDuLieuMoi] = useState<any>({
    email: "",
    password: "",
    userName: "",
    phone: 0,
    address: "",
    city: 0,
    district: 0,
  });
  const handleInput = (e: any) => {
    setDuLieuMoi({ ...duLieuMoi, [e.target.name]: e.target.value });
  };
  const handleAvatar = (e: any) => {
    setDuLieuMoi({ ...duLieuMoi, avatar: e.target.files[0] });
  };
  const handleTaoMoiNTD = () => {
    const formData = new FormData();
    for (const key in duLieuMoi) {
      if (!duLieuMoi[key]) {
        notifyWarning(`Vui lòng nhập ${key}`);
        return;
      } else {
        formData.append(key, duLieuMoi[key]);
      }
    }
    axiosSauDN
      .post("/admin/createCompany", formData)
      .then((res) => notifySuccess("Tạo mới NTD thành công!"))
      .catch((err) => console.log("Tạo mới ntd", err));
  };
  return (
    <div className="w-1/2">
      <div className="text-center w-full">
        Những ô dấu sao (<span className="text-red-500">*</span>) là bắt buộc
        phải nhập
      </div>
      <div className="flex flex-col w-full items-end">
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Email công ty:{" "}
          <Input
            name="email"
            onChange={(e) => handleInput(e)}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Mật khẩu công ty:{" "}
          <Input
            name="password"
            onChange={(e) => handleInput(e)}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Tên công ty:{" "}
          <Input
            name="userName"
            onChange={(e) => handleInput(e)}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Số điện thoại:{" "}
          <Input
            name="phone"
            onChange={(e) => handleInput(e)}
            style={{ width: 500, marginLeft: "20px" }}
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Địa chỉ công ty:{" "}
          <TextArea
            name="address"
            onChange={(e) => handleInput(e)}
            style={{ width: 500, marginLeft: "20px" }}
            rows={3}
          />
        </div>
        <div className="flex items-center mt-3">
          Tỉnh thành:{" "}
          <Select
            style={{ width: 500, marginLeft: "20px" }}
            showSearch
            onChange={(e) => {
              setDuLieuMoi({ ...duLieuMoi, city: e });
              setCodeCity(e);
            }}
            placeholder="Tỉnh thành"
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
          Quận huyện:{" "}
          <Select
            style={{ width: 500, marginLeft: "20px" }}
            showSearch
            placeholder="Chọn quận huyện"
            onChange={(e) => setDuLieuMoi({ ...duLieuMoi, district: e })}
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
          <span className="text-red-500 mx-2">*</span> Logo công ty:{" "}
          <Input
            onChange={(e) => handleAvatar(e)}
            style={{ width: 500, marginLeft: "20px" }}
            type="file"
          />
        </div>
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Sau khi lưu dữ liệu:{" "}
          <Radio.Group style={{ width: 500, marginLeft: "20px" }}>
            <Radio value={"new"}>Thêm mới</Radio>
            <Radio value={"back"}>Quay về danh sách</Radio>
            <Radio value={"edit"}>Sửa bản ghi</Radio>
          </Radio.Group>
        </div>
        <div className="flex items-center mt-3">
          <div
            className={btnStyles.btn_update + " mr-3"}
            onClick={handleTaoMoiNTD}
          >
            {" "}
            Cập nhập
          </div>
          <div className={btnStyles.btn_redo}> Làm lại</div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Adm_DSNTD_TM;
