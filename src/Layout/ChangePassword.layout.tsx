import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "@/Css/uvProfile.module.css";
function ChangePassword() {
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
              className={styles.input_password}
              placeholder="Xác nhận mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className={styles.box_btn}>
            <button className={styles.btn_primary + " w-40"}>
              Đổi mật khẩu{" "}
            </button>
            <button className={styles.btn_outline_primary + " w-40"}>
              Nhập lại{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
