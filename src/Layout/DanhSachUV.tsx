"use client";
import Footer from "@/Components/Footer.component";
import Header from "@/Layout/Header.layout";
import { axiosSauDN } from "@/utils/axios.config";
import { useEffect, useState } from "react";
import TuKhoaCongViecLQ from "@/Components/TuKhoaCongViecLQ";
import DiaDiemLQ from "@/Components/DiaDiemLQ";
import BlockCVDep from "@/Components/BlockCVDep";
import UVCard from "@/Components/UVCard";
import { Pagination } from "antd";
import SearchUV from "@/Components/SearchUV";
import { useSearchParams } from "next/navigation";
import NTDTKUV from "@/Components/NtdTKUV";
import { HeadDefault } from "@/constants/Head.constant";

function DanhSachUv() {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const city = searchParams.get("city");
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [danhSachUngVien, setDanhSachUngVien] = useState<any>([
    {
      _id: 208513,
      idTimViec365: 1178384,
      district: 84,
      city: 1,
      userName: "Lâm",
      phone: "0869516978",
      type: 0,
      phoneTK: "0869516978",
      address: "hà đông hà nội",
      avatarUser: "1684227547-user-Screenshot 2023-03-19 213846.png",
      createdAt: 1684227547,
      updatedAt: 1697252888,
      uv_cong_viec: "keo",
      uv_hinh_thuc: 1,
      uv_nganh_nghe: "12, 13, 15",
      uv_dia_diem: "1, 23",
      check_ntd_xem_uv: true,
      check_xem_uv: true,
      check_ntd_save_uv: false,
    },
    {
      _id: 10004183,
      idTimViec365: 1111112669,
      district: 699,
      city: 49,
      userName: "asdfasdf",
      phone: "fasdf",
      type: 0,
      phoneTK: null,
      address: "fsadfasdf",
      avatarUser: "",
      createdAt: 1696474390,
      updatedAt: 1696474390,
      uv_cong_viec: "fasdfasdf",
      uv_hinh_thuc: 0,
      uv_nganh_nghe: "4",
      uv_dia_diem: "4",
      check_ntd_xem_uv: false,
      check_xem_uv: false,
      check_ntd_save_uv: false,
    },
    {
      _id: 1101082,
      idTimViec365: 710702,
      district: 74,
      city: 1,
      userName: "Lê Đình Mạnh",
      phone: "0966037772",
      type: 0,
      phoneTK: "",
      address: "194 Giải Phóng, Phương Liệt, Thanh Xuân, Hà Nội",
      avatarUser: "",
      createdAt: 1632069257,
      updatedAt: 1695875180,
      uv_cong_viec: "hihih",
      uv_hinh_thuc: 1,
      uv_nganh_nghe: "2, 3",
      uv_dia_diem: "3",
      check_ntd_xem_uv: true,
      check_xem_uv: false,
      check_ntd_save_uv: false,
    },
    {
      _id: 10003670,
      idTimViec365: 1111112197,
      district: 2,
      city: 1,
      userName: "dũng xtvl 2",
      phone: "0355961899",
      type: 0,
      phoneTK: null,
      address: "thanh xuân hà nội",
      avatarUser: "",
      createdAt: 1695809106,
      updatedAt: 1695809106,
      uv_cong_viec: "ceo",
      uv_hinh_thuc: 0,
      uv_nganh_nghe: "11, 2",
      uv_dia_diem: "1, 2",
      check_ntd_xem_uv: false,
      check_xem_uv: false,
      check_ntd_save_uv: false,
    },
    {
      _id: 10003669,
      idTimViec365: 1111112196,
      district: 2,
      city: 1,
      userName: "dũng xtvl 2",
      phone: "0355961899",
      type: 0,
      phoneTK: null,
      address: "thanh xuân hà nội",
      avatarUser: "",
      createdAt: 1695809104,
      updatedAt: 1695809104,
      uv_cong_viec: "ceo",
      uv_hinh_thuc: 0,
      uv_nganh_nghe: "11, 2",
      uv_dia_diem: "1, 2",
      check_ntd_xem_uv: false,
      check_xem_uv: false,
      check_ntd_save_uv: false,
    },
  ]);
  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCompany/thongKeDanhSachUngVien", {
          page: page,
          pageSize: pageSize,
          key,
          id_city: city,
        })
        .then((res) => {
          setTotal(res.data.data.total);
          setDanhSachUngVien([...res.data.data.data]);
        });
    } catch (error) {
      console.log("errr", error);
    }
  }, [page]);
  return (
    <>
      <HeadDefault title={"Danh sách ứng viên"} />
      <div className="flex flex-col items-center">
        <Header />
        <SearchUV />
        <div className="flex w-4/5">
          <div className="w-4/5 mt-4 mb-32 mr-10">
            <div className="font-bold text-xl text-blue-900">
              Danh sách ứng viên theo giờ
            </div>

            <div className="w-full">
              {danhSachUngVien.length > 0 &&
                danhSachUngVien.map((data: any) => (
                  <UVCard key={data.idTimViec365} data={data} />
                ))}
            </div>
            <Pagination
              total={total}
              showQuickJumper
              showSizeChanger
              onChange={(current, newPageSize) => {
                if (newPageSize != pageSize) {
                  setPage(1);
                  setPageSize(newPageSize);
                } else {
                  setPage(current);
                }
              }}
            />
          </div>
          <NTDTKUV />
        </div>

        <div className="4/5">
          <TuKhoaCongViecLQ />
          <DiaDiemLQ />
        </div>
        <Pagination
          total={total}
          showQuickJumper
          showSizeChanger
          onChange={(current, newPageSize) => {
            if (newPageSize != pageSize) {
              setPage(1);
              setPageSize(newPageSize);
            } else {
              setPage(current);
            }
          }}
        />
        <BlockCVDep />
        <Footer />
      </div>
    </>
  );
}

export default DanhSachUv;
