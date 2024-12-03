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

function RegisterEmployerPage() {
  const rouer = useRouter();
  const [dataRegister, setDataRegister] = useState({
    userName: "",
    email: "",
    password: "",
    repassword: "",
    type: 1,
  });
  const handleRegister = () => {
    if (!dataRegister.email) {
      toast.warning("Nhập Tài Khoản!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (!dataRegister.password) {
      toast.warning("Nhập Mật Khẩu!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else if (!dataRegister.userName) {
      toast.warning("Nhập Họ và tên!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else if (!dataRegister.repassword) {
      toast.warning("Nhập lại Mật Khẩu!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else if (dataRegister.repassword !== dataRegister.password) {
      toast.warning("Mật khẩu nhập lại chưa chính xác", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      console.log("dataRegister", dataRegister);
      axiosTruocDN
        .post("/manageAccountCompany/register", dataRegister)
        .then((res) => {
          toast.success("Đăng ký thành công", {
            position: toast.POSITION.TOP_RIGHT,
            onClose: () => rouer.push('/dang-nhap') // Replace '/login' with your login route
          });
        })
        .catch((err) =>{
          // console.log("err::", err);
          let errorCode = err?.response?.data?.code;
          if (errorCode === 400) {
            toast.error("Vui lòng nhập đủ thông tin các trường!", { position: toast.POSITION.TOP_RIGHT, });
          } else if (errorCode === 401) {
            toast.error("Email đã được sử dụng!", { position: toast.POSITION.TOP_RIGHT, });
          } else {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau !", { position: toast.POSITION.TOP_RIGHT, });
          }
        });
    }
  };
  const handleDataRegister = (e: any) => {
    setDataRegister({ ...dataRegister, [e.target.name]: e.target.value });
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
        <div className={styles.txt_mb}>Đăng ký tài khoản người tuyển dụng</div>
      </div>
      <div className={styles.right}>
        <div className={styles.logo}>
          {" "}
          <Image alt="/" height={100} width={100} src="/images/logo.png" />
        </div>
        <div className={styles.box_login}>
          <p className={styles.title}>ĐĂNG KÝ TÀI KHOẢN NGƯỜI TUYỂN DỤNG</p>
          <div style={{ width: "600px" }}>
            <label className="flex justify-between" style={{marginBottom: "6px"}}>
              <p className="text-sm font-semibold">
                <span className="text-red-500">*</span>Tên công ty
              </p>{" "}
            </label>
            <div className={styles.login_inp}>
              <Image
                alt="/"
                height={20}
                width={20}
                src="/images/ico-user.svg"
              />
              <Input
                value={dataRegister.userName}
                onChange={(e) => setDataRegister({ ...dataRegister, userName: e.target.value })}
                bordered={false}
                placeholder="Tên công ty"
              />
            </div>
          </div>
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
                value={dataRegister.email}
                onChange={(e) => setDataRegister({ ...dataRegister, email: e.target.value })}
                bordered={false}
                placeholder="Email"
              />
            </div>
          </div>
          <div style={{ width: "600px" }}>
            <label className="flex justify-between" style={{marginBottom: "6px"}}>
              <p className="text-sm font-semibold">
                <span className="text-red-500">*</span>Mật khẩu
              </p>{" "}
            </label>
            <div className={styles.login_inp}>
              <Image
                alt="/"
                height={20}
                width={20}
                src="/images/lock.svg"
              />
              <Input.Password
                value={dataRegister.password}
                bordered={false}
                style={{border: "none"}}
                
                className={styles.input_password}
                onChange={(e) => setDataRegister({ ...dataRegister, password: e.target.value })}
                placeholder="Nhập mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone
                  /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </div>
          <div style={{ width: "600px" }}>
            <label className="flex justify-between" style={{marginBottom: "6px"}}>
              <p className="text-sm font-semibold">
                <span className="text-red-500">*</span>Xác nhận mật khẩu
              </p>{" "}
            </label>
            <div className={styles.login_inp}>
              <Image
                alt="/"
                height={20}
                width={20}
                src="/images/lock.svg"
              />
              <Input.Password
                value={dataRegister.repassword}
                bordered={false}
                style={{border: "none"}}
                
                className={styles.input_password}
                onChange={(e) => setDataRegister({ ...dataRegister, repassword: e.target.value })}
                placeholder="Nhập lại mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone
                  /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </div>
        </div>
        <button onClick={handleRegister} className={styles.btn_login}>
          Đăng ký
        </button>
        <div className="mt-4 ">
          {/* <p className="text-blue-500 text-base">Quên mật khẩu ?</p> */}
          <p>
            Bạn đã có tài khoản?{" "}
            <Link
              href="/dang-nhap"
              className="text-blue-600"
            >
              ĐĂNG NHẬP NGAY
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer autoClose={2000} />;
    </div>
  );
}

export default RegisterEmployerPage;
