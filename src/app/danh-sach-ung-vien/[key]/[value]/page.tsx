"use client";
import Footer from "@/Components/Footer.component";
import JobCard from "@/Components/JobCard.component";
import SearchJob from "@/Components/SearchJob.component";
import Header from "@/Layout/Header.layout";
import { schedules, profession } from "@/constants/EditProfile.constant";
import { axiosTruocDN } from "@/utils/axios.config";
import { useEffect, useState } from "react";
import styles from "@/Css/homePage.module.css";
import { cityOption, tinh_thanh } from "@/utils/vi_tri";
import BlockDownApp from "@/Components/BlockDownApp";
import { convertNameToSlug } from "@/utils/generalFunction";
import NTDTKUV from "@/Components/NtdTKUV";
import UVCard from "@/Components/UVCard";
import SearchUV from "@/Components/SearchUV";
import { Pagination } from "antd";
function DanhSachUngVien({ params }: any) {
  const { key, value } = params;
  const [noiTimKiem, setNoiTimKiem] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [danhSachUngVien, setDanhSachUngVien] = useState<any>([
    {
      _id: 1101082,
      district: 74,
      city: 1,
      userName: "Lê Đình Mạnh",
      phone: "0966037772",
      type: 0,
      phoneTK: "",
      address: "194 Giải Phóng, Phương Liệt, Thanh Xuân, Hà Nội",
      avatarUser: "",
      createdAt: 1632069257,
      updatedAt: 1697775395,
      uv_cong_viec: "hihih",
      uv_hinh_thuc: 1,
      uv_nganh_nghe: "2, 3",
      uv_dia_diem: "3",
      check_ntd_xem_uv: true,
      check_xem_uv: false,
      check_ntd_save_uv: false,
    },
    {
      _id: 208513,
      district: 84,
      city: 1,
      userName: "Lâm",
      phone: "0869516978",
      type: 0,
      phoneTK: "0869516978",
      address: "hà đông hà nội",
      avatarUser: "1684227547-user-Screenshot 2023-03-19 213846.png",
      createdAt: 1684227547,
      updatedAt: 1697773007,
      uv_cong_viec: "keo",
      uv_hinh_thuc: 1,
      uv_nganh_nghe: "12, 13, 15",
      uv_dia_diem: "1, 23",
      check_ntd_xem_uv: true,
      check_xem_uv: true,
      check_ntd_save_uv: true,
    },
    {
      _id: 10004183,
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
      _id: 10003670,
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
      if (schedules.some((sc) => key?.includes(convertNameToSlug(sc.label)))) {
    
        setNoiTimKiem([...schedules]);
        axiosTruocDN
          .post("/manageAccountCompany/thongKeDanhSachUngVien", {
            id_hinhthuc: Number(value),
          })
          .then((res) => {
            setTotal(res.data.data.total);
            setDanhSachUngVien([...res.data.data.data]);
          });
      } else if (
        profession.some((pf) => key?.includes(convertNameToSlug(pf.label)))
      ) {
      
        setNoiTimKiem([...profession]);

        axiosTruocDN
          .post("/manageAccountCompany/thongKeDanhSachUngVien", {
            id_nganh: Number(value),
          })
          .then((res) => {
            setTotal(res.data.data.total);

            setDanhSachUngVien([...res.data.data.data]);
          });
      }
      if (
        cityOption.some((city) => key?.includes(convertNameToSlug(city.label)))
      ) {
        axiosTruocDN
          .post("/viecLam/thongKeDanhSachViecLam", {
            id_city: Number(value),
          })
          .then((res) => {
            setTotal(res.data.data.total);
            setDanhSachUngVien([...res.data.data.data]);
          });
        setNoiTimKiem([...cityOption]);
      }
    } catch (error) {
      console.log("errr", error);
    }
  }, []);
  return (
    <div className="flex flex-col items-center">
      <Header />
      <SearchUV />
      <div className="flex w-4/5 mb-32">
        <div className="w-full mt-4  mr-10">
          <div className={styles.hinh_thuc_cong_viec}>
            ỨNG VIÊN{" "}
            {noiTimKiem
              .find((tk: any) => tk.value == value)
              ?.label.toUpperCase()}{" "}
            THEO GIỜ
          </div>
          <div className="w-full gap-2.5">
            {danhSachUngVien.length > 0 &&
              danhSachUngVien.map((uv: any, index: number) => (
                <UVCard key={index} data={uv} />
              ))}
          </div>
        </div>
        <NTDTKUV />
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
      <BlockDownApp />
      <Footer />
    </div>
  );
}

export default DanhSachUngVien;
