"use client";
import Footer from "@/Components/Footer.component";
import NtdHeader from "@/Components/NtdHeader.component";
import Supporter from "@/Components/Supporter.component";
import styles from "@/Css/ntdProfile.module.css";
import ChangePassword from "@/Layout/ChangePassword.layout";
import NtdNewJob from "@/Layout/NtdNewJob.layout";
import NtdQLC from "@/Layout/NtdQLC.layout";
import NtdTongTin from "@/Layout/NtdTongTin.layout";
import NtdUVDL from "@/Layout/NtdUVDL.layout";
import NtdUVDX from "@/Layout/NtdUVDX.layout";
import NtdUVMUT from "@/Layout/NtdUVMUT.layout";
import NtdUVTuDL from "@/Layout/NtdUVTuDL";
import NtdUpdateProfile from "@/Layout/NtdUpdateProfile.layout";
import { deleteToken } from "@/utils/axios.config";
import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function NtdProfilePage() {
  const router = useRouter();
  const [showTinTD, setShowTinTD] = useState<boolean>(false);
  const [showQLTK, setShowQLTK] = useState<boolean>(false);
  const [showNavbars, setShowNavbars] = useState<boolean>(false);
  const [showOption, setShowOption] = useState<string>("qlc");
  const [fullPath, setFullPath] = useState<any>("");
  const content = (
    <div>
      <div className={styles.navbars_content}>
        <div className="flex justify-center w-full">
          <div className={styles.refresh}>Điểm mất phí lọc hồ sơ</div>
        </div>

        <div className={styles.navbars_items}>
          <div className="cursor-pointer" onClick={() => setShowOption("qlc")}>
            Quản lý chung
          </div>
          <div>
            <div
              onClick={() => setShowTinTD(!showTinTD)}
              className="flex justify-between cursor-pointer"
            >
              Tin tuyển dụng{" "}
              <Image
                height={15}
                width={15}
                src="/images/down2.svg"
                alt="down2"
              />
            </div>
            {showTinTD && (
              <div className="ml-7">
                <div
                  className="cursor-pointer"
                  onClick={() => setShowOption("dtm")}
                >
                  Đăng tin mới
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setShowOption("tdd")}
                >
                  Tin đã đăng
                </div>
                <div className="cursor-pointer">
                  <Link href={`/ung-vien-tim-viec-lam-theo-gio`}></Link>
                  Tìm kiếm ứng viên theo giờ
                </div>
              </div>
            )}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setShowOption("uvmut")}
          >
            Ứng viên mới ứng tuyển
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setShowOption("uvtudl")}
          >
            Ứng viên từ điểm lọc
          </div>
          <div className="cursor-pointer" onClick={() => setShowOption("uvdx")}>
            Ứng viên đã xem
          </div>
          <div className="cursor-pointer" onClick={() => setShowOption("uvdl")}>
            Ứng viên đã lưu
          </div>
          <div
            onClick={() => setShowQLTK(!showQLTK)}
            className="flex justify-between cursor-pointer"
          >
            Quản lý tài khoản{" "}
            <Image height={15} width={15} src="/images/down2.svg" alt="down2" />
          </div>
          {showQLTK && (
            <div>
              <div
                className="ml-7 cursor-pointer"
                onClick={() => setShowOption("cntt")}
              >
                {" "}
                Cập nhập thông tin
              </div>
              <div
                className="ml-7 cursor-pointer"
                onClick={() => setShowOption("dmk")}
              >
                {" "}
                Đổi mật khẩu
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.box_logout}>
        <button
          onClick={() => {
            Cookies.remove("accessToken");
            Cookies.remove("UT");
            router.push("/");
          }}
          className={styles.btn_warning + " flex items-center"}
        >
          <Image height={20} width={20} src="/images/logout.svg" alt="logout" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  });
  return (
    <div className={styles.ntd_profile_page}>
      <div className="lg:flex w-full">
        <div className={styles.profile_navbars}>
          <div className={styles.navbars_header}>
            <Popover placement="bottom" content={content} trigger="click">
              <div className="lg:hidden">
                <Image
                  height={100}
                  width={100}
                  src="/images/btn-nav.svg"
                  alt=""
                />
              </div>
            </Popover>

            <div className={styles.navbars_header_logo}>
              <Image height={100} width={100} src="/images/logo.svg" alt="" />
            </div>
            <div className="lg:hidden">
              <Image height={100} width={100} src="/images/bell.svg" alt="" />
            </div>
          </div>

          <div className="hidden lg:block">{content}</div>
        </div>
        <div className={styles.ntd_profile_rg}>
          <NtdHeader />
          {/* <Supporter /> */}
          <div className={styles.show_detail}>
            {showOption === "qlc" && <NtdQLC />}
            {showOption === "dtm" && <NtdNewJob setShowOption={setShowOption}/>}
            {showOption === "tdd" && (
              <NtdTongTin setShowOption={setShowOption} />
            )}
            {showOption === "uvmut" && <NtdUVMUT />}
            {showOption === "uvtudl" && <NtdUVTuDL />}
            {showOption === "uvdx" && <NtdUVDX />}
            {showOption === "uvdl" && <NtdUVDL />}
            {showOption === "cntt" && <NtdUpdateProfile />}
            {showOption === "dmk" && <ChangePassword />}
            {/* <NtdNewJob /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NtdProfilePage;
