import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "@/Css/uvProfile.module.css";
import {
  ngayHomNay,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { useState } from "react";
import { axiosSauDN, axiosTruocDN } from "@/utils/axios.config";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

function ChangePassword() {
  const [data, setData] = useState<any>({
    oldpassword: "",
    password: "",
    repassword: "",
  });
  const router = useRouter();
  const handleChangePassword = () => {
    try {
      if (!data["oldpassword"]) {
        return notifyWarning("Nhập mật khẩu hiện tại");
      }
      else if (!data["password"]) {
        return notifyWarning("Nhập mật khẩu mới");
      }
      else if (!data["repassword"]) {
        return notifyWarning("Nhập lại mật khẩu mới");
      }
      else if (data["password"] !== data["repassword"]) {
        return notifyWarning("Mật khẩu nhập lại không chính xác");
      }
      
     
      axiosSauDN
        .post("/manageAccountCompany/changePassword", data)
        .then((res) => {
          console.log("res", res);
          router.push("/dang-nhap");
          notifySuccess("Đổi mật khẩu thành công");
        })
        .catch((error) => {
          console.log("error", error);
          notifyError(error.data.error);
        });
    } catch (error: any) {
      console.log("error", error);
      // notifyError(error);
    }
  console.log("Change Password");
}
  return (
    <div>
      {/* <UvHeader />
      <Supporter /> */}
      <div className={styles.change_password}>
        <div>
          <div className="mt-5 w-full ">
            <label className=" flex justify-between ">
              <p className="text-sm font-semibold ">
                <span className="text-red-500">*</span> Mật khẩu hiện tại
              </p>{" "}
              <p>
                Thông tin bắt buộc <span className="text-red-500">(*)</span>
              </p>
            </label>
            <Input.Password
              className={styles.input_password}
              value={data.oldpassword}
              onChange={(e) => setData({ ...data, oldpassword: e.target.value })}
              placeholder="Mật khẩu hiện tại"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="mt-5 w-full">
            <label className=" flex justify-between w-full">
              <p className="text-sm font-semibold ">
                <span className="text-red-500">*</span> Mật khẩu mới
              </p>{" "}
            </label>
            <Input.Password
              className={styles.input_password}
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Mật khẩu mới"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>{" "}
          <div className="mt-5 w-full">
            <label className=" flex justify-between">
              <p className="text-sm font-semibold">
                <span className="text-red-500">*</span> Xác nhận lại mật khẩu
              </p>{" "}
            </label>
            <Input.Password
              value={data.repassword}
              className={styles.input_password}
              onChange={(e) => setData({ ...data, repassword: e.target.value })}
              placeholder="Xác nhận mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className={styles.box_btn}>
            <button
              className={styles.btn_primary + " w-40"}
              onClick={handleChangePassword}
            >
              Đổi mật khẩu{" "}
            </button>
            <button className={styles.btn_outline_primary + " w-40"}>
              Nhập lại{" "}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default ChangePassword;
