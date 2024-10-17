"use client";
import Footer from "@/Components/Footer.component";

import Header from "@/Layout/Header.layout";
import { axiosSauDN } from "@/utils/axios.config";
import { useEffect, useState } from "react";
import styles from "@/Css/homePage.module.css";
import { cityOption } from "@/utils/vi_tri";
import BlockDownApp from "@/Components/BlockDownApp";
import { decodeUnicodeString } from "@/utils/generalFunction";
import SearchUV from "@/Components/SearchUV";
import { Pagination } from "antd";
import UVCard from "@/Components/UVCard";
import { renderProfession } from "@/constants/EditProfile.constant";
import NTDTKUV from "@/Components/NtdTKUV";
function TimKiemUngVien({ params }: any) {
  const { key, city } = params;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchOption, setSearchOption] = useState<any>({
    key: key == 0 ? "" : decodeUnicodeString(key),
    id_city: city == 0 ? "" : Number(city),
  });
  const [danhSachUngVien, setDanhSachUngVien] = useState<any>([]);

  useEffect(() => {
    try {
      axiosSauDN
        .post("/manageAccountCompany/thongKeDanhSachUngVien", {
          ...searchOption,
          page: page,
          pageSize: pageSize,
        })
        .then((res) => {
          setTotal(res.data.data.total);
          setDanhSachUngVien([...res.data.data.data]);
        });
    } catch (error) {
      console.log("errr", error);
    }
  }, [key, city, page]);
  return (
    <div className="flex flex-col items-center">
      <Header />
      <SearchUV />
      <div className="flex w-4/5 mb-32">
        <div className="w-4/5 mt-4 mr-10">
          <h1 className={styles.hinh_thuc_cong_viec}>
            ỨNG VIÊN {searchOption.key && renderProfession[key]}{" "}
            {searchOption.id_city != 0 &&
              ` TẠI ${cityOption
                .find((ct) => ct.value == Number(searchOption.id_city))
                ?.label.toUpperCase()}`}
          </h1>
          <div className="w-full ">
            {danhSachUngVien.length > 0 &&
              danhSachUngVien.map((data: any) => (
                <UVCard key={data._id} data={data} />
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

      <BlockDownApp />
      <Footer />
    </div>
  );
}

export default TimKiemUngVien;
