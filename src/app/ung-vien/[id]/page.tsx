"use client";

import SearchJob from "@/Components/SearchJob.component";
import Header from "@/Layout/Header.layout";
import { axiosSauDN } from "@/utils/axios.config";
import { useEffect, useState } from "react";
import style from "@/Css/uvDetail.module.css";
import btnStyle from "@/Css/button.module.css";
import { tinh_thanh } from "@/utils/vi_tri";
import {
  renderMarried,
  renderPosition,
  renderProfession,
  renderSalaryLevel,
  renderSchedules,
} from "@/constants/EditProfile.constant";
import { Modal, Timeline } from "antd";
import {
  convertDateDMYcheo,
  notifyError,
  notifySuccess,
} from "@/utils/generalFunction";
import BlockCVDep from "@/Components/BlockCVDep";
import Footer from "@/Components/Footer.component";
import { ToastContainer } from "react-toastify";
import ArrDay from "@/Components/ArrDay.component";
import Image from "next/image";
import Loading from "@/Components/Loading";
import { HeadDefault } from "@/constants/Head.constant";
function UVDetail({ params }: any) {
  const { id } = params;
  const [thongTinUV, setThongTinUV] = useState<any>({});
  const [uvLienQuan, setUVLienQuan] = useState([]);
  const [arrDay, setArrDay] = useState<number[]>([]);
  const [diemLoc, setDiemLoc] = useState(0);
  const [showModalXemTT, setShowModalXemTT] = useState(false);
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCompany/ntdXemChiTietUngVien", {
          id_uv: id,
        })
        .then((res) => {
          setArrDay(res.data.data.data.uv_day?.split(","));
          setThongTinUV(res.data.data.data);
          setUVLienQuan(res.data.data.listUVLienQuan);
        });
    } catch (error) {
      console.log("thontinUV err", error);
    }
  }, []);
  const handleLuuUV = (id: number) => {
    axiosSauDN
      .post(`/manageAccountCompany/ntdSaveUv`, { id_uv: id })
      .then((res) => {
        setThongTinUV({ ...thongTinUV, check_save_uv: true });
        notifySuccess("Đã lưu thành công!");
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  const handleXoaUV = (id: number) => {
    axiosSauDN
      .post(`/manageAccountCompany/xoaUngVienDaLuu`, { id_uv: id })
      .then((res) => {
        setThongTinUV({ ...thongTinUV, check_save_uv: false });
        notifySuccess("Đã bỏ lưu thành công");
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  const handleGetDiemLoc = () => {
    setShowModalXemTT(true);
    axiosSauDN
      .post("/manageAccountCompany/getDiem")
      .then((res) =>
        setDiemLoc(
          res.data.data.data.inforVLTG.diem_mua +
            res.data.data.data.inforVLTG.diem_free
        )
      )
      .catch((err) => console.log("handleGetDiemLoc", err));
  };
  const handleXemTTLH = () => {
    axiosSauDN
      .post("/manageAccountCompany/ntdXemUv", {
        id_uv: thongTinUV.idTimViec365,
      })
      .then((res) =>
        notifySuccess("Vui lòng load lại trang hoặc vào trang NTD để xem!")
      )
      .catch((err) => {
        console.log("handleXemTTLH", err), notifyError("Vui lòng thử lại sau!");
      });
  };
  if (!thongTinUV.idTimViec365) {
    return <Loading />;
  }

  return (
    <>
      <HeadDefault title={"Chi tiết ứng viên"} />
      <div className="flex flex-col items-center bg-gray-100">
        <Header />
        <SearchJob />
        <div className="w-full lg:w-4/5">
          <div className={style.box_uv}>
            <div className="flex items-center ">
              <div className={style.use_avatar}>
                <Image
                  height={200}
                  width={200}
                  src={thongTinUV.linkAvatar}
                  alt="avt"
                />
              </div>
              <div className="ml-3">
                <p className={style.user_name}>{thongTinUV.userName}</p>
                <p className={style.cty_name}>{thongTinUV.uv_cong_viec} </p>
                <div className="flex">
                  <div className="pr-3 flex items-center border-r border-gray-400 max-w-xs">
                    <Image
                      height={15}
                      width={15}
                      className="mr-3"
                      src="/images/mahoso.svg"
                      alt="mahoso"
                    />{" "}
                    Mã hồ sơ: {thongTinUV.idTimViec365}
                  </div>
                  <div className="ml-3 pr-3 flex items-center border-r border-gray-400 max-w-xs">
                    <Image
                      height={15}
                      width={15}
                      className="mr-3"
                      src="/images/luotxem.svg"
                      alt="luotxem"
                    />{" "}
                    Lượt xem: {thongTinUV.luot_xem}
                  </div>
                  <div className="ml-3 flex items-center max-w-xs">
                    <Image
                      height={15}
                      width={15}
                      className="mr-3"
                      src="/images/diachi.svg"
                      alt="diachi"
                    />{" "}
                    {thongTinUV.address}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              {thongTinUV.check_save_uv ? (
                <button
                  className={btnStyle.btn_warning}
                  onClick={() => handleXoaUV(thongTinUV.idTimViec365)}
                >
                  <Image
                    height={15}
                    width={15}
                    className="mr-2"
                    src="/images/tim.svg"
                    alt="tim"
                  />{" "}
                  Đã lưu
                </button>
              ) : (
                <button
                  className={btnStyle.btn_default}
                  onClick={() => handleLuuUV(thongTinUV.idTimViec365)}
                >
                  <Image
                    height={15}
                    width={15}
                    className="mr-2"
                    src="/images/tim.svg"
                    alt="tim"
                  />{" "}
                  Lưu ứng viên
                </button>
              )}
            </div>
          </div>
          <div className="lg:flex flex-row-reverse justify-between">
            <div className="flex flex-col bg-white p-5 lg:w-1/3">
              <div className="flex items-center flex-col text-blue-600 font-medium ">
                Thông tin cơ bản
                <div className="flex justify-center">
                  <div className="border-b-2 border-yellow-600 w-5 mr-3"></div>
                  <div className="border-b-2 border-yellow-600 w-7"></div>
                </div>
              </div>
              <div className="md:flex justify-between lg:block gap-x-16">
                <div className="md:w-full">
                  <div>
                    <div className="my-3 flex justify-between w-full border-b border-gray-400 ">
                      <div className="font-medium">Họ tên </div>
                      <div>{thongTinUV.userName} </div>
                    </div>
                  </div>
                  <div>
                    <div className="my-3 flex justify-between w-full border-b border-gray-400 ">
                      <div className="font-medium">Giới tính </div>
                      <div>{thongTinUV.gender == 1 ? "Nam" : "Nữ"} </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex my-3 justify-between w-full md:border-0 lg:border-b border-gray-400">
                      <div className="font-medium">Ngày sinh </div>
                      <div>
                        {convertDateDMYcheo(thongTinUV.birthday * 1000)}{" "}
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="md:w-full">
                  <div>
                    <div className="flex my-3 justify-between w-full border-b border-gray-400 ">
                      <div className="font-medium">Hôn nhân </div>
                      <div>{renderMarried[thongTinUV.married]} </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex my-3 justify-between w-full border-b border-gray-400 ">
                      <div className="font-medium">SĐT </div>
                      <div>
                        {thongTinUV.phone ? (
                          thongTinUV.phone
                        ) : (
                          <div
                            onClick={handleGetDiemLoc}
                            className="cursor-pointer text-blue-500 flex items-center"
                          >
                            <Image
                              height={15}
                              width={15}
                              className="mr-3"
                              src="/images/eye-blue.png"
                              alt=""
                            />{" "}
                            Xem liên hệ
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex my-3 justify-between w-full md:border-b lg:border-0 border-gray-400">
                      <div className="font-medium">Email </div>
                      {thongTinUV.phone ? (
                        thongTinUV.email
                      ) : (
                        <div
                          onClick={handleGetDiemLoc}
                          className="cursor-pointer text-blue-500 flex items-center"
                        >
                          <Image
                            height={15}
                            width={15}
                            className="mr-3"
                            src="/images/eye-blue.png"
                            alt=""
                          />{" "}
                          Xem liên hệ
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="p-5 bg-white lg:w-3/5">
              <div className=" font-bold text-base leading-6	">
                <p className="mb-2.5">
                  {" "}
                  Chỗ ở hiện tại: Chỗ này data còn thiếu
                </p>
                <p className="mb-2.5">
                  Nơi mong muốn làm việc:
                  {thongTinUV.uv_dia_diem.split(",").map((value: string) => (
                    <span key={value} className={style.itemBlue}>
                      {tinh_thanh[Number(value) - 1]?.cit_name}
                    </span>
                  ))}{" "}
                </p>
                <p className="mb-2.5">
                  Ngành nghề:{" "}
                  {thongTinUV.uv_nganh_nghe.split(",").map((value: string) => (
                    <span key={value} className={style.itemBlue}>
                      {renderProfession[Number(value)]}
                    </span>
                  ))}{" "}
                </p>
                <p className="mb-2.5">
                  Hình thức công việc:{" "}
                  {renderSchedules[Number(thongTinUV.uv_hinh_thuc)]}
                </p>
                <p className="mb-2.5">
                  Cấp bậc mong muốn:{" "}
                  {renderPosition[Number(thongTinUV.uv_lever)]}
                </p>
                <p className="mb-2.5">
                  Mức lương mong muốn:{" "}
                  <span className="text-red-500">
                    {renderSalaryLevel[thongTinUV.uv_luong]}
                  </span>
                </p>
              </div>
              <div>
                <div className="inline-block font-semibold text-blue-800">
                  Kỹ năng bản thân
                  <div className="flex mt-1">
                    <div className="border-b-2 border-blue-800 w-1/2"></div>
                    <div className="border-b-2 border-gray-400 w-1/2"></div>
                  </div>
                </div>
                <p className="mb-2.5"> {thongTinUV.uv_ky_nang}</p>
                <div className="inline-block font-semibold text-blue-800">
                  Kinh nghiệm làm việc
                  <div className="flex mt-1">
                    <div className="border-b-2 border-blue-800 w-1/2"></div>
                    <div className="border-b-2 border-gray-400 w-1/2"></div>
                  </div>
                </div>
                {thongTinUV.KNLV.length > 0 && (
                  <Timeline
                    className="mt-3"
                    items={thongTinUV.KNLV.map((exp: any) => ({
                      children: (
                        <div key={exp.id_knlv}>
                          <p className="text-blue-500">
                            Từ {convertDateDMYcheo(exp.time_fist)} -{" "}
                            {convertDateDMYcheo(exp.time_end)}
                          </p>
                          <p>Công ty: {exp.cty_name}</p>
                          <p>Vị trí : {exp.chuc_danh}</p>
                          <p className="font-bold">Mô tả:</p>
                          <p>{exp.mota}</p>
                        </div>
                      ),
                    }))}
                  />
                )}
              </div>
              <div>
                <div className="inline-block font-semibold text-blue-800">
                  Buổi có thể đi làm
                  <div className="flex mt-1">
                    <div className="border-b-2 border-blue-800 w-1/2"></div>
                    <div className="border-b-2 border-gray-400 w-1/2"></div>
                  </div>
                </div>
                <div className="pointer-events-none	">
                  <ArrDay arrDay={arrDay} />
                </div>
              </div>
            </div>
          </div>
          <BlockCVDep />
          <Footer />
        </div>
        <Modal
          open={showModalXemTT}
          footer={null}
          onCancel={() => setShowModalXemTT(false)}
        >
          <div>
            <div className="font-bold text-xl mb-6">Mua điểm</div>
            <div className="mb-8">
              Bạn có <span className="text-yellow-500">{diemLoc}</span> điểm
              lọc. Bạn có muốn dùng 1 điểm lọc để xem thông tin ứng viên không?
            </div>
            <div className="flex justify-center">
              {diemLoc && (
                <button
                  onClick={handleXemTTLH}
                  className={btnStyle.btn_primary + ` mr-3`}
                >
                  Đồng ý
                </button>
              )}

              <button
                className={btnStyle.btn_default + ` hover:color-white mr-3`}
                onClick={() => setShowModalXemTT(false)}
              >
                Hủy
              </button>
              <a
                className={btnStyle.btn_outline_primary}
                href="https://timviec365.vn/bang-gia-dich-vu.html"
              >
                Mua điểm lọc
              </a>
            </div>
          </div>
        </Modal>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
}

export default UVDetail;
