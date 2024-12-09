"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";
import { axiosSauDN } from "@/utils/axios.config";
import styles from "@/Css/uvProfile.module.css";
import btnStyle from "@/Css/button.module.css";
import {
  notifyError,
  notifySuccess,
  showYear,
} from "@/utils/generalFunction";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { renderGender, renderProfession } from "@/constants/EditProfile.constant";
import { tinh_thanh } from "@/utils/vi_tri";
import { Modal, Timeline } from "antd";

function UVCard({ data, setReCall, recall}: any) {
  const [showModalXemTT, setShowModalXemTT] = useState(false);
  const [diemLoc, setDiemLoc] = useState(0);
  const [diemLocFree, setDiemLocFree] = useState(0);
  const [diemLocMua, setDiemLocMua] = useState(0);

  moment.locale("vi");
  const time = moment(data.updatedAt * 1000)
    .locale("vi")
    .fromNow();
  const router = useRouter();
  const [dataUV, setDataUV] = useState(data);
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    // setDataUV({...data, birthday: convertTimestampToDatePicker(data.birthday)});
    setDataUV(data);
  }, [data]);

  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  }, [data]);
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
  // console.log("dataUV:::", dataUV);
  const handleGetDiemLoc = () => {
    setShowModalXemTT(true);
    axiosSauDN
      .post("/manageAccountCompany/getDiem")
      .then((res) => {
        // console.log("handleGetDiemLoc:::", res);
        setDiemLocFree(res?.data?.data?.data?.diem_free);
        setDiemLocMua(res?.data?.data?.data?.diem_mua);
        setDiemLoc(
          res?.data?.data?.data?.diem_mua +
          res?.data?.data?.data?.diem_free
        )
      })
      .catch((err) => console.log("handleGetDiemLoc", err));
  };
  const handleXemTTLH = () => {
    axiosSauDN
      .post("/manageAccountCompany/ntdXemUv", {
        id_uv: dataUV._id,
      })
      .then((res) =>
      {
        notifySuccess("Vui lòng load lại trang hoặc vào trang NTD để xem!")
        setShowModalXemTT(false);
        setReCall(!recall);
      })
      .catch((err) => {
        console.log("handleXemTTLH", err);
        notifyError("Vui lòng thử lại sau!");
      });
  };
  // console.log("nnnnnnnnnnnnnn", recall);
  // console.log("setReCall", setReCall);
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
      <div className="flex pl-8 py-3 bg-gray-100">
        <div className=" w-full pl-5 py-3">
          <div className="flex ">
            <div className="flex ">Số điện thoại: {" "}
              {dataUV.phone ? (
                dataUV.phone
              ) : (
                <p
                  onClick={handleGetDiemLoc}
                  className="cursor-pointer text-blue-500 flex items-center ml-3"
                >
                  <Image
                    height={15}
                    width={15}
                    className="mr-3"
                    src="/images/eye-blue.png"
                    alt=""
                  />{" "}
                  Xem liên hệ
                </p>
              )}
            </div>
          </div>
          <div className="flex ">
            <div className="flex ">Email: {" "}
              {dataUV.email ? (
                dataUV.email
              ) : (
                <p
                  onClick={handleGetDiemLoc}
                  className="cursor-pointer text-blue-500 flex items-center ml-3"
                >
                  <Image
                    height={15}
                    width={15}
                    className="mr-3"
                    src="/images/eye-blue.png"
                    alt=""
                  />{" "}
                  Xem liên hệ
                </p>
              )}
            </div>
          </div>
          <div className="flex">
            <p>Sinh năm: {" "}
            {dataUV ? showYear(dataUV.birthday) : ""}
            </p>
          </div>
        </div>
        <div className=" w-full pl-5 py-3">
          <div className="flex">
            <p>Giới tính: {" "}
              {renderGender[dataUV?.gender]}
            </p>
          </div>
          <div className="flex">
            <p>Ngành nghề: {" "}
              {dataUV?.uv_nganh_nghe?.split(",").map((nn:any) => (
                  <span key={nn} className={styles.uv_primary}>
                    {renderProfession[Number(nn)]}
                  </span>
                ))}
            </p>
          </div>
          <div className="flex">
            <p>Địa điểm: {" "}
              {tinh_thanh[dataUV?.city-1]?.cit_name}
            </p>
          </div>
        </div>
      </div>
      <Modal
          open={showModalXemTT}
          footer={null}
          onCancel={() => setShowModalXemTT(false)}
        >
          <div>
            <div className="font-bold text-xl mb-6">Mua điểm</div>
            <div className="mb-8">
              Bạn có <span className="text-yellow-500">{diemLocFree}</span> điểm
              lọc free và <span className="text-yellow-500">{diemLocMua}</span> điểm lọc mua. Bạn có muốn dùng 1 điểm lọc để xem thông tin ứng viên không?
            </div>
            <div className="flex justify-center">
              {diemLoc ? (
                <button
                  onClick={handleXemTTLH}
                  className={btnStyle.btn_primary + ` mr-3`}
                >
                  Đồng ý
                </button>
              ): null}

              <button
                className={btnStyle.btn_default + ` hover:color-white mr-3`}
                onClick={() => setShowModalXemTT(false)}
              >
                Hủy
              </button>
              <a
                className={btnStyle.btn_outline_primary}
                // href="https://timviec365.vn/bang-gia-dich-vu.html"
              >
                Mua điểm lọc
              </a>
            </div>
          </div>
        </Modal>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default UVCard;
