"use client";
import React, { useEffect, useState } from "react";
import styles from "@/Css/header.module.css";
import { useRouter } from "next/navigation";
import { axiosSauDN, deleteToken } from "@/utils/axios.config";
import Image from "next/image";
import Cookies from "js-cookie";
import { Popover } from "antd";
import Link from "next/link";
import { basePath } from "@/constants/Head.constant";
import { handleImageError } from "@/utils/generalFunction";
export function Header() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
  const [recall, setRecall] = useState(false);
  const [userType, setUserType] = useState<any>(Cookies.get("UT"));
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
  return (
    <header className={styles.header + " w-full"}>
      <div className={styles.header_back}>
        <div>
          <Link href="https://timviec365.vn/" target="blank">
            <img src="/images/back.svg" alt="" />
          </Link>
        </div>
        <span className="hidden md:block ml-1"> Quay lại Timviec365.vn</span>
      </div>

      <div>
        <div className={styles.list_menu}>
          <div className={styles.navbars_items}>
            <Link href={basePath} className="mr-10">
              <Image
                width={131}
                height={42}
                className="w-44 h-10"
                src="/images/logo_mb.png"
                alt="logo"
              />
            </Link>
            <div className="block lg:hidden">
              <img src="/images/btn-nav.svg" alt="" />
            </div>
            <div className={styles.navbars_list}>
              <Link
                href={`${basePath}/danh-cho-doanh-nghiep.html`}
                data-toggle="tooltip"
                className={styles.a}
              >
                Dành cho Nhà tuyển dụng
              </Link>
              <div className="ml-2 underline">
                <Link
                  href={basePath}
                  onClick={() => router.push("/")}
                  className={styles.a}
                >
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
