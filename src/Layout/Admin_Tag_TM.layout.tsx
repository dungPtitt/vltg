import { useState } from "react";
import { job } from "@/constants/EditProfile.constant";
import { Input, Radio, Select } from "antd";
import btnStyles from "@/Css/button.module.css";
import { ToastContainer } from "react-toastify";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { axiosSauDN } from "@/utils/axios.config";

function Admin_Tag_TM() {
  const [dataNewTag, setDataNewTag] = useState<any>({
    jc_parent: 0,
    jc_name: "",
  });
  const handleCreateTag = () => {
    for (const key in dataNewTag) {
      if (!dataNewTag[key]) {
        notifyWarning("Vui lòng nhập đầy đủ thông tin!");
        return;
      }
    }
    axiosSauDN
      .post("/admin/createTag", dataNewTag)
      .then((res) => notifySuccess("Tạo mới thành công!"))
      .catch(
        (err) => console.log("tao moi tag", err)
        /* notifyError("Vui lòng thử lại sau!") */
      );
  };
  return (
    <div>
      <div className="text-center w-1/2">
        Những ô dấu sao (<span className="text-red-500">*</span>) là bắt buộc
        phải nhập
      </div>
      <div className="flex flex-col w-1/2 items-end">
        <div className="flex items-center mt-3">
          Chọn tag:{" "}
          <Select
            onChange={(e) => setDataNewTag({ ...dataNewTag, jc_parent: e })}
            style={{ width: 500, marginLeft: "20px" }}
            options={job}
          />
        </div>
        <div className="flex items-center mt-3">
          Nhập từ khóa:
          <Input
            onChange={(e) =>
              setDataNewTag({ ...dataNewTag, jc_name: e.target.value })
            }
            style={{ width: 500, marginLeft: "20px" }}
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
            onClick={handleCreateTag}
            className={btnStyles.btn_update + " mr-3"}
          >
            {" "}
            Thêm mới
          </div>
          <div className={btnStyles.btn_redo}> Làm lại</div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Admin_Tag_TM;
