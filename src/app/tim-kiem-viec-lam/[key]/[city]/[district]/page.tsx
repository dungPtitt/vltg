"use client";
import Footer from "@/Components/Footer.component";
import JobCard from "@/Components/JobCard.component";
import SearchJob from "@/Components/SearchJob.component";
import Header from "@/Layout/Header.layout";
import { axiosTruocDN } from "@/utils/axios.config";
import { useEffect, useState } from "react";
import styles from "@/Css/homePage.module.css";
import { cityOption, districtOption } from "@/utils/vi_tri";
import BlockDownApp from "@/Components/BlockDownApp";
import { decodeUnicodeString } from "@/utils/generalFunction";
import { Pagination } from "antd";
import { renderProfession } from "@/constants/EditProfile.constant";
import { HeadSearchByProfessionAndAdress } from "@/constants/Head.constant";
function TimKiemViecLam({ params }: any) {
  const { key, city, district } = params;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchOption, setSearchOption] = useState<any>({
    key: key == 0 ? "" : decodeUnicodeString(key),
    id_city: city == 0 ? "" : city,
    district: district == 0 ? "" : district,
  });

  const [duLieuViecLam, setDuLieuViecLam] = useState<any>([]);

  useEffect(() => {
    try {
      axiosTruocDN
        .post("/viecLam/thongKeDanhSachViecLam", searchOption)
        .then((res) => {
          setTotal(res.data.data.total);
          setDuLieuViecLam([...res.data.data.data]);
        });
    } catch (error) {
      console.log("errr", error);
    }
  }, [key, city, district, page]);
  return (
    <>
      {HeadSearchByProfessionAndAdress(
        renderProfession[key],
        cityOption[Number(city) - 1].label
      )}
      <div className="flex flex-col items-center">
        <Header />
        <SearchJob />
        <div className="w-4/5 mt-4 mb-32">
          <div className={styles.hinh_thuc_cong_viec}>
            VIỆC LÀM {renderProfession[searchOption.key]?.toUpperCase()}{" "}
            {(searchOption.id_city != 0 || searchOption.district != 0) &&
              ` TẠI `}
            {searchOption.district != 0 &&
              districtOption
                .find((dt) => dt.value == Number(searchOption.district))
                ?.label.toUpperCase() + " "}
            {searchOption.id_city != 0 &&
              cityOption
                .find((ct) => ct.value == Number(searchOption.id_city))
                ?.label.toUpperCase()}
          </div>
          <div className="w-full pt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {duLieuViecLam.length > 0 &&
              duLieuViecLam.map((job: any) => (
                <JobCard key={job.id_vieclam} job={job} />
              ))}
          </div>
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
    </>
  );
}

export default TimKiemViecLam;
