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

function RegisterCandidatePage() {
  const rouer = useRouter();
  const [dataRegister, setDataRegister] = useState({
    userName: "",
    email: "",
    password: "",
    repassword: "",
    type: 0,
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
          // Cookies.set("accessToken", res?.data?.data?.data?.access_token);
          // Cookies.set("UT", "0");
          // localStorage.setItem(
          //   "accessToken",
          //   JSON.stringify(res?.data?.data?.data?.access_token)
          // );
          toast.success("Đăng ký thành công", {
            position: toast.POSITION.TOP_RIGHT,
            onClose: () => rouer.push('/dang-nhap') // Replace '/login' with your login route
          });
        })
        .catch((err) =>
          toast.error("Vui lòng thử lại sau !", {
            position: toast.POSITION.TOP_RIGHT,
          })
        );
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
        <div className={styles.txt_mb}>Đăng ký tài khoản ứng viên</div>
        {/* <div className={styles.box_btn_download}>
          <button className={styles.btn_download}>
            {" "}
            <Image
              height={100}
              width={100}
              src="https://vieclamtheogio.vn/images/playstore.png"
              alt=""
            />
            Download for Android
          </button>
          <button className={styles.btn_download}>
            {" "}
            <Image
              height={100}
              width={100}
              src="https://vieclamtheogio.vn/images/appstore.png"
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
          <p className={styles.title}>ĐĂNG KÝ TÀI KHOẢN ỨNG VIÊN</p>
          <div className={styles.login_inp}>
            <Image
              alt="/"
              height={100}
              width={100}
              src="/images/ico-user.svg"
            />
            <input
              type="text"
              placeholder="Họ và tên"
              name="userName"
              onChange={(e) => handleDataRegister(e)}
            />
          </div>
          <div className={styles.login_inp}>
            <Image
              alt="/"
              height={100}
              width={100}
              src="/images/email.svg"
            />
            <input
              type="email"
              placeholder="Nhập địa chỉ email"
              name="email"
              onChange={(e) => handleDataRegister(e)}
            />
          </div>
          <div className={styles.login_inp}>
            <Image alt="/" height={100} width={100} src="/images/lock.svg" />
            <input
              onChange={(e) => handleDataRegister(e)}
              type="password"
              placeholder="Nhập mật khẩu"
              name="password"
            />
          </div>
          <div className={styles.login_inp}>
            <Image alt="/" height={100} width={100} src="/images/lock.svg" />
            <input
              onChange={(e) => handleDataRegister(e)}
              type="password"
              placeholder="Nhập lại mật khẩu"
              name="repassword"
            />
          </div>
        </div>
        <button onClick={handleRegister} className={styles.btn_login}>
          Đăng ký
        </button>
        <div className="mt-4 ">
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
        </div>
      </div>
      <ToastContainer autoClose={2000} />;
    </div>
  );
}

export default RegisterCandidatePage;
