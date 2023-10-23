import { Input, Radio } from "antd";
import btnStyles from "@/Css/button.module.css";

function Admin_NN_TM() {
  return (
    <div>
      <div className="text-center w-1/2">
        Những ô dấu sao (<span className="text-red-500">*</span>) là bắt buộc
        phải nhập
      </div>
      <div className="flex flex-col w-1/2 items-end">
        <div className="flex items-center mt-3">
          <span className="text-red-500 mx-2">*</span> Nhập từ khóa:{" "}
          <Input style={{ width: 500, marginLeft: "20px" }} />
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
          <div className={btnStyles.btn_update + " mr-3"}> Cập nhập</div>
          <div className={btnStyles.btn_redo}> Làm lại</div>
        </div>
      </div>
    </div>
  );
}

export default Admin_NN_TM;
