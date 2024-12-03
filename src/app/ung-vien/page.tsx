"use client";
import Supporter from "@/Components/Supporter.component";
import UvHeader from "@/Components/UvHeader.component";
import styles from "@/Css/uvProfile.module.css";
import ChangePassword from "@/Layout/ChangePassword.layout";
import UvProfile from "@/Layout/UvProfile.layout";
import UvVLDL from "@/Layout/UvVLDL.layout";
import UvVLDUT from "@/Layout/UvVLDUT.layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Footer from "@/Components/Footer.component";

function UserProfile() {
  const router = useRouter();
  const [showQLC, setShowQLC] = useState<boolean>(false);
  const [showQLTK, setShowQLTK] = useState<boolean>(false);
  const [choiceShow, setChoiceShow] = useState("qlhs");
  return (
    <div className={styles.uv_profile}>
      <div className="lg:flex w-full">
        <div className={styles.profile_navbars}>
          <div className={styles.navbars_header}>
            <div className="lg:hidden">
              <Image height={150} width={150} src="/images/btn-nav.svg" alt="" />
            </div>
            <div
              onClick={() => router.push("/")}
              className={styles.navbars_header_logo}
            >
              <Image height={150} width={150} src="/images/logo.svg" alt="" />
            </div>
            <div className="lg:hidden">
              <Image height={15} width={15} src="/images/bell.svg" alt="" />
            </div>
          </div>
          <div className={styles.navbars_content}>
            <div className={styles.refresh}>
              <div>
                <Image
                  height={15}
                  width={15}
                  className="mr-2"
                  src="/images/return.svg"
                  alt="return"
                />{" "}
                Làm mới hồ sơ
              </div>
            </div>

            <div className={styles.navbars_items}>
              {/* <div>
                <div
                  onClick={() => setShowQLC(!showQLC)}
                  className="flex justify-between px-3 cursor-pointer items-center h-8 hover:bg-blue-950"
                >
                  Quản lý chung{" "}
                  <Image
                    height={15}
                    width={15}
                    src="/images/down2.svg"
                    alt="down2"
                  />
                </div>
                {showQLC && (
                  <div className="ml-7">
                    <div
                      onClick={() => setChoiceShow("qlhs")}
                      className="flex justify-between pl-3 cursor-pointer items-center h-8 hover:bg-blue-950"
                    >
                      Quản lý hồ sơ
                    </div>
                    <Link href={"/viec-lam-theo-gio-moi-nhat"}
                      className="flex justify-between pl-3 cursor-pointer items-center h-8 hover:bg-blue-950"
                    >
                      Tìm việc làm
                    </Link>
                  </div>
                )}
              </div> */}

              {/* <a
                href="https://timviec365.vn/blog"
                target="blank"
                className="flex justify-between px-3 cursor-pointer items-center h-8 hover:bg-blue-950"
              >
                Cẩm nang tìm việc theo giờ
              </a> */}
              <div
                onClick={() => setChoiceShow("qlhs")}
                className="flex justify-between pl-3 cursor-pointer items-center h-8 hover:bg-blue-950"
              >
                Quản lý hồ sơ
              </div>
              <Link href={"/viec-lam-theo-gio-moi-nhat"}
                className="flex justify-between pl-3 cursor-pointer items-center h-8 hover:bg-blue-950"
              >
                Tìm việc làm
              </Link>
              <div
                onClick={() => setChoiceShow("vldl")}
                className="flex justify-between px-3 cursor-pointer items-center h-8 hover:bg-blue-950"
              >
                Việc làm đã lưu
              </div>
              <div
                onClick={() => setChoiceShow("vldut")}
                className="flex justify-between px-3 cursor-pointer items-center h-8 hover:bg-blue-950"
              >
                Việc làm đã ứng tuyển
              </div>
              {/* <div
                onClick={() => setShowQLTK(!showQLTK)}
                className="flex justify-between px-3 cursor-pointer items-center h-8 hover:bg-blue-950"
              >
                Quản lý tài khoản{" "}
                <Image
                  height={15}
                  width={15}
                  src="/images/down2.svg"
                  alt="down2"
                />
              </div> */}
              {/* {showQLTK && (
                <div
                  onClick={() => setChoiceShow("doimatkhau")}
                  className="flex justify-between ml-7 px-3 cursor-pointer items-center h-8 hover:bg-blue-950"
                >
                  {" "}
                  Đổi mật khẩu
                </div>
              )} */}
              <div
                onClick={() => setChoiceShow("doimatkhau")}
                className="flex justify-between px-3 cursor-pointer items-center h-8 hover:bg-blue-950"
              >
                {" "}
                Đổi mật khẩu
              </div>
            </div>
            
          </div>
          <div className={styles.box_logout}>
            <button
              className={styles.btn_warning + " flex items-center"}
              onClick={() => {
                Cookies.remove("accessToken");
                Cookies.remove("UT");
                router.push("/");
              }}
            >
              <Image
                height={15}
                width={15}
                src="/images/logout.svg"
                alt="logout"
              />
              Đăng xuất
            </button>
          </div>
        </div>
        <div className={styles.profile_rg}>
          {/* <UvHeader /> */}
          <Supporter />
          {choiceShow == "qlhs" && <UvProfile />}
          {choiceShow == "vldl" && <UvVLDL />}
          {choiceShow == "vldut" && <UvVLDUT />}
          {choiceShow == "doimatkhau" && <ChangePassword />}
        
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default UserProfile;
