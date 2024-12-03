"use client";
import styles from "@/Css/login.module.css";
import { axiosTruocDN } from "@/utils/axios.config";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import Link from "next/link";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";


function ForgotPasswordPage() {
  const rouer = useRouter();
  const [dataForgotPassword, setDataForgotPassword] = useState({
    email: "",
  });
  const handleForgotPassword = () => {
    if (!dataForgotPassword.email) {
      toast.warning("Nhập email đã đăng ký tài Khoản!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      console.log("dataForgotPassword", dataForgotPassword);
      axiosTruocDN
        .post("/manageAccountCompany/forgotPassword", dataForgotPassword)
        .then((res) => {
          toast.success("Reset mật khẩu thành công", {
            position: toast.POSITION.TOP_RIGHT,
            onClose: () => rouer.push('/dang-nhap') // Replace '/login' with your login route
          });
        })
        .catch((err) =>
        {
          if (err.response.data.code === 401) {
            toast.error("Email not exists", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.error("Vui lòng thử lại sau !", {
              position: toast.POSITION.TOP_RIGHT,
            })
            
          }
        }
        );
    }
  };
  const handleDataRegister = (e: any) => {
    setDataForgotPassword({ ...dataForgotPassword, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.left}>
        <div className={styles.img_logo}>
          <Image alt="/" height={100} width={100} src="/images/logo.svg" />
        </div>
        <div className={styles.txt}>
          Tìm việc làm theo giờ hiệu quả về di động của bạn và sẵn sàng nhận
          việc ngay hôm nay!
        </div>
        <div className={styles.txt_mb}>Đăng ký tài khoản ứng viên</div>
      </div>
      <div className={styles.right}>
        <div className={styles.logo}>
          {" "}
          <Image alt="/" height={100} width={100} src="/images/logo.png" />
        </div>
        <div className={styles.box_login}>
          <p className={styles.title}>Quên mật khẩu</p>
          <div style={{ width: "600px" }}>
            <label className="flex justify-between" style={{marginBottom: "6px"}}>
              <p className="text-sm font-semibold">
                <span className="text-red-500">*</span>Email
              </p>{" "}
            </label>
            <div className={styles.login_inp}>
              <Image
                alt="/"
                height={20}
                width={20}
                src="/images/email.svg"
              />
              <Input
                value={dataForgotPassword.email}
                onChange={(e) => setDataForgotPassword({ ...dataForgotPassword, email: e.target.value })}
                bordered={false}
                placeholder="Email"
              />
            </div>
          </div>
        <div style={{ width: "600px", marginBottom: "20px", display: "flex" }}>Thông tin mật khẩu mới sẽ được gửi về email của bạn</div>

        </div>
        <button onClick={handleForgotPassword} className={styles.btn_login}>
          Tạo lại mật khẩu
        </button>
        <div className={styles.link_bottom}>
          <div>
            <Link
              href="/dang-nhap"
              className="text-blue-600"
            >
              Quay lại đăng nhập
            </Link>
          </div>
          <div>
            <Link
              href="/dang-ky"
              className="text-blue-600"
            >
              Đăng ký tài khoản mới
            </Link>
            
          </div>
        </div>
        {/* <div className="mt-4 ">
          <p className="text-blue-500 text-base">Quên mật khẩu ?</p>
          <p>
            Bạn đã có tài khoản?{" "}
            <Link
              href="/dang-nhap"
              className="text-blue-600"
            >
              ĐĂNG NHẬP NGAY
            </Link>
          </p>
        </div> */}
      </div>
      <ToastContainer autoClose={2000} />;
    </div>
  );
}

export default ForgotPasswordPage;
