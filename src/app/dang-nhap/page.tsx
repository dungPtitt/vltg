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

function LoginEmployerPage() {
  const router = useRouter();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
    type: 1,
  });
  const handleLogin = () => {
    if (!dataLogin.email) {
      toast.warning("Nhập Tài Khoản!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (!dataLogin.password) {
      toast.warning("Nhập Mật Khẩu!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      axiosTruocDN
        .post("/manageAccountCompany/login", dataLogin)
        .then((res) => {
          let user_type = res?.data?.data?.data?.type;
          Cookies.set("accessToken", res?.data?.data?.data?.access_token);
          Cookies.set("UT", user_type);
          localStorage.setItem(
            "accessToken",
            JSON.stringify(res?.data?.data?.data?.access_token)
          );
          console.log("res::", res);
          console.log("user_type", user_type);
          if (res?.data?.data?.data?.type == 1) {
            router.push("/ntd");
          } else {
            router.push("/ung-vien");
          }
        })
        .catch((err) =>
        {
          console.log("err::", err)
          toast.error("Thông tin tài khoản hoặc mật khẩu không chính xác!", {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
        );
    }
  };
  const handleDataLogin = (e: any) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
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
        <div className={styles.txt_mb}>Đăng nhập tài khoản ứng viên</div>
        {/* <div className={styles.box_btn_download}>
          <button className={styles.btn_download}>
            {" "}
            <Image
              height={100}
              width={100}
              src="https://vieclamtheogio.timviec365.vn/images/playstore.png"
              alt=""
            />
            Download for Android
          </button>
          <button className={styles.btn_download}>
            {" "}
            <Image
              height={100}
              width={100}
              src="https://vieclamtheogio.timviec365.vn/images/appstore.png"
              alt=""
            />
            Download for IOS
          </button>
        </div> */}
      </div>
      <div className={styles.right}>
        <div className={styles.logo}>
          {" "}
          <Image alt="/" height={100} width={100} src="/images/logo.png" />
        </div>
        <div className={styles.box_login}>
          <p className={styles.title}>VIỆC LÀM THEO GIỜ</p>
          
          <div className="mt-5" style={{width: "600px", marginBottom: "10px"}}>
            <label className="flex justify-between" style={{marginBottom: "6px"}}>
              <p className="text-sm font-semibold">
                <span className="text-red-500">*</span>Email
              </p>{" "}
            </label>
            <Input
              value={dataLogin.email}
              // className={styles.input_password}
              onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })}
              placeholder="Email"
            />
          </div>
          <div className="mt-5" style={{width: "600px", marginBottom: "20px"}}>
            <label className=" flex justify-between" style={{marginBottom: "6px"}}>
              <p className="text-sm font-semibold">
                <span className="text-red-500">*</span>Mật khẩu
              </p>{" "}
            </label>
            <Input.Password
              value={dataLogin.password}
              className={styles.input_password}
              onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })}
              placeholder="Mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
        </div>
        <button onClick={handleLogin} className={styles.btn_login} style={{ width: "600px", marginBottom: "20px" }}>
          Đăng nhập
        </button>
        <div className="mt-4">
          <p className="text-blue-500 text-base">
            <Link
              href="/quen-mat-khau"
              className="text-blue-600"
            >
              Quên mật khẩu ?
            </Link>
          </p>
          <p>
            Bạn chưa có tài khoản?{" "}
            {/* <span className="text-blue-600">ĐĂNG KÝ NGAY</span> */}
            <Link
              href="/dang-ky"
              className="text-blue-600"
            >
              ĐĂNG KÝ NGAY
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer autoClose={2000} />;
    </div>
  );
}

export default LoginEmployerPage;
