"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";
import { axiosSauDN } from "@/utils/axios.config";
import {
  convertNameToSlug,
  notifyError,
  notifySuccess,
} from "@/utils/generalFunction";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

function UVCard({ data }: any) {
  moment.locale("vi");
  const time = moment(data.updatedAt * 1000)
    .locale("vi")
    .fromNow();
  const router = useRouter();
  const [dataUV, setDataUV] = useState(data);
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  }, []);
  const handleLuuUV = (id: number) => {
    axiosSauDN
      .post(`/manageAccountCompany/ntdSaveUv`, { id_uv: id })
      .then((res) => {
        setDataUV({ ...dataUV, check_ntd_save_uv: true });
        notifySuccess("Đã lưu thành công!");
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  const handleXoaUV = (id: number) => {
    axiosSauDN
      .post(`/manageAccountCompany/xoaUngVienDaLuu`, { id_uv: id })
      .then((res) => {
        setDataUV({ ...dataUV, check_ntd_save_uv: false });
        notifySuccess("Đã bỏ lưu thành công");
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  return (
    <div className="w-full border-t-2 border-blue-500 py-2 hover:border-l-3-yellow-600">
      <div className="flex justify-between">
        <div className="flex items-center w-1/2 pl-5 py-3">
          <Link
            href={`/ung-vien/${
              dataUV._id
              }`}
            className="flex justify-between"
          >
            <Image
              className="cursor-pointer border-2 border-blue-500 rounded-full w-10 h-10"
              width={55}
              height={55}
              src={dataUV?.linkAvatar ? dataUV?.linkAvatar : "/images/no-avartar-user.png"}
              alt="/"
            />
            <p className="text-lg font-semibold text-blue-700 cursor-pointer hover:underline ml-5 mt-2">
              {dataUV.userName}
            </p>
          </Link>
        </div>
        <div className="flex justify-between w-2/5 mx-5">
          <div className="flex items-center">
            <Image
              className="mr-2"
              width={15}
              height={15}
              src={"/images/clock.svg"}
              alt="/"
            />
            {time}
          </div>
          <div className="flex items-center">
            {dataUV.check_ntd_save_uv ? (
              <button
                onClick={() => handleXoaUV(dataUV._id)}
                className="flex items-center"
              >
                <Image
                  className="mr-2"
                  width={15}
                  height={15}
                  src={"/images/tim-blue.png"}
                  alt="/"
                />{" "}
                Đã lưu
              </button>
            ) : (
              <button
                onClick={() => handleLuuUV(dataUV._id)}
                className="flex items-center"
              >
                <Image
                  className="mr-2"
                  width={15}
                  height={15}
                  src={"/images/heart.svg"}
                  alt="/"
                />{" "}
                Lưu
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="pl-8 py-3 bg-gray-100">
        <div className="flex ">
          <Image
            className="mr-3"
            height={15}
            width={15}
            src={"/images/pin.svg"}
            alt="dot"
          />
          <p>{dataUV.address}</p>
        </div>
        <div className="flex">
          <Image
            className="mr-3"
            height={15}
            width={15}
            src={"/images/cap.svg"}
            alt="dot"
          />
          <p>{dataUV.uv_cong_viec}</p>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default UVCard;
