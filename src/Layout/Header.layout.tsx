"use client";
import React, { useEffect, useState } from "react";
import styles from "@/Css/header.module.css";
import { useRouter } from "next/navigation";
import { axiosSauDN, deleteToken } from "@/utils/axios.config";
import Image from "next/image";
import Cookies from "js-cookie";
import { Popover } from "antd";
import Link from "next/link";
import { handleImageError } from "@/utils/generalFunction";
export function Header() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
  const [recall, setRecall] = useState(false);
  const [userType, setUserType] = useState<any>(Cookies.get("UT"));
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    if (userType == 0) {
      axiosSauDN
        .post("/manageAccountCandidate/getInfoCandidate")
        .then((res) => setUserData(res.data.data.data))
        .catch((err) => deleteToken());
    } else if (userType == 1) {
      axiosSauDN
        .post("/manageAccountCompany/getInfoCompany")
        .then((res) => setUserData(res.data.data.data))
        .catch((err) => deleteToken());
    }
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  }, []);
  const boxProfile = (
    <div>
      <div className="flex items-center border-b-2 border-gray-400">
        <Image
          className="w-10 mr-4"
          width={50}
          height={50}
          alt="Avatar"
          src={userData?.linkAvatar}
        />

        <p className="text-lg text-blue-700">{userData?.userName}</p>
      </div>
      <div>
        <div
          className="flex items-center cursor-pointer hover:text-yellow-500"
          onClick={() =>
            userType == 0 ? router.push("/ung-vien.html") : router.push("/ntd")
          }
        >
          <Image
            className="w-5 mr-4 my-3"
            width={50}
            height={50}
            alt="profile"
            src={`/images/ico-qltk.png`}
          />
          <span>Quản lý tài khoản</span>
        </div>
        <div
          className="flex items-center cursor-pointer hover:text-amber-500"
          onClick={() => {
            deleteToken();
            setUserData("");
          }}
        >
          <Image
            className="w-5 mr-4 my-3"
            width={50}
            height={50}
            alt="profile"
            src={`/images/ico-logout.png`}
          />
          Đăng xuất
        </div>
      </div>
    </div>
  );
  const navBarContent = (
    <div className="h-24 flex flex-col justify-between">
      <Link
        href={`/danh-cho-doanh-nghiep.html`}
        data-toggle="tooltip"
        className={styles.a}
      >
        Dành cho Nhà tuyển dụng
      </Link>
      <div className="ml-2 underline">
        <Link href="/" className={styles.a}>
          Dành cho người tìm việc
        </Link>
      </div>
      {userData?.idTimViec365 ? (
        <div>
          <Popover placement="bottom" content={boxProfile}>
            <Image
              width={35}
              height={35}
              alt=""
              src={userData.linkAvatar}
              // onError={(e) =>
              //   (e.currentTarget.src = `${basePath}/images/no-avartar-user.png`)
              // }
            />
          </Popover>
        </div>
      ) : (
        <div>
          <Link
            href="https://timviec365.vn/dang-nhap.html"
            target="blank"
            className={styles.a + " mr-2"}
          >
            Đăng nhập
          </Link>
          /
          <Link
            href="https://timviec365.vn/dang-ky.html"
            target="blank"
            className={styles.a + " ml-2"}
          >
            Đăng ký
          </Link>
        </div>
      )}
    </div>
  );
  return (
    <header className={styles.header}>
      <div className="lg:hidden flex justify-end w-2/3">
        <div className="flex items-center justify-between w-screen lg:hidden">
          <Popover placement="bottom" trigger="click" content={navBarContent}>
            {" "}
            <div>
              <Image width={28} height={20} src="/images/btn-nav.svg" alt="" />
            </div>
          </Popover>
        </div>
        <div className="w-full">
          <Link href="/">
            <Image
              className="h-12"
              width={131}
              height={42}
              src="/images/logo_mb.png"
              alt="logo"
            />
          </Link>
        </div>
      </div>
      <div className={styles.header_back}>
        {/* <div>
          <Link href="https://timviec365.vn/" target="blank">
            <img src="/images/back.svg" alt="" />
          </Link>
        </div>
        <span className="hidden md:block ml-1"> Quay lại Timviec365.vn</span> */}
        <Link href="/" className="mr-10 hidden lg:block">
          <Image
            width={131}
            height={42}
            className="w-44 h-10"
            src="/images/logo_mb.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="md:hidden lg:block">
        <div className={styles.list_menu}>
          <div className={styles.navbars_items}>
            {/* <Link href="/" className="mr-10 hidden lg:block">
              <Image
                width={131}
                height={42}
                className="w-44 h-10"
                src="/images/logo_mb.png"
                alt="logo"
              />
            </Link> */}
            <div className={styles.navbars_list}>
              <Link
                href={`/danh-cho-doanh-nghiep.html`}
                data-toggle="tooltip"
                className={styles.a}
              >
                Dành cho Nhà tuyển dụng
              </Link>
              <div className="ml-2 underline">
                <Link href="/" className={styles.a}>
                  Dành cho người tìm việc
                </Link>
              </div>
              {userData?.idTimViec365 ? (
                <div>
                  <Popover placement="bottom" content={boxProfile}>
                    <Image
                      width={35}
                      height={35}
                      alt=""
                      src={userData.linkAvatar}
                    
                    />
                  </Popover>
                </div>
              ) : (
                <div className={styles.box_dn_dky}>
                  <Link
                    href="https://timviec365.vn/dang-nhap.html"
                    target="blank"
                    className={styles.a + " mr-2"}
                  >
                    Đăng nhập
                  </Link>
                  /
                  <Link
                    href="https://timviec365.vn/dang-ky.html"
                    target="blank"
                    className={styles.a + " ml-2"}
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
