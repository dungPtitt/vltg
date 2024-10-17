"use client";

import btnStyle from "@/Css/button.module.css";
import Footer from "@/Components/Footer.component";
import SearchJob from "@/Components/SearchJob.component";
import Header from "@/Layout/Header.layout";
import { axiosTruocDN } from "@/utils/axios.config";

import { useEffect, useState } from "react";
import style from "@/Css/ntdProfile.module.css";
import { useRouter } from "next/navigation";
import { convertDateDMYcheo, convertNameToSlug } from "@/utils/generalFunction";
import {
  renderGender,
  renderLiteracy,
  renderSchedules,
  renderPayrollMethods,
  renderPosition,
  renderProfession,
} from "@/constants/EditProfile.constant";
import Image from "next/image";
import { HeadDefault } from "@/constants/Head.constant";
import Loading from "@/Components/Loading";
import Link from "next/link";
function TTNTD({ params }: any) {
  const { id } = params;
  const router = useRouter();
  const [thongTinNTD, setThongTinNTD] = useState<any>({});
  const [danhSachViecLam, setDanhSachViecLam] = useState<any>([]);
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
    axiosTruocDN
      .post("/viecLam/getInfoCompany", { id_ntd: id })
      .then((res) => {
        setDanhSachViecLam(res.data.data.listJob);
        setThongTinNTD(res.data.data.ntd);
      })
      .catch((err) => console.log("chi tiet nha tuyen dung", err));
  }, []);
  if (!thongTinNTD._id) {
    return <Loading />;
  }
  return (
    <>
      <HeadDefault fullPath={fullPath} title={thongTinNTD?.userName} />
      <div>
        <Header />
        <SearchJob />
        <div
          style={{ backgroundColor: "#FCFCFD" }}
          className="flex justify-center"
        >
          <div className="w-full lg:w-4/5 mx-5 bg-white">
            <div className="lg:flex mt-10 items-center ">
              <div className="flex justify-center">
                <div className="border border-gray-400 w-48  h-32 flex items-center justify-center">
                  <Image
                    height={200}
                    width={200}
                    className="w-24 h-24"
                    src={
                      thongTinNTD.linkAvatar
                        ? thongTinNTD.linkAvatar
                        : `/images/no-avartar-user.png`
                    }
                    alt="avt"
                  />
                </div>
              </div>

              <div className="ml-4">
                <p className="font-bold text-2xl">{thongTinNTD.userName}</p>
                <p className="flex pb-3">
                  <Image
                    height={20}
                    width={20}
                    alt="map"
                    src={"/images/ico_map.png"}
                  />{" "}
                  <span className="font-semibold mx-2">Địa chỉ:</span>{" "}
                  {thongTinNTD.address}{" "}
                </p>
                <p className="flex pb-3">
                  <Image
                    height={20}
                    width={20}
                    alt="size"
                    src={"/images/ico_peoble.png"}
                  />
                  <span className="font-semibold mx-2">Quy mô:</span>{" "}
                  {thongTinNTD.com_size
                    ? thongTinNTD.com_size
                    : "Chưa cập nhập"}
                </p>
                <p className="flex pb-3">
                  <Image
                    height={20}
                    width={20}
                    alt="website"
                    src={"/images/ico_web.png"}
                  />
                  <span className="font-semibold mx-2">Website:</span>{" "}
                  {thongTinNTD.usc_website
                    ? thongTinNTD.usc_website
                    : "Chưa cập nhập"}
                </p>
                <p className="flex pb-3">
                  <Image
                    height={20}
                    width={20}
                    alt="sdt"
                    src={"/images/phone3.svg"}
                  />
                  <span className="font-semibold mx-2">Số điện thoại:</span>{" "}
                  {thongTinNTD.phone ? thongTinNTD.phone : "Chưa cập nhập"}
                </p>
              </div>
            </div>

            <div className="border-t border-b border-gray-400 py-8 my-3">
              <div className="font-bold text-lg">Mô tả công ty</div>
              <p>
                {thongTinNTD.description != "undefined"
                  ? thongTinNTD.description
                  : "Chưa cập nhập"}
              </p>
            </div>
            <div className="font-semibold text-xl text-center">
              Tin tuyển dụng của {thongTinNTD.userName}
            </div>
            <div>
              {danhSachViecLam.length > 0 &&
                danhSachViecLam.map((job: any) => (
                  <div key={job.ico_time} className={style.item_vl_com}>
                    <div className={style.hannop}>
                      {convertDateDMYcheo(job.time_td * 2000)}
                    </div>
                    <div className="px-5">
                      <div className="text-center md:text-start mb-3">
                        <h3 className="cursor-pointer mt-3 font-semibold text-lg hover:underline">
                          <Link
                            href={`/${convertNameToSlug(job.vi_tri)}-${
                              job.id_vieclam
                            }.html`}
                          >
                            {job.vi_tri}
                          </Link>
                        </h3>
                      </div>
                      <div className="lg:grid grid-cols-2">
                        <div className="text-center md:text-start">
                          <p>{renderPosition[job.cap_bac]}</p>
                          <p className="text-red-500 font-medium">
                            {job.muc_luong} VNĐ/
                            {renderPayrollMethods[job.tra_luong]}
                          </p>
                        </div>
                        <div>
                          <p className="flex my-3">
                            <Image
                              height={20}
                              width={20}
                              className="mr-2 h-5"
                              alt="/"
                              src="/images/ico_time.png"
                            />{" "}
                            {renderSchedules[job.hinh_thuc]}
                          </p>
                          <p className="flex mb-3">
                            <Image
                              height={20}
                              width={20}
                              className="mr-2 h-5"
                              alt="/"
                              src="/images/ico_edu.png"
                            />{" "}
                            {renderLiteracy[job.hoc_van]}
                          </p>
                        </div>
                      </div>
                      <div className="lg:grid grid-cols-3 border-b border-gray-300">
                        <p className="flex mb-3">
                          <Image
                            height={20}
                            width={20}
                            className="mr-2 h-5"
                            alt="/"
                            src="/images/ico_gender.png"
                          />{" "}
                          {renderGender[job.gender]}
                        </p>
                        <p className="flex mb-3">
                          <Image
                            height={20}
                            width={20}
                            className="mr-2 h-5"
                            alt="/"
                            src="/images/ico_vitri.png"
                          />
                          {renderProfession[job.nganh_nghe]}
                        </p>
                        <p className="flex mb-3">
                          <Image
                            height={20}
                            width={20}
                            className="mr-2 h-5"
                            alt="/"
                            src="/images/ico_map.png"
                          />
                          {job.District},{job.City}
                        </p>
                      </div>
                      <p className="my-4">{job.mo_ta}</p>
                      <button className={btnStyle.btn_primary}>
                        <Link
                          href={`/${convertNameToSlug(job.vi_tri)}-${
                            job.id_vieclam
                          }.html`}
                        >
                          {" "}
                          Xem chi tiết
                        </Link>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default TTNTD;
